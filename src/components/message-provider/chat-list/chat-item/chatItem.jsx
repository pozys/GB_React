import React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import grey from "@material-ui/core/colors/grey"
import { ContextMenu } from "../../../context-menu"

export function ChatItem(props) {
  const { id, title, selectedIndex, lastMessage } = props
  let messageText = lastMessage?.text || ""
  messageText = messageText.slice(0, 25)
  let messageDate = ""
  if (lastMessage.createdAt !== undefined) {
    const dateOptions = { hour: "numeric", minute: "numeric" }
    messageDate = lastMessage.createdAt.toLocaleString("ru", dateOptions)
  }

  const messageAuthor = lastMessage?.author || ""

  let lastMessageInfo = ""
  if (messageText && messageDate) {
    lastMessageInfo = ` - ${messageText} ${messageDate}`
  }

  let listItemClassNames = "list-item"

  if (props.newAlert) {
    listItemClassNames += " flash"
  }

  const handleContextMenuClick = (event) => {
    event.preventDefault()
    props.closeContextMenu()
    props.handleContextMenuClick(event, id)
  }

  const menuItems = [
    {
      title: "Delete chat",
      action: () => {
        props.deleteChat(id)
        props.closeContextMenu()
      },
    },
  ]

  return (
    <div
      onContextMenu={(event) => handleContextMenuClick(event)}
      style={{ cursor: "context-menu" }}
    >
      <ListItem
        button
        className={listItemClassNames}
        selected={selectedIndex === id}
        onClick={() => props.handleClick(`/chat/${id}`)}
      >
        {
          <ListItemText
            primary={title}
            secondary={
              <>
                <Typography component="span" color={grey["50"]}>
                  {messageAuthor}
                </Typography>
                {lastMessageInfo}
              </>
            }
          />
        }
      </ListItem>
      <ContextMenu
        menuItems={menuItems}
        chatId={id}
        handleClose={props.closeContextMenu}
      />
    </div>
  )
}
