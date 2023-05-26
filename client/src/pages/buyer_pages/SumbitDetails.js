import React from 'react'
import { useState } from 'react';
import { serverTimestamp } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';


function SumbitDetails() {

    // const [formData, SetFormData] = useState([]);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const data = Object.fromEntries(formData.entries());
    //     console.log(data); // do something with the data, such as send it to a server
    //     setFormData(data)
    // };

    const [formData, setFormData] = useState({
        province:"Central",
        date: serverTimestamp(),
    });

    function handleChange(e) {         
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    console.log(" formData",formData)

    const [{ workItems, users,orderInformation,buyerInformation }, dispatch] = useStateValue();

    // useEffect(() => {
    //     dispatch({
    //       type: actionType.SET_BUYER_INFORMATION,
    //       buyerInformation: formData,
    //     });
    //   }, []);

      
  const handleSubmitData = () => {
    dispatch({
      type: actionType.SET_BUYER_INFORMATION,
      buyerInformation: formData,
    });
  }

  function scrollToTop() {
    window.scrollTo(0, 0);
  }
    return (
        <div className='p-10'>
            <form>
                <div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Really helpfull for reach you easily.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}

                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phoneNumber"
                                        type="tel"
                                        autoComplete="phone"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}

                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Province
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="province"
                                        name="province"
                                        autoComplete="province-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}
                                        disabled='true'
                                    >
                                        <option>Central</option>
                                        <option>Eastern</option>
                                        <option>North Central</option>
                                        <option>Northern</option>
                                        <option>North Western</option>
                                        <option>Sabaragamuwa</option>
                                        <option>Southern</option>
                                        <option>Uva</option>
                                        <option>Western</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        id="streetAddress"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            {/* <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}
                                  />
                                </div>
                            </div> */}

                            <div className="sm:col-span-2">
                                <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="postalCode"
                                        id="postalCode"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Link to={"/"}  onClick={scrollToTop}>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    </Link>
                    <Link to={"/payment"}  onClick={scrollToTop}>
                        <button
                            type="button"
                            className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                       onClick={handleSubmitData}
                       >
                            Next
                        </button>
                    </Link>
                </div>

            </form>
        </div>

    )
}

export default SumbitDetails
