import React, { useEffect, useState } from 'react'
import Services1 from "../../images/services1.jpg";
import Electric1 from "../../images/electric1.jpeg"
import Home from "../../images/home.jpg";
import ElectricBanner from "../../images/electricBanner.jpg";
import PlumbingBanner from "../../images/plumbingBanner.jpg";
import PromotionBanner from './PromotionBanner';
import { useStateValue } from '../../context/StateProvider';
import { Link } from 'react-router-dom';
import { MdDone } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import WorkItem from './WorkItem';
import TaskerProfile from './taskerProfile';


const HomeContainer = () => {

    const [{ workItems, taskerInfo, cartShow, favSectionShow }, dispatch] = useStateValue();

    var [total, setTotalPrice] = useState("");

    // useEffect(() => {

    //   let total = 0;
    //   workitem.works?.forEach((row) => {
    //     total += Number(row.value3); // Convert value3 to a number and add to total
    //   });

    //   setTotalPrice(total);

    // }, []);
    function scrollToTop() {
        window.scrollTo(0, 0);
      }

    return (
        <div className=''>
            <PromotionBanner />
            
            <section
                className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-96 overflow-hidden bg-[#00142d] pl-4 pr-4 mt-2 rounded-xl"
                id="home"
            >
                {/* <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
                <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div> */}


                <div className="flex-1 flex flex-col items-start gap-4 md:mt-10">

                    <p className="font-bold tracking-wide ">
                        <span className="w-full font text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Save Your Time. 
                        </span>
                    </p>

                    <p className="font-bold tracking-wide  -mt-6">
                        <span className="text-[1rem] lg:text-[2rem] font font-bold tracking-tight text-white " >
                            Get a Support From{" "}
                        </span>
                        <span className="text-teal-600 text-[1.5rem] lg:text-[2.5rem]">
                            Field Specialist
                        </span>
                    </p>

                    <div className="flex items-center justify-center w-96 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                        <div className="flex space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10  "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentcolor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 text-purple-700 border border-none  focus:border-white "
                                placeholder="What Do You Need Done?"
                            />
                            <button className="px-4 text-white bg-purple-600 rounded-full">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* <p className="text-center md:text-left md:w-[80%] text-xl text-gray-500">
                         Our Service Providers at HomeyShelter Co., We have experienced plumbers and  electricians
                        that can provide all types of repairs, patching, and sectional replacements. 
                        However, sometimes plumbing & Electrical repair becomes so costly and frequent
                        that it is more cost-effective to replace the whole house's piping system or Electric Wiring System. 
                        Our Service Providers suitable to whole-house repiping services & housing reWring services. 

                    </p> */}
                    <div className='grid grid-cols-3 gap-2 w-full '>
                        <button
                            type="button"
                            className="text-lg outline outline-offset-4 outline-teal-600 hover:outline-teal-800 outline-2 p-1 rounded-lg text-white font-normal hover:text-teal-600 duration-100 transition-all ease-in-out cursor-pointer mr-2"
                        >
                            Electric help
                        </button>
                        <button
                            type="button"
                            className="text-lg outline outline-offset-4 outline-teal-600 hover:outline-teal-800 outline-2 p-1 rounded-lg text-white font-normal hover:text-teal-600 duration-100 transition-all ease-in-out cursor-pointer ml-2"
                        >
                            Plumbing works
                        </button>

                    </div>
                    {/* reviews */}
                    <div className='mb-5' >
                        <a class="inline-block mr-1" href="#">
                            <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill="#FFCB00"></path>
                            </svg>
                        </a>
                        <a class="inline-block mr-1" href="#">
                            <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill="#FFCB00"></path>
                            </svg>
                        </a>
                        <a class="inline-block mr-1" href="#">
                            <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill="#FFCB00"></path>
                            </svg>
                        </a>
                        <a class="inline-block mr-1" href="#">
                            <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill="#FFCB00"></path>
                            </svg>
                        </a>
                        <a class="inline-block text-gray-200" href="#">
                            <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill="currentColor"></path>
                            </svg>
                        </a>
                        <p class="inline-block mr-1 text-white">+ 100k reviews</p>
                    </div>
                </div>
                <div className="flex-1 flex ml-5 -mr-4 rounded-full ">
                    <img
                        src={Home}
                        className=" ml-1 h-auto w-full lg:w-full rounded-xl"
                        alt="Services1"
                    />


                </div>
            </section>
            {/* 2nd section */}
            <div className='rounded-2xl shadow-sm mt-2 lg:mt-14 justify-center'>
                <p class="font-bold text-[1.5rem] text-black mb-16">Popular works in your area</p>
                <section
                    className='relative'
                    id="popularTasks"
                >


                    <div className="grid grid-cols-1 md:grid-cols-4 w-full -mt-2 lg:-mt-10 gap-4 justify-center items-center">
                        {workItems && workItems.length > 0 ? (
                            workItems.map((item) => (
                                <Link to={`/viewWorkItem/${item.id}`}  onClick={scrollToTop}>
                                    <div
                                        key={item.id}
                                        className=" ">
                                        <WorkItem workitem={item} />
                                    </div>

                                </Link>

                            ))) : (
                            <div className="w-full flex flex-col items-center justify-center">
                                not found
                            </div>

                        )}
                        {/* {workItems && workItems.length > 0 ? (
                workItems.map((item) => (<div>

                </div>>
                ))):(
                    <div></div>>
                ))} */}
                    </div>

                </section>
            </div>

            {/* 3rd section */}
            <section
                className="grid bg-[#F5F5F5] grid-cols-1 md:grid-cols-2 mt-5 md:mt-10 lg:mt-16 gap-2 w-full "
                id="home"
            >
                <div className="py-2 flex-1 flex relative  rounded-full">
                    <img
                        src={PlumbingBanner}
                        className=" ml-1 h-420 w-full lg:w-auto lg:h-550 rounded-sm "
                        alt="Services1"
                    />
                </div>

                <div className="flex-1 flex flex-col items-start justify-center  gap-4 lg:ml-6">


                    <p className="text-[1rem] lg:text-[2rem] lg:w-[70%] font-bold tracking-wide text-headingColor">
                        Everyday life made easier
                    </p>

                    <div className='grid grid-cols-1 gap-0'>
                        <p className="text-base  text-[#8e8e93] text-center  md:text-left md:w-[80%]">
                            When life gets busy, you don't have to tackle it alone. Get time back for what you love without breaking the bank.

                        </p>

                        <ul className='ml-5'>
                            <li className='flex mt-5'> <MdDone className='mt-1 mr-2 text-lg' />
                                Choose your Tasker by reviews, skills, and price
                            </li>
                            <li className='flex mt-2'><MdDone className='mt-1 mr-2 text-lg' />
                                Schedule when it works for you — as early as today
                            </li>
                            <li className='flex mt-2'><MdDone className='mt-1 mr-2 text-lg' />
                                Chat, pay, tip, and review all through one platform
                            </li>
                        </ul>




                    </div>

                </div>

            </section>

            {/* 4th section*/}
            <div className='rounded-2xl shadow-sm mt-2 lg:mt-14 justify-center'>
                {/*
                <p class="font-bold text-[1.5rem] text-black mb-16">Featured Taskers</p>
                <section
                    className='relative'
                    id="featuredTaskers"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 w-full -mt-2 lg:-mt-10 gap-4 justify-center items-center">
                        {taskerInfo && taskerInfo.length > 0 ? (
                            taskerInfo.map((item) => (
                                <Link to={`/viewWorkItem/${item.id}`} >
                                    <div
                                        key={item.id}
                                        className=" "
                                    >
                                        <TaskerProfile profile={item}/>

                                       </div>
                                </Link>

                            ))) : (
                            <div className="w-full flex flex-col items-center justify-center">
                                Taskers not found
                            </div>

                        )}

                    </div>

                </section> */}

                {/* 5th section */}
                <section
                    className="grid bg-[#F5F5F5] grid-cols-1 md:grid-cols-2 mt-5 md:mt-10 lg:mt-16 gap-2 w-full "
                    id="home"
                >


                    <div className="flex-1 flex flex-col items-start justify-center  gap-4 lg:ml-6">


                        <p className="text-[1rem] lg:text-[2rem] lg:w-[70%] font-bold tracking-wide text-headingColor">
                            A go-to team at your fingertips
                        </p>

                        <div className='grid grid-cols-1 gap-0'>
                            <p className="text-base  text-[#8e8e93] text-center  md:text-left md:w-[80%]">
                                Build your team of local, background-checked Taskers to help with — and for — life. Whatever you need, they’ve got it covered.
                            </p>

                            <ul className='ml-5'>
                                <li className='flex mt-5'> <MdDone className='mr-2 text-2xl' />
                                    Compare Tasker reviews, ratings, and prices
                                </li>
                                <li className='flex mt-3'><MdDone className=' mr-2 text-2xl' />
                                    Choose and connect with the best person for the job
                                </li>
                                <li className='flex mt-3'><MdDone className=' mr-2 text-2xl' />
                                    Save your favorites to book again and again
                                </li>
                            </ul>




                        </div>

                    </div>
                    <div className="py-2 flex-1 flex relative  rounded-full">
                        <img
                            src={ElectricBanner}
                            className=" ml-1 h-420 w-full lg:w-auto lg:h-550 rounded-sm "
                            alt="Services1"
                        />
                    </div>

                </section>

                {/* 6th section */}
                <section
                    className=" bg-[#F5F5F5]  mt-5 md:mt-10 lg:mt-16 gap-2 w-full p-5 rounded-xl"
                    id="home"
                >
                    <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 m-5">
                        <p class="mb-5 text-2xl font-extrabold text-gray-900  dark:text-gray-400">Valuable Client's Reviews </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                        <div class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
                            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Very easy this was to integrate</h3>
                                <p class="my-4 font-light">If you care for your time, I hands down would go with this."</p>
                            </blockquote>
                            <figcaption class="flex items-center justify-center space-x-3">
                                <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture" />
                                <div class="space-y-0.5 font-medium dark:text-white text-left">
                                    <div>Bonnie Green</div>
                                    <div class="text-sm font-light text-gray-500 dark:text-gray-400">Developer at Open AI</div>
                                </div>
                            </figcaption>
                        </div>
                        <div class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-tr-lg dark:bg-gray-800 dark:border-gray-700">
                            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Solid foundation for any project</h3>
                                <p class="my-4 font-light">Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
                            </blockquote>
                            <figcaption class="flex items-center justify-center space-x-3">
                                <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture" />
                                <div class="space-y-0.5 font-medium dark:text-white text-left">
                                    <div>Roberta Casas</div>
                                    <div class="text-sm font-light text-gray-500 dark:text-gray-400">Lead designer at Dropbox</div>
                                </div>
                            </figcaption>
                        </div>
                        <div class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
                            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Mindblowing workflow</h3>
                                <p class="my-4 font-light">Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."</p>
                            </blockquote>
                            <figcaption class="flex items-center justify-center space-x-3">
                                <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile picture" />
                                <div class="space-y-0.5 font-medium dark:text-white text-left">
                                    <div>Jese Leos</div>
                                    <div class="text-sm font-light text-gray-500 dark:text-gray-400">Software Engineer at Facebook</div>
                                </div>
                            </figcaption>
                        </div>


                    </div>
                </section>

                {/* 6th section */}
                <section
                    className=" bg-[#F5F5F5]  mt-5 md:mt-10 lg:mt-16 gap-3 w-full p-6"
                    id="home"
                >
                    <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 m-5">
                        <p class="mb-5 text-3xl font-bold text-gray-900  dark:text-gray-400">Are You ready to get Started? </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div class="w-full p-4 text-center  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 class="mb-2 text-2xl font-bold text-gray-700 dark:text-white">Talk to our service providers and get your needs fulfilled.</h5>
                            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 m-5">
                                <img class="rounded-t-lg " src={PlumbingBanner} alt="" />
                            </div>

                            <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Do you find it difficult to find time to work that day? Do you have no experience in doing electrical plumbing work at home? Or do you want to get electrical plumbing work done at your office's business location? Or do you need to install plumbing and electrical facilities for your newly built workplace? Talk to our service providers and get your needs fulfilled. Signup today.</p>
                            {/* <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                                <a href="#" class="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-teal-900 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                    <div class="text-left">

                                        <div class="-mt-1 font-sans text-lg font-semibold">SignUp</div>
                                         <div class="mb-1 text-xs">for more details</div> 
                                    </div>
                                </a>

                            </div> */}
                        </div>

                        <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 class="mb-2 text-2xl font-bold text-gray-700 dark:text-white">Join homeyshelter and earn extra money by providing services to our clients.</h5>
                            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 m-5">
                                <img class="rounded-t-lg " src={ElectricBanner} alt="" />
                            </div>
                            <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Are you an active professional or a small business owner? Then here is a great opportunity for you. An opportunity to earn extra money from your skills or an opportunity to make your small business a success. Join homeyshelter and earn extra money by providing services to our clients. Become a tasker today.</p>
                            {/* <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                                <a href="#" class="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-teal-900 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                    <div class="text-left">

                                        <div class="-mt-1 font-sans text-lg font-semibold">Become a Tasker</div>
                                        <div class="mb-1 text-xs">for earn extra money</div> 
                                    </div>
                                </a>
                            </div> */}
                        </div>
                    </div>

                </section>



            </div>
        </div>
    )
}

export default HomeContainer
