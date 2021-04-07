import React, { useState, useEffect } from "react"
import { bindActionCreators } from "redux"
import connect from "react-redux/es/connect/connect"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { createChat, closeNewChatDialog } from "../../../actions/chatActions"

export function NewChatNameDialogView(props) {
  const [open, setOpen] = useState(false)
  const [chatName, handleNameChange] = useState("")

  useEffect(() => {
    setOpen(props.opened)
  })

  const handleCreation = () => {
    if (!chatName) {
      handleCancel()
      return
    }

    props.createChat(chatName)
    handleClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
    props.closeNewChatDialog()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Добавление чата</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите название нового чата</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            onKeyUp={(event) => handleNameChange(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Отмена
          </Button>
          <Button onClick={handleCreation} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = ({ chatReducer }) => ({
  opened: chatReducer.dialogOpened,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ createChat, closeNewChatDialog }, dispatch)

export const NewChatNameDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewChatNameDialogView)
