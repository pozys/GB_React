import React from "react"
import { Message } from "./message"
import { InputField } from "./message/input-field"

export class MessageField extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
    this.robotName = "robot"
  }

  messages = () => this.props.conversation.messages
  inputText = () => this.props.conversation.inputText

  render() {
    const messageElement = this.messages().map((message, index) => (
      <Message key={index} {...message} />
    ))

    return (
      <div>
        {messageElement}
        <div style={{ display: "flex", margin: "30px" }}>
          <InputField
            keyUpHandler={this.props.keyUpHandler}
            changeHandler={this.props.changeHandler}
            value={this.inputText()}
            sendMessage={this.props.sendMessage}
          />
        </div>
      </div>
    )
  }
}
