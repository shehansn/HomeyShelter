import React, { useContext, useState } from 'react'
import { ChatContext } from '../../../context/ChatContext';
import { GrAttachment } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import {
    arrayUnion, doc, Timestamp, orderBy, query, setDoc, onSnapshot,
    updateDoc, serverTimestamp, where, getDoc
} from "firebase/firestore";
import { firestore } from "../../../firebase.config";
import { storage } from "../../../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Input() {
    const { data } = useContext(ChatContext);
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [text, setText] = useState("")
    const [Img, setImg] = useState(null)


    const handleSend = async () => {
        if (Img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, Img);

            uploadTask.on(
                (error) => {
                    //Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(firestore, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                    setImg(null);
                }

            );
        } else {
            await updateDoc(doc(firestore, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(firestore, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(firestore, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    }

    return (

        <div className='flex'>
            <div className='flex w-full bg-gray-300 py-2 px-2 rounded-xl'>
                <label className=" items-center mt-5">
                    <div className="">
                        <GrAttachment className="text-gray-500 text-2xl hover:text-gray-700" />
                    </div>
                    <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        className="w-0 h-0"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </label>
                <input
                    class="w-full bg-gray-300 px-5 mr-2 ml-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <AiOutlineSend onClick={handleSend} className=' text-gray-500 text-3xl hover:text-gray-700  mt-5' />
            </div>

        </div>
    )
}

export default Input
