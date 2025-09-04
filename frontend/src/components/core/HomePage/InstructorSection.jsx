import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAbutton from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='flex flex-row items-center w-11/12 gap-24 mt-16 mx-auto px-10'>

      <img className='w-[40%] shadow-[-12px_-12px]' src={instructor} alt="InstructorImage" />

      <div className='flex flex-col gap-8 items-start'>
        <p className='text-4xl font-semibold w-[50%]'>Become an <HighlightText text={'instructor'}/></p>
        <p className='text-base text-richblack-300 w-[80%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
        <CTAbutton active={true} linkto={'/signup'}>
          <div className='flex flex-row gap-3 items-center'>
            Start Teaching Today
            <FaArrowRight />
          </div>
        </CTAbutton>
      </div>

    </div>
  )
}

export default InstructorSection