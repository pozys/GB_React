import {
  ADD_CHAT,
  CREATE_CHAT,
  CLOSE_NEW_CHAT_DIALOG,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  CHANGE_HANDLER,
  NEW_MESSAGE_ALERT_START,
  NEW_MESSAGE_ALERT_STOP,
  DELETE_CHAT,
  GET_CHATS_WAITING,
  GET_CHATS_SUCCESS,
  GET_CHATS_ERROR,
} from "../utils/types"

import { getChatsAPI } from "../api/requests"

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

export const getChats = () => async (dispatch) => {
  dispatch({ type: GET_CHATS_WAITING })

  try {
    const data = await getChatsAPI()
    setTimeout(() => {
      dispatch({ type: GET_CHATS_SUCCESS, payload: data })
    }, 3000)
  } catch (error) {
    dispatch({ type: GET_CHATS_ERROR, payload: error })
  }
}
