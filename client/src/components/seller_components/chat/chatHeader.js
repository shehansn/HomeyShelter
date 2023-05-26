import React, { useContext } from 'react'
import { motion } from 'framer-motion';
import { ChatContext } from '../../../context/ChatContext';
import Avatar from "../../../images/account_avatar.png";

function ChatHeader() {
    const { data } = useContext(ChatContext);
  return (
    <div>
       <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                    <div class="font-semibold text-2xl"> {data.chatUser?.email}</div>
                    {/* {data.chatUser?.displayName} {data.chatUser?.uid} */}
                    <div
                        class="h-16 w-16 rounded-full text-white font-semibold flex items-center justify-center"
                    >
                        <motion.img whileTap={{ scale: 0.6 }}
                            src={data.chatUser ? data.chatUser?.photoURL : Avatar}
                            className="w-12 min-w-[40px] h-12 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                            alt="userprofile"

                        />
                    </div>
                </div>
    </div>
  )
}

export default ChatHeader
