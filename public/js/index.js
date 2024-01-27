const socket = io();

// socket.emit("message", "¡Hola, me estoy comunicando desde un websocket!")


// socket.on("evento_para_socket_individual", (data) => console.log(data));

// socket.on("evento_para_todos_menos_el_socket_actual", (data) => console.log(data));

// socket.on("evento_para_todos", (data) => console.log(data))


// ACTIVIDAD 1

// const input = document.getElementById("input");
// const msg = document.getElementById("msg");

// input.addEventListener("keydown", (e) => {
//   socket.emit("char", e.key)
// })

// socket.on("message", (data) => {
//   if(data === "") msg.innerText = "..."
//   else msg.innerText = data
// })

// ACTIVIDAD 2

const form = document.getElementById("form-msg");
const allMessages = document.getElementById("all-messages");

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = form[0].value;
  socket.emit("new-msg", message)
})

socket.on("all-msgs", (data) => {
  allMessages.innerHTML = updateMessages(data)
})

function updateMessages(messages) {
  let newMessages = ""
  messages.forEach((msg) => {
    newMessages += (`<p> socketid: ${msg.socketid}, mensaje: ${msg.message} </p>`)
  })
  return newMessages
}