import React from "react"
import { Header, MessageProvider } from "@components"
import { Route, Switch } from "react-router-dom"
import styles from "./mainLayout.module.css"

export class MainLayout extends React.Component {
  render() {
    return (
      <div className={styles.body}>
        <div className={styles.header}>
          <Header />
        </div>

        <Switch>
          <Route path={["/chat/:id/", "/"]} component={MessageProvider}></Route>
        </Switch>
      </div>
    )
  }
}
