import { createBrowserHistory } from "history"
import { applyMiddleware, compose, createStore } from "redux"
import { routerMiddleware } from "connected-react-router"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"
import middlewares from "../middlewares"
import initReducers from "./../reducers"

const persistConfig = {
  key: "pozys_chat",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["chatReducer"],
}

export const history = createBrowserHistory()

function initStore() {
  const innitialStore = { chats: [], dialogOpened: false }
  const store = createStore(
    persistReducer(persistConfig, initReducers(history)),
    innitialStore,
    compose(
      applyMiddleware(routerMiddleware(history), ...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : () => {},
    ),
  )
  const persistor = persistStore(store)

  return { store, persistor }
}

export default initStore
