import React, { useState } from 'react'
import { useStateValue } from '../../context/StateProvider';
import { categories } from "../../utils/data";
import { motion } from "framer-motion";
import RowContainer from './RowContainer';

const CategoriesContainer = () => {
    const [filter, setFilter] = useState("electric");

    const [{ workItems }, dispatch] = useStateValue();

    return (
        <section className="w-full my-2" id="menu">
            <div className="w-full flex flex-col items-center justify-center">
              
                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
                    {categories &&
                        categories.map((category) => (
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                key={category.id}
                                className={`group ${filter === category.urlParamName ? "bg-teal-400" : "bg-card"
                                    } w-56 min-w-[94px] h-32 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-teal-600 `}
                                onClick={() => setFilter(category.urlParamName)}
                            >
                                <div
                                    className={`w-14 h-14 rounded-full shadow-lg ${filter === category.urlParamName
                                        ? "bg-white"
                                        : "bg-teal-400"
                                        } group-hover:bg-white flex items-center justify-center`}
                                >
                                    <img src={category.imageSrc} 

                                        className={`${filter === category.urlParamName
                                            ? "text-textColor"
                                            : "text-white"
                                            } group-hover:text-textColor text-lg rounded-full object-fit`}
                                    />
                                </div>

                                <p
                                    className={`text-sm ${filter === category.urlParamName
                                        ? "text-white"
                                        : "text-textColor"
                                        } group-hover:text-white`}
                                >
                                    {category.name}
                                </p>
                            </motion.div>
                        ))}
                </div>

                <div className="w-full">
                    <RowContainer
                        flag={false}
                        data={workItems?.filter((n) => n.category === filter)}
                    />
                </div>
            </div>
        </section>
    )
}

export default CategoriesContainer
