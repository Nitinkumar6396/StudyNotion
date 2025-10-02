import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import parsePhoneNumber from "libphonenumber-js"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import SaveBtn from './SaveBtn'
import { changePassword, changeProfilePicture, updateProfile } from '../../../operations/settingsApi'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false)
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [image, setImage] = useState(null)

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    control,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      gender: user?.additionalDetails?.gender || "",
      contactNumber: String(user?.additionalDetails?.contactNumber) || "",
      about: user?.additionalDetails?.about || "",
    },
  })

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  })

  const onSubmitProfile = async (data) => {
    const hasChanges =
      data.firstName !== (user?.firstName || "") ||
      data.lastName !== (user?.lastName || "") ||
      data.dateOfBirth !== (user?.additionalDetails?.dateOfBirth || "") ||
      data.gender !== (user?.additionalDetails?.gender || "") ||
      data.contactNumber !== String(user?.additionalDetails?.contactNumber || "") ||
      data.about !== (user?.additionalDetails?.about || "")

    if (!hasChanges) {
      navigate('/dashboard/my-profile')
      return
    }

    setIsProfileSubmitting(true)
    await dispatch(updateProfile(navigate, data))
    setIsProfileSubmitting(false)
  }

  const onSubmitPassword = async (data) => {
    setIsPasswordSubmitting(true)
    await dispatch(changePassword(data.oldPassword, data.newPassword, data.newPassword))
    setIsPasswordSubmitting(false)
  }

  const handleImageUpload = async () => {
    if (!image) return
    setIsImageUploading(true)
    await dispatch(changeProfilePicture(image))
    setIsImageUploading(false)
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-6 flex flex-col gap-8">

      {/* Profile Picture */}
      <div className="flex flex-col sm:flex-row px-4 sm:px-8 py-6 border border-richblack-500 bg-richblack-800 rounded-md items-center gap-4 sm:gap-6">
        <img
          className="w-24 h-24 sm:w-12 sm:h-12 object-cover object-center rounded-full"
          src={image ? URL.createObjectURL(image) : user.image}
          alt="profile"
        />
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-semibold">Change Profile Picture</h2>
          <div className="flex flex-row gap-2 sm:gap-4">
            <label
              htmlFor="image"
              className="flex flex-row gap-2 items-center bg-richblack-100 text-richblack-900 font-semibold px-4 py-2 rounded-md cursor-pointer w-fit"
            >
              Select
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={handleImageUpload}
              disabled={isImageUploading || !image}
              className={`flex flex-row gap-2 items-center bg-yellow-50 text-richblack-900 font-semibold px-4 py-2 rounded-md w-fit ${isImageUploading || !image ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isImageUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmitProfile(onSubmitProfile)}
        className="flex flex-col px-4 sm:px-8 py-6 border border-richblack-500 bg-richblack-800 rounded-md gap-6"
      >
        <h2 className="text-lg font-semibold">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* First Name */}
          <label className="flex flex-col gap-1">
            <p className="text-sm">First Name</p>
            <input
              type="text"
              {...registerProfile("firstName", { required: 'Please enter your first name.' })}
              className="bg-richblack-900 w-full text-richblack-5 p-2 rounded-md"
              placeholder="Enter first name"
            />
            {profileErrors.firstName && <span className="text-red-500 text-sm">{profileErrors.firstName?.message}</span>}
          </label>

          {/* Last Name */}
          <label className="flex flex-col gap-1">
            <p className="text-sm">Last Name</p>
            <input
              type="text"
              {...registerProfile("lastName", { required: 'Please enter your last name.' })}
              className="bg-richblack-900 w-full text-richblack-5 p-2 rounded-md"
              placeholder="Enter last name"
            />
            {profileErrors.lastName && <span className="text-red-500 text-sm">{profileErrors.lastName?.message}</span>}
          </label>

          {/* Date of Birth */}
          <label className="flex flex-col gap-1">
            <p className="text-sm">Date of Birth</p>
            <input
              type="date"
              {...registerProfile("dateOfBirth", {
                required: 'Please enter your Date of Birth.',
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              className="bg-richblack-900 w-full text-richblack-200 p-2 rounded-md"
            />
            {profileErrors.dateOfBirth && <span className='text-red-500 text-sm'>{profileErrors.dateOfBirth?.message}</span>}
          </label>

          {/* Gender */}
          <label className="flex flex-col gap-1">
            <p className="text-sm">Gender</p>
            <div className="bg-richblack-900 grid grid-cols-2 w-full text-richblack-200 p-2 rounded-md">
              <label className="flex items-center gap-2">
                <input type="radio" value="Male" {...registerProfile("gender", { required: true })} className="accent-yellow-50 cursor-pointer" />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="Female" {...registerProfile("gender", { required: true })} className="accent-yellow-50 cursor-pointer" />
                <span>Female</span>
              </label>
            </div>
            {profileErrors.gender && <span className='text-red-500 text-sm'>Please select your gender</span>}
          </label>

          {/* Contact Number */}
          <label className="flex flex-col gap-1">
            <p className="text-sm">Contact Number <span className="text-red-600">*</span></p>
            <Controller
              name="contactNumber"
              control={control}
              rules={{
                required: "Please enter your contact number.",
                validate: (value) => {
                  try {
                    const phoneNumber = parsePhoneNumber("+" + value)
                    if (!phoneNumber?.isValid()) {
                      return "Please enter a valid phone number."
                    }
                    return true
                  } catch {
                    return "Invalid phone number."
                  }
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  country={'in'}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  enableSearch
                  placeholder="Enter phone number"
                  inputProps={{ required: true }}
                  inputStyle={{
                    backgroundColor: '#000814',
                    color: isFocused ? '#F1F2FF' : '#999DAA',
                    padding: '0.65rem',
                    borderRadius: '0.375rem',
                    border: isFocused ? '1.5px solid white' : 'none',
                    width: '99%',
                    marginLeft: '15%',
                    fontSize: '16px',
                    height: '2.8rem',
                  }}
                  containerStyle={{ width: '88%' }}
                  buttonStyle={{
                    backgroundColor: '#000814',
                    border: 'none',
                    width: '12%',
                    borderRadius: '0.5rem',
                  }}
                  dropdownStyle={{
                    backgroundColor: '#161D29',
                    color: '#F1F2FF',
                    borderRadius: '0.375rem',
                    padding: '0.25rem',
                  }}
                  searchStyle={{ color: 'black' }}
                />
              )}
            />
            {profileErrors.contactNumber && (
              <span className="text-red-500 text-sm">{profileErrors.contactNumber.message}</span>
            )}
          </label>

          {/* About */}
          <label className="flex flex-col gap-1 col-span-1 md:col-span-2">
            <p className="text-sm">About</p>
            <textarea
              {...registerProfile("about")}
              className="bg-richblack-900 w-full text-richblack-5 p-2 rounded-md"
              rows={2}
              placeholder="Enter Bio Details"
            />
          </label>
        </div>

        <SaveBtn text='Save' disable={isProfileSubmitting} />
      </form>

      {/* Password Form */}
      <form
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        className="flex flex-col px-4 sm:px-8 py-6 border border-richblack-500 bg-richblack-800 rounded-md gap-6 w-full"
      >
        <h2 className="text-lg font-semibold">Change Password</h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Old Password */}
          <div className="flex flex-col gap-1 w-full relative">
            <label className="text-sm">Old Password <span className="text-red-600">*</span></label>
            <input
              type={showPassword ? "text" : "password"}
              {...registerPassword("oldPassword", { required: 'Please enter your Current Password.' })}
              className="bg-richblack-900 w-full text-richblack-5 p-2 rounded-md"
              placeholder="Enter Old Password"
            />
            {passwordErrors.oldPassword && <span className="text-red-500 text-xs">{passwordErrors?.oldPassword.message}</span>}
            <span
              className="absolute text-lg text-richblack-200 cursor-pointer translate-y-9 right-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1 w-full relative">
            <label className="text-sm">New Password <span className="text-red-600">*</span></label>
            <input
              type={showNewPassword ? "text" : "password"}
              {...registerPassword("newPassword", { required: ' Please enter your New Password.' })}
              className="bg-richblack-900 w-full text-richblack-5 p-2 rounded-md"
              placeholder="Enter New Password"
            />
            {passwordErrors.newPassword && <span className="text-red-500 text-xs">{passwordErrors?.newPassword?.message}</span>}
            <span
              className="absolute text-lg text-richblack-200 cursor-pointer translate-y-9 right-3"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <SaveBtn text='Update' disable={isPasswordSubmitting} />
      </form>
    </div>
  )
}

export default Settings
