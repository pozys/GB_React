import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import { ContextMenu } from "../../../context-menu"
import styles from "./message.module.css"

export class Message extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }

  render() {
    const { author, text, createdAt } = this.props

    const menuItems = [
      {
        title: "Delete message",
        action: () => {
          this.props.deleteMessage(this.props.chatId, this.props.messageIndex)
          this.props.closeContextMenu()
        },
      },
    ]

    const handleContextMenuClick = (event) => {
      event.preventDefault()
      this.props.closeContextMenu()
      this.props.handleContextMenuClick(
        event,
        this.props.chatId,
        this.props.messageIndex,
      )
    }

    return (
      <div
        className={styles.contextMenu}
        onContextMenu={(event) => handleContextMenuClick(event)}
      >
        <div
          className={
            author !== "robot" ? styles.currentMessage : styles.robotsMessage
          }
        >
          <Card>
            <Typography
              paragraph
              component="span"
              variant="body1"
              color="textPrimary"
            >
              <b>{author}</b>
              {": " + text}
            </Typography>
            <Typography
              component="div"
              variant="body1"
              color="textPrimary"
              align="right"
            >
              {createdAt}
            </Typography>
          </Card>
          <ContextMenu
            menuItems={menuItems}
            chatId={this.props.chatId}
            messageIndex={this.props.messageIndex}
            handleClose={this.props.closeContextMenu}
          />
        </div>
      </div>
    )
  }
}
