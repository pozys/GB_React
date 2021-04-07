import update from "react-addons-update"
import {
  ADD_CHAT,
  CREATE_CHAT,
  CLOSE_NEW_CHAT_DIALOG,
  SEND_MESSAGE,
  CHANGE_HANDLER,
} from "../actions/chatActions"

const innitialStore = {
  chats: [],
  dialogOpened: false,
}

export default function chatReducer(store = innitialStore, action) {
  switch (action.type) {
    case ADD_CHAT: {
      return update(store, {
        dialogOpened: { $set: true },
      })
    }
    case CREATE_CHAT: {
      let newChat = action.chatTemplate
      newChat.title = action.title

      return update(store, {
        chats: { $push: [newChat] },
      })
    }
    case CLOSE_NEW_CHAT_DIALOG: {
      return update(store, {
        dialogOpened: { $set: false },
      })
    }
    case SEND_MESSAGE: {
      let conversation = store.chats[action.chatId]
      conversation.messages = [
        ...conversation.messages,
        { text: action.text, author: action.author, createdAt: new Date() },
      ]

      conversation.inputText = ""

      return update(store, {
        chats: { $splice: [[action.chatId, 1, conversation]] },
      })
    }
    case CHANGE_HANDLER: {
      let conversation = store.chats[action.chatId]
      conversation.inputText = action.text

      return update(store, {
        chats: { $splice: [[action.chatId, 1, conversation]] },
      })
    }

    default:
      return store
  }
}
