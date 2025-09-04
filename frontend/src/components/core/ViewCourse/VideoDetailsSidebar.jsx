import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"
import axios from "axios"
import { setCompletedLectures } from "../../../slices/viewCourseSlice"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState(null)
  const [videoBarActive, setVideoBarActive] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { sectionId, subSectionId } = useParams()
  const base_url = import.meta.env.VITE_APP_BASE_URL;

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (!courseSectionData?.length) return
    // console.log(courseEntireData)

    const currentSectionIndx = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    )

    if (currentSectionIndx === -1) return

    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSections?.findIndex(
      (sub) => sub._id === subSectionId
    );

    (async () => {
      // console.log(courseEntireData._id)
      const res = await axios.get(`${base_url}/course/getCourseProgress`, {
        params: { courseId: courseEntireData._id },
        withCredentials: true
      })

      if (res.data.success) {
        // console.log(...res.data.data.completedVideos)
        dispatch(setCompletedLectures(res.data.data.completedVideos))
      }
    })()

    // console.log(completedLectures)

    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSections?.[currentSubSectionIndx]?._id

    setActiveStatus(courseSectionData[currentSectionIndx]?._id)
    // console.log(activeSubSectionId)
    setVideoBarActive(activeSubSectionId || null)
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId, base_url, dispatch])

  // console.log(videoBarActive)

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-r-richblack-700 bg-richblack-800">
      {/* Header */}
      <div className="mx-5 flex flex-col gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        <div className="flex w-full items-center justify-between">
          {/* Back button */}
          <div
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-800 hover:scale-90 cursor-pointer"
            title="Back"
          >
            <IoIosArrowBack size={20} strokeWidth={33} />
          </div>

          {/* Review Button */}
          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>

        {/* Course Title + Progress */}
        <div className="flex flex-col">
          <p>{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richblack-300">
            {completedLectures?.length || 0} / {totalNoOfLectures || 0}
          </p>
        </div>
      </div>

      {/* Sections + Subsections */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto">
        {courseSectionData?.map((course, index) => (
          <div
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            key={course._id || index}
          >
            {/* Section Header */}
            <div
              className="flex flex-row justify-between bg-richblack-600 px-5 py-4"
              onClick={() => setActiveStatus(course?._id)}
            >
              <div className="w-[70%] font-semibold">{course?.sectionName}</div>
              <div className="flex items-center gap-3">
                <span
                  className={`transition-transform duration-500 ${activeStatus === course?._id ? "rotate-0" : "rotate-180"
                    }`}
                >
                  <BsChevronDown />
                </span>
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === course?._id && (
              <div className="transition-[height] duration-500 ease-in-out">
                {course?.subSections?.map((topic) => (
                  <div
                    className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id
                      ? "bg-yellow-800 font-semibold"
                      : "hover:bg-richblack-900"
                      }`}
                    key={topic._id}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.length && completedLectures?.includes(topic?._id)}
                    />
                    {topic.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
