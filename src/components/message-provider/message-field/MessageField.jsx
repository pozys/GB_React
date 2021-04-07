import React from "react"
import { bindActionCreators } from "redux"
import connect from "react-redux/es/connect/connect"
import { Message } from "./message"
import { InputField } from "./message/input-field"

export class MessageFieldView extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.robotName = "robot"
  }

  messages = () => {
    return this.props.chats[this.props.chatId].messages
  }

  render() {
    const currentConversation = this.props.chats[this.props.chatId]

    const messageElement = this.messages().map((message, index) => (
      <Message key={index} {...message} />
    ))

    return (
      <div>
        {messageElement}
        <div style={{ display: "flex", margin: "30px" }}>
          <InputField
            value={currentConversation.inputText}
            chatId={this.props.chatId}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ chatReducer }) => {
  return { chats: chatReducer.chats }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export const MessageField = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageFieldView)
