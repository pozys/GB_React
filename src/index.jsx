import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import { BrowserRouter } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MainLayout } from "@components"

import "./index.css"

const lightheme = createMuiTheme({
  palette: {
    type: "light",
  },
})

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={lightheme}>
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root"),
)
