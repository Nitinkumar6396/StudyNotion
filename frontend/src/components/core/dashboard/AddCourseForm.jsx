import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import TagInput from './TagInput';
import RequirmentInput from "./RequirmentInput";
import { MdNavigateNext } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { addCourseDetails, editCourseDetails } from "../../../operations/courseDetailApi";
import { setCourse, setEditCourse, setStep } from "../../../slices/courseSlice";
import { useEffect, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import Upload from "./Upload";

const AddCourseForm = () => {

    const { categories } = useSelector(state => state.category)
    const dispatch = useDispatch()
    const { course, editCourse } = useSelector(state => state.course)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        if (editCourse && course) {
            setValue("courseTitle", course.courseName);
            setValue("courseDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseCategory", course.category._id);
            setValue("thumbnailImage", course.thumbnail);
            setValue("courseBenifits", course.whatYouWillLearn);
        }
        else {
            reset()
        }
    }, [editCourse, course, setValue, reset]);

    const formSubmitHandler = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true)

        const formData = new FormData()
        formData.append('courseName', data.courseTitle)
        formData.append('courseDescription', data.courseDesc)
        formData.append('price', data.coursePrice)
        formData.append('category', data.courseCategory)
        formData.append('whatYouWillLearn', data.courseBenifits)
        formData.append('tag', JSON.stringify(data.courseTag))
        formData.append('instruction', JSON.stringify(data.courseRequirement))
        formData.append('thumbnailImage', data.thumbnailImage)

        try {
            if (editCourse) {
                formData.append("courseId", course._id);
                const result = await dispatch(editCourseDetails(formData));
                if (result) {
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                }
            } else {
                const result = await dispatch(addCourseDetails(formData));
                if (result) {
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                }
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='border p-6 rounded-md bg-richblack-800'>
            <form onSubmit={handleSubmit(formSubmitHandler)} className='flex flex-col gap-6'>
                {/* Course Title */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor="courseTitle" className='text-sm'>Course Title <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        className='bg-richblack-900 rounded-md p-[.65rem]'
                        placeholder='Enter Course Title'
                        {...register('courseTitle', { required: 'Course Title is Required' })}
                    />
                    {errors.courseTitle && <span className='text-red-500 text-sm'>{errors.courseTitle.message}</span>}
                </div>

                {/* Course Description */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor="courseDesc" className='text-sm'>Enter Course Description <span className='text-red-500'>*</span></label>
                    <textarea
                        type="text"
                        rows={5}
                        className='bg-richblack-900 rounded-md p-[.65rem]'
                        placeholder='Enter Course Description'
                        {...register('courseDesc', { required: 'Course Description is Required' })}
                    />
                    {errors.courseDesc && <span className='text-red-500 text-sm'>{errors.courseDesc.message}</span>}
                </div>

                {/* Price */}
                <div className='flex flex-col gap-1 relative'>
                    <label htmlFor="coursePrice" className='text-sm'>Price <span className='text-red-500'>*</span></label>
                    <input
                        type="number"
                        inputMode='numeric'
                        className='bg-richblack-900 rounded-md pl-12 p-[.65rem] no-spinner'
                        placeholder='Enter Course Price'
                        {...register('coursePrice', { required: 'Course Price is Required' })}
                    />
                    {errors.coursePrice && <span className='text-red-500 text-sm'>{errors.coursePrice.message}</span>}
                    <HiOutlineCurrencyRupee className='absolute translate-y-8 translate-x-2 text-3xl text-richblack-200' />
                </div>

                {/* Category */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor="courseCategory" className='text-sm'>Category <span className='text-red-500'>*</span></label>
                    <select
                        name="courseCategory"
                        id="courseCategory"
                        defaultValue=""
                        className='bg-richblack-900 rounded-md p-[.65rem]'
                        {...register('courseCategory', { required: 'Course Category is Required' })}
                    >
                        <option value="" disabled>Choose a Category</option>
                        {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
                    </select>
                    {errors.courseCategory && <span className='text-red-500 text-sm'>{errors.courseCategory.message}</span>}
                </div>

                {/* Tags */}
                <Controller
                    name="courseTag"
                    control={control}
                    rules={{
                        required: "Tags are required",
                        validate: value => value.length > 0 || "At least one tag is required"
                    }}
                    render={({ field }) => (
                        <TagInput
                            value={field.value}
                            onChange={field.onChange}
                            errors={errors}
                        />
                    )}
                />

                {/* Thumbnail */}
                <Controller
                    name="thumbnailImage"
                    control={control}
                    rules={{ required: 'Course Thumbnail is required' }}
                    render={({ field }) => (
                        <Upload
                            value={field.value}
                            onChange={field.onChange}
                            errors={errors}
                            name="thumbnailImage"
                        />
                    )}
                />

                {/* Benefits */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor="courseBenifits" className="text-sm">Benefits of the course <span className="text-red-500">*</span></label>
                    <textarea
                        name="courseBenifits"
                        id="courseBenifits"
                        rows={5}
                        className='bg-richblack-900 rounded-md pl-12 p-[.65rem]'
                        {...register('courseBenifits', { required: 'Benefits of the Course are Required' })}
                    />
                    {errors.courseBenifits && <span className='text-red-500 text-sm'>{errors.courseBenifits.message}</span>}
                </div>

                {/* Requirements */}
                <Controller
                    name="courseRequirement"
                    control={control}
                    rules={{ required: 'Requirements/Instructions is Required ' }}
                    render={({ field }) => (
                        <RequirmentInput
                            value={field.value}
                            onChange={field.onChange}
                            errors={errors}
                        />
                    )}
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 w-full">
                    {editCourse && (
                        <button type="button" onClick={() => {
                            dispatch(setEditCourse(false))
                            dispatch(setStep(2))
                        }} className="bg-richblack-300 text-richblack-900 flex flex-row items-center py-2 px-3 gap-1 w-fit rounded-md font-semibold ">
                            Continue Without Saving
                        </button>
                    )}
                    <button
                        type='submit'
                        className={`bg-yellow-50 text-richblack-900 flex flex-row items-center py-2 px-3 gap-1 w-fit rounded-md font-semibold ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {editCourse ? <p>Save Changes</p> : <p>Next</p>}
                        {editCourse ? <VscSaveAs /> : <MdNavigateNext size={22} />}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCourseForm
