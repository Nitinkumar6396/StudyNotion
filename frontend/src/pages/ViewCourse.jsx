import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"

import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"
import { getEnrolledCourses } from "../operations/profileApi"
import { Spinner } from "./Spinner"

export default function ViewCourse() {
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await getEnrolledCourses()

        if (!data || data.length === 0) {
          console.warn("No enrolled courses found")
          return
        }

        const courseData = data.find((course) => course._id === courseId)

        if (!courseData) {
          console.warn(`Course with ID ${courseId} not found`)
          return
        }

        dispatch(setCourseSectionData(courseData.courseContent || []))
        dispatch(setEntireCourseData(courseData))
        dispatch(setCompletedLectures(courseData.progressCompleted || []))
        dispatch(setTotalNoOfLectures(courseData.progressTotal || 0))
      } catch (error) {
        console.error("Error fetching enrolled courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [courseId, dispatch])

  if (loading) return <Spinner />

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        {/* Main Content */}
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
