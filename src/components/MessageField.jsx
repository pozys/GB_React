import React from "react";
import Message from "./Message";
import InputField from "./InputField";

export default class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.robotName = "robot";
  }
  state = {
    messages: [],
  };

  handleMessageSenging = () => {
    const messageText = this.inputRef.current.value;
    if (!messageText) {
      return;
    }

    this.inputRef.current.value = "";

    this.setState({
      messages: [
        ...this.state.messages,
        { text: messageText, author: "Human" },
      ],
    });
  };

  render() {
    const messageElement = this.state.messages.map((message, index) => (
      <Message key={index} text={message.text} author={message.author} />
    ));

    return (
      <div>
        {messageElement}
        <InputField
          inputRef={this.inputRef}
          handler={this.handleMessageSenging}
        />
        <button onClick={this.handleMessageSenging}>Send message</button>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.messages.length === 0) {
      return;
    }
    let lastMessage = this.state.messages[this.state.messages.length - 1];

    if (lastMessage.author === this.robotName) {
      return;
    }

    setTimeout(
      () =>
        this.setState({
          messages: [
            ...this.state.messages,
            {
              text: "Вам ответит первый освободившийся робоператор...",
              author: this.robotName,
            },
          ],
        }),
      1000
    );
  }
}
