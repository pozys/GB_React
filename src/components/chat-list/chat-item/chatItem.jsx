import React from "react";
import ListItem from "@material-ui/core/ListItem";

export class ChatItem extends React.Component {
  handleListItemClick = (index) => {
    this.props.setSelectedIndex(index);
  };

  render() {
    const { index, chat, selectedIndex } = this.props;

    return (
      <ListItem
        button
        selected={selectedIndex === index}
        onClick={() => this.handleListItemClick(index)}
      >
        {chat}
      </ListItem>
    );
  }
}
