import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { fetchCart } from "../../utils/fetchLocalStorageData";
let items = [];

function Notification({ item, setFlag, flag }) {
  const [qty, setQty] = useState(0);
  const [{ notificationShow, orders, user, workItems }, dispatch] = useStateValue();
  const [workItemData, setWorkItemData] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);

  const orderID = item.orderId
  const workItemID = item.workItemID

  const orderUserEmail = item.userDetails.email
  console.log("order user email", orderUserEmail)

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserEmail = currentUser.email
  console.log("currentUserEmail user email", currentUserEmail)

  useEffect(() => {
    if (orderUserEmail === currentUserEmail) {
      const workItemData = workItems?.filter(item => item.id === workItemID);
      setWorkItemData(workItemData)
      console.log("work item from notification", workItemData)

      let total = 0
      {
        item.items.forEach((item1) => {
          //setTotalPrice(parseInt(totalPrice) + parseFloat(item1.Price))
          total = total + parseFloat(item1.Price)
          console.log("item1.price", item1.Price)
          console.log("total.price", total)
        })
      }
      setTotalPrice(total)
    }

  }, []);



  return (
    <div>
    
          <div className="w-full p-1 px-2 rounded-lg bg-gray-100 flex items-center gap-2">
            <img
              src={workItemData?.imageURL}
              className="w-20 h-20 max-w-[60px] rounded-full object-contain"
              alt="item image"
            />

            {/* name section */}
            <div className="flex flex-col gap-2">
              <p className="text-base text-gray-900">{workItemData?.id}</p>
              <p className="text-sm block text-gray-900 font-semibold">
                LKR {totalPrice}
              </p>
              <p className="text-sm block text-gray-900 font-semibold"> {workItemData && <p>You have Created new order.</p>}</p>
            </div>

            {/* button section */}
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">


              <p className="w-5 h-5 rounded-sm bg-gray-100 text-gray-900 flex items-center justify-center">
                New
              </p>

            </div>
          </div>
        
     

    </div>
  )
}

export default Notification
