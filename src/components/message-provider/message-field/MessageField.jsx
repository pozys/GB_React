import React from "react"
import { bindActionCreators } from "redux"
import connect from "react-redux/es/connect/connect"
import { Message } from "./message"
import { InputField } from "./message/input-field"
import {
  handleContextMenuClick,
  closeContextMenu,
} from "../../../actions/contextMenuActions"
import { deleteMessage } from "../../../actions/chatActions"
import styles from "./messageField.module.css"
import { withStyles } from "@material-ui/core"

const StyledInput = withStyles(() => {
  return {
    root: {
      "&": {
        color: "#9a9fa1",
        padding: "10px 15px",
        fontSize: "15px",
      },
    },
  }
})(InputField)

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
      <Message key={index} messageIndex={index} {...message} {...this.props} />
    ))

    return (
      <div className={styles.messagesContainer}>
        {messageElement}

        <StyledInput
          value={currentConversation.inputText}
          chatId={this.props.chatId}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ chatReducer }) => {
  return { chats: chatReducer.chats }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { handleContextMenuClick, closeContextMenu, deleteMessage },
    dispatch,
  )

export const MessageField = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageFieldView)
