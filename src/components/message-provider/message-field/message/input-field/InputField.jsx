import React from "react"
import { bindActionCreators } from "redux"
import connect from "react-redux/es/connect/connect"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import SendRoundedIcon from "@material-ui/icons/SendRounded"
import { sendMessage, changeHandler } from "../../../../../actions/chatActions"

export class InputFieldView extends React.Component {
  currentConversation = () => this.props.chats[this.props.chatId]

  sendMessage = () => {
    const messageText = this.currentConversation().inputText
    if (!messageText) {
      return
    }

    const dateOptions = { hour: "numeric", minute: "numeric" }
    this.props.sendMessage(
      messageText,
      this.props.chatId,
      new Date().toLocaleString("ru", dateOptions),
    )
  }

  keyUpHandler = (event) => {
    if (event.keyCode === 13) {
      this.sendMessage()
    }
  }

  changeHandler = (event) => {
    let modifiedConversations = this.props.chats
    modifiedConversations[this.props.chatId].inputText = event.target.value

    this.props.changeHandler(event.target.value, this.props.chatId)
  }

  render() {
    return (
      <TextField
        name="messageText"
        autoFocus={true}
        fullWidth={true}
        value={this.props.value}
        placeholder="Please, enter some message"
        onChange={this.changeHandler}
        onKeyUp={this.keyUpHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendRoundedIcon onClick={this.sendMessage} />
            </InputAdornment>
          ),
        }}
      />
    )
  }
}

const mapStateToProps = ({ chatReducer }) => {
  return { chats: chatReducer.chats }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ sendMessage, changeHandler }, dispatch)

export const InputField = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputFieldView)
