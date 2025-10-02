import { useEffect, useState } from "react"
import { getEnrolledCourses } from "../operations/profileApi"
import ProgressBar from "@ramonak/react-progress-bar"
import { useNavigate } from "react-router-dom"
import { Spinner } from "./Spinner"

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getEnrolledCourses()
        if (res.success) setCourses(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-6 text-richblack-5">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Enrolled Courses</h2>

      {/* Table Header */}
      <div className="bg-gray-700 rounded-t-lg overflow-hidden hidden sm:grid grid-cols-[3fr_1fr_1fr] py-3 pl-4 pr-6 font-semibold text-sm">
        <span>Course Name</span>
        <span>Duration</span>
        <span>Progress</span>
      </div>

      {/* Courses List */}
      <div className="bg-gray-900 divide-y divide-gray-700 rounded-b-lg">
        {courses.length === 0 ? (
          <p className="p-4 text-richblack-200">No courses enrolled yet.</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="p-4 sm:pr-6">
              <div
                className="cursor-pointer flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-4 sm:gap-3 items-start sm:items-center"
                onClick={() =>
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSections?.[0]?._id}`
                  )
                }
              >
                {/* Course info */}
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail || "/placeholder.png"}
                    alt={course.courseName}
                    className="w-full max-w-[6rem] h-16 sm:w-28 sm:h-16 rounded-md object-cover object-center"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-sm sm:text-base">{course.courseName}</h3>
                    <p className="text-xs sm:text-sm text-richblack-200">
                      {course.courseDescription?.substring(0, 40)}...
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="sm:flex sm:items-center max-sm:hidden">
                  <span className="text-sm">{course.totalDuration || '0m'}</span>
                </div>

                {/* Progress */}
                <div className="flex flex-col mt-2 max-sm:hidden sm:mt-0">
                  <span className="text-xs sm:text-sm mb-1">
                    Completed: {course.progressCompleted || 0} / {course.progressTotal || 0}
                  </span>
                  <ProgressBar
                    completed={course.progressPercentage}
                    bgColor="green"
                    maxCompleted={100}
                    isLabelVisible={false}
                    height={8}
                  />
                </div>

                <div className="sm:hidden w-full flex flex-row items-center gap-10">
                  <div className="sm:flex sm:items-center">
                    <span className="text-sm">{course.totalDuration || '0m'}</span>
                  </div>

                  {/* Progress */}
                  <div className="flex flex-col mt-2 sm:mt-0">
                    <span className="text-xs sm:text-sm mb-1">
                      Completed: {course.progressCompleted || 0} / {course.progressTotal || 0}
                    </span>
                    <ProgressBar
                      completed={course.progressPercentage}
                      bgColor="green"
                      maxCompleted={100}
                      isLabelVisible={false}
                      height={8}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EnrolledCourses
