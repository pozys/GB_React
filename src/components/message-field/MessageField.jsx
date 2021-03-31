import React from "react";
import { Message } from "./message";
import { InputField } from "./message/input-field";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { Button } from "@material-ui/core";

export class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.robotName = "robot";
  }
  state = {
    messages: [],
    inputText: "",
  };

  sendMessage = () => {
    let messageText = this.state.inputText;
    if (!messageText) {
      return;
    }

    this.setState({
      messages: [
        ...this.state.messages,
        { text: messageText, author: "Human" },
      ],
      inputText: "",
    });
  };

  keyUpHandler = (event) => {
    console.log(event);
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  };

  changeHandler = (event) => {
    this.setState({ inputText: event.target.value });
  };

  render() {
    const messageElement = this.state.messages.map((message, index) => (
      <Message key={index} text={message.text} author={message.author} />
    ));

    return (
      <div>
        {messageElement}
        <div style={{ display: "flex" }}>
          <InputField
            keyUpHandler={this.keyUpHandler}
            changeHandler={this.changeHandler}
            value={this.state.inputText}
          />
          <Button
            onClick={this.sendMessage}
            variant="contained"
            color="primary"
          >
            <SendRoundedIcon />
          </Button>
        </div>
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
