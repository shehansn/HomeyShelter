import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion";
import backImage from '../../images/electric2.png'
import NotFound from "../../images/NotFound.svg";
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { Link } from 'react-router-dom';
import WorkItem2 from './WorkItem2';

const RowContainer = ({ flag, data, scrollValue }) => {

    const rowContainer = useRef();

    const [cartitems, setcartItems] = useState([]);
    const [favitems, setfavItems] = useState([]);

    const [{ cartItems, favItems }, dispatch] = useStateValue();


    const addtocart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: cartitems,
        });
        localStorage.setItem("cartItems", JSON.stringify(cartitems));
    };

    const addtofav = () => {
        dispatch({
            type: actionType.SET_FAV_ITEMS,
            favItems: favitems,
        });
        localStorage.setItem("favItems", JSON.stringify(favitems));
    };
    useEffect(() => {
        addtofav();
    }, [favitems]);


    useEffect(() => {
        addtocart();
    }, [cartitems]);

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    function scrollToTop() {
        window.scrollTo(0, 0);
    }
    return (
        <div
            ref={rowContainer}
            className={`w-full flex items-center gap-3 bg-[#EFEFF4] my-12 scroll-smooth rounded-2xl 
        ${flag
                    ? "overflow-x-scroll scrollbar-none"
                    : "overflow-x-hidden flex-wrap justify-center"
                }`}
        >

            {data && data.length > 0 ? (
                data.map((item) => (

                  
                        <Link to={`/viewWorkItem/${item.id}`} onClick={scrollToTop} >
                            <div
                                key={item.id}
                                className=" ">
                                <WorkItem2 workitem={item} />
                            </div>





                            {/* <div>
                            <motion.div
                                className="w-full h-40 drop-shadow-2xl mt-1"
                                whileHover={{ scale: 1.2 }}
                            >
                                <img
                                    src={item.imageURL}
                                    alt="item image"
                                    className="w-full h-full object-fit rounded-lg"
                                />
                                <FcRating className='-mt-5 ml-1' />
                            </motion.div>
                        </div>
                        <div className="w-full flex items-center mt-2">

                            {/* <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full mr-2 bg-teal-200 flex items-center justify-center cursor-pointer hover:shadow-md "
                                onClick={() => setfavItems([...favItems, item])}

                            >
                                <MdOutlineFavorite className="text-red-500" />
                            </motion.div> */}

                            {/* <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center cursor-pointer hover:shadow-md "
                                onClick={() => setcartItems([...cartItems, item])}
                            >
                                <GiShoppingBag className="text-blue-500" />
                            </motion.div> */}
                            {/* </div>
                        <div className="w-full flex flex-col items-end justify-end ">
                            <p className="text-textColor font-semibold text-base md:text-lg">
                                {item?.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {item?.category} Category
                            </p>
                            <div className="flex items-center gap-8 mb-3">
                                <p className="text-lg text-headingColor font-semibold">
                                    <span className="text-sm text-teal-500">LKR</span> {item?.price}
                                </p>
                            </div>
                        </div> */}
                        </Link>
                    

                ))) : (
                <div className="w-full flex flex-col items-center justify-center">
                    <img src={NotFound} className="h-340" alt='not found content' />
                    <p className="text-xl text-headingColor font-semibold my-2">
                        Items Not Available
                    </p>
                </div>

            )}


        </div>

    )
}

export default RowContainer
