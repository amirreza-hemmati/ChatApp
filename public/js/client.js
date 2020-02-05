const socket = io();

socket.on("connect", () => {
  console.log("user connected to the messenger");
});

socket.on("disconnect", () => {
  console.log("user disconnect to the messenger");
});

// on =>
/*
  connection => وقتی در سرور سوکتی دریافت شود این متد اجرا میشود و دارای یک پارامتر است
  connect => وقتی در فرانت کاربری با سرور کانکت شد اجرا میشود
*/
