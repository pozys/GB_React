import React from "react"
import connect from "react-redux/es/connect/connect"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

const innitialStore = {
  contextMenuState: {
    chatId_messageId: {
      mouseX: null,
      mouseY: null,
    },
  },
}

const ContextMenuView = (props) => {
  const handleClose = () => {
    props.handleClose()
  }

  const currentMenu =
    props.contextMenuState[
      `${props.chatId}_${props?.messageIndex ? props.messageIndex : ""}`
    ]
  return (
    <Menu
      keepMounted
      open={currentMenu && currentMenu.mouseY !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        currentMenu &&
        currentMenu.mouseY !== null &&
        currentMenu &&
        currentMenu.mouseX !== null
          ? {
              top: currentMenu.mouseY,
              left: currentMenu.mouseX,
            }
          : undefined
      }
    >
      {props.menuItems.map((item) => (
        <MenuItem onClick={item.action}>{item.title}</MenuItem>
      ))}
    </Menu>
  )
}

const mapStateToProps = ({ contextMenuReducer }) => {
  return { contextMenuState: contextMenuReducer.contextMenuState }
}

export const ContextMenu = connect(mapStateToProps, null)(ContextMenuView)
