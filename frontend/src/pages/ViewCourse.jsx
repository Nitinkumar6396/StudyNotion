import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { FaBars } from "react-icons/fa"

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const { data } = await getEnrolledCourses()
                if (!data || data.length === 0) return

                const courseData = data.find((course) => course._id === courseId)
                if (!courseData) return

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
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Sidebar */}
                <VideoDetailsSidebar
                    setReviewModal={setReviewModal}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* Main Content */}
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-auto w-11/12 max-w-[1000px] py-6">
                        {/* Mobile-only Hamburger Menu */}
                        <button
                            className="lg:hidden -mt-3 mb-2 text-richblack-100 rounded-md hover:bg-richblack-700 transition"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <FaBars size={22} />
                        </button>
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </>
    )
}
