import React from 'react'
import { motion } from "framer-motion";
import { useState } from 'react';
import { useEffect } from 'react';

const WorkItem2 = ({workitem}) => {
    
    const [avgPrice, setAvgPrice] = useState('')

    let total = 0;
    let avgTotal = 0;
    let i = 0;
    useEffect(() => {

        let total = 0;
        workitem.works?.forEach((row) => {
            avgTotal += Number(row.value3); // Convert value3 to a number and add to total
            i++;
        });
        avgTotal = avgTotal / i;
        const roundedAverage = Math.round(avgTotal);
        setAvgPrice(roundedAverage);

    }, []);

    return (
        <div>
            <div className="w-275 h-400 min-w-[275px] md:w-300 md:min-w-[300px] py-2 px-2  my-12 backdrop-blur-lg hover:drop-shadow-lg 
                                max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <motion.div
                    className="w-full h-40 drop-shadow-2xl"
                    whileHover={{ scale: 1.2 }}
                >
                    <img className="rounded-t-lg w-full" src={workitem.imageURL} alt="" />
                </motion.div>

                <div className="p-5 mt-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workitem.title}</h5>
                    </a>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#00142d] rounded-lg hover:bg-[rgb(90,99,109)] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>

                <div>
                    <p className="text-center">Avg. Price:  {'  '}
                        {workitem.works?.forEach((row) => { total += Number(row.value3); })
                        }
                        {avgPrice}.00- {total}.00{ ' '} LKR
                    </p>
                </div>
            </div>


        </div>
    )
}

export default WorkItem2
