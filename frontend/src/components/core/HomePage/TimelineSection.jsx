import React from "react"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineVideo from "../../../assets/Images/timelinevideo.mp4"

const timeline = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company",
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority",
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    },
]

const TimelineSection = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center w-11/12 mx-auto px-5 mb-10 gap-10 relative">
            {/* Left side (timeline) */}
            <div className="flex flex-col gap-6 w-full lg:w-2/5">
                {timeline.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-row items-center gap-4 text-left"
                    >
                        <div className="w-10 h-10 z-10 flex justify-center items-center rounded-full bg-white shadow-md">
                            <img className="w-5" src={item.logo} alt={item.heading} />
                        </div>
                        <div>
                            <p className="font-semibold text-richblack-800">{item.heading}</p>
                            <p className="text-sm text-richblack-700">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-[230px] [@media(min-width:420px)]:h-[200px] w-5 border-l-2 border-dashed z-0 border-richblack-700 absolute left-[2.4rem] mt-10"></div>

            {/* Right side (video + stats) */}
            <div className="w-full lg:w-3/5 relative flex justify-center">
                <video
                    src={TimelineVideo}
                    autoPlay
                    loop
                    muted
                    className="w-full max-h-[400px] object-cover"
                />

                <div className="absolute bg-caribbeangreen-500 flex flex-row items-center justify-between gap-4 sm:gap-0 h-auto sm:h-20 sm:w-4/5 w-full py-3 sm:py-0 uppercase -bottom-10">

                    <div className="flex flex-row w-1/2 items-center px-3 sm:px-5 gap-3 border-r border-[#b8bdc5]">
                        <p className="text-2xl sm:text-4xl font-bold text-white">10</p>
                        <p className="text-[10px] sm:text-sm text-[#b8bdc5]">
                            years experience
                        </p>
                    </div>

                    <div className="flex flex-row w-1/2 items-center px-3 sm:px-5 gap-3">
                        <p className="text-2xl sm:text-4xl font-bold text-white">250</p>
                        <p className="text-[10px] sm:text-sm text-[#b8bdc5]">
                            types of courses
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection
