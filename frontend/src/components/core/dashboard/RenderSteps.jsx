import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa";

const steps = [
    {
        id: 1,
        title: "Course Information",
    },
    {
        id: 2,
        title: "Course Builder",
    },
    {
        id: 3,
        title: "Publish",
    },
]

const RenderSteps = () => {

    const { step } = useSelector(state => state.course)

    return (
        <div className='flex flex-col gap-2 relative'>
            <div className='grid grid-cols-3 place-items-center'>
                {
                    steps.map((item, index) => (

                        <div key={index}
                            className={`w-10 z-10 h-10 rounded-full object-center border-2 
                            ${
                                item.id <= step
                                ? item.id < step
                                    ? "border-yellow-50 bg-yellow-50 text-richblack-900"
                                    : "bg-yellow-900 border-yellow-50 text-yellow-50"
                                : "bg-yellow-900 border-richblack-200 text-richblack-200"
                            }`}>
                            {
                                <span className='flex justify-center text-lg items-center font-semibold rounded-full w-full h-full'>{item.id < step ? <FaCheck className='' /> : item.id}</span>
                            }
                        </div>

                    ))
                }
                <div className={`border-t-2 border-dashed h-0 w-[35%] left-[16%] absolute top-[30%] ${step >= 2 ? "border-yellow-50" : "border-richblack-200"}`}></div>

                <div className={`border-t-2 border-dashed h-0 w-[35%] right-[16%] absolute top-[30%] ${step === 3 ? "border-yellow-50" : "border-richblack-200"}`}></div>


            </div>

            <div className='grid grid-cols-3 place-items-center text-sm text-center text-richblack-200'>
                {
                    steps.map((item, index) => (
                        <div key={index}>
                            {
                                item.title
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RenderSteps