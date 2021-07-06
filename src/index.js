import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/css/index.css";
import App from "./App";
import MainStore from "./stores/MainStore";
import { MainStoreContext } from "./contexts/mainStoreContext";
import FirebaseService from "./services/FirebaseService";

const firebaseService = new FirebaseService();
const { authStore, userRequestStore, userStore } = new MainStore(firebaseService);

ReactDOM.render(
    <MainStoreContext.Provider value={{ authStore, userRequestStore, userStore }}>
        <App />
    </MainStoreContext.Provider>,
    document.getElementById("root")
);
