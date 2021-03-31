import React from "react";
import ReactDOM from "react-dom";
import { MainLayout } from "@components";
import { MuiThemeProvider } from "@material-ui/core/styles";

import "./index.css";

ReactDOM.render(
  <MuiThemeProvider>
    <MainLayout />
  </MuiThemeProvider>,
  document.getElementById("root")
);
