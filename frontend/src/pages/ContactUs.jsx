import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import ContactForm from '../components/core/aboutPage/ContactForm'
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const contactDetails = [
    {
        icon: <HiChatBubbleLeftRight />,
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "ng6397100896@gmail.com",
    },
    {
        icon: <BiWorld />,
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details:
            "Engineering College Chauraha, Sector F, jankipuram, Lucknow",
    },
    {
        icon: <IoCall />,
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "+123 456 7869",
    },
]

const ContactUs = () => {
    return (
        <div className='mt-16'>
            <div className='w-11/12 mx-auto text-richblack-5 mb-20 flex flex-row gap-20'>
                <div className="flex flex-col gap-8 bg-richblack-800 h-fit p-8 rounded-lg">
                    {
                        contactDetails.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-row gap-2">
                                    <div className="pt-1">
                                        {item.icon}
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold">{item.heading}</h2>
                                        <p className="text-sm text-richblack-200">{item.description}</p>
                                        <p className="text-sm text-richblack-100 font-semibold">{item.details}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='w-[62%] flex flex-col items-start p-10 border border-richblack-600 rounded-lg'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-4xl font-semibold'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                        <p className='text-base text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>
                    </div>
                    <ContactForm />
                </div>
            </div>

            <div className='w-11/12 mx-auto mt-20 text-richblack-5'>
                <p className='text-4xl font-semibold text-center'>Reviews from other learners</p>
            </div>

            <ReviewSlider />
            <Footer />
        </div>
    )
}

export default ContactUs