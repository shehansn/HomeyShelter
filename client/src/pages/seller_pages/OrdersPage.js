import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Orders = () => {
  const [{ notificationShow, orders, user, workItems }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [orderItems, setOrderItems] = useState("");

  const [workItemsID, setWorkItemsID] = useState([]);
  const [filteredWorkItems, setFilteredWorkItems] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserEmail = currentUser.email

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
      <div className="bg-white">
        <div className="py-10 sm:py-10">
          <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
            <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">ALL ORDERS</h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the orders and complete works
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="sr-only">Recent orders</h2>
            <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">

              <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">

                <div

                  className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border">
                  <h3 className="sr-only">
                    Order placed on
                  </h3>
                  {filteredOrders.map((item) => (
                    <div>
                      <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
                        <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                          <div>
                            <dt className="font-medium text-gray-900">Order Number</dt>
                            <dd className="mt-1 text-gray-500">{item.orderId}</dd>
                          </div>
                          {/* <div className="hidden sm:block">
                            <dt className="font-medium text-gray-900">Date placed</dt>
                            <dd className="mt-1 text-gray-500">

                            </dd>
                          </div> */}
                          <div>
                            <dt className="font-medium text-gray-900">Total amount</dt>
                            <dd className="mt-1 font-medium text-gray-900">{item.total}</dd>
                          </div>
                        </dl>

                        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                          <a className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            <span>View Order</span>
                            <span className="sr-only">{item.orderId}</span>
                          </a>
                          <a

                            className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          >
                            <span>View Invoice</span>
                            <span className="sr-only">for order {item.orderId}</span>
                          </a>
                        </div>
                      </div>


                      <h4 className="sr-only" > Items</h4>
                      {workItems.filter((item3) => item3.id === item.workItemID).map((item3) => (
                        <ul role="list" className="divide-y divide-gray-200 ">

                          <li className="p-4 sm:p-6 flex justify-between">
                            <div className="flex items-center sm:items-start">
                              <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                                <img
                                  src={item3.imageURL}
                                  alt={"product.imageAlt"}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>
                              <div className="flex-1 ml-6 text-sm">
                                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                  <h5>{item3.title}</h5>
                                  <p className="mt-2 sm:mt-0"></p>
                                </div>
                                <p className="hidden text-gray-500 sm:block sm:mt-2">{item3.description}</p>
                              </div>

                            </div>
                            <div>
                            <div className="flex-1 ml-6 text-sm">
                                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                  <h5>{item.userDetails.lastName}</h5>
                                  <p className="mt-2 sm:mt-0"></p>
                                </div>
                                <p className="hidden text-gray-500 sm:block sm:mt-2">{item.userDetails.streetAddress}</p>
                                <p className="hidden text-gray-500 sm:block sm:mt-2">{item.userDetails.city}</p>
                                <p className="hidden text-gray-800 sm:block sm:mt-2">{item.userDetails.email}</p>
                                <p className="hidden text-gray-800 sm:block sm:mt-2">{item.userDetails?.phoneNumber}</p>
                              </div>
                            </div>

                          </li>

                        </ul>

                      ))}
                      <div className="p-4 sm:p-6" >
                        {item.items.map((item2) => (
                          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                             <li className="text-gray-400"><span className="text-gray-600">{item2.Name} : {item2.Price} LKR</span></li>


                          </ul>
                        ))}
                      </div>


                      <div className="mt-6 sm:flex sm:justify-between border-b">
                        <div className="flex items-center">
                          {/* <p className="ml-2 text-sm font-medium text-gray-500">
                                    Delivered on
                                  </p> */}
                        </div>

                        <div className="border-t border-gray-200 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                          <div className="flex-1 flex justify-center p-2">
                            <a

                              className="text-teal-600 whitespace-nowrap hover:text-teal-500"
                            >
                              View Work Item
                            </a>
                          </div>
                          <div className="flex-1 pl-4 flex justify-center p-2">
                            <a href="#" className="text-teal-600 whitespace-nowrap hover:text-teal-500">
                              Buy again
                            </a>
                          </div>
                        </div>
                      </div>



                    </div>

                  ))}



                </div>

              </div>


            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

export default Orders
