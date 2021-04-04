import ListItem from "@material-ui/core/ListItem"
import React from "react"

export class NewChatItem extends React.Component {
  render() {
    return (
      <ListItem button onClick={this.props.addNewChatHandler}>
        Add new chat...
      </ListItem>
    )
  }
}
