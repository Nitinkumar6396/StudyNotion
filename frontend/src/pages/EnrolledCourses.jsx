import { useEffect, useState } from "react"
import { getEnrolledCourses } from "../operations/profileApi"
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner";

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

  // console.log(courses)

  if (loading) return <Spinner />

  return (
    <div className="p-10 text-richblack-5">
      <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>

      <div className="bg-gray-700 rounded-t-lg overflow-hidden">
        <div className="grid grid-cols-[3fr_1fr_1fr] py-3 pl-4 pr-10 font-semibold text-sm">
          <span className="">Course Name</span>
          <span>Duration</span>
          <span>Progress</span>
        </div>
      </div>

      <div className="bg-gray-900 divide-y divide-gray-700 rounded-b-lg">
        {courses.length === 0 ? (
          <p className="p-4 text-richblack-200">No courses enrolled yet.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="p-4 pr-10"
            >
              <div
                className="cursor-pointer grid grid-cols-[3fr_1fr_1fr] gap-3 items-center"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSections?.[0]?._id}`
                  )
                }}
              >
                {/* Course info */}
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail || "/placeholder.png"}
                    alt={course.courseName}
                    className="w-28 h-16 rounded-md object-cover object-center"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-richblack-200">
                      {course.courseDescription?.substring(0, 40)}...
                    </p>
                  </div>
                </div>

                {/* Duuation */}
                <div>
                  {course.totalDuration || '0m'}
                </div>

                {/* Progress */}
                <div className="flex flex-col">
                  <span className="text-sm mb-1">
                    Completed:{" "}
                    {course.progressCompleted || 0} /{" "}
                    {course.progressTotal || 0}
                  </span>
                  <ProgressBar completed={course.progressPercentage} bgColor="green" maxCompleted={100} isLabelVisible={false} height={8} />
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
