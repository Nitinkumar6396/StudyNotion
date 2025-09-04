import React from 'react'
import CTAbutton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa"
import {TypeAnimation} from 'react-type-animation'


const CodeBlocks = ({ position, heading, subheading, btn1, btn2, codeblock, bgGradient, codeColor }) => {
    return (
        <div className={`flex ${position} my-20 gap-10 justify-between w-[90%] mx-auto text-sm`}>

            <div className='w-1/2 flex flex-col gap-3'>
                {heading}
                <div className='text-richblack-300 font-semibold'>
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7'>
                    <CTAbutton active={btn1.active} linkto={btn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {btn1.text}
                            <FaArrowRight/>
                        </div>
                    </CTAbutton>

                    <CTAbutton active={btn2.active} linkto={btn2.linkto}>
                            {btn2.text}
                    </CTAbutton>
                </div>
            </div>

            <div className='flex flex-row text-[10px] py-2 w-[40%] bg-richblack-800 rounded-lg'>
                <div className='text-center text-sm w-[10%] flex flex-col text-richblack-400 font-inter font-bold'>

                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    
                </div>

                <div className={`w-[90%] text-sm flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock,5000,""]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block",
                                color:codeColor
                            }
                        }
                    />
                </div>
            </div>

        </div>
    )
}

export default CodeBlocks