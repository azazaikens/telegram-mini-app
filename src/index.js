import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { Buffer } from "buffer";

// @ts-ignore
window.Buffer = Buffer;

const telegram = window.Telegram.WebApp;
telegram.ready();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);