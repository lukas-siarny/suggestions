import React from "react";
import ReactDOM from "react-dom";
//import "./styles/css/index.css";
import GlobalStyle from "./globalStyles.js";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
