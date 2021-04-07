export const ADD_CHAT = "@@chat/ADD_CHAT"
export const CREATE_CHAT = "@@chat/CREATE_CHAT"
export const CLOSE_NEW_CHAT_DIALOG = "@@chat/CLOSE_NEW_CHAT_DIALOG"
export const SEND_MESSAGE = "@@message/SEND_MESSAGE"
export const CHANGE_HANDLER = "@@message/CHANGE_HANDLER"

export const addChat = () => ({
  type: ADD_CHAT,
})

export const closeNewChatDialog = () => ({
  type: CLOSE_NEW_CHAT_DIALOG,
})

export const createChat = (title) => ({
  type: CREATE_CHAT,
  title,
  chatTemplate: {
    title: "",
    messages: [],
    inputText: "",
  },
})

export const sendMessage = (text, chatId, author = "Human") => ({
  type: SEND_MESSAGE,
  text,
  author,
  chatId,
})

export const changeHandler = (text, chatId) => ({
  type: CHANGE_HANDLER,
  text,
  chatId,
})
