import path from "path";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js"

const PORT = 3000;
const app = express();

const httpServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", viewsRouter);

// Actividad 1
// const message = []

// Actividad 2
const messages = []


io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado: ", socket.id);

  // socket.on("message", (data) => {
  //   console.log(data)
  // })

  // socket.emit("evento_para_socket_individual", "Este mensaje sólo lo debe recibir el socket");

  // socket.broadcast.emit("evento_para_todos_menos_el_socket_actual", "Este evento lo verán todos los sockets conectados, MENOS el socket actual desde qel que se envió el mensaje");

  // io.emit("evento_para_todos", "Este mensaje lo reciben todos los sockets conectados")
  
  // Actividad 1

  // socket.on("char", (data) => {
  //   if(data === "Backspace") message.pop()
  //   else if(data.length === 1) message.push(data);
  //   io.emit("message", message.join(""))
  // })


  // Actividad 2

  socket.emit("all-msgs", messages)

  socket.on("new-msg", (data) => {
    messages.push({ message: data, socketid: socket.id });
    io.emit("all-msgs", messages)
  })
})
