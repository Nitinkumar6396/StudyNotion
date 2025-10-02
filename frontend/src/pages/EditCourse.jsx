
import RenderSteps from '../components/core/dashboard/RenderSteps';
import AddCourseForm from '../components/core/dashboard/AddCourseForm';
import { useDispatch, useSelector } from 'react-redux';
import CourseBuilder from '../components/core/dashboard/CourseBuilder';
import PublishCourse from '../components/core/dashboard/PublishCourse';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../operations/courseDetailApi';
import { setCourse, setEditCourse, setStep } from '../slices/courseSlice';
import { Spinner } from './Spinner';

const EditCourse = () => {

    const { step } = useSelector(state => state.course)
    const { courseId } = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const data = await dispatch(getCourseDetails(courseId));
                dispatch(setCourse(data));
                dispatch(setEditCourse(true));
                dispatch(setStep(1));
            } catch (error) {
                console.error("Failed to fetch course:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId, dispatch]);

    // console.log(courseId)
    if(loading) return <Spinner />

    return (
        <div>
            <div className='p-5 lg:p-10 text-richblack-5'>
                <div className='flex flex-col w-full gap-8'>
                    <h1 className='text-3xl font-semibold'>Edit Course</h1>

                    <RenderSteps />

                    {step === 1 && <AddCourseForm />}

                    {step === 2 && <CourseBuilder />}

                    {step === 3 && <PublishCourse />}
                </div>

            </div>
        </div>
    )
}

export default EditCourse