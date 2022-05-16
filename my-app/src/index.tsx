import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CustomRouter from "./customRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import customHistory from "./historyObject";
import { axiosMiddleware } from "./axiosMiddleware";
axiosMiddleware();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomRouter history={customHistory}>
        <App />
      </CustomRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
