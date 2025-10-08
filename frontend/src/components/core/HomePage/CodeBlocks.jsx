import React from 'react'
import CTAbutton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({ position, heading, subheading, btn1, btn2, codeblock, codeColor, backgroundGradient }) => {
  return (
    <div
      className={`flex flex-col ${position} my-12 gap-10 justify-between w-[95%] max-w-6xl mx-auto text-sm relative`}
    >
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-left">
        {heading}

        <div className="text-richblack-300 font-medium">{subheading}</div>

        <div className="flex flex-col sm:flex-row gap-4 mt-7 justify-center md:justify-start">
          <CTAbutton active={btn1.active} linkto={btn1.linkto}>
            <div className="flex gap-2 items-center">
              {btn1.text}
              <FaArrowRight />
            </div>
          </CTAbutton>

          <CTAbutton active={btn2.active} linkto={btn2.linkto}>
            {btn2.text}
          </CTAbutton>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[40%] border border-richblack-600 text-[#f0db3c] rounded-lg p-3 flex flex-row text-[10px] sm:text-xs relative">
        {backgroundGradient}
  
        {/* Line Numbers */}
        <div className="text-center text-sm w-[8%] sm:w-[6%]  flex flex-col text-richblack-400 font-inter font-bold">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code Block */}
        <div
          className={`w-[92%] sm:w-[94%] gap-1 text-sm flex flex-col font-mono font-bold ${codeColor} pl-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
