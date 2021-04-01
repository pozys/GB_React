import React from "react";
import { MessageField, ChatList, Header } from "@components";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

export class MainLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
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
            <Grid container direction="row" justify="space-between" lg={11}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="stretch"
                lg={2}
              >
                <Grid item>
                  <ChatList />
                </Grid>
              </Grid>

              <Grid
                container
                justify="space-around"
                alignItems="flex-end"
                lg={10}
              >
                <Grid item lg={12}>
                  <MessageField />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
