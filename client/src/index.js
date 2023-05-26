import React from "react";
import ReactDOM from "react-dom";
import './index.css';

import { BrowserRouter as Router } from "react-router-dom";

import App from './App';
import { StateProvider } from "./context/StateProvider";
import { ChatContextProvider } from "./context/ChatContext";

import { initialState } from "./context/initalState";
import reducer from "./context/reducer";

ReactDOM.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}> 
    <ChatContextProvider>
    <App />
    </ChatContextProvider>
     </StateProvider>
  </Router>,
  document.getElementById("root")
);