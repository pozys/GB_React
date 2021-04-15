import React from "react"
import { bindActionCreators } from "redux"
import connect from "react-redux/es/connect/connect"
import { MessageField, ChatList, NewChatNameDialog } from "@components"
import { sendMessage } from "../../actions/chatActions"
import Grid from "@material-ui/core/Grid"
import styles from "../layouts/mainLayout.module.css"

export class MessageProviderView extends React.Component {
  constructor(props) {
    super(props)
    this.robotName = "robot"
  }

  lastMessage = () => this.messages()[this.messages().length - 1]

  lastMessageByChatId = (chatId) =>
    this.messages(chatId)[this.messages(chatId).length - 1]

  messages = (chatId = undefined) => {
    if (chatId === undefined) {
      chatId = this.currentChatId()
    }
    if (isNaN(chatId)) {
      return []
    }

    return this.props.chats[chatId].messages
  }

  handleChatCreation = (chatName) => {
    if (!chatName) {
      return
    }

    let newChat = this.chatTemplate()
    newChat.title = chatName
    this.setState({
      chats: [...this.props.chats, newChat],
    })
  }

  chatTemplate = () => {
    return {
      title: "",
      messages: [],
      inputText: "",
    }
  }

  sendMessage = () => {
    const messageText = this.currentConversation().inputText
    if (!messageText) {
      return
    }

    this.props.sendMessage(messageText, this.currentChatId())
  }

  currentChatId = () => {
    const { id } = { ...this.props.match.params }
    return +id
  }

  currentConversation = () => this.props.chats[this.currentChatId()]

  rightField = () => {
    if (this.currentConversation() !== undefined) {
      return <MessageField chatId={this.currentChatId()} />
    }
    return <div>Выберите чат</div>
  }

  existingChats = () => {
    return this.props.chats.map((item, index) => {
      let chatDescription = {
        id: index,
        title: item.title,
        lastMessage: this.lastMessageByChatId(index) || {},
      }
      return chatDescription
    })
  }

  addNewChat = () => {
    this.setState({
      dialogOpened: true,
    })
  }

  closeDialog = () => {
    this.setState({
      dialogOpened: false,
    })
  }

  render() {
    return (
      <>
        <div className={styles.chats}>
          <ChatList selectedChat={this.currentChatId()} />
        </div>
        <div className={styles.messages}>{this.rightField()}</div>
        <div className={styles.messages}>
          <NewChatNameDialog />
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ chatReducer }) => ({ chats: chatReducer.chats })

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ sendMessage }, dispatch)

export const MessageProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageProviderView)
