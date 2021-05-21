import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/css/index.css";
import App from "./App";
import MainStore from "./stores/MainStore";
import { MainStoreContext } from "./contexts/mainStoreContext";
const store = new MainStore();

ReactDOM.render(
  <React.StrictMode>
    <MainStoreContext.Provider value={{ ...store }}>
      <App />
    </MainStoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
