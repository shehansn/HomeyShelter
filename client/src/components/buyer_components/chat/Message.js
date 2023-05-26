import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../../../context/ChatContext';

function Message({ message }) {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);


    console.log("message from Message", message)
    return (
        <div ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div class="flex justify-end mb-4">
                <div
                    class="mr-2 py-3 px-4 bg-teal-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                >
                    <p>{message.text}</p>
                    {message.img && <img src={message.img} alt="" class="object-cover h-32 w-32 rounded"/>}
                </div>
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser?.photoURL
                            : data.user?.photoURL
                    }
                    class="object-cover h-8 w-8 rounded-full"
                    alt=""
                />
            </div>
        </div>
    )
}

export default Message
