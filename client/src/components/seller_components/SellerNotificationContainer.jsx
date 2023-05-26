import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import Notification from "./SellerNotification";


function SellerNotificationContainer() {
 

  const [{ notificationShow, orders, user, workItems }, dispatch] = useStateValue();
  
  const showNotifications = () => {
    dispatch({
      type: actionType.SET_NOTIFICATION_SHOW,
      notificationShow: !notificationShow,
    });
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserEmail = currentUser.email
  console.log(workItems)
  
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [orderItems, setOrderItems] = useState("");

  const [workItemsID, setWorkItemsID] = useState([]);
  const [filteredWorkItems, setFilteredWorkItems] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);


  console.log("", workItems)
  useEffect(() => {
    const matchingItems = workItems.filter((item) => item.userEmail === currentUserEmail);
    const matchingItemIDs = matchingItems.map((item) => item.id);
    setFilteredWorkItems(matchingItems)
    setWorkItemsID(matchingItemIDs);

    const matchingOrders = orders.filter((item) => item.userDetails.email === currentUserEmail);
    const matchingOrderIDs = matchingItems.map((item) => item.workItemID);
    setFilteredOrders(matchingOrders);


  }, []);

  console.log("workItems 2 seller", workItemsID)
  console.log("filtered work items orders page seller", filteredWorkItems)
  console.log("filtered orders seller", filteredOrders)

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
      >

        <div className="w-full flex items-center justify-between p-4 cursor-pointer">
          <motion.div whileTap={{ scale: 0.75 }} onClick={showNotifications}>
            <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
          </motion.div>
          <p className="text-textColor text-lg font-semibold">Notifications</p>

          <motion.p
            whileTap={{ scale: 0.75 }}
            className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"

          >
            Clear <RiRefreshFill />
          </motion.p>
        </div>

        {/* bottom section */}
        {workItemsID && workItemsID.length > 0 && filteredOrders && filteredOrders.length > 0 ? (
          <div className="w-full h-full bg-gray-300 rounded-t-[2rem] flex flex-col">
            {/* cart Items section */}
            <div className="w-full h-full md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
              {/* cart Item */}
              {filteredOrders &&
                filteredOrders.length > 0 &&
                filteredOrders.map((item) => (
                  <Notification
                    key={item.id}
                    item={item}
                    setFlag={setFlag}
                    flag={flag}
                  />
                ))}
            </div>



          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <img src="" className="w-300" alt="empty notifications" />
            <p className="text-xl text-textColor font-semibold">
              You havent any notifications available
            </p>
          </div>
        )}

      </motion.div>
    </div>
  )
}

export default SellerNotificationContainer
