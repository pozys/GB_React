import React from "react"
import { bindActionCreators } from "redux"
import connect from "react-redux/es/connect/connect"
import List from "@material-ui/core/List"
import { ChatItem } from "./chat-item"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import { NewChatItem } from "./newChatItem"
import { makeStyles } from "@material-ui/core/styles"
import { addChat } from "../../../actions/chatActions"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.primary.main,
  },
}))

export function ChatListView(props) {
  const classes = useStyles()

  let chats = existingChats(props.chats)

  return (
    <div className={classes.root}>
      <List component="nav">
        <Typography variant="body1" className={classes.root}>
          <List component="nav">
            {chats.map((chat, index) => (
              <Link to={`/chat/${index}/`} underline="none" color="inherit">
                <ChatItem
                  key={index}
                  selectedIndex={props.selectedChat}
                  {...chat}
                />
              </Link>
            ))}
          </List>
          <NewChatItem addNewChatHandler={props.addChat} />
        </Typography>
      </List>
    </div>
  )
}

const lastMessageByChatId = (chats, chatId) =>
  messages(chats, chatId)[messages(chats, chatId).length - 1]

const existingChats = (chats) => {
  return chats.map((item, index) => {
    let chatDescription = {
      id: index,
      title: item.title,
      lastMessage: lastMessageByChatId(chats, index) || {},
    }
    return chatDescription
  })
}

const messages = (chats, chatId) => {
  return chats[chatId].messages
}

const mapStateToProps = ({ chatReducer }) => {
  return {
    chats: chatReducer.chats,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addChat }, dispatch)

export const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListView)
