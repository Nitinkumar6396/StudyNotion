import { FaCaretDown } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { createSection, deleteSection, deleteSubSection, editSection } from '../../../operations/courseDetailApi';
import { RiMenuUnfoldFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { setEditCourse, setStep } from "../../../slices/courseSlice";
import { useState } from "react";
import ConfirmationModal from "../../common/ConfirmationModal";
import LectureModal from "./LectureModal";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

const CourseBuilder = () => {
    const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm()
    const { course, editCourse } = useSelector(state => state.course)
    const dispatch = useDispatch()

    const [confirmationModal, setConfirmationModal] = useState(null)
    const [lectureModal, setLectureModal] = useState(null)
    const [view, setView] = useState(false)
    const [subsection, setSubsection] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitHandler = async (data) => {
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            if (editCourse) {
                await dispatch(editSection(data))
                dispatch(setEditCourse(false))
                reset()
            } else {
                const formData = new FormData()
                formData.append('courseId', course._id)
                formData.append('sectionName', data.sectionName)
                await dispatch(createSection(formData))
                reset()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const updateSection = async (section) => {
        dispatch(setEditCourse(true))
        setValue('sectionID', section._id)
        setValue('sectionName', section.sectionName)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4 bg-richblack-800 px-4 py-2 sm:px-6 sm:py-4 rounded-md'>
                <h1 className='text-2xl font-semibold'>Course Builder</h1>

                {/* Section Name Input */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor="sectionName" className='text-sm'>Section Name <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        className='bg-richblack-900 rounded-md p-[.65rem]'
                        placeholder='Add a section to build your course'
                        {...register('sectionName', { required: 'Section Name is Required' })}
                        disabled={isSubmitting}
                    />
                    {errors.sectionName && <span className='text-red-500 text-sm'>{errors.sectionName.message}</span>}
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="flex flex-row gap-3 items-end">
                    <button
                        type='submit'
                        className={`flex flex-row py-2 px-3 gap-1 items-center text-yellow-50 border-[1.3px] border-yellow-50 rounded-md w-fit ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        <IoMdAddCircleOutline />
                        {editCourse ? <p>Update Section Name</p> : <p>Create Section</p>}
                    </button>

                    {editCourse && (
                        <button
                            type="button"
                            className={`text-richblack-300 underline ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            onClick={() => {
                                dispatch(setEditCourse(false))
                                reset()
                            }}
                            disabled={isSubmitting}
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

                {/* Course Content List */}
                <div className='bg-richblack-700 px-3 pb-8 rounded-md'>
                    {course?.courseContent?.length > 0 &&
                        course.courseContent.map((section) => (
                            <details key={section._id}>
                                <summary className='flex flex-row items-center justify-between cursor-pointer py-3 border-b' >
                                    <div className='flex flex-row gap-2 items-center'>
                                        <RiMenuUnfoldFill className='text-richblack-200' strokeWidth={1.5} />
                                        <p className="font-semibold text-richblack-50">{section.sectionName}</p>
                                    </div>

                                    <div className='flex flex-row gap-2 items-center'>
                                        <button
                                            type="button"
                                            onClick={() => updateSection(section)}
                                            disabled={isSubmitting}
                                        >
                                            <MdEdit className='text-richblack-200 hover:text-blue-300 text-lg' />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setConfirmationModal({
                                                text1: 'Delete this Section ?',
                                                text2: 'All the lectures in this section will be deleted',
                                                btn1: {
                                                    text: <div className='flex flex-row gap-2 items-center'><p>Delete</p><RiDeleteBin5Line /></div>,
                                                    handler: async () => {
                                                        setIsSubmitting(true)
                                                        await dispatch(deleteSection(section._id))
                                                        reset()
                                                        setConfirmationModal(null)
                                                        setIsSubmitting(false)
                                                    }
                                                },
                                                btn2: { text: 'Cancel', handler: () => setConfirmationModal(null) }
                                            })}
                                            disabled={isSubmitting}
                                        >
                                            <RiDeleteBin5Line className='text-richblack-200 text-lg hover:text-red-500' />
                                        </button>

                                        <span className="text-richblack-400">|</span>
                                        <FaCaretDown className="text-richblack-200" />
                                    </div>
                                </summary>

                                <div className="px-4">
                                    {section?.subSections.length > 0 &&
                                        section.subSections.map((subSection) => (
                                            <details key={subSection._id}>
                                                <summary
                                                    onClick={(e) => {
                                                        if (e.target.closest("button")) return;
                                                        setView(true)
                                                        setSubsection(subSection)
                                                    }}
                                                    className='flex flex-row items-center justify-between cursor-pointer py-3 border-b' 
                                                >
                                                    <div className='flex flex-row gap-1 items-center'>
                                                        <RiMenuUnfoldFill className='text-richblack-200' strokeWidth={1.5} />
                                                        <p className="text-richblack-50 font-semibold">{subSection.title}</p>
                                                    </div>

                                                    <div className='flex flex-row gap-2 items-center'>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                dispatch(setEditCourse(true))
                                                                setLectureModal(section._id)
                                                                setSubsection(subSection)
                                                            }}
                                                            disabled={isSubmitting}
                                                        >
                                                            <MdEdit className='text-richblack-200 hover:text-blue-300 text-lg' />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setConfirmationModal({
                                                                text1: 'Delete this Sub-Section ?',
                                                                text2: 'Selected lecture will be deleted',
                                                                btn1: {
                                                                    text: <div className='flex flex-row gap-2 items-center'><p>Delete</p><RiDeleteBin5Line /></div>,
                                                                    handler: async () => {
                                                                        setIsSubmitting(true)
                                                                        await dispatch(deleteSubSection(subSection._id, section._id))
                                                                        reset()
                                                                        setConfirmationModal(null)
                                                                        setIsSubmitting(false)
                                                                    }
                                                                },
                                                                btn2: { text: 'Cancel', handler: () => setConfirmationModal(null) }
                                                            })}
                                                            disabled={isSubmitting}
                                                        >
                                                            <RiDeleteBin5Line className='text-richblack-200 text-lg hover:text-red-500' />
                                                        </button>
                                                    </div>
                                                </summary>
                                            </details>
                                        ))
                                    }
                                    <button
                                        type="button"
                                        className="flex mt-2 mb-8 flex-row gap-1 items-center text-yellow-50 font-semibold"
                                        onClick={() => setLectureModal(section._id)}
                                        disabled={isSubmitting}
                                    >
                                        <FaPlus />
                                        <p>Add Lecture</p>
                                    </button>
                                </div>
                            </details>
                        ))
                    }
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-row gap-4 justify-end">
                    <button
                        onClick={() => {
                            dispatch(setStep(1))
                            dispatch(setEditCourse(true))
                        }}
                        type="button"
                        className="flex flex-row items-center rounded-md px-3 py-2 bg-richblack-300 text-richblack-900 font-semibold"
                        disabled={isSubmitting}
                    >
                        <IoCaretBack />
                        <p>Back</p>
                    </button>

                    <button
                        onClick={() => dispatch(setStep(3))}
                        type="button"
                        className="flex flex-row items-center rounded-md px-3 py-2 bg-yellow-50 text-richblack-900 font-semibold"
                        disabled={isSubmitting}
                    >
                        <p>Next</p>
                        <IoCaretForward />
                    </button>
                </div>
            </form>

            {(view || lectureModal || editCourse) &&
                <LectureModal
                    view={view}
                    subSection={subsection}
                    setView={setView}
                    sectionId={lectureModal}
                    setLectureModal={setLectureModal}
                    setEditCourse={setEditCourse}
                    editCourse={editCourse}
                />
            }

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CourseBuilder
