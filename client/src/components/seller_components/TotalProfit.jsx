import { Avatar } from '@mui/material'
import React from 'react'
import { AiOutlineLineChart } from 'react-icons/ai'

const TotalProfit = () => {
    return (
        <div className="max-w-sm h-48 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="mb-3 font-semibold text-gray-500"> TOTAL PROFIT</p>
            <span className="flex justify-between mb-4">
                <h2 className=' text-2xl font-semibold capitalize text-headingColor text-textPrimary' ><span>LKR{' '}</span>23K </h2>
                <Avatar
                    sx={{
                        backgroundColor: '#5048E5',
                        height: 56,
                        width: 56
                    }}
                >
                    <span>LKR</span>
                </Avatar>
            </span>



            <AiOutlineLineChart
                className='text-blue-500 text-5xl ml-20 mb-5 '
            />




        </div>
    )
}

export default TotalProfit
