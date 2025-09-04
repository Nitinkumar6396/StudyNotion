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

    const handleSumbmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await dispatch(login(email, password, navigate))
        setLoading(false)
    }

    return (
        <div>
            <div className='w-11/12 mx-auto flex h-[calc(100vh-3.5rem)] flex-row gap-[8rem] items-center justify-center'>

                <div className='text-richblack-200 flex flex-col gap-7 w-[30%]'>
                    <div className='flex items-start gap-1 flex-col'>
                        <p className='text-3xl font-semibold text-richblack-5'>Welcome Back</p>
                        <p className='text-base max-w-[25rem]'>Build skills for today, tomorrow, and beyond. <span className='font-edu-sa text-[#2dc9ec]'>Education to future-proof your career.</span></p>
                    </div>

                    <form onSubmit={handleSumbmit} className='flex flex-col gap-6 text-richblack-5'>
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

                        <label className='flex flex-col gap-1 relative' >
                            <p className='text-sm'>Password <span className='text-red-600'>*</span></p>
                            <input
                                type={`${showPassword ? "text" : "password"}`}
                                className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-md'
                                required
                                value={password}
                                placeholder='Enter Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Link to={'/reset-password'} className='text-sm text-end text-blue-100'>Forgot password </Link>
                            <span
                                className='absolute text-lg cursor-pointer translate-y-9 translate-x-80'
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {
                                    showPassword
                                        ? <AiOutlineEyeInvisible />
                                        : <AiOutlineEye />
                                }
                            </span>
                        </label>

                        <button type='submit' disabled={loading} className={`bg-yellow-50 p-2 rounded-md text-richblue-900 ${loading ? 'opacity-70  cursor-not-allowed' : ''}`}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                    </form>
                </div>

                <div className=''>
                    <img src={LoginImage} alt="" />
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Login