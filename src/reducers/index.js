import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import chatReducer from "./chatReducer"
import contextMenuReducer from "./contextMenuReducer"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    chatReducer,
    contextMenuReducer,
  })
