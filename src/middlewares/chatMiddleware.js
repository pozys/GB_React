import {
  newMessageAlertStart,
  newMessageAlertStop,
  SEND_MESSAGE,
} from "../actions/chatActions"

const robotName = "robot"

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      if (action.author !== robotName || action.text.length === 0) {
        return next(action)
      }

      store.dispatch(newMessageAlertStart(action.chatId))
      setTimeout(() => store.dispatch(newMessageAlertStop(action.chatId)), 1000)

      return next(action)
  }
  return next(action)
}
