import axios from "axios"
import { toast } from "react-toastify"

const base_url = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000"

// Fetch enrolled courses
export const getEnrolledCourses = async () => {
    // const toastId = toast.loading('Fetching enrolled courses')
    try {
        const response = await axios.get(`${base_url}/profile/enrolledCourses`, {
            withCredentials: true,
        })
        // toast.dismiss(toastId)
        return response.data
    } catch (error) {
        console.error("Error fetching enrolled courses:", error)
        toast.error(error.message || 'Something wrong while fetchig enrolled courses')
    }
}

export async function getInstructorData() {
  let result = []
  try {
    const response = await axios.get(`${base_url}/profile/instructorDashboard`,
        {withCredentials:true}
    )
    // console.log(response)
    result = response?.data?.courses
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
  }
  return result
}
