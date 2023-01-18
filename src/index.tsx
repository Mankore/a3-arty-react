import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import GlobalStyle from "./styles/global";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>
);
