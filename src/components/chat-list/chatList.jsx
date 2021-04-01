import React from "react";
import List from "@material-ui/core/List";
import { ChatItem } from "./chat-item";

export class ChatList extends React.Component {
  state = {
    chatItems: ["Chat 1", "Chat 2", "Chat 3", "Chat 4"],
    selectedIndex: 0,
  };

  setSelectedIndex = (index) => this.setState({ selectedIndex: index });

  render() {
    return (
      <List component="nav">
        {this.state.chatItems.map((chat, index) => (
          <ChatItem
            chat={chat}
            key={index}
            index={index}
            selectedIndex={this.state.selectedIndex}
            setSelectedIndex={this.setSelectedIndex}
          />
        ))}
      </List>
    );
  }
}
