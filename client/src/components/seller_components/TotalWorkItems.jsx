import { Avatar, LinearProgress } from '@mui/material'
import React from 'react'
import { MdOutlineArrowUpward } from 'react-icons/md'
import { RiBarChartBoxLine } from 'react-icons/ri'

//total work items in progress

const TotalWorkItems = () => {
    return (
        <div className="max-w-sm h-48 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="mb-3 font-semibold text-gray-500"> WORK ITEMS IN PROGRESS</p>
            <span className="flex justify-between mb-4">
                <h2 className=' text-2xl font-semibold capitalize text-headingColor text-textPrimary' >75.5% </h2>
                <Avatar
                    sx={{
                        backgroundColor: '#FFB020',
                        height: 56,
                        width: 56
                    }}
                >
                    <RiBarChartBoxLine />
                </Avatar>
            </span>



            <LinearProgress
                className='text-xl mt-10 mb-2'
                value={75.5}
                variant="determinate"
            />




        </div>

    )
}

export default TotalWorkItems
