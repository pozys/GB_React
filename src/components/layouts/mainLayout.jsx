import React from "react"
import { Header, MessageProvider } from "@components"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { Route, Switch } from "react-router-dom"

export class MainLayout extends React.Component {
  render() {
    return (
      <>
        <Container style={{ height: "100%" }}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
            style={{ height: "100%" }}
          >
            <Grid item>
              <Header />
            </Grid>
            <Switch>
              <Route
                path={["/chat/:id/", "/"]}
                component={MessageProvider}
              ></Route>
            </Switch>
          </Grid>
        </Container>
      </>
    )
  }
}
