const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(cors())
server.listen("8000", console.log("Listen port 8000"))

let chats = []

const getChats = (request, response) => {
  response.status(200).send(chats)
}

const createChat = (request, response) => {
  let newChat = request.body.chatTemplate
  newChat.title = request.body.title
  chats.push(newChat)
  response.status(200).send("OK")
}

const deleteChat = (request, response) => {
  chats.splice(request.params.chatId, 1)
  response.status(200).send("OK")
}

const addMessage = (request, response) => {
  const { chatId, text, author, date } = request.body
  let chat = chats[chatId]
  chat.messages = [...chat.messages, { text, author, createdAt: date }]
  response.status(200).send("OK")
}

const deleteMessage = (request, response) => {
  const { chatId, messageIndex } = request.params
  let chat = chats[chatId]
  chat.messages.splice(messageIndex, 1)

  response.status(200).send("OK")
}

server.get("/chats", (request, response) => getChats(request, response))

server.put("/chats", (request, response) => createChat(request, response))

server.post("/message", (request, response) => addMessage(request, response))

server.delete("/chats/:chatId", (request, response) =>
  deleteChat(request, response),
)

server.delete("/message/:chatId/:messageId", (request, response) =>
  deleteMessage(request, response),
)
