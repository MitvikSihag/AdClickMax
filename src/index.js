import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import store from "./store"; // Redux store
import App from "./App"; // Main App component
import "./index.css"; // Global CSS (optional)

// Get the root element from your HTML
const rootElement = document.getElementById("root");

// Create the root with ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Wrap the app with BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
