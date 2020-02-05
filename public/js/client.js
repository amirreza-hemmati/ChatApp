const socket = io();

socket.on('connect', () => {
  
  console.log("user connected to the messenger");

  socket.emit('createMessage', {
    name: "Amirreza Hemmati",
    text: "Hello, how are you?"
  });

});

socket.on('disconnect', () => {
  console.log("user disconnect to the messenger");
});

socket.on("newMessage", message => {
  console.log(message);
});

/*
  connection => وقتی در سرور سوکتی دریافت شود این متد اجرا میشود و دارای یک پارامتر است
  connect => وقتی در فرانت کاربری با سرور کانکت شد اجرا میشود
  emit => برای ارسال مقادیر مورد نیاز از فرانت به سرور و عکس آن
  broadcast => socket.broadcast => این مقدار باعث میشود پیام به تمام کاربران ارسال شود به غیر کسی که این پیام را به سرور ارسال کرده است
*/
