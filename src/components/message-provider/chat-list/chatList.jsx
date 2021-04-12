import React from "react"
import { bindActionCreators } from "redux"
import connect from "react-redux/es/connect/connect"
import { push } from "connected-react-router"
import List from "@material-ui/core/List"
import { ChatItem } from "./chat-item"
import Typography from "@material-ui/core/Typography"
import { NewChatItem } from "./newChatItem"
import {
  handleContextMenuClick,
  closeContextMenu,
} from "../../../actions/contextMenuActions"
import { addChat, deleteChat } from "../../../actions/chatActions"

export function ChatListView(props) {
  let chats = existingChats(props.chats)

  const handleNavigate = (link) => {
    props.push(link)
  }

  return (
    <List component="nav">
      <Typography variant="body1">
        <List component="nav">
          {chats.map((chat, index) => (
            <ChatItem
              key={index}
              {...props}
              {...chat}
              handleClick={handleNavigate}
            />
          ))}
        </List>
        <NewChatItem addNewChatHandler={props.addChat} />
      </Typography>
    </List>
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
      newAlert: item.newAlert,
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
  bindActionCreators(
    { handleContextMenuClick, closeContextMenu, addChat, push, deleteChat },
    dispatch,
  )

export const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListView)
