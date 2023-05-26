import React from 'react'
import { MdDone } from 'react-icons/md';
import PlumbingCover from '../../images/plumbingCover.png';

const AboutUs = () => {
  return (
    <div>
      <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img src={PlumbingCover} alt="" class="absolute inset-0 bg-black opacity-50 -z-10 h-full w-full object-cover object-right md:object-center" />

        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">How care,</h2>
            <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">simplified</h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">Find trusted project taskers and fair prices for any plumbing, electrical project-and get the job done right, guaranteed.  </p>

          </div>
          <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div class="text-base font-semibold text-teal-600 ">
              <a className='bg-white p-3 rounded-xl' href="#">Meet Our Taskers and get the job done. <span aria-hidden="true">&rarr;</span></a>
            </div>
            <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">


              <div class="flex flex-col-reverse">
                <dt class="text-base leading-7 text-gray-300">Tasker profiles</dt>
                <dd class="text-2xl font-bold leading-9 tracking-tight text-white">100+</dd>
              </div>

              <div class="flex flex-col-reverse">
                <dt class="text-base leading-7 text-gray-300">Happy clients</dt>
                <dd class="text-2xl font-bold leading-9 tracking-tight text-white">200+</dd>
              </div>

              <div class="flex flex-col-reverse">
                <dt class="text-base leading-7 text-gray-300">Trust</dt>
                <dd class="text-2xl font-bold leading-9 tracking-tight text-white">Unlimited</dd>
              </div>
            </dl>
          </div>
        </div>

      </div>

      <div class="relative isolate overflow-hidden bg-gray-100 mt-3">

        <div className="flex-1 flex flex-col items-center justify-center my-6 gap-4">


          <p className="text-[1rem] lg:text-[2rem] lg:w-[70%] font-bold text-center tracking-wide text-headingColor">
            Get More Done In Less Time
          </p>

          <p className="text-2xl  text-[#8e8e93]  lg:w-[70%] font-normal text-center tracking-wide">
            When life gets busy, you don't have to tackle it alone.
          </p>
          <p className="text-2xl  text-[#8e8e93]  lg:w-[70%] font-normal text-center tracking-wide">
            Our same-day service platform instantly connects you with skilled Taskers to help with number of jobs and errands, so you can be more productive, every day.
          </p>

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div class="w-full p-4 text-center  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white"></h5>
           
            <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">“HomeyShelter is arguably the best thing to come out of the modern day tech revolution. Hiring a Tasker can really help make every facet of your life a breeze.”</p>
            
          </div>

          <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white"></h5>
           
            <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">“HomeyShelter, a company known for, among other things, sending tool-wielding workers to rescue customers befuddled by build-it-yourself furniture kits.”</p>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
