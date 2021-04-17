export const CONTEXT_MENU_HANDLE_CLICK =
  "@@contextMenu/CONTEXT_MENU_HANDLE_CLICK"
export const CLOSE_CONTEXT_MENU = "@@contextMenu/CLOSE_CONTEXT_MENU"

export const handleContextMenuClick = (event, chatId, messageIndex) => ({
  type: CONTEXT_MENU_HANDLE_CLICK,
  event,
  chatId,
  messageIndex,
})

export const closeContextMenu = () => ({
  type: CLOSE_CONTEXT_MENU,
})
