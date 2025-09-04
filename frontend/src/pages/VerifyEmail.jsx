import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signup } from '../operations/authApi'

const VerifyEmail = () => {
    const [otp, setOtp] = useState('')
    const dispatch = useDispatch()
    const { signupData } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (otp.length !== 6) {
            toast.error('Please enter a 6-digit OTP')
            return
        }

        // console.log(signupData)
        const { email, firstName, lastName, password, confirmPassword, accountType, contactNumber } = signupData;

        setLoading(true)
        await dispatch(signup(email, firstName, lastName, password, confirmPassword, otp, accountType, contactNumber, navigate))
        setLoading(false)

    }

    useEffect(()=>{
        if(resendCooldown <= 0) return
        const timer = setTimeout(() => {
            setResendCooldown(resendCooldown - 1)
        }, 1000);
        return () => clearTimeout(timer)
    },[resendCooldown])

    const handleResend = async () => {
        if(resendCooldown > 0) return;

        setResendCooldown(30);
        await dispatch(sendOtp(signupData.email, navigate))
    }

    return (
        <div className='text-richblack-5 flex flex-col justify-center items-center min-h-[90vh]'>
            <div className='flex flex-col gap-2 w-[30%]'>
                <h1 className='text-3xl font-semibold'>Verify Email</h1>
                <p className='text-base text-richblack-200'>
                    A verification code has been sent to your email. Enter the code below.
                </p>

                <form onSubmit={handleSubmit} className='flex mt-5 flex-col gap-4'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        shouldAutoFocus
                        inputType='tel'
                        renderSeparator={<span className='w-3' />}
                        renderInput={(props) => (
                            <input
                                {...props}
                                className='h-10 rounded-md border-2 bg-richblack-800 border-richblack-600 focus:outline-none focus:border-yellow-100 text-center text-richblack-5'
                                type='tel'
                                style={{
                                    width: '2.5rem',

                                }}
                            />
                        )
                        }
                    />

                    <button
                        type='submit'
                        className={`bg-yellow-50 mt-5 p-2 rounded-md text-richblue-900 font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                <div className='flex flex-row justify-between px-2 mt-1'>
                    <Link to='/login' className=''>
                        Back to Login
                    </Link>

                    <button
                        type='button'
                        onClick={handleResend}
                        className=''
                        disabled={resendCooldown > 0}
                    >
                        {resendCooldown > 0 ? <p>{resendCooldown}s wait...</p> : 'Resend it'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
