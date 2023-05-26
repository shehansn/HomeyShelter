import { Avatar } from '@mui/material';
import React from 'react'
import { MdPeopleOutline, MdOutlineArrowUpward } from "react-icons/md";

const TotalCustomers = () => {
    return (
        <div className="max-w-sm h-48 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="mb-3 font-semibold text-gray-500"> TOTAL CUSTOMERS</p>
            <span className="flex justify-between mb-4">
                <h2 className=' text-2xl font-semibold capitalize text-headingColor text-textPrimary' >1,6k </h2>
                <Avatar
                    sx={{
                        backgroundColor: '#14B8A6',
                        height: 56,
                        width: 56
                    }}
                >
                    <MdPeopleOutline />
                </Avatar>
            </span>


            <span className='flex justify-evenly'>
                <MdOutlineArrowUpward className='text-green-500 text-xl' />
                <p className='font-normal text-textPrimary' >16% {' '}</p>
                <p className="mb-3  text-gray-400  "> Since last month</p>

            </span>

        </div>

    )
}

export default TotalCustomers
