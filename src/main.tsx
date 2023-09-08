import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import App from "./App1.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
