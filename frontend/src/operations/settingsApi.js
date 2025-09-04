import { toast } from "react-toastify"
import axios from "axios"
import { setUser } from "../slices/profileSlice"

const base_url = import.meta.env.VITE_APP_BASE_URL

export const changePassword = (oldPassword, newPassword, confirmNewPassword) => {
    return async () => {

        const toastId = toast.loading('Changing password...')

        try {
            const response = await axios.post(`${base_url}/user/change-password`, {
                oldPassword,
                newPassword,
                confirmNewPassword
            },
                {
                    withCredentials: true
                }
            )

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Password changed')
        }
        catch (error) {
            console.log("change password error:", error)
            toast.error(error?.response?.data?.message || 'Could not change password')
        }

        toast.dismiss(toastId)
    }
}

export const changeProfilePicture = (image) => {
    return async (dispatch) => {

        if(!image) {
            toast.error('Please select an image')
            return
        }

        const toastId = toast.loading('Changing profile picture...')

        try {

            const formData = new FormData()
            formData.append('image', image)

            const response = await axios.put(`${base_url}/profile/update-profile-picture`, formData, {
                withCredentials: true
            })

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.updatedUser))
            toast.success('Profile picture changed')
        }
        catch (error) {
            console.log("change profile picture error:", error)
            toast.error(error?.response?.data?.message || 'Could not change profile picture')
        }

        toast.dismiss(toastId)
    }
}

export function updateProfile(navigate, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...")
    try {
      const response = await axios.put(`${base_url}/profile/update-profile`,formData,
        {withCredentials:true}
      )
    //   console.log("UPDATE_PROFILE_API API RESPONSE............", response.data.data)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      dispatch(
        setUser({ ...response.data.data, image: userImage })
      )
      navigate('/dashboard/my-profile')
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

