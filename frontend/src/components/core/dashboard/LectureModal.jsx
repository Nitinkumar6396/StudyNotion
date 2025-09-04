import { RxCross2 } from "react-icons/rx";
import Upload from './Upload'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, editSubSection } from "../../../operations/courseDetailApi";
import { useEffect } from "react";
import { setEditCourse } from "../../../slices/courseSlice";

const LectureModal = ({ sectionId, setView, view, subSection, setLectureModal}) => {

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm()
  const dispatch = useDispatch()
  const { editCourse } = useSelector(state => state.course)

  useEffect(() => {
    if (view || editCourse) {
      setValue('title', subSection.title)
      setValue('description', subSection.description)
      setValue('videoFile', subSection.videoUrl)
    }
  }, [setValue, view, subSection, editCourse])

  const submitHandler = async (data) => {
    const formData = new FormData();
    if (editCourse) formData.append('SubSectionId', subSection._id)
    formData.append("sectionId", sectionId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile);

    if (editCourse) {
      await dispatch(editSubSection(formData))
      dispatch(setEditCourse(false))
      setLectureModal(null)
      return
    }

    await dispatch(createSubSection(formData));
    setLectureModal(null)
  }

  // console.log(editCourse)
  // console.log(subSection)


  return (
    <div className="w-screen min-h-screen absolute bg-richblack-900/50 left-0 top-0 backdrop-blur-sm z-10 flex justify-center items-center">
      <div className='flex flex-col gap-4 w-[55vw] rounded-md bg-richblack-800 mt-6'>
        <div className="flex flex-row justify-between rounded-t-md text-3xl px-6 py-2 font-semibold bg-richblack-700">
          <h1 className="">Adding Lecture</h1>
          <button type="button" onClick={() => {
            if (view) setView(false)
            else if (editCourse) {
              dispatch(setEditCourse(false))
              setLectureModal(null)
            }
            else setLectureModal(null)
          }}>
            <RxCross2 />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4 px-6 py-2">
          {/* <Upload register={register} setValue={setValue} errors={errors} watch={watch} name="videoFile" view={view} editCourse={editCourse} /> */}

          <Controller
            name="videoFile"
            control={control}
            rules={{ required: 'Lecture Video is required' }}
            render={({field}) => (
              <Upload
                value={field.value}
                onChange={field.onChange}
                errors={errors}
                name="videoFile"
                view={view}
              />
            )}
          />

          <div className='flex flex-col gap-1'>
            <label htmlFor="title" className='text-sm'>Lecture Title <span className='text-red-500'>*</span></label>
            <input
              disabled={view}
              type="text"
              name='title'
              id='title'
              className='bg-richblack-900 rounded-md p-[.65rem]'
              placeholder='Enter Lecture Title'
              {...register('title', { required: 'Lecture Title is Required' })}
            />
            {
              errors.title && <span className='text-red-500 text-sm'>{errors.title.message}</span>
            }
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="description" className='text-sm'>Lecture Description <span className='text-red-500'>*</span></label>
            <textarea
              disabled={view}
              type="text"
              name='description'
              id='description'
              rows={3}
              className='bg-richblack-900 rounded-md p-[.65rem]'
              placeholder='Enter Lecture Description'
              {...register('description', { required: 'Lecture Description is Required' })}
            />
            {errors.description && <span className='text-red-500 text-sm'>{errors.description.message}</span>}
          </div>

          {
            view || <div className="flex justify-end gap-3 w-full">
              <button type='submit' className="bg-yellow-50 text-richblack-900 flex flex-row items-center py-2 px-3 gap-1 w-fit rounded-md font-semibold ">
                Save
              </button>
            </div>
          }

        </form>
      </div>
    </div>
  )
}

export default LectureModal