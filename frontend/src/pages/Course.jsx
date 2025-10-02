import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAverageRating, getCourseDetails } from '../operations/courseDetailApi'
import { useDispatch, useSelector } from 'react-redux'
import StarRatings from 'react-star-ratings'
import { LuClock8 } from "react-icons/lu";
import { GrCursor } from "react-icons/gr";
import { MdMobileFriendly } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";
import Footer from '../components/common/Footer'
import { buyCourses } from '../operations/paymentApi'
import { addToCart } from '../slices/cartSlice'
import { Spinner } from './Spinner'
import { toast } from 'react-toastify'

const Course = () => {

  const { courseId } = useParams()
  const [courseDetails, setCourseDetails] = useState(null)
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const navigate = useNavigate()
  const { user } = useSelector(state => state.profile)
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef([])

  const calSubSection = () => {
    let ans = 0
    courseDetails?.courseContent.map((section) => {
      ans += section.subSections.length
    })
    return ans
  }

  // console.log(courseDetails)

  useEffect(() => {
    (async () => {
      const res = await getAverageRating(courseId)
      setRating(res)
    })()
  }, [courseId])

  useEffect(() => {
    (
      async () => {
        const res = courseId ? await dispatch(getCourseDetails(courseId)) : ''
        // console.log(res)
        setCourseDetails(res)
      }
    )()
  }, [courseId, dispatch])

  const handleBuyCourses = async () => {
    setLoading(true)
    await buyCourses([courseId], navigate, user, setLoading)
    setLoading(false)
  }

  // console.log(courseDetails)

  const handleCollapseAll = () => {
    sectionRef.current.forEach(ref => {
      if (ref) {
        ref.open = false;
      }
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: courseDetails.courseName,
        text: "Check out this course I found!",
        url: window.location.href
      })
      .catch(err => {
          console.log("Error sharing:", err)
      })
    }
    else{
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  if (!courseDetails) return <Spinner />

  return courseDetails && (
    <>
      <div className='bg-richblack-800 text-richblack-5'>
        <div className='w-11/12 mx-auto py-10 flex flex-col relative'>

          <div className='flex flex-col gap-1 pr-2 min-[850px]:w-[calc(91vw-24rem)] min-[850px]:border-r border-richblack-600'>
            <p className='text-sm text-richblack-300 mb-2'>Home / Learning / <span className='text-yellow-50'>{courseDetails.category.name}</span></p>
            <h1 className='text-3xl font-medium'>{courseDetails.courseName}</h1>
            <p className='text-sm text-richblack-200'>{courseDetails.courseDescription}</p>

            <div className="flex gap-2 items-center">
              <span className='text-yellow-50'>{rating}</span>

              <div className="flex items-center pb-1">
                <StarRatings
                  rating={rating}
                  starRatedColor="#FFD60A"
                  starEmptyColor="#6E727F"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
              </div>

              <p className='text-richblack-50'><span>({courseDetails.ratingAndReviews.length}</span> Ratings)</p>
            </div>

            <p className='text-richblack-50'>Created by <span>{courseDetails.instructor.firstName} {courseDetails.instructor.lastName}</span></p>

          </div>

          <div className='bg-richblack-700 rounded-lg min-[850px]:absolute right-0 mt-14 min-[850px]:mt-0'>
            <img className='w-[22rem] max-h-48 rounded-t-lg hidden min-[850px]:block' src={courseDetails.thumbnail} alt="" />
            <div className='p-4 flex flex-col gap-4'>
              <p className='text-2xl font-semibold'>Rs. {courseDetails.price}</p>

              <button
                className='bg-yellow-50 px-5 py-2 rounded-lg hover:scale-95 transition-all duration-200 text-richblack-900'
                onClick={() =>
                  !courseDetails?.studentsEnrolled?.includes(user._id)

                    ? dispatch(addToCart(courseDetails))
                    : navigate(
                      `/view-course/${courseDetails._id}/section/${courseDetails.courseContent?.[0]?._id}/sub-section/${courseDetails.courseContent?.[0]?.subSections?.[0]?._id}`
                    )
                }
              >
                {courseDetails?.studentsEnrolled?.includes(user._id) ? 'Go to Course' : 'Add to Cart'}
              </button>

              {
                !courseDetails?.studentsEnrolled?.includes(user._id) &&
                <button
                  className={`bg-richblack-800 text-richblack-5 px-5 py-2 rounded-lg hover:scale-95 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={handleBuyCourses}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Buy now'}
                </button>
              }

              <p className='text-center'>30-Day Money-Back Guarantee</p>
              <div className='-mt-2'>
                <p>This course includes:</p>

                <p className='flex flex-row text-caribbeangreen-100 items-center gap-2 text-sm'><LuClock8 size={13} /> <span>8 hours on-demand video</span></p>

                <p className='flex flex-row text-caribbeangreen-100 items-center gap-2 text-sm'><GrCursor size={13} /> <span>Full Lifetime access</span></p>

                <p className='flex flex-row text-caribbeangreen-100 items-center gap-2 text-sm'><MdMobileFriendly size={13} /> <span>Access on Mobile and TV</span></p>
              </div>

              <button onClick={handleShare} className='flex flex-row gap-1 items-center justify-center text-yellow-100'>
                <FaShareFromSquare />
                <p>Share</p>
              </button>
            </div>
          </div>

        </div>
      </div >

      <div className='bg-richblack-900 text-richblack-5'>
        <div className='w-11/12 mx-auto py-10 flex flex-col'>
          <div className='min-[850px]:w-[calc(91vw-24rem)] border border-richblack-700 p-5'>
            <h1 className='text-3xl font-medium'>What you'll learn</h1>
            <p className='text-base text-richblack-50'>{courseDetails.whatYouWillLearn}</p>
          </div>

          <div className='mt-10 min-[850px]:w-[calc(91vw-24rem)]'>
            <h1 className='text-3xl font-medium'>Course content</h1>
            <div className='flex flex-row gap-2 justify-between'>
              <ul className='flex flex-row gap-6'>
                <li className='hidden min-[390px]:block'>{courseDetails.courseContent.length} Section(s)</li>
                <li className='flex items-center gap-2'><p className='w-1 h-1 rounded-full bg-white border hidden min-[390px]:block'></p> {calSubSection()} Lecture(s)</li>
              </ul>
              <button onClick={handleCollapseAll} className='text-yellow-50'>Collapse all sections</button>
            </div>
          </div>

          <div className="min-[850px]:w-[calc(91vw-24rem)] py-5">
            {courseDetails?.courseContent?.map((section, index) => (


              <details
                key={index}
                className="border border-richblack-700 group"
                ref={el => sectionRef.current[index] = el}
              >
                <summary className="flex justify-between items-center cursor-pointer p-4 bg-richblack-700 hover:bg-richblack-600 border-b border-richblack-400">
                  <span className="flex items-center gap-2" >
                    <FaChevronDown className="transition-transform group-open:rotate-180" />
                    {section.sectionName}
                  </span>
                  <span className='text-sm text-yellow-50' >
                    {section.subSections.length} Lecture(s)
                  </span>
                </summary>

                <div className="flex flex-col">
                  {section.subSections.map((subSection, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex justify-between items-center border-2 border-t-0 border-richblack-700 text-sm p-4 text-richblack-5 hover:bg-richblack-800 cursor-pointer"
                    >
                      <p className='flex flex-row gap-2 items-center'><IoVideocamOutline size={20} /> {subSection.title}</p>
                      <span className="text-xs text-richblack-100">{(subSection.timeDuration / 60).toFixed(1)} min</span>
                    </div>
                  ))}
                </div>
              </details>

            ))}
          </div>

          <div className='flex flex-col gap-2 min-[850px]:w-[calc(91vw-24rem)] mt-6'>
            <h1 className='text-3xl font-medium'>Author</h1>
            <div className='flex flex-row items-center gap-2'>
              <img className='w-10 h-10 rounded-full object-cover object-center' src={courseDetails.instructor.image} alt="" />
              <p>{courseDetails.instructor.firstName} {courseDetails.instructor?.lastName}</p>
            </div>
            <p className='text-sm text-richblack-50'>I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!</p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}

export default Course