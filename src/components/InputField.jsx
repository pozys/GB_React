import React from "react";

export default class InputField extends React.Component {
  keyDownHandler = (event) => {
    if (event.keyCode === 13) {
      this.props.handler();
    }
  };
  render() {
    return (
      <input
        ref={this.props.inputRef}
        type="text"
        name="messageText"
        onKeyDown={this.keyDownHandler}
      />
    );
  }
}
