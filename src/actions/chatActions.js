export const ADD_CHAT = "@@chat/ADD_CHAT"
export const CREATE_CHAT = "@@chat/CREATE_CHAT"
export const CLOSE_NEW_CHAT_DIALOG = "@@chat/CLOSE_NEW_CHAT_DIALOG"
export const SEND_MESSAGE = "@@message/SEND_MESSAGE"
export const DELETE_MESSAGE = "@@chat/DELETE_MESSAGE"
export const CHANGE_HANDLER = "@@message/CHANGE_HANDLER"
export const NEW_MESSAGE_ALERT_START = "@@chat/NEW_MESSAGE_ALERT_START"
export const NEW_MESSAGE_ALERT_STOP = "@@chat/NEW_MESSAGE_ALERT_STOP"
export const DELETE_CHAT = "@@chat/DELETE_CHAT"

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

export const sendMessage = (text, chatId, date, author = "Human") => ({
  type: SEND_MESSAGE,
  text,
  date,
  author,
  chatId,
})

export const changeHandler = (text, chatId) => ({
  type: CHANGE_HANDLER,
  text,
  chatId,
})

export const newMessageAlertStart = (chatId) => ({
  type: NEW_MESSAGE_ALERT_START,
  chatId,
})

export const newMessageAlertStop = (chatId) => ({
  type: NEW_MESSAGE_ALERT_STOP,
  chatId,
})

export const deleteMessage = (chatId, messageIndex) => ({
  type: DELETE_MESSAGE,
  chatId,
  messageIndex,
})

export const deleteChat = (chatId) => ({
  type: DELETE_CHAT,
  chatId,
})
