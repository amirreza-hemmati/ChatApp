require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

const server = http.createServer(app);
const io = socketIo(server);






// connection method
io.on('connection', socket => {
  
  console.log("a new user just connected");

  socket.on("disconnect", () => {
    console.log("user disconnect to the messenger");
  });

});







server.listen(process.env.PORT, () => {
  console.log("Starting the server is =>", true);
});

// const configMongo = { useUnifiedTopology: true, useNewUrlParser: true };
// mongoose
//   .connect(process.env.URL, configMongo)
//   .then(() => {
//     console.log("Connect to mongodb database is => ", true);
            //server listen
//   })
//   .catch(error => {
//     console.log("Error in connect to mongodb database err=>", error);
//   });