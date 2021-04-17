import React from "react"
import NotificationsIcon from "@material-ui/icons/Notifications"
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff"
import "./styles.css"

export class PushToggle extends React.Component {
  render() {
    return (
      <div className="push">
        <div className="activeNotification ">
          <NotificationsIcon />
        </div>
        <div className="inActiveNotification invisible">
          <NotificationsOffIcon />
        </div>
      </div>
    )
  }
}
