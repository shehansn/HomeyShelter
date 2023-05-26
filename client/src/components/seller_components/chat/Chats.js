import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../../context/ChatContext';
import {
    collection, doc, getDocs, orderBy, query, setDoc, onSnapshot,
    updateDoc, serverTimestamp, where, getDoc
} from "firebase/firestore";
import { firestore } from "../../../firebase.config";

function Chats() {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = () => {
            const current = onSnapshot(doc(firestore, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                current();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const { dispatch } = useContext(ChatContext);

    const handleSelect2 = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });

    };
    const { data } = useContext(ChatContext);

    return (
        <div>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                    className="userChat cursor-pointer hover:bg-gray-300"
                    key={chat[0]}
                    onClick={() => handleSelect2(chat[1].userInfo)}
                >
                    {/* <img src={chat[1].userInfo.photoURL} alt="" />
                                    <div className="userChatInfo">
                                        <span>{chat[1].userInfo.displayName}</span>
                                        <p>{chat[1].lastMessage?.text}</p>
                                    </div> */}

                    <div class="flex flex-row py-4 px-2 items-center border-b-2">
                        <div class="w-1/4">
                            <img
                                src={chat[1].userInfo.photoURL}
                                class="object-cover h-12 w-12 rounded-full"
                                alt=""
                            />
                        </div>
                        <div class="w-full">
                            <div class="text-lg font-semibold">{chat[1].userInfo.displayName}</div>
                            <span class="text-gray-500">{chat[1].lastMessage?.text}</span>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Chats
