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
                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-medium text-base text-richblack-200 transition-all duration-200 hover:scale-95 w-fit '>
                        <div className='px-8 py-[0.35rem] flex flex-row items-center gap-2 rounded-full transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='font-bold text-center text-4xl mt-7'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className='mt-4 w-[90%] text-center text-base font-medium  mx-auto text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8 justify-center'>
                    <CTAbutoon active={true} linkto={'/signup'}>
                        Lear More
                    </CTAbutoon>
                    <CTAbutoon active={false} linkto={'/signup'}>
                        Book a Demo
                    </CTAbutoon>
                </div>

                <div className='my-12 w-[80%] mx-auto shadow-[12px_12px]'>
                    <video muted loop autoPlay src={Banner} className='' />
                </div>


                <CodeBlocks
                    position={'lg:flex-row'}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={'coding potential'} />
                            with our online courses.
                        </div>
                    }
                    subheading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    btn1={
                        {
                            text: 'Try it yourself',
                            linkto: '/signup',
                            active: true
                        }
                    }
                    btn2={
                        {
                            text: 'Learn More',
                            linkto: '/login',
                            active: false
                        }
                    }
                    codeblock={'<!DOCTYPE html>\n <html>\n head><title>Example</\n title><linkrel="stylesheet"href="styles.css">\n /head>\n body\n h1><ahref="/">Header</a>\n /h1>\n nav><ahref="one/">One</a><ahref="two/">Two</ \n a><ahref="three/">Three</a>\n /nav>'}
                    codeColor={'text-yellow-25'}
                />

                <div className='h-10'></div>

                <CodeBlocks
                    position={'lg:flex-row-reverse'}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start <HighlightText text={"coding"} /> <br />
                            <HighlightText text={"in seconds"} />
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    btn1={
                        {
                            text: 'Continue Lesson',
                            linkto: '/signup',
                            active: true
                        }
                    }
                    btn2={
                        {
                            text: 'Learn More',
                            linkto: '/login',
                            active: false
                        }
                    }
                    codeblock={'import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div> Home </div>\n)\n}\nexport default Home;'}
                    codeColor={'text-white'}
                />

                <ExploreMore />

            </div>

            {/* section2 */}

            <div className='w-full bg-[#ffffffe8] text-richblack-700'>

                <div className='bgHome text-white'>

                    <div className='w-11/12 h-[280px] max-w-maxContent flex items-center gap-5 mx-auto'>

                        <div className='flex flex-row gap-7 mx-auto mt-20'>
                            <CTAbutoon active={true} linkto={'/singup'}>
                                <div className='flex flex-row gap-2 items-center'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAbutoon>
                            <CTAbutoon active={false} linkto={'/login'}>
                                Learn More
                            </CTAbutoon>
                        </div>

                    </div>

                </div>

                <div className='w-11/12 max-w-maxContent mt-10 flex flex-col items-center justify-between gap-7 mx-auto'>

                    <div className='flex flex-row w-full justify-between gap-7 px-8'>
                        <div className='w-[50%] text-4xl font-semibold'>
                            Get the skills you need for a
                            <HighlightText text={'job that is in demand.'} />
                        </div>
                        <div className='w-1/2 flex gap-8 flex-col items-start'>
                            <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
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
                    <p className='text-4xl font-semibold text-center'>Reviews from other learners</p>
                </div>
            </div>

            <ReviewSlider />

            <Footer />

        </div>
    )
}

export default Home