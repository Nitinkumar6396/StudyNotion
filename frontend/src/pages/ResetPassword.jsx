import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WiDirectionLeft } from "react-icons/wi"
import { getPasswordResetToken } from '../operations/authApi'
import { useDispatch } from 'react-redux'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (resendCooldown > 0) return

    setResendCooldown(30)
    if (email) {
      await dispatch(getPasswordResetToken(email, setEmailSent))
    }
  }

  return (
    <div className="min-h-[90vh] flex justify-center items-center text-richblack-5">
      <div className={`flex flex-col gap-4 ${emailSent ? "w-[25%]" : "w-[30%]"}`}>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold">
            {emailSent ? "Check email" : "Reset your password"}
          </h1>
          <p className="text-base text-richblack-200">
            {emailSent ? (
              <>
                We have sent the reset email to <span className="text-blue-200">{email}</span>
              </>
            ) : (
              "Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email we can try account recovery"
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {!emailSent && (
            <label className="flex flex-col gap-1">
              <p className="text-sm">
                Email Address <span className="text-red-600">*</span>
              </p>
              <input
                type="email"
                className="bg-richblack-800 w-full text-richblack-5 p-2 rounded-lg"
                required
                value={email}
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          )}

          <button
            disabled={resendCooldown > 0}
            type="submit"
            className={`bg-yellow-50 p-2 rounded-md text-richblue-900 
              ${resendCooldown > 0 ? "opacity-70 cursor-not-allowed" : ""} 
              ${emailSent ? "mt-3" : "mt-8"}`}
          >
            {!emailSent
              ? "Reset Password"
              : resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend email"}
          </button>
        </form>

        <Link to="/login" className="-mt-2 w-fit">
          <div className="flex flex-row items-center hover:text-blue-100">
            <WiDirectionLeft size={28} />
            <p>Back to login</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ResetPassword
