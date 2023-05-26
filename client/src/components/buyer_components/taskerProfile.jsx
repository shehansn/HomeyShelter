import React from 'react'
import { AiFillStar } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";

const TaskerProfile = () => {
    return (
        <div>
            <div class="wrapper max-w-sm h-[300px] antialiased text-gray-900 mb-20">
                <div>


                    <div class="w-full max-w-sm border bg-white border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                        <div class="grid grid-cols-1 divide-y">
                            <div className='flex  bg-[#F9F6EE]'>
                                <img class="w-20 h-20 m-5 rounded-full shadow-lg" alt="Bonnie image" />
                                <div className='flex flex-col'>
                                    <h5 class="mb-1 text-xl mt-5 font-medium text-gray-900 dark:text-white"></h5>
                                    <span class="text-md text-gray-500 dark:text-gray-400 flex">
                                        <AiFillStar className='text-xl text-yellow-400 mr-2' />
                                        98% user reviews
                                    </span>
                                    <span class="text-md text-gray-500 dark:text-gray-400 flex">
                                        <IoMdDoneAll className='text-xl text-green-400 mr-2' />
                                        200+ completed tasks
                                    </span>

                                </div>
                            </div>
                            <div className='ml-2 pt-2 pb-2 flex flex-col'>
                                <span class="text-lg text-gray-500 dark:text-gray-400 ">
                                    Featured Tasks
                                </span>
                                <div className='flex justify-between p-2'>
                                    <span class="text-base font-semibold text-gray-800 dark:text-gray-900 ">
                                        Plumbing
                                    </span>
                                    <span class="text-base font-semibold text-gray-800 dark:text-gray-900 ">
                                        price /hr
                                    </span>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <span class="text-base font-semibold text-gray-800 dark:text-gray-900 ">
                                        Electric
                                    </span>
                                    <span class="text-base font-semibold text-gray-800 dark:text-gray-900 ">
                                        /hr
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col ml-2 pt-2 mb-5'>
                                <span class="text-base font-bold text-gray-900 dark:text-gray-900 ">
                                    Description
                                </span>
                                <span class="text-sm text-gray-800 dark:text-gray-900 ">
                                    Description breif
                                </span>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>

    )
}

export default TaskerProfile
