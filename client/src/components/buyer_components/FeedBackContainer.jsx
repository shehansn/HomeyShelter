import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { AiOutlineDown } from "react-icons/ai";
import { getAllFeedbacks, saveFeedbackDb } from "../../utils/firebaseFunctions";
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { useParams } from 'react-router-dom';


const FeedBackContainer = () => {

    const { id } = useParams();
    console.log(id);

    const [{ workItems, taskerInfo,seller, user ,feedbacks}, dispatch] = useStateValue();

    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(currentUser)
    const currentUserEmail = currentUser.email
    const currentUserImage = currentUser.photoURL

    const [formData, setFormData] = useState({
        currentUserEmail: currentUserEmail,
        currentUserImage:currentUserImage,
        date: serverTimestamp(),
    });

    

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value

        });
    }
    console.log(formData)

    const saveFeedback = () => {
        saveFeedbackDb(formData)  
        setFormData(null)   
        scrollToTop()
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

  useEffect(() => {
    getFeedbacks();
    if (id){
        setFormData({
            ...formData,
           itemId: id

        });
    }
    
  }, []);

  const getFeedbacks = async () => {
    await getAllFeedbacks().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FEEDBACKS,
        feedbacks: data,
      });
    });
  };

    return (
        <div>
            <div className="bg-gray-100 px-6 sm:py-24 lg:px-8 rounded-lg">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Send us your valuable feedback</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Write your experience with Homeshelter website and how Taskers helpfull to you..
                    </p>
                </div>
                <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="occupation" className="block text-sm font-semibold leading-6 text-gray-900">
                                occupation
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="occupation"
                                    id="occupation"
                                    autoComplete="occupation"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                Phone number
                            </label>
                            <div className="relative mt-2.5">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <label htmlFor="phone" className="sr-only">
                                        Phone Number
                                    </label>
                                    <select
                                        id="phone"
                                        name="phone"
                                        className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-5 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm"
                                        disabled="true"

                                    >
                                        <option>+94</option>

                                    </select>

                                </div>
                                <input
                                    type="tel"
                                    name="phone-number"
                                    id="phone-number"
                                    autoComplete="tel"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mt-10">
                        <button
                            type="button"
                            className="block w-full rounded-md bg-teal-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                            onClick={saveFeedback}
                        >
                            Send Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FeedBackContainer
