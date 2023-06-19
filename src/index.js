import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import allReducers from "./store/reducers";
import ReactDOM from "react-dom/client";
import rootSaga from "./store/rootSaga";
import { Provider } from "react-redux";
import React from "react";
import App from "./App";



/* logger */
var logger = createLogger();

/* saga */
const sagaMiddleware = createSagaMiddleware();

/* middleware */
const middleware = [sagaMiddleware];

/* store */
const store = createStore(allReducers,{},composeWithDevTools(applyMiddleware(...middleware)));

/* run saga */
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
