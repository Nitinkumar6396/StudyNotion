import React, { useState } from 'react'
import { PiCheckCircleFill } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPassword } from '../operations/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showComfirmPassword, setShowConfirmPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }
        setIsSubmitting(true)
        dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate))
            .finally(() => setIsSubmitting(false))
    }

    return (
        <div className='flex justify-center items-center min-h-[90vh] text-richblack-5 px-4'>
            <div className='flex flex-col gap-4 w-full max-w-sm'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl sm:text-3xl font-semibold'>Choose new password</h1>
                    <p className='text-sm sm:text-base text-richblack-200'>
                        Almost done. Enter your new password and you're all set.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 relative'>
                    <label className='flex flex-col gap-1 relative'>
                        <p className='text-sm'>New Password <span className='text-red-600'>*</span></p>
                        <input
                            type={showPassword ? "text" : "password"}
                            className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-lg'
                            required
                            placeholder='Enter New Password'
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                        />
                        <span
                            className='absolute right-3 top-[2.7rem] transform -translate-y-1/2 text-lg cursor-pointer'
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>

                    <label className='flex flex-col gap-1 relative'>
                        <p className='text-sm'>Confirm New Password <span className='text-red-600'>*</span></p>
                        <input
                            type={showComfirmPassword ? "text" : "password"}
                            className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-lg'
                            required
                            placeholder='Enter New Password'
                            name='confirmPassword'
                            onChange={handleChange}
                            value={formData.confirmPassword}
                        />
                        <span
                            className='absolute right-3 top-[2.7rem] transform -translate-y-1/2 text-lg cursor-pointer'
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                        >
                            {showComfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>

                    <div className='flex flex-wrap gap-2 text-xs mt-4'>
                        {[
                            'one lowercase character',
                            'one special character',
                            'one uppercase character',
                            '8 character minimum',
                            'one number'
                        ].map((item, index) => (
                            <div key={index} className='flex items-center gap-1 text-caribbeangreen-300 w-40'>
                                <PiCheckCircleFill />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className={`bg-yellow-50 w-full mt-6 p-2 rounded-md text-richblue-900 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword
