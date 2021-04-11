import update from "react-addons-update"

import {
  CONTEXT_MENU_HANDLE_CLICK,
  CLOSE_CONTEXT_MENU,
} from "../actions/contextMenuActions"

const innitialStore = {
  contextMenuState: {
    chatId_messageId: {
      mouseX: null,
      mouseY: null,
    },
  },
}

export default function contextMenuReducer(store = innitialStore, action) {
  switch (action.type) {
    case CONTEXT_MENU_HANDLE_CLICK:
      return update(store, {
        contextMenuState: {
          $merge: {
            [`${action.chatId}_${
              action?.messageIndex ? action.messageIndex : ""
            }`]: {
              mouseX: action.event.clientX - 2,
              mouseY: action.event.clientY - 4,
            },
          },
        },
      })
    case CLOSE_CONTEXT_MENU:
      return update(store, {
        $merge: {
          contextMenuState: {},
        },
      })
    default:
      return store
  }
}
