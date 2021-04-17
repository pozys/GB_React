import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import { ConnectedRouter } from "connected-react-router"
import { Provider } from "react-redux"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MainLayout, InstallPopup } from "@components"
import initStore, { history } from "./utils/store"

import "./index.css"

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
})

ReactDOM.render(
  <Provider store={initStore()}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <MainLayout />
        <InstallPopup />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root"),
)
