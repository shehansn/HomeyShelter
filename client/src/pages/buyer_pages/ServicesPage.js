import React from 'react'
import { useStateValue } from '../../context/StateProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight, MdDone } from "react-icons/md";
import CategoriesContainer from '../../components/buyer_components/CategoriesContainer';
import RowContainer from '../../components/buyer_components/RowContainer';

const electricalFeatures = [
   
    {
        featureKey:101,
        description: 'Installation/repair and replacement of',
        subDescription:'heat pumps, ventilation, and air conditioning systems',
        icon: "",
    }, {
        featureKey:102,
        description: 'Replacement of',
        subDescription:
            'old, burnt transformers in roof space to prevent electrical shock',
        icon: "",
    }, {
        featureKey:103,
        description: 'Replacement or repair of',
        subDescription:
            'damaged switches (main control board, 3 phase panel b0ard) and power points',
        icon: "",
    }, {
        featureKey:104,
        description: 'Inspection of',
        subDescription:
            'smoke detectors because of beeping sound. Rectification finishing electrical repairs with ceiling Tan/exhaust tan',
        icon: "",
    }, {
        featureKey:105,
        description: 'Rectifying ',
        subDescription:
            'Electrical problems in geysers - fixing or repair',
        icon: "",
    }, {
        featureKey:106,
        description: 'Installation',
        subDescription:
            '(wiring or casing for new door bell)',
        icon: "",
    }, {
        featureKey:107,
        description: 'Problems in lighting or power',
        subDescription:
            '(fancy lights, sockets, holders, tube lights with panel, indoor/outdoor lighting)',
        icon: "",
    }, {
        featureKey:108,
        description: 'Resolution of',
        subDescription:
            'Tripping of safety switches Repairing of outlets/fuses and bring them back to normalcy',
        icon: "",
    }, {
        featureKey:109,
        description: 'Burning smell in',
        subDescription:
            'switchboard Check is conducted and problem is rectified',
        icon: "",
    }, {
        featureKey:110,
        description: 'Fitting/installation or uninstallation of',
        subDescription:
            'inverters (point-point connection or direct MCB connection)',
        icon: "",
    },
    {
        featureKey:111,
        description: 'Installation of',
        subDescription:
            'LED/LCD TV systems/Home theater',
        icon: "",
    },
  
]


const  plumbingFeatures = [
   
    {
        featureKey:1,
        description: 'Installation of',
        subDescription:'water tank and plumbing requirements in it.',
        icon: "",
    }, 
    {
        featureKey:2,
        description: 'Complete',
        subDescription:'home water supply and repair.',
        icon: "",
    }, 
    {
        featureKey:4,
        description: 'Issues fixed in',
        subDescription:'Toiletry such as, running toilets, toilet flushing repair/installation, clogged toilets and waterjets etc.',
        icon: "",
    }, 
    {
        featureKey:5,
        description: 'Complete replacement of',
        subDescription:'toilet seats (both western and indian styles)',
        icon: "",
    }, 
    {
        featureKey:6,
        description: 'Fixing ',
        subDescription:'lekage and overflow of the flush tank',
        icon: "",
    },  {
        featureKey:7,
        description: 'Cleaning and Repairing of',
        subDescription:'Sinks',
        icon: "",
    },  {
        featureKey:8,
        description: 'Repair/ Installtion',
        subDescription:'Kitchen basin and tap',
        icon: "",
    }, 
    {
        featureKey:9,
        description: 'Repair',
        subDescription:'Shower jet lekage',
        icon: "",
    }, 
    {
        featureKey:10,
        description: 'Complete',
        subDescription:'Drain cleaning',
        icon: "",
    }, 
    {
        featureKey:11,
        description: 'Installation/Repair of',
        subDescription:'Gayser',
        icon: "",
    }, 
    {
        featureKey:12,
        description: 'Installation/Repair of',
        subDescription:'Hot water mixer',
        icon: "",
    }, 
]

const ServicesPage = () => {
    
    const [{ workItems, cartShow, favSectionShow }, dispatch] = useStateValue();
    const [scrollValue, setScrollValue] = useState(0);
    useEffect(() => { }, [scrollValue]);

    return (
        <div>

            <section className="w-full  ml-10 ">
                <span className="text-4xl font-semibold p-10 capitalize text-headingColor ">
                    <h1 className='text-left'>Find out best match service </h1>
                </span>

            </section>

            <CategoriesContainer />
            <p>
                <h1 className='text-left'>How it works </h1>
            </p>

            <section className='description '>
                <div className='grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2'>
                    <div className='left'>
                        <div className="overflow-hidden bg-white py-8 sm:py-16">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto  max-w-2xl  gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none ">
                                    <div className="lg:pr-8 lg:pt-4">
                                        <div className="lg:max-w-lg">
                                          
                                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Electrician Service</p>
                                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                                Professional Electrician Services In Srilanka We are a full-service electrical company in SriLanka.
                                                We provide some of the finest commercial and residential electrical services to homes and offices
                                                throughout the area with the help of our certified electricians.
                                            </p>
                                            <h2 className="text-base mt-3 font-semibold leading-7 text-indigo-600">List of Electrical Services </h2>
                                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                                {electricalFeatures.map((feature) => (
                                                    <div key={feature.featureKey} className="relative pl-9">
                                                        <dt className="inline font-semibold text-gray-900">
                                                            <div className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" >
                                                            <MdDone className='mt-1 mr-2 text-lg' />
                                                            </div>
                                                            {feature.description}
                                                        </dt>
                                                        {' '}
                                                        <dd className="inline">{feature.subDescription}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='right'>
                        <div className="overflow-hidden bg-white py-8 sm:py-16">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto  max-w-2xl  gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none ">
                                    <div className="lg:pr-8 lg:pt-4">
                                        <div className="lg:max-w-lg">
                                        
                                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Plumbing Service</p>
                                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                                Professional Plumber Services In SriLanka Our plumbers are all skilled and certified
                                                professionals who care for your needs. Welcome to HomeShelter PLUMBING SERVICES,
                                                the best plumbers you can rely on in SriLanka.
                                            </p>
                                            <h2 className="text-base mt-3 font-semibold leading-7 text-indigo-600">List of Plumbing services</h2>
                                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">

                                            {plumbingFeatures.map((feature) => (
                                                    <div key={feature.featureKey} className="relative pl-9">
                                                        <dt className="inline font-semibold text-gray-900">
                                                            <div className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" >
                                                            <MdDone className='mt-1 mr-2 text-lg' />
                                                            </div>
                                                            {feature.description}
                                                        </dt>
                                                        {' '}
                                                        <dd className="inline">{feature.subDescription}</dd>
                                                    </div>
                                                ))}

                                            </dl>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default ServicesPage
