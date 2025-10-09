import React, { useEffect, useState } from 'react'
import signupImage from '../assets/Images/signup2.webp'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../operations/authApi';
import { setSignupData } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/common/Footer';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [accountType, setAccountType] = useState('Student')
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        accountType: accountType,
        contactNumber: '',
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleAccountType = (type) => {
        setAccountType(type);
        setFormData((prev) => ({
            ...prev,
            accountType: type,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return;
        }

        const signupData = { ...formData };
        setLoading(true)
        dispatch(setSignupData(signupData))
        await dispatch(sendOtp(formData.email, navigate))
        setLoading(false)

        setFormData({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            accountType: accountType,
            contactNumber: '',
        })
    }

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    return (
        <div className='flex flex-col min-h-[90vh]'>
            <div className='w-11/12 mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-start justify-center py-10'>

                {/* Left: Form */}
                <div className='text-richblack-200 flex flex-col gap-7 w-full lg:w-[40%]'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-3xl font-semibold text-richblack-5'>Join the millions learning to code with StudyNotion for free</p>
                        <p className='text-base max-w-[25rem]'>
                            Build skills for today, tomorrow, and beyond. 
                            <span className='font-edu-sa text-[#2dc9ec]'> Education to future-proof your career.</span>
                        </p>
                    </div>

                    {/* Account Type Selector */}
                    <div className='flex flex-row gap-2 bg-richblack-800 w-fit p-1 rounded-full'>
                        <button
                            onClick={() => handleAccountType('Student')}
                            className={`py-1 px-4 transition-all duration-200 rounded-full ${accountType === 'Student' ? "bg-richblack-900 text-richblack-5" : ""}`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => handleAccountType('Instructor')}
                            className={`py-1 px-4 transition-all duration-200 rounded-full ${accountType === 'Instructor' ? "bg-richblack-900 text-richblack-5" : ""}`}
                        >
                            Instructor
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 text-richblack-5'>
                        {/* Name Fields */}
                        <div className='flex flex-col md:flex-row gap-3'>
                            <label className='flex flex-col gap-1 w-full'>
                                <p className='text-sm'>First Name <span className='text-red-600'>*</span></p>
                                <input
                                    type="text"
                                    name='firstName'
                                    className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-md'
                                    required
                                    placeholder='Enter first name'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className='flex flex-col gap-1 w-full'>
                                <p className='text-sm'>Last Name <span className='text-red-600'>*</span></p>
                                <input
                                    type="text"
                                    name='lastName'
                                    className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-md'
                                    required
                                    placeholder='Enter last name'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Email */}
                        <label className='flex flex-col gap-1'>
                            <p className='text-sm'>Email Address <span className='text-red-600'>*</span></p>
                            <input
                                type="email"
                                name='email'
                                className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-md'
                                required
                                placeholder='Enter email address'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>

                        {/* Phone */}
                        <label className='flex flex-col gap-1'>
                            <p className='text-sm'>Phone Number <span className='text-red-600'>*</span></p>
                            <PhoneInput
                                country={'in'}
                                value={formData.contactNumber}
                                onChange={(value) => setFormData((prev) => ({ ...prev, contactNumber: value }))}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                inputProps={{ name: 'contactNumber', required: true, autoFocus: false }}
                                enableSearch
                                placeholder='Enter phone number'
                                inputStyle={{
                                    backgroundColor: '#161D29',
                                    color: isFocused ? '#F1F2FF' : '#999DAA',
                                    padding: '0.5rem',
                                    borderRadius: '0.375rem',
                                    border: isFocused ? '1.5px solid white' : 'none',
                                    width: '100%',
                                    fontSize: '16px',
                                    height: '2.6rem'
                                }}
                                containerStyle={{ width: '100%' }}
                                buttonStyle={{ backgroundColor: '#161D29', border: 'none' }}
                                dropdownStyle={{ backgroundColor: '#161D29', color: '#F1F2FF', borderRadius: '0.375rem', padding: '0.25rem' }}
                                searchStyle={{ color: 'black' }}
                            />
                        </label>

                        {/* Password Fields */}
                        <div className='flex flex-col md:flex-row gap-3 relative'>
                            <label className='flex flex-col gap-1 w-full relative'>
                                <p className='text-sm'>Create Password <span className='text-red-600'>*</span></p>
                                <input
                                    type={`${showPassword ? "text" : "password"}`}
                                    name='password'
                                    className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-md'
                                    required
                                    placeholder='Enter Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span
                                    className='absolute right-3 top-9 text-lg cursor-pointer'
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </label>

                            <label className='flex flex-col gap-1 w-full relative'>
                                <p className='text-sm'>Confirm Password <span className='text-red-600'>*</span></p>
                                <input
                                    type={`${showConfirmPassword ? "text" : "password"}`}
                                    name='confirmPassword'
                                    className='bg-richblack-800 w-full text-richblack-5 p-2 rounded-md'
                                    required
                                    placeholder='Enter Password'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <span
                                    className='absolute right-3 top-9 text-lg cursor-pointer'
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                >
                                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </label>
                        </div>

                        <button type='submit' className={`bg-yellow-50 mt-5 p-2 rounded-md text-richblue-900 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                            {loading ? 'Sending OTP..' : 'Create Account'}
                        </button>
                    </form>
                </div>

                {/* Right: Image */}
                <div className='w-full lg:w-[40%] hidden lg:flex justify-center mt-10 lg:mt-0'>
                    <img src={signupImage} alt="Sign Up" className='w-full max-w-sm object-contain shadow-[12px_12px] shadow-gray-200' />
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default SignUp
