import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MainLayout } from "@components"
import initStore from "./utils/store"

import "./index.css"

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
})

ReactDOM.render(
  <Provider store={initStore()}>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root"),
)
