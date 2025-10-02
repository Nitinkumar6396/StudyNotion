import React from "react"
import instructor from "../../../assets/Images/Instructor.png"
import HighlightText from "./HighlightText"
import CTAbutton from "./Button"
import { FaArrowRight } from "react-icons/fa"

const InstructorSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center w-11/12 gap-12 lg:gap-24 mt-16 mx-auto px-4 sm:px-6 lg:px-10">

      {/* Instructor Image */}
      <img
        className="w-full sm:w-[70%] lg:w-[40%] shadow-[-12px_-12px]"
        src={instructor}
        alt="Instructor"
      />

      {/* Text Section */}
      <div className="flex flex-col gap-6 sm:gap-8 items-start sm:text-center lg:text-left">
        <p className="text-3xl sm:text-4xl font-semibold w-full lg:w-[70%]">
          Become an <HighlightText text={"instructor"} />
        </p>
        <p className="text-sm sm:text-base text-richblack-300 w-full lg:w-[80%]">
          Instructors from around the world teach millions of students on StudyNotion.
          We provide the tools and skills to teach what you love.
        </p>
        <div className="sm:mx-auto lg:mx-0">
          <CTAbutton active={true} linkto={"/signup"}>
            <div className="flex flex-row gap-2 sm:gap-3 items-center">
              Start Teaching Today
              <FaArrowRight />
            </div>
          </CTAbutton>
        </div>
      </div>

    </div>
  )
}

export default InstructorSection
