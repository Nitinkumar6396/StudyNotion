import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginImage from '../assets/Images/login.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { login } from '../operations/authApi';
import Footer from '../components/common/Footer';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await dispatch(login(email, password, navigate))
        setLoading(false)
    }

    return (
        <div className='flex flex-col'>
            <div className='min-h-[calc(100vh-3.5rem)] flex items-center'>
                <div className='w-11/12 mx-auto flex flex-col sm:flex-row gap-10 lg:gap-20 items-center justify-center py-10'>

                    {/* Left Side: Form */}
                    <div className='text-richblack-200 flex flex-col gap-7 w-full lg:w-[35%]'>
                        <div className='flex items-start gap-1 flex-col'>
                            <p className='text-3xl font-semibold text-richblack-5'>Welcome Back</p>
                            <p className='text-base max-w-[25rem]'>
                                Build skills for today, tomorrow, and beyond.
                                <span className='font-edu-sa text-[#2dc9ec]'> Education to future-proof your career.</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='flex flex-col gap-6 text-richblack-5'>
                            {/* Email */}
                            <label className='flex flex-col gap-1'>
                                <p className='text-sm'>Email Address <span className='text-red-600'>*</span></p>
                                <input
                                    type="email"
                                    className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-md'
                                    required
                                    value={email}
                                    placeholder='Enter email address'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            {/* Password */}
                            <label className='flex flex-col gap-1 relative'>
                                <p className='text-sm'>Password <span className='text-red-600'>*</span></p>
                                <input
                                    type={`${showPassword ? "text" : "password"}`}
                                    className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-md'
                                    required
                                    value={password}
                                    placeholder='Enter Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Link to={'/reset-password'} className='text-sm text-end text-blue-100 mt-1'>Forgot password?</Link>
                                <span
                                    className='absolute right-3 top-9 text-lg cursor-pointer'
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </label>

                            <button
                                type='submit'
                                disabled={loading}
                                className={`bg-yellow-50 p-2 rounded-md text-richblue-900 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Image */}
                    <div className='w-full lg:w-[40%] justify-center hidden md:flex'>
                        <img src={LoginImage} alt="Login" className='w-full max-w-sm object-contain' />
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Login
