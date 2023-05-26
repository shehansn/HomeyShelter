import { motion } from 'framer-motion';
import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
// images
import Avatar from "../../images/account_avatar.png";
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import {
    collection, doc, getDocs, orderBy, query, setDoc, onSnapshot,
    updateDoc, serverTimestamp, where, getDoc
} from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { ChatContext } from "../../context/ChatContext";
import Chats from './chat/Chats';
import Chat from './chat/Chat';
import ChatHeader from './chat/chatHeader';
import Input from './chat/Input';


const ChatPage = ({ props }) => {

    const [userInfo, setUserInfo] = useState('')
    const [taskerInfo, setTaskerInfo] = useState('')

    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        console.log("userinfo", userInfo);
        setUserInfo(userInfo);
        //handleLoad();
    }, []);

    useEffect(() => {
        filterUserData();

    }, []);

    const filterUserData = async () => {
        const data = workItems?.filter(workItem => workItem.id === id);
        console.log("data", data);
        console.log("data useremail", data[0]?.userEmail);
        // getall taskers
        const taskers = await getDocs(
            query(collection(firestore, "taskerInfo"))
        );
        const taskersinfo = taskers.docs.map((doc) => doc.data());

        const taskerData = taskersinfo?.filter(userinfo => userinfo.email === data[0]?.userEmail);
        console.log("taskerinfo filterUserData", taskersinfo);
        console.log("taskerData filterUserData", taskerData);
        setTaskerInfo(taskerData)
        console.log("taskerData uid filterUserData", taskerData[0]?.uid);

        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > taskerData[0]?.uid
                ? currentUser.uid + taskerData[0]?.uid
                : taskerData[0]?.uid + currentUser.uid;
        try {

            const res = await getDoc(doc(firestore, "chats", combinedId));
            console.log("response after loading page filterUserData", res)

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(firestore, "chats", combinedId), { messages: [] });
                console.log("chats setted filterUserData")
                console.log("currentUser id filterUserData", currentUser.uid)
                console.log("User taskerinfo id filterUserData", taskerData[0]?.uid)
                console.log("combinedId id filterUserData", combinedId)
                //create user chats
                await updateDoc(doc(firestore, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: taskerData[0]?.uid,
                        displayName: taskerData[0]?.displayName,
                        photoURL: taskerData[0]?.photoURL,
                        email: taskerData[0]?.email,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                console.log("currentUser updated filterUserData ")
                await updateDoc(doc(firestore, "userChats", taskerData[0]?.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        email: currentUser.email,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                console.log("User updated filterUserData")

            }
            console.log("end of filteruserdata function filterUserData");
        } catch (err) { }
    }

    //const params = useParams()
    const { id } = useParams();
    console.log("id", id);

    const [{ workItems, users }, dispatch] = useStateValue();

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);



    const handleSearch = async () => {
        // const q = query(onSnapshot(firestore, "users"), where("displayName", "==", username)
        // );
        // console.log("handle search", q)
        const usersRef = collection(firestore, "users");
        console.log(" usersRef", usersRef)
        // Create a query against the collection.
        const q = query(usersRef, where("displayName", "==", username));
        console.log("query usersRef", q)

        // const q2 = onSnapshot(doc(firestore, "users"), where("displayName", "==", username));
        // console.log("handle search2", q2)

        setUser(null)
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                console.log("user doc data", doc.data())
            });
        } catch (err) {
            setErr(true);
        }

    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        console.log("clicked on user")
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {

            const res = await getDoc(doc(firestore, "chats", combinedId));
            console.log("response after clicked on user", res)

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(firestore, "chats", combinedId), { messages: [] });
                console.log("chats setted")
                console.log("currentUser id", currentUser.uid)
                console.log("User id", user.uid)
                console.log("combinedId id", combinedId)
                //create user chats
                await updateDoc(doc(firestore, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        email: user.email,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                console.log("currentUser updated")
                await updateDoc(doc(firestore, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        email: currentUser.email,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                console.log("User updated")

            }
        } catch (err) { }

        setUser(null);
        setUsername("")
    };

    const [chats, setChats] = useState([]);

    const handleLoad = async () => {
        console.log("run when enter to page")      //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > taskerInfo[0]?.uid
                ? currentUser.uid + taskerInfo[0]?.uid
                : taskerInfo[0]?.uid + currentUser.uid;
        try {

            const res = await getDoc(doc(firestore, "chats", combinedId));
            console.log("response after load  chat page", res)

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(firestore, "chats", combinedId), { messages: [] });
                console.log("chats setted")
                console.log("currentUser id", currentUser.uid)
                console.log("taskerInfo id", taskerInfo[0]?.uid)
                console.log("combinedId id", combinedId)
                //create user chats
                await updateDoc(doc(firestore, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: taskerInfo[0]?.uid,
                        displayName: taskerInfo[0]?.displayName,
                        photoURL: taskerInfo[0]?.photoURL,
                        email: taskerInfo[0]?.email,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                console.log("currentUser updated")
                await updateDoc(doc(firestore, "userChats", taskerInfo[0]?.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        email: currentUser.email,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                console.log("User updated")
console.log("end of handleLoad function")
            }
        } catch (err) { }

        setUser(null);
        setUsername("")
    };



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



    return (
        <div className=' bg-gray-100 mt-4'>
            <section className="w-full  ml-10">
                <span className="text-2xl font-semibold p-4 capitalize text-headingColor ">
                    <h1 className='text-left'>Chat With Buyers </h1>

                </span>

            </section>
            {/* <!-- component -->
            <!-- This is an example component --> */}
            <div class="container mx-auto shadow-lg rounded-lg">
                {/* <!-- headaer --> */}
               <ChatHeader/>
                {/* <!-- end header -->
                 <!-- Chatting --> */}
                <div class="flex flex-row justify-between bg-white">
                    {/* <!-- chat list --> */}
                    <div class="flex flex-col w-3/5 border-r-2 overflow-y-auto ">
                        {/* <!-- search compt --> */}
                        <div class="border-b-2 py-4 px-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                                onKeyDown={handleKey}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                        {/* <!-- end search compt -->
                        <!-- user list --> */}
                        {err && <span>User not found!</span>}
                        {user && (
                            <div class="userChat flex flex-row py-4 px-2 items-center border-double border-4 border-indigo-600 " onClick={handleSelect}>
                                <div class="w-1/4">
                                    <img
                                        src={user?.photoURL}
                                        class="object-cover h-12 w-12 rounded-full"
                                        alt=""
                                    />
                                </div>
                                <div class="w-full">
                                    <div class="text-lg font-semibold">{user?.displayName}</div>
                                    <span class="text-gray-500">{user?.email}</span>
                                </div>
                            </div>
                        )}

                         <div
                            class="flex flex-row py-4 px-2 justify-center items-center border-b-2"
                        >
                            <div class="w-1/4">
                                <motion.img whileTap={{ scale: 0.6 }}
                                    src={taskerInfo ? taskerInfo[0]?.photoURL : Avatar}
                                    className="w-12 min-w-[40px] h-12 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                                    alt="userprofile"

                                />
                            </div>
                            <div class="w-full">
                                <div class="text-lg font-semibold">{taskerInfo[0]?.email}</div>
                                <span class="text-gray-500">{taskerInfo[0]?.uid}</span>
                                <p>chat with tasker. this is sample</p>
                            </div>
                        </div>  

                        <Chats />

                      

                        {/* <!-- end user list --> */}
                    </div>
                    {/* <!-- end chat list -->
                    <!-- message --> */}
                    <div class="w-full px-5 flex flex-col justify-between">
                        <div class="flex flex-col mt-5">

                            <Chat/>
                        </div>
                        
                        <div class="py-5">
                           <Input/>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default ChatPage
