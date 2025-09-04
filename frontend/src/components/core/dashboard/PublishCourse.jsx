import { useEffect, useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { VscSaveAs } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../operations/courseDetailApi";

const PublishCourse = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { course } = useSelector(state => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (course) {
      setIsPublic(course.status !== 'Drafted');
    }
  }, [course]);

  const handleChanges = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const status = isPublic ? 'Published' : 'Drafted';

      if (course && course.status === status) {
        navigate('/dashboard/my-courses');
        return;
      }

      const formData = new FormData();
      formData.append('courseId', course._id);
      formData.append('status', status);

      const result = await dispatch(editCourseDetails(formData));
      dispatch(setCourse(result));
      navigate('/dashboard/my-courses');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border bg-richblack-800 p-6 rounded-md">
        <h1 className='text-3xl font-semibold'>Publish Settings</h1>

        <div className='flex flex-row gap-2 items-center text-richblack-400 font-medium'>
          <input
            className="scale-125"
            type="checkbox"
            name="status"
            id="status"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            disabled={isSubmitting}
          />
          <label htmlFor="status" className='cursor-pointer'>Make this Course Public</label>
        </div>

        <div className="flex flex-row gap-4 justify-end">
          <button
            type="button"
            className="flex flex-row items-center rounded-md px-3 py-2 bg-richblack-300 text-richblack-900 font-semibold"
            onClick={() => dispatch(setStep(2))}
            disabled={isSubmitting}
          >
            <IoCaretBack />
            <p>Back</p>
          </button>

          <button
            type="button"
            className={`flex flex-row gap-1 items-center rounded-md px-3 py-2 bg-yellow-50 text-richblack-900 font-semibold ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleChanges}
            disabled={isSubmitting}
          >
            <p>{isSubmitting ? 'Saving...' : 'Save Changes'}</p>
            <VscSaveAs size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishCourse;
