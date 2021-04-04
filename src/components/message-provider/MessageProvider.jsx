import React from "react"
import { MessageField, ChatList, NewChatNameDialog } from "@components"
import Grid from "@material-ui/core/Grid"

export class MessageProvider extends React.Component {
  constructor(props) {
    super(props)
    this.robotName = "robot"
  }

  state = {
    chats: [],
    dialogOpened: false,
  }

  componentDidUpdate() {
    if (this.messages().length === 0) {
      return
    }

    if (this.lastMessage().author === this.robotName) {
      return
    }

    let modifiedConversations = this.state.chats
    modifiedConversations[this.currentChatId()].messages = [
      ...modifiedConversations[this.currentChatId()].messages,
      {
        text: "Вам ответит первый освободившийся робоператор...",
        author: this.robotName,
        createdAt: new Date(),
      },
    ]

    setTimeout(
      () =>
        this.setState({
          chats: modifiedConversations,
        }),
      1000,
    )
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
    return this.state.chats[chatId].messages
  }

  handleChatCreation = (chatName) => {
    if (!chatName) {
      return
    }

    let newChat = this.chatTemplate()
    newChat.title = chatName
    this.setState({
      chats: [...this.state.chats, newChat],
    })
  }

  chatTemplate = () => {
    return {
      title: "",
      messages: [],
      inputText: "",
    }
  }

  changeHandler = (event) => {
    let modifiedConversations = this.state.chats
    modifiedConversations[this.currentChatId()].inputText = event.target.value

    this.setState({ chats: modifiedConversations })
  }

  sendMessage = () => {
    const messageText = this.currentConversation().inputText
    if (!messageText) {
      return
    }

    let modifiedConversations = this.state.chats
    modifiedConversations[this.currentChatId()].messages = [
      ...modifiedConversations[this.currentChatId()].messages,
      { text: messageText, author: "Human", createdAt: new Date() },
    ]
    modifiedConversations[this.currentChatId()].inputText = ""

    this.setState({
      chats: modifiedConversations,
    })
  }

  keyUpHandler = (event) => {
    if (event.keyCode === 13) {
      this.sendMessage()
    }
  }

  currentChatId = () => {
    const { id } = { ...this.props.match.params }
    return +id
  }

  rightField = () => {
    if (this.currentConversation() !== undefined) {
      return (
        <MessageField
          conversation={this.currentConversation()}
          changeHandler={this.changeHandler}
          sendMessage={this.sendMessage}
          keyUpHandler={this.keyUpHandler}
        />
      )
    }
    return <div>Выберите чат</div>
  }

  currentConversation = () => this.state.chats[this.currentChatId()]

  existingChats = () => {
    return this.state.chats.map((item, index) => {
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
        <Grid container direction="row" justify="space-between" lg={11}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="stretch"
            lg={2}
          >
            <Grid item>
              <ChatList
                chats={this.existingChats()}
                selectedChat={this.currentChatId()}
                addNewChatHandler={this.addNewChat}
              />
            </Grid>
          </Grid>
          <Grid container justify="space-around" alignItems="flex-end" lg={10}>
            <Grid item lg={12}>
              {this.rightField()}
            </Grid>
          </Grid>
        </Grid>
        <NewChatNameDialog
          opened={this.state.dialogOpened}
          closeDialogHandler={this.closeDialog}
          handleChatCreation={this.handleChatCreation}
        />
      </>
    )
  }
}
