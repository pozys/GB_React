import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendRoundedIcon onClick={this.props.sendMessage} />
            </InputAdornment>
          ),
        }}
      />
    );
  }
}
