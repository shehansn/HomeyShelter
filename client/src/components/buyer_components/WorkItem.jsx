import React, { useEffect, useState } from 'react'
import { IoMdPricetag } from "react-icons/io";



const WorkItem = ({ workitem }) => {

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

            <div className="max-w-sm h-[330px] rounded-sm overflow-hidden shadow-lg mb-4 bg-[#fcfcfc]">
                <img className="w-full h-[200px]" src={workitem.imageURL} alt="Sunset in the mountains" />
                <div className="px-6 py-4 text-center">
                    <div className="font-semibold text-xl mb-2 ">{workitem.title}</div>
                    <p className="text-gray-900 flex text-sm ">
                        <IoMdPricetag className='mt-1 ' />  Avg. Work: LKR {' '}
                        {workitem.works?.forEach((row) => { total += Number(row.value3); })
                        }
                        {avgPrice}.00- {total}.00
                    </p>
                </div>
            </div>

        </div>
    )
}

export default WorkItem
