import React, { useEffect } from 'react'
import { IoIosFlash } from "react-icons/io";
import RenderSteps from '../components/core/dashboard/RenderSteps';
import AddCourseForm from '../components/core/dashboard/AddCourseForm';
import { useDispatch, useSelector } from 'react-redux';
import CourseBuilder from '../components/core/dashboard/CourseBuilder';
import PublishCourse from '../components/core/dashboard/PublishCourse';
import { setCourse, setEditCourse, setStep } from '../slices/courseSlice';

const AddCourse = () => {

    const { step } = useSelector(state => state.course)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCourse(null))
        dispatch(setEditCourse(false))
        dispatch(setStep(1))
    }, [dispatch])

    return (
        <div>
            <div className='flex flex-row p-10 justify-between gap-10 text-richblack-5'>
                <div className='flex flex-col w-full gap-8'>
                    <h1 className='text-3xl font-semibold'>Add Course</h1>

                    <RenderSteps />

                    {step === 1 && <AddCourseForm />}

                    {step === 2 && <CourseBuilder />}

                    {step === 3 && <PublishCourse />}
                </div>

                <div className='max-xl:hidden jflex flex-col gap-4 bg-richblack-800 rounded-md max-w-96 h-fit border p-5'>
                    <h1 className='text-lg font-semibold flex items-center'>
                        <IoIosFlash className='text-yellow-50' size={24} />
                        <span>Course Upload Tips</span>
                    </h1>

                    <ul className='flex flex-col gap-2 list-disc text-xs ml-5'>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AddCourse