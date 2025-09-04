import axios from 'axios';
import { toast } from 'react-toastify';
import { setCourse, setEditCourse } from '../slices/courseSlice';
const base_url = import.meta.env.VITE_APP_BASE_URL;




export const addCourseDetails = (formData) => async () => {
    let result = null
    const toastId = toast.loading('Adding course details...')
    try {

        // console.log(data)
        const response = await axios.post(`${base_url}/course/createCourse`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            },
        )

        if (!response?.data?.message) {
            throw new Error('Could Not Add Course Details');
        }

        toast.success('Course Details Added')
        result = response?.data?.data
    } catch (error) {
        console.log('Error while creating course:', error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = (formData) => {
    return async (dispatch) => {
        // console.log(...formData)
        const toastId = toast.loading("Updating course...");
        let result = null;
        try {
            const response = await axios.put(
                `${base_url}/course/editCourse`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!response?.data?.success) {
                throw new Error("Failed to update course");
            }

            dispatch(setEditCourse(false))
            toast.success("Course Updated");
            result = response.data.data;
        } catch (error) {
            toast.error(error.message);
        }
        toast.dismiss(toastId);
        return result;
    };
};

export const createSection = (formData) => {
    return async (dispatch) => {
        const toastId = toast.loading('Creating section...')
        try {
            const response = await axios.post(`${base_url}/course/createSection`, formData, { withCredentials: true });

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Section creation failed");
            }

            dispatch(setCourse(response.data.updatedCourse))
            toast.success("Section created successfully");

        } catch (error) {
            console.log("CREATE_SECTION_API ERROR:", error);
            toast.error("Failed to create section");
        }
        toast.dismiss(toastId)
    };
};

export const editSection = (formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Updating section...");
        try {
            // console.log(formData)
            const response = await axios.put(
                `${base_url}/course/updateSection`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setCourse(response.data.updatedCourse))
            toast.success("Section updated successfully");

        }
        catch (error) {
            console.error("EDIT_SECTION_ERROR:", error);
            toast.error(error?.response?.data?.message || "Could not update section");
        }
        toast.dismiss(toastId);
    };
};

export const deleteSection = (sectionID) => {
    return async (dispatch) => {

        const toastId = toast.loading("Deleting section...");
        try {

            const response = await axios.delete(
                `${base_url}/course/deleteSection`,
                {
                    data: { sectionID },
                    withCredentials: true
                }
            );

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Section deletion failed");
            }

            console.log(response.data)
            console.log(response.data.updatedCourse)

            dispatch(setCourse(response.data.updatedCourse));
            toast.success("Section deleted successfully");
        } catch (error) {
            console.log("delete_SECTION_API ERROR:", error);
            toast.error("Failed to delete section");
        }

        toast.dismiss(toastId);
    };
};

export const createSubSection = (formData) => {
    return async (dispatch) => {
        const toastId = toast.loading('Adding lecture...')
        try {
            // console.log('before api call')
            const response = await axios.post(
                `${base_url}/course/createSubSection`,
                formData,
                { withCredentials: true }
            )
            // console.log('after api call')

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || 'Lecture creation failed')
            }

            dispatch(setCourse(response.data.updatedCourse))
            toast.success("Lecture added successfully")

        } catch (error) {
            console.log("CREATE_SUB_SECTION_API ERROR:", error)
            toast.error(error?.response?.data?.message || "Failed to add lecture")
        } finally {
            toast.dismiss(toastId)
        }
    }
}

export const editSubSection = (formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Updating lecture...");
        try {
            // console.log(formData)
            const response = await axios.put(
                `${base_url}/course/updateSubSection`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setCourse(response.data.updatedCourse))
            toast.success("Lecture updated successfully");

        }
        catch (error) {
            console.error("EDIT_SUB-SECTION_ERROR:", error);
            toast.error(error?.response?.data?.message || "Could not update lecture");
        }
        toast.dismiss(toastId);
    };
};

export const deleteSubSection = (subSectionId, sectionId) => {
    return async (dispatch) => {

        const toastId = toast.loading("Deleting lecture...");
        try {

            const response = await axios.delete(
                `${base_url}/course/deleteSubSection`,
                {
                    data: { subSectionId, sectionId },
                    withCredentials: true
                }
            );

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Lecture deletion failed");
            }

            // console.log(response.data)
            // console.log(response.data.updatedCourse)

            dispatch(setCourse(response.data.updatedCourse));
            toast.success("Lecture deleted successfully");
        } catch (error) {
            console.log("delete_lecture_API ERROR:", error);
            toast.error("Failed to delete lecture");
        }

        toast.dismiss(toastId);
    };
};

export const getAllCourses = () => {
    return async () => {
        try {

            const response = await axios.get(`${base_url}/course/showAllCourses`);

            console.log(response.data.data)

            if (response?.data?.data) return response.data.data;

            console.log('Unexpected response:', response.data);
        } catch (error) {
            console.error('Error fetching all courses:', error);
        }
    }
}

export const getInstructorCourses = () => {
    return async () => {
        try {

            const response = await axios.get(`${base_url}/course/getInstructorCourses`, { withCredentials: true });

            // console.log(response.data.data)
            if (response?.data?.data) return response.data.data;

            console.log('Unexpected response:', response.data);
        } catch (error) {
            console.error('Error fetching instructor courses:', error);
        }
    }
}

export const deleteCourse = (courseId) => {
    return async () => {

        const toastId = toast.loading("Deleting Course...");
        try {

            const response = await axios.delete(
                `${base_url}/course/deleteCourse`,
                {
                    data: { courseId },
                    withCredentials: true
                }
            );

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Course deletion failed");
            }

            toast.success("Course deleted successfully");
        } catch (error) {
            console.log("delete_Course_API ERROR:", error);
            toast.error("Failed to delete course");
        }

        toast.dismiss(toastId);
    };
};

export const getCourseDetails = (courseId) => {
    return async () => {
        try {

            // console.log('before api call')
            // console.log(courseId)
            const response = await axios.get(`${base_url}/course/getCourseDetail`, {
                params: { courseId }
            });
            // console.log('after api call')

            // console.log(response)

            if (response?.data?.success) return response.data.data;

            console.log('Unexpected response:', response.data);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    }
}

export const getAverageRating = async (courseId) => {
    try {

        const response = await axios.get(`${base_url}/course/averageRating`, {
            params: { courseId }
        });

        if (response?.data?.success) return response.data.averageRating

        console.log('Unexpected response:', response.data);
        return 0
    }
    catch (error) {
        console.error('Error fetching avg rating:', error);
        return 0
    }
}

export const markLectureAsComplete = async (data) => {
    let result = null
    // console.log("mark complete data", data)
    const toastId = toast.loading("marking lecture completed...")
    try {
        const response = await axios.post(`${base_url}/course/updateCourseProgress`, data,
            { withCredentials:true})
        // console.log(
        //     "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        //     response
        // )

        if (!response.data.message) {
            throw new Error(response.data.error)
        }
        toast.success("Lecture Completed")
        result = true
    } catch (error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}

export const createRating = async (data) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await axios.post(`${base_url}/course/createRatingAndReview`,data,
        {withCredentials:true}
    )
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}



