import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineVideo from '../../../assets/Images/timelinevideo.mp4'

const timeline = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    },
]

const TimelineSection = () => {
    return (
        <div className='flex flex-row items-center w-full px-5 mb-10'>

            <div className='flex flex-col gap-8 w-[40%]'>
                {
                    timeline.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-row items-center gap-5'>
                                <div className='w-10 h-10 flex justify-center items-center rounded-full bg-white'>
                                    <img className='w-5' src={item.logo} alt="" />
                                </div>
                                <div>
                                    <p className='font-semibold'>{item.heading}</p>
                                    <p className='text-sm'>{item.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='w-[60%] relative'>
                <video src={TimelineVideo} autoPlay loop muted />
                <div className='absolute bg-caribbeangreen-500 flex flex-row items-center h-20 w-[60%] uppercase translate-y-[-50%] left-[20%]'>
                    <div className='flex flex-row items-center px-5 gap-3 h-fit border-r border-[#b8bdc5]'>
                        <p className="text-4xl text-white">10</p>
                        <p className="text-sm text-[#b8bdc5]">years experience</p>
                    </div>
                    <div className='flex flex-row items-center px-5 gap-3'>
                        <p className="text-4xl text-white">250</p>
                        <p className="text-sm text-[#b8bdc5]">types of courses</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TimelineSection