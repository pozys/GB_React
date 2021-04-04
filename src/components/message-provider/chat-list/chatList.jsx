import React from "react"
import List from "@material-ui/core/List"
import { ChatItem } from "./chat-item"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { NewChatItem } from "./newChatItem"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.primary.main,
  },
}))

export function ChatList(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="nav">
        <Typography variant="body1" className={classes.root}>
          <List component="nav">
            {props.chats.map((chat, index) => (
              <Link to={`/chat/${index}/`} underline="none" color="inherit">
                <ChatItem
                  key={index}
                  selectedIndex={props.selectedChat}
                  {...chat}
                />
              </Link>
            ))}
          </List>
          <NewChatItem addNewChatHandler={props.addNewChatHandler} />
        </Typography>
      </List>
    </div>
  )
}
