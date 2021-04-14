import { axiosProvider } from "./axiosProvider"

export const getChatsAPI = () => {
  return axiosProvider.get("/chats")
}

export const createChatAPI = (data) => {
  return axiosProvider.put("/chats", data)
}

export const addMessageAPI = (data) => {
  return axiosProvider.post("/message", data)
}

export const deleteChatAPI = (data) => {
  return axiosProvider.delete(`/chats/${data.chatId}`, data)
}

export const deleteMessageAPI = (data) => {
  return axiosProvider.delete(`/message/${data.chatId}/${data.messageIndex}`)
}
