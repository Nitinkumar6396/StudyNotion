import React from 'react'
import Compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import Know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import CTAbutton from './Button'
import HighlightText from './HighlightText'



const LearningLanguageSection = () => {
  return (
    <div className='my-16 flex flex-col items-center text-center'>
        <p className='text-4xl font-semibold'>Your swiss knife for <HighlightText text={'learning any language'}/></p>
        <p className='text-base w-[70%] mt-3'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

        <div className='flex flex-row justify-center items-center mt-10'>
            <img className='w-96 -mr-24' src={Know_your_progress} alt="Know_your_progress" />
            <img className='w-96' src={Compare_with_others} alt="Compare_with_others" />
            <img className='w-96 -ml-28' src={Plan_your_lessons} alt="Plan_your_lessons" />
        </div>

        <div className='mt-10'>
            <CTAbutton active={true} linkto={'/signup'}>
            Learn More
        </CTAbutton>
        </div>
    </div>
  )
}

export default LearningLanguageSection