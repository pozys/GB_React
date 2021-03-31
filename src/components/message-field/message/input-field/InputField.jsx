import React from "react";
import TextField from "@material-ui/core/TextField";

export class InputField extends React.Component {
  render() {
    return (
      <TextField
        name="messageText"
        autoFocus={true}
        fullWidth={true}
        value={this.props.value}
        placeholder="Please, enter some message"
        onChange={this.props.changeHandler}
        onKeyUp={this.props.keyUpHandler}
      />
    );
  }
}
