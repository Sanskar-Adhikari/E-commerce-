import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


// Create a root for rendering React content to the DOM using createRoot method from ReactDOM package
const root = ReactDOM.createRoot(document.getElementById("root"));

// Set options for the alert component
const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE,
};

// Render the app using the root created above and wrap it in the Redux store provider and the react-alert provider
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
