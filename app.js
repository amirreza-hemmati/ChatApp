require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const User = require("./models/users");

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

const server = http.createServer(app);
const io = socketIo(server);

// هروقت کاربری کانکت شد
io.on("connection", socket => {
  socket.on("new user", informationUser => {
    const { userName, email } = informationUser;

    const newUser = new User({
      userName,
      email
    });

    newUser
      .save()
      .then(user => {
        socket.userName = user.userName;
        socket._id = user._id;
        io.emit("join", {
          success: true,
          message: "کاربر با موفقیت به چت پیوست",
          userName: socket.userName
        });
      })
      .catch(error => {
        io.emit("join", {
          success: false,
          code: error.code,
          error
        });
      });
  });

  socket.on("disconnect", () => {
    User.findByIdAndDelete(socket._id)
      .then(() => {
        io.emit("left user", {
          success: true,
          message: "کاربر با موفقیت حذف گردید",
          userName: socket.userName
        });
      })
      .catch(() => {
        io.emit("left user", {
          success: false,
          message: "کاربر با موفقیت حذف نگردید ..."
        });
      });
  });
});

const configMongo = { useUnifiedTopology: true, useNewUrlParser: true };

mongoose
  .connect(process.env.URL, configMongo)
  .then(() => {
    console.log("Connect to mongodb database is => ", true);
    server.listen(process.env.PORT, () => {
      console.log("Starting the server is =>", true);
    });
  })
  .catch(error => {
    console.log("Error in connect to mongodb database err=>", error);
  });
