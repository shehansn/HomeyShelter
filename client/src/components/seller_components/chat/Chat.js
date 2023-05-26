import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../context/ChatContext';
import {
    collection, doc, getDocs, orderBy, query, setDoc, onSnapshot,
    updateDoc, serverTimestamp, where, getDoc
} from "firebase/firestore";
import { firestore } from "../../../firebase.config";
import Message from "./Message";
function Chat() {

    useEffect(() => {
        //const { data } = useContext(ChatContext);
        console.log("data from chat", data)

    }, []);

    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(firestore, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    console.log("messages", messages)

    return (
        <div>
            {messages.map((m) => (
                <Message message={m} key={m.id}/>
            ))}

        </div>
    )
}

export default Chat
