import React from "react"
import { Header, MessageProvider } from "@components"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { Route, Switch } from "react-router-dom"
import styles from "./mainLayout.module.css"

export class MainLayout extends React.Component {
  render() {
    return (
      <div className={styles.body}>
        <div className={styles.header}>
          <Header />
        </div>

        <div className={styles.content}>
          <Switch>
            <Route
              path={["/chat/:id/", "/"]}
              component={MessageProvider}
            ></Route>
          </Switch>
        </div>
      </div>
    )
  }
}
