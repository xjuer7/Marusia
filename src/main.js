import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Provider } from "react-redux";
import store from './store/index.tsx';
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
