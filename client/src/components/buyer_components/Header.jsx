import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";
import { collection, doc, getDocs, orderBy, query, setDoc, } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { saveUsers } from "../../utils/firebaseFunctions";

// images
import Avatar from "../../images/account_avatar.png";

// icons
import { MdLogout, MdEmail, MdNotifications } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { UseChangeUser } from '../../context/Functions';

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, favSectionShow, cartShow, cartItems, favItems, seller, orders, notificationShow }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));

            console.log("users from header", JSON.stringify(providerData[0]))
            const userdetails = JSON.stringify(providerData[0])
            await saveUsers()
            console.log("users from header2", userdetails)

        } else {
            setIsMenu(!isMenu);
        }
    };

    const logout = () => {
        console.log("logout clicked")
        setIsMenu(false);
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null,
        });

        UseChangeUser()

    }


    const showFavSection = () => {
        dispatch({
            type: actionType.SET_FAV_SECTION_SHOW,
            favSectionShow: !favSectionShow,
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

    const ShowSellerDashboard = () => {
        dispatch({
            type: actionType.SET_SELLER,
            seller: !seller,
        });
    };
    function scrollToTop() {
        window.scrollTo(0, 0);
      }

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 shadow-md bg-gray-50">

            {/* desktop web & tablet web */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={"/"} onClick={scrollToTop} className="">
                    {/* <img src={Logo} className="w-20 object-cover" alt="logo" /> */}

                    <p className="text-headingColor text-xl lg:text-[1.5rem] font-bold">
                        <span className="text-teal-600 text-[1.5rem] lg:text-[2.5rem]">
                            H
                        </span> omeyShelter</p>
                </Link>
                <div className="flex items-center gap-8 ">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-8 ml-auto">
                        <Link to={'/'} onClick={scrollToTop}>
                            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                Home
                            </li>
                        </Link>

                        <Link to={'/aboutUs'} onClick={scrollToTop}>
                            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                About Us
                            </li>
                        </Link>
                        <Link to={"/services"} onClick={scrollToTop}>
                            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                Services
                            </li>
                        </Link>
                        <Link to={'/'} onClick={scrollToTop}>
                            <li className="text-lg outline outline-offset-4 outline-teal-600 hover:outline-teal-800 outline-2 p-1 rounded-lg text-teal-800 font-normal hover:text-teal-600 duration-100 transition-all ease-in-out cursor-pointer"
                                onClick={ShowSellerDashboard}
                            >
                                Become a Tasker

                            </li>
                        </Link>
                    </motion.ul>

                    {/* <div className="relative flex items-center justify-center cursor-pointer" onClick={showFavSection}>
                        <MdOutlineFavorite className="text-textColor text-2xl cursor-pointer" />
                        {favItems && favItems.length > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {favItems.length}
                                </p>
                            </div>
                        )}


                    </div> */}
                    {/* notification icon */}
                    <div className="relative flex items-center justify-center cursor-pointer" onClick={showNotifications}>
                        <MdNotifications className="text-textColor text-2xl cursor-pointer" />
                        {user && orders && orders.length > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {orders.length}
                                </p>
                            </div>
                        )}
                    </div>
                    {/* message icon */}
                    {/* <div className="relative flex items-center justify-center cursor-pointer">
                        <MdEmail className="text-textColor text-2xl cursor-pointer" />

                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">
                                6
                            </p>
                        </div>

                    </div> */}
                    {/* cart icon */}
                    {/* <div className="relative flex items-center justify-center cursor-pointer" onClick={showCart}>
                        <GiShoppingBag className="text-textColor text-2xl cursor-pointer" />
                        {cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}


                    </div> */}

                    {/* account avatar */}
                    <div className="relative">
                        <motion.img whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                            alt="userprofile"
                            onClick={login}
                        />
                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 p-2">

                                <p onClick={logout} className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base">
                                    Logout <MdLogout />
                                </p>

                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* mobile web */}
            <div className="flex items-center justify-between md:hidden w-full h-full ">
                {/* notification icon */}
                <div className="relative flex items-center justify-center cursor-pointer" onClick={showNotifications}>
                    <MdNotifications className="text-textColor text-2xl cursor-pointer" />
                    {user && orders && orders.length > 0 && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-300 flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">
                                {orders.length}
                            </p>
                        </div>
                    )}
                </div>
                <Link to={"/"} onClick={scrollToTop} className="flex items-center gap-2">
                    {/* <img src={Logo} className="w-8 object-cover" alt="logo" /> */}
                    <p className="text-headingColor text-xl font-bold">
                        <span className="text-teal-600 text-[1.5rem] lg:text-[2.5rem]">
                            H
                        </span> omeyShelter</p>
                </Link>

                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                        alt="userprofile"
                        onClick={login}
                    />
                    {isMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">

                            <ul className="flex flex-col ">
                                <Link to={'/'} onClick={scrollToTop}>
                                    <li
                                        className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}>
                                        Home
                                    </li>
                                </Link>

                                <Link to={'/aboutUs'} onClick={scrollToTop}>
                                    <li
                                        className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}>
                                        About Us
                                    </li>
                                </Link>
                                <Link to={'/services'} onClick={scrollToTop}>
                                    <li
                                        className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}>
                                        Services
                                    </li>
                                </Link >
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

export default Header
