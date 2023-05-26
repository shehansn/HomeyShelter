import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { useState } from 'react';
import axios from "axios";

const baseURL = "http://localhost:8000/create-checkout-session";

function PaymentPage() {

  const [{ workItems, user, orderInformation, buyerInformation, itemID }, dispatch] = useStateValue();
  const [totalPrice, setTotalPrice] = useState(0);

  const [paymentData,setPaymentData]=useState(null)

  useEffect(() => {
    console.log("orderInformation", orderInformation)
    console.log("buyerInformation", buyerInformation)
    console.log("itemID", itemID)
    console.log("user",user)
    updateTotalPrice()
  }, []);

  
  // Define a function to update the total price state
  const updateTotalPrice = () => {
    let totalPrice = 0;
    orderInformation.forEach((item) => {
      totalPrice += parseFloat(item.Price);
    });
    setTotalPrice(totalPrice);
  };
 

  const handleCheckout =  () => {
    const data={
      user:user,
      userInformation:buyerInformation,
      orderItems:orderInformation,
      workItemID:itemID,
      total:totalPrice,
    }
    console.log("data",data)
    axios
      .post("http://localhost:8000/create-checkout-session",{data:data})
      .then((response) => {
        console.log("response",response)
        if(response.data.url){
          window.location.href = response.data.url
        }
        setPaymentData(response.data);
      }).catch((err)=>
      console.log("error from paymentPage",err)
      );
  }


  return (
    <div className='mt-5'>
      <div class="grid sm:px-10 items-center justify-center lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">Check your items working.</p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {orderInformation.map((item) => (


              <div class="flex flex-col rounded-lg bg-white sm:flex-row border border-b border-gray-300 ">
                <div class="flex w-full flex-col px-4 py-4">
                  <span class="font-semibold">{item.Name}</span>
                  <span class="float-right text-gray-400">42EU - 8.5US</span>
                  <p class="text-lg font-bold">{item.Price} LKR</p>
                </div>
              </div>
            ))}
            {/* <div class="flex flex-col rounded-lg bg-white sm:flex-row">
              <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
              <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                <span class="float-right text-gray-400">42EU - 8.5US</span>
                <p class="mt-auto text-lg font-bold">$238.99</p>
              </div>
            </div> */}
          </div>
        </div>


        <div class="mt-6 flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Total</p>
          <p class="text-2xl font-semibold text-gray-900">{totalPrice} LKR</p>
        </div>
        <button onClick={handleCheckout} class="mt-4 mb-8 w-full rounded-md bg-gray-900 hover:bg-teal-900 px-6 py-3 font-medium text-white">Place Order</button>

      </div>


    </div>
  )
}

export default PaymentPage
