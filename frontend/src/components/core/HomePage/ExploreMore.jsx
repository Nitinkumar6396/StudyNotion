import React, { useState } from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../../../../data/homepage-explore'
import { HiUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";

// const tabsName = ["Free", "New to Coding", "Most Popular", "Skills Paths", "Career Paths"];

const ExploreMore = () => {

    const [currTab, setCurrTab] = useState(HomePageExplore[0].tag)
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currCard, setCurrCard] = useState(HomePageExplore[0].courses[0])

    const changeCurrTab = (item) => {
        setCurrTab(item.tag)
        setCourses(item.courses)
        setCurrCard(item.courses[0])
    }

    return (
        <div className='w-11/12 flex flex-col items-center mx-auto text-center'>
            <p className='text-4xl font-semibold'>Unlock the <HighlightText text={'Power of Code'} /></p>
            <p className='text-base text-richblack-300 my-1'>Learn to Build Anything You Can Imagine</p>

            <div className='flex flex-row gap-2 bg-richblack-800 mt-5 px-1 py-1 rounded-full'>
                {
                    HomePageExplore.map((item, index) => {
                        return (
                            <div
                                onClick={() => changeCurrTab(item)}
                                key={index}
                                className={`text-base cursor-pointer px-4 py-1 rounded-full ${currTab === item.tag ? "bg-richblack-900 text-richblack-5" : "text-richblack-200"} `}>
                                {item.tag}
                            </div>
                        )
                    })
                }
            </div>

            <div className='flex flow-row gap-8 justify-between translate-y-[25%]'>
                {
                    courses.map((item, index) => {
                        return (
                            <div 
                            key={index} 
                            className={`flex flex-col max-w-80 cursor-pointer justify-between h-64 ${currCard === item ? "bg-white text-richblack-800 shadow-yellow-50 shadow-[12px_12px]" :"bg-richblack-800"} transition-all duration-200`}
                            onClick={() => setCurrCard(item)}
                            >
                                <div className='flex flex-col gap-3 text-start px-4 py-5'>
                                    <p className='text-xl font-semibold'>{item.heading}</p>
                                    <p className='text-base font-normal text-richblack-500'>{item.description}</p>
                                </div>

                                <div className={`flex flex-row justify-between ${currCard === item ? "" : "text-richblack-300"} border-line px-4 py-2`}>
                                    <div className='flex flex-row items-center gap-2'>
                                        <HiUsers />
                                        {item.level}
                                    </div>

                                    <div className='flex flex-row items-center gap-2'>
                                        <ImTree />
                                        {item.lessionNumber}
                                        <p>Lessons</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExploreMore