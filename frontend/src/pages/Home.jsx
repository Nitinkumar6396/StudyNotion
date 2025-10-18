import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAbutoon from '../components/core/HomePage/Button'
import Banner from "../assets/Images/banner2.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
    return (
        <div className='mx-auto flex flex-col items-center justify-between text-richblack-5'>
            {/* section1 */}
            <div className='w-11/12'>
                {/* Become Instructor */}
                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-medium text-base text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='px-8 py-[0.35rem] flex flex-row items-center gap-2 rounded-full transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                <div className='font-bold text-center text-3xl sm:text-4xl mt-7'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                {/* Subheading */}
                <div className='mt-4 w-full sm:w-[90%] text-center text-sm sm:text-base font-medium mx-auto text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                {/* CTA Buttons */}
                <div className='flex flex-row gap-5 sm:gap-7 mt-8 justify-center'>
                    <CTAbutoon active={true} linkto={'/signup'}>
                        Learn More
                    </CTAbutoon>
                    <CTAbutoon active={false} linkto={'/login'}>
                        Book a Demo
                    </CTAbutoon>
                </div>

                {/* Banner Video */}
                <div className='my-12 sm:mb-28 w-full sm:w-[70%] mx-auto shadow-blue-200/30 shadow-[100px_-60px_150px_-5px]'>
                    <video muted loop autoPlay src={Banner} className='w-full shadow-[12px_12px]' />
                </div>

                {/* Code Block 1 */}
                <CodeBlocks
                    position={'flex flex-col md:flex-row'}
                    heading={
                        <div className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={'coding potential'} />
                            with our online courses.
                        </div>
                    }
                    subheading={
                        'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
                    }
                    btn1={{
                        text: 'Try it yourself',
                        linkto: '/signup',
                        active: true,
                    }}
                    btn2={{
                        text: 'Learn More',
                        linkto: '/login',
                        active: false,
                    }}
                    codeblock={`<!DOCTYPE html>\n<html>\n  <head>\n    <title>Example</title>\n    <link rel="stylesheet"\n href="styles.css">\n  </head>\n  <body>\n    <h1><a href="/">Header\n </a></h1>\n    <nav>`}
                    codeColor={'text-yellow-25'}
                    backgroundGradient={<div className="absolute w-[85%] h-full rounded-full opacity-25 bg-gradient-to-r from-pink-100 to-yellow-5  -top-10 -left-8 blur-3xl"></div>}
                />

                <div className='h-10'></div>

                {/* Code Block 2 */}
                <CodeBlocks
                    position={'flex flex-col md:flex-row-reverse'}
                    heading={
                        <div className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
                            Start <HighlightText text={'coding'} /> <br />
                            <HighlightText text={'in seconds'} />
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    btn1={{
                        text: 'Continue Lesson',
                        linkto: '/signup',
                        active: true,
                    }}
                    btn2={{
                        text: 'Learn More',
                        linkto: '/login',
                        active: false,
                    }}
                    codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\nconst Home = () => {\n  return (\n    <div>\n      Home\n    </div>\n  );};\nexport default Home;`}
                    codeColor={'text-white'}
                    backgroundGradient={<div
                        className="absolute w-[85%] h-full rounded-full opacity-25 bg-gradient-to-r from-blue-100 to-blue-500  -top-10 -left-8 blur-2xl">
                    </div>}
                />

                <ExploreMore />
            </div>

            {/* section2 */}
            <div className='w-full bg-[#ffffffe8] text-richblack-700'>
                <div className='bgHome text-white'>
                    <div className='w-11/12 h-[280px] max-w-maxContent flex items-center gap-5 mx-auto'>
                        <div className='flex flex-col sm:flex-row gap-5 sm:gap-7 mx-auto mt-20'>
                            <CTAbutoon active={true} linkto={'/catalog/DSA'}>
                                <div className='flex flex-row gap-2 items-center'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAbutoon>
                            <CTAbutoon active={false} linkto={'/signup'}>
                                Learn More
                            </CTAbutoon>
                        </div>
                    </div>
                </div>

                <div className='w-11/12 max-w-maxContent mt-10 flex flex-col items-center justify-between gap-7 mx-auto'>
                    <div className='flex flex-col lg:flex-row w-full justify-between gap-7 px-4 sm:px-8'>
                        <div className='w-full lg:w-1/2 text-3xl sm:text-4xl font-semibold'>
                            Get the skills you need for a
                            <HighlightText text={'job that is in demand.'} />
                        </div>
                        <div className='w-full lg:w-1/2 flex gap-5 sm:gap-8 flex-col items-start'>
                            <p className='text-sm sm:text-base'>
                                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </p>
                            <CTAbutoon active={true} linkto={'/signup'}>
                                Learn More
                            </CTAbutoon>
                        </div>
                    </div>

                    <TimelineSection />
                    <LearningLanguageSection />
                </div>
            </div>

            {/* section3 */}
            <div>
                <InstructorSection />
                <div className='mt-20'>
                    <p className='text-3xl sm:text-4xl font-semibold text-center'>
                        Reviews from other learners
                    </p>
                </div>
            </div>

            <ReviewSlider />
            <Footer />
        </div>
    )
}

export default Home
