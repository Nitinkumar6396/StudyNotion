import React from "react"
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg"
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg"
import CTAbutton from "./Button"
import HighlightText from "./HighlightText"

const LearningLanguageSection = () => {
  return (
    <div className="my-16 flex flex-col items-center text-center px-4">
      {/* Heading */}
      <p className="text-3xl sm:text-4xl font-semibold">
        Your swiss knife for <HighlightText text={"learning any language"} />
      </p>

      {/* Subheading */}
      <p className="text-sm sm:text-base w-full sm:w-[70%] mt-3 text-richblack-300">
        Using spin making learning multiple languages easy. With 20+ languages,
        realistic voice-over, progress tracking, custom schedule and more.
      </p>

      {/* Images */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-10 overflow-hidden">
        <img
          className="w-64 sm:w-60 lg:w-96 sm:-mr-20"
          src={Know_your_progress}
          alt="Know your progress"
        />
        <img
          className="w-64 sm:w-60 lg:w-96 z-10"
          src={Compare_with_others}
          alt="Compare with others"
        />
        <img
          className="w-64 sm:w-60 lg:w-96 sm:-ml-20"
          src={Plan_your_lessons}
          alt="Plan your lessons"
        />
      </div>

      {/* CTA Button */}
      <div className="mt-10">
        <CTAbutton active={true} linkto={"/signup"}>
          Learn More
        </CTAbutton>
      </div>
    </div>
  )
}

export default LearningLanguageSection
