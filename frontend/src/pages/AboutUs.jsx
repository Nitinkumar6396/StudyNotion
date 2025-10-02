import React from "react"
import HighlightText from "../components/core/HomePage/HighlightText"
import image1 from "../assets/Images/aboutus1.webp"
import image2 from "../assets/Images/aboutus2.webp"
import image3 from "../assets/Images/aboutus3.webp"
import foundingStoryImage from "../assets/Images/FoundingStory.png"
import StatsComponent from "../components/core/aboutPage/StatsComponent"
import LearningGrid from "../components/core/aboutPage/LearningGrid"
import ContactForm from "../components/core/aboutPage/ContactForm"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"

const AboutUs = () => {
  return (
    <div className="flex flex-col bg-richblack-900 text-richblack-5">
      
      {/* Hero Section */}
      <div className="flex flex-col bg-richblack-800">
        <div className="w-11/12 mx-auto">
          <div className="flex flex-col justify-center items-center mt-20 relative">
            <div className="flex flex-col gap-3 text-center md:max-w-[70%] mx-auto">
              <h1 className="text-4xl font-semibold">
                Driving Innovation in Online Education for a{" "}
                <HighlightText text="Brighter Future" />
              </h1>
              <p className="text-base text-richblack-300">
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </p>
            </div>

            <div className="flex flex-row justify-center gap-4 -mt-10 translate-y-20">
              <img src={image1} alt="About 1" className="w-[32%]" />
              <img src={image2} alt="About 2" className="w-[32%]" />
              <img src={image3} alt="About 3" className="w-[32%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="border-b-[1.5px] border-richblack-800">
        <div className="w-11/12 mx-auto mt-20 text-xl sm:text-3xl md:text-4xl font-semibold text-center py-20 leading-snug">
          <span className="text-richblack-300">"</span>
          We are passionate about revolutionizing the way we learn. Our
          innovative platform <HighlightText text="combines technology" />,
          <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text"> expertise</span>, and community to
          create an
          <span className="bg-gradient-to-b from-[#ff6803] to-[#F9D423] text-transparent bg-clip-text">
            {" "}
            unparalleled educational experience.
          </span>
          <span className="text-richblack-300">"</span>
        </div>
      </div>

      {/* Founding Story + Vision + Mission */}
      <div className="w-11/12 mx-auto flex flex-col">
        <div className="flex flex-col lg:flex-row gap-20 py-20 justify-between">
          {/* Founding Story */}
          <div className="lg:w-[48%] flex flex-col justify-center gap-3">
            <h1 className="text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text">
              Our Founding Story
            </h1>
            <p className="text-base text-richblack-300 font-medium">
              Our e-learning platform was born out of a shared vision and passion
              for transforming education. It all began with a group of educators,
              technologists, and lifelong learners who recognized the need for
              accessible, flexible, and high-quality learning opportunities in a
              rapidly evolving digital world.
            </p>
            <p className="text-base text-richblack-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned a
              platform that could bridge these gaps and empower individuals from
              all walks of life to unlock their full potential.
            </p>
          </div>

          <div className="lg:w-[40%] flex justify-center items-center">
            <img src={foundingStoryImage} alt="Founding Story" />
          </div>
        </div>

        {/* Vision + Mission */}
        <div className="flex flex-col lg:flex-row gap-20 py-20 justify-between items-center">
          <div className="flex flex-col gap-4 lg:w-[40%]">
            <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
              Our Vision
            </h1>
            <p className="text-base text-richblack-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a robust
              and intuitive platform that combines cutting-edge technology with
              engaging content, fostering a dynamic and interactive learning
              experience.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:w-[40%]">
            <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
              Our Mission
            </h1>
            <p className="text-base text-richblack-300">
              Our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and we
              foster this spirit of collaboration through forums, live sessions,
              and networking opportunities.
            </p>
          </div>
        </div>
      </div>

      <StatsComponent />

      {/* Learning Grid Section */}
      <LearningGrid />

      {/* Contact Section */}
      <div className="mx-auto w-11/12 text-center flex flex-col justify-center items-center mt-12">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-semibold">Get in Touch</h1>
          <p className="text-base text-richblack-300">
            We’d love to hear from you, please fill out this form.
          </p>
        </div>

        <div className="w-full sm:w-[35rem] mt-6">
          <ContactForm />
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-20 w-11/12 mx-auto text-richblack-5">
        <p className="text-4xl font-semibold text-center">
          Reviews from other learners
        </p>
      </div>

      <ReviewSlider />

      <Footer />
    </div>
  )
}

export default AboutUs
