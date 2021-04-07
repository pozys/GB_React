import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import grey from "@material-ui/core/colors/grey"

export function ChatItem(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
  }))

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

  const classes = useStyles()

  return (
    <ListItem
      alignItems="flex-start"
      button
      selected={selectedIndex === id}
      className={classes.root}
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
  )
}
