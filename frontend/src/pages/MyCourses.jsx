import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { deleteCourse, getInstructorCourses } from '../operations/courseDetailApi';
import { FaCheckCircle } from "react-icons/fa";
import { PiClockFill } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom'
import ConfirmationModal from '../components/common/ConfirmationModal';
import { setCourse, setEditCourse, setStep } from '../slices/courseSlice';
import { Spinner } from './Spinner';

const MyCourses = () => {

  const [courses, setCourses] = useState(null)
  const dispatch = useDispatch()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const result = await dispatch(getInstructorCourses())
      setCourses(result.reverse())
      setLoading(false)
    }
    fetchCourses()
  }, [confirmationModal, dispatch])

  useEffect(() => {
    dispatch(setCourse(null))
    dispatch(setStep(1))
  }, [dispatch])

  // console.log(courses)
  // console.log(Date.now())

  if(loading) return <Spinner />

  return (
    <div>
      <div className='p-10 flex flex-col gap-4'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-xl sm:text-3xl font-semibold'>My Course</h1>
          <Link to={'/dashboard/add-course'} className='flex flex-row gap-1 bg-yellow-50 text-richblack-900 font-semibold px-3 py-2 rounded-md items-center'>
            <p>Add Course</p>
            <FaPlus />
          </Link>
        </div>

        <div className='border border-richblack-500'>
          <div className='max-[535px]:hidden grid grid-cols-[6fr_1fr_1fr] uppercase py-2 border-b border-richblack-500 gap-4'>
            <p className='px-6'>Courses <span className='text-richblack-100'>({courses?.length})</span></p>
            <p className='px-6'>Price</p>
            <p className='px-6'>Actions</p>
          </div>

          {
            courses && courses.length > 0
              ? courses.map((course, index) => {
                const date = new Date(course.createdAt)

                const day = String(date.getDate()).padStart(2, '0'); // 01-31
                const month = String(date.getMonth() + 1).padStart(2, '0'); // 01-12
                const year = date.getFullYear();

                const hours = String(date.getHours()).padStart(2, '0'); // 00-23
                const minutes = String(date.getMinutes()).padStart(2, '0');

                return (
                  <div key={index} className='grid min-[535px]:grid-cols-[6fr_1fr_1fr] py-8 gap-4 border-b border-richblack-500'>
                    <div className='flex flex-col md:flex-row gap-4 px-6'>
                      <img className='w-56 max-h-36 rounded-lg' src={course.thumbnail} alt="" />

                      <div className='flex flex-col gap-1'>
                        <div className='flex flex-col'>
                          <h1 className='text-xl font-semibold'>{course.courseName}</h1>
                          <p className='text-sm max-lg:hidden text-richblack-100'>{course.courseDescription}</p>
                        </div>

                        <div className='flex flex-col gap-1'>
                          <p className='text-richblack-25'>Created: {day}-{month}-{year} <span className='text-xl'>|</span> {hours}:{minutes}</p>
                          <div className={`flex flex-row items-center gap-1 text-sm py-1 bg-richblack-700 w-fit px-3 rounded-full ${course.status === 'Drafted' ? "text-pink-100" : "text-yellow-50"}`}>
                            {course.status === 'Drafted' ? <PiClockFill /> : <FaCheckCircle />}
                            <p>{course.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className='px-6 flex items-center'>Rs. {course.price}</p>

                    <div className='flex flex-row gap-4 px-6 text-lg items-center'>
                      <button
                        type='button'
                        onClick={() => {
                          dispatch(setEditCourse(true))
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                        className='hover:text-blue-400 text-xl hover:scale-110 h-fit'>
                        <MdEdit />
                      </button>

                      <button
                        onClick={() => setConfirmationModal({
                          text1: 'Do you want to delete this course ?',
                          text2: 'All the data related to this course will be deleted',
                          btn1: {
                            text:
                              <div className='flex flex-row gap-2 items-center'>
                                <p>Delete</p>
                                <RiDeleteBin5Line />
                              </div>,
                            handler: async () => {
                              await dispatch(deleteCourse(course._id))
                              setConfirmationModal(null)
                            }

                          },
                          btn2: {
                            text: 'Cancel',
                            handler: () => setConfirmationModal(null)
                          }
                        })}
                        className='hover:text-red-500 hover:scale-110 h-fit'>
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </div>
                )
              })
              : <div className='h-24 flex justify-center items-center text-lg'>
                <p>You didn't create any course yet.</p>
              </div>
          }
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    </div>
  )
}

export default MyCourses