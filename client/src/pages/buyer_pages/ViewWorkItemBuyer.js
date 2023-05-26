import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider';
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";


const ViewWorkItemBuyer = (props) => {

  //const navigate = useNavigate()
  //navigate("/cart")

  // useEffect(() => {
  //   filterItem();
  //   console.log("item", item)
  // }, []);

  //const params = useParams()
  const { id } = useParams();
  console.log(id);

  const [{ workItems }, dispatch] = useStateValue();
  //const [item, setItem] = useState([]);

  const data = workItems?.filter(workItem => workItem.id === id);
  //console.log(data);
  // const filterItem = () => {
  //   const data = workItems?.filter((n) => n.id === id)
  //   setItem(data);
  //   console.log("data", data)
  //   return data;
  // }
  //setItem(data)
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div>
      {/* {data.map((n)=>(<div>{n.title}</div>))} */}

      {workItems?.filter((n) => n.id === id).map((item1) => (

        <div>
          <div className="bg-white">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  <li>
                    <div className="flex items-center">
                      <a href="#" className="mr-2 text-sm font-medium text-gray-900">Services</a>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-700">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>

                  <li>
                    <div className="flex items-center">
                      <a href="#" className="mr-2 text-sm font-medium text-gray-900">{item1.category}</a>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-700">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>

                  <li className="text-sm">
                    <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{item1.title}</a>
                  </li>
                </ol>

              </nav>

              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid  lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="w-full h-full hidden overflow-hidden rounded-lg lg:block">
                  <img src={item1.imageURL} alt="" className="h-full w-full object-cover object-center" />
                </div>
                <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
                  <h1 className="text-2xl font-bold tracking-tight lg:border-b lg:border-gray-200 text-gray-900 lg:pb-4 sm:text-3xl">{item1.title}</h1>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900"> </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl tracking-tight text-gray-900 mt-3 mb-3">  Works</p>
                    {item1.works.map((item2) => (
                      <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        <li className="text-gray-400"><span className="text-gray-600">{item2.value2} : {item2.value3} LKR</span></li>

                      </ul>
                    ))}

                  </div>
                  <p className="text-3xl tracking-tight text-gray-900 mt-6">


                  </p>

                </div>
              </div>



              <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pt-6 lg:pb-16 lg:pl-8">
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Working Areas</h3>

                  <div className="mt-4">
                    {item1.works.map((item2) => (
                      <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        <li className="text-gray-400"><span className="text-gray-600">{item2.value1} </span></li>

                      </ul>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Work Description</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{item1.description}</p>
                  </div>
                </div>

                <div className="p-5 mt-5 flex justify-between">
                  <div className=''>
                    <Link to={`/chat/${id}`} onClick={scrollToTop}>
                      <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#00142d] rounded-lg hover:bg-[rgb(90,99,109)] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Message Tasker
                        <BsFillChatLeftDotsFill className='ml-2' />
                      </a>
                    </Link>
                    <Link to={`/orders/${id}`} onClick={scrollToTop}>
                      <a href="#" className="inline-flex items-center px-3 py-2 ml-5 text-sm font-medium text-center text-white bg-[#00142d] rounded-lg hover:bg-[rgb(90,99,109)] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Place a Order
                        <BsCartCheck className='ml-2' />
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-end">
                    <Link to={`/addFeedback/${id}`} onClick={scrollToTop} >
                      <a href="#" className="inline-flex justify-end items-end px-3 py-2 ml-5 text-sm font-medium text-center text-white bg-teal-500 rounded-lg hover:bg-teal-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Feedback
                        <BsCartCheck className='ml-2' />
                      </a>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      ))}

    </div>
  )
}

export default ViewWorkItemBuyer
