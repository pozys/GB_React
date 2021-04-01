import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MainLayout } from "@components";
import { MuiThemeProvider } from "@material-ui/core/styles";

import "./index.css";

ReactDOM.render(
  <MuiThemeProvider>
    <CssBaseline />
    <MainLayout />
  </MuiThemeProvider>,
  document.getElementById("root")
);
