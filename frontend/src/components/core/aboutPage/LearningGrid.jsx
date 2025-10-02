import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAbutton from '../HomePage/Button'

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = () => {
    return (
        <div className='w-11/12 mx-auto my-16'>
            <div className='grid lg:grid-cols-4'>
                {
                    LearningGridArray.map((item, index) => {
                        return item.order < 0
                            ? <div key={index} className='lg:col-span-2 flex flex-col gap-8'>
                                <div className='flex flex-col gap-2 pr-8'>
                                    <h1 className='text-4xl font-semibold'>
                                        World-Class Learning for <HighlightText text={'Anyone, Anywhere'} />
                                    </h1>
                                    <p className='text-base text-richblack-300'>
                                        Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
                                    </p>
                                </div>
                                <div className='w-fit mb-8 lg:mb-0'>
                                    <CTAbutton linkto={'/'} active={true}>
                                        Learn more
                                    </CTAbutton>
                                </div>
                            </div>
                            : <div key={index} className={`
                                    ${item.order === 3 ? "lg:col-start-2" : ""}
                                    ${item.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                                    lg:h-64 flex flex-col gap-4 p-8
                                `}>
                                <h1 className='text-lg font-semibold'>{item.heading}</h1>
                                <p className='text-sm text-richblack-100'>{item.description}</p>
                            </div>
                    })
                }
            </div>
        </div>
    )
}

export default LearningGrid