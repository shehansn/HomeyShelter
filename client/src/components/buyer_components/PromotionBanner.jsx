import React from 'react'

const PromotionBanner = () => {
    return (
        <div>
            <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-900 py-2.5 px-6 sm:px-3.5 sm:before:flex-1 rounded-lg">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                    <p className="text-sm leading-6 text-gray-100">
                        <strong className="font-semibold">HomeyShelter 2023</strong>
                        <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current text-gray-300" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>
                        Join us from June 7 – 9 to earn money with your skills.
                    </p>
                    <a href="#" className="flex-none rounded-full bg-gray-100 py-1 px-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:text-black hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">Register now <span aria-hidden="true">&rarr;</span></a>
                </div>
                <div className="flex flex-1 justify-end">
                    <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
                        <span className="sr-only">Dismiss</span>
                        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PromotionBanner
