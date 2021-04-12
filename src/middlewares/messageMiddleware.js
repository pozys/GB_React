import { sendMessage, SEND_MESSAGE } from "../actions/chatActions"

const robotName = "robot"

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      if (action.author === robotName || action.text.length === 0) {
        return next(action)
      }

      const dateOptions = { hour: "numeric", minute: "numeric" }
      setTimeout(
        () =>
          store.dispatch(
            sendMessage(
              "Вам ответит первый освободившийся робоператор...",
              action.chatId,
              new Date().toLocaleString("ru", dateOptions),
              robotName,
            ),
          ),
        2000,
      )

      return next(action)
  }
  return next(action)
}
