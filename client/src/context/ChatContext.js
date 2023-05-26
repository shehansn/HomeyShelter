import React from 'react'
import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  export const ChatContext = createContext();


  export const ChatContextProvider = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const INITIAL_STATE = {
      chatId: "null",
      chatUser: {},
    };
  
    const chatReducer = (state, action) => {
        console.log(action);
      switch (action.type) {
        case "CHANGE_USER":
          return {
            chatUser: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
                
          };
  
        default:
          return state;
      }
    };
  
    const [chatUserState , dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:chatUserState, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };
  
  