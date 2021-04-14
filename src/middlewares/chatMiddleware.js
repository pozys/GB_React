import {
  newMessageAlertStart,
  newMessageAlertStop,
} from "../actions/chatActions"

import {
  SEND_MESSAGE,
  CREATE_CHAT,
  DELETE_CHAT,
  DELETE_MESSAGE,
} from "../utils/types"

import {
  createChatAPI,
  addMessageAPI,
  deleteChatAPI,
  deleteMessageAPI,
} from "../api/requests"

const robotName = "robot"

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      ;(async () => {
        try {
          addMessageAPI(action)
        } catch (error) {
          console.error(error)
        }
      })()

      if (action.author !== robotName || action.text.length === 0) {
        return next(action)
      }

      store.dispatch(newMessageAlertStart(action.chatId))
      setTimeout(() => store.dispatch(newMessageAlertStop(action.chatId)), 1000)
      break
    case CREATE_CHAT:
      ;(async () => {
        try {
          await createChatAPI(action)
        } catch (error) {
          console.error(error)
        }
      })()

      break
    case DELETE_CHAT:
      ;(async () => {
        try {
          await deleteChatAPI(action)
        } catch (error) {
          console.error(error)
        }
      })()

      break
    case DELETE_MESSAGE:
      ;(async () => {
        try {
          await deleteMessageAPI(action)
        } catch (error) {
          console.error(error)
        }
      })()

      break
  }
  return next(action)
}
