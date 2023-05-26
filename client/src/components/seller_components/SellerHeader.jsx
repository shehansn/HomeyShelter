import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";

// images
import Logo from "../../images/logo.png";
import Avatar from "../../images/account_avatar.png";

// icons
import {  MdAdd, MdLogout, MdEmail, MdNotifications  } from "react-icons/md";
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

const SellerHeader = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, favSectionShow, cartShow, cartItems, favItems, seller,notificationShow }, dispatch] = useStateValue();
    const [isMenuSeller, setIsMenuSeller] = useState(false);

    const showMenu = () => {
        setIsMenuSeller(!isMenuSeller)
    }

    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
        } else {
            setIsMenuSeller(!isMenuSeller);
        }
    };

    const logout = () => {
        console.log("logout clicked")
        setIsMenuSeller(false);
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null,
        });

    }


    const ShowSellerDashboard = () => {
        dispatch({
            type: actionType.SET_SELLER,
            seller: !seller,
        });
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    const showNotifications = () => {
        dispatch({
            type: actionType.SET_NOTIFICATION_SHOW,
            notificationShow: !notificationShow,
        });
    };

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 shadow-md bg-slate-50">
            {/* desktop web & tablet web */}
            <div className="hidden lg:flex w-full h-full items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-20 object-cover" alt="logo" />
                    <p className="text-headingColor text-xl font-bold">seller header</p>
                </Link>
                <div className="flex items-center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-5 ml-auto">
                        {/* <Link to={"/"} >
                            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                Dashboard
                            </li>
                        </Link> */}
                        <Link to={'/orders'}>
                            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                Orders
                            </li>
                        </Link>
                        <Link to={"/workItems"} >
                            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                Work Items
                            </li>
                        </Link>
                        <Link to={'/'}>
                            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                                onClick={ShowSellerDashboard}
                            >    Switch Back
                            </li>
                        </Link>

                    </motion.ul>

                    {/* notification icon */}
                     <div className="relative flex items-center justify-center cursor-pointer" onClick={showNotifications}>
                        <MdNotifications className="text-textColor text-2xl cursor-pointer" />

                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">
                                3
                            </p>
                        </div>

                    </div> 

                    {/* message icon */}
                    <Link to={"/chatBuyer"} >
                    <div className="relative flex items-center justify-center cursor-pointer">
                        <MdEmail className="text-textColor text-2xl cursor-pointer" />

                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">
                                6
                            </p>
                        </div>

                    </div>
                    </Link>

                    {/* account avatar */}
                    <div className="relative">
                        <motion.img whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                            alt="userprofile"
                            onClick={login}
                        />

                        {isMenuSeller && user && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 p-2"

                            >

                                <p onClick={logout} className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base">
                                    Logout <MdLogout />
                                </p>

                            </motion.div>
                        )}
                    </div>



                </div>
            </div>

            {/* mobile web */}
            <div className="flex items-center justify-between lg:hidden w-full h-full ">
                <div
                    className="relative flex items-center justify-center" onClick={showCart}>
                    <MdEmail className="text-textColor text-2xl  cursor-pointer" />

                    <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-teal-200 flex items-center justify-center">
                        <p className="text-xs text-white font-semibold">
                            2
                        </p>
                    </div>

                </div>

                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-8 object-cover" alt="logo" />
                    <p className="text-headingColor text-xl font-bold"> HomeyShelter seller</p>
                </Link>

                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                        alt="userprofile"
                        onClick={showMenu}
                    />
                    {isMenuSeller && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">

                            <ul className="flex flex-col ">
                                <li
                                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setIsMenuSeller(false)}>
                                    Dashboard
                                </li>
                                <li
                                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setIsMenuSeller(false)}>
                                    Orders
                                </li>
                                <li
                                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                    onClick={() => setIsMenuSeller(false)}>
                                    Work Items
                                </li>
                                <li>
                                    <Link to={"/createItem"}>
                                        <p onClick={() => setIsMenuSeller(false)} className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                                            Add Service <MdAdd />
                                        </p>
                                    </Link>
                                </li>


                            </ul>

                            <p
                                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                                onClick={logout}>
                                Logout <MdLogout />
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

        </header>
    )
}

export default SellerHeader
