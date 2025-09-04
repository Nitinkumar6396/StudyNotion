import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'libphonenumber-js'
import { toast } from 'react-toastify';
import axios from 'axios';


const ContactForm = () => {

    const [isFocused, setIsFocused] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitSuccessful }
    } = useForm()

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                message: ""
            })
        }
    }, [reset, isSubmitSuccessful])

    const formSumbit = async (data) => {
        const toastId = toast.loading("Sending message")
        try {
            await axios.post(`http://localhost:4000/api/user/send-contact-message`, { ...data })
            toast.success('Message sent successfully!')
        }
        catch (error) {
            console.log("Error while sending contact message", error)
            toast.error('Unable to send message. Please try again.')
        }
        toast.dismiss(toastId)
    }

    return (
        <div className='mt-10 text-richblack-5 w-full flex flex-col justify-center items-center'>

            <form onSubmit={handleSubmit(formSumbit)} className='flex flex-col gap-6 w-full'>
                <div className='flex flex-col sm:flex-row gap-4 text-start'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="firstName" className='text-sm mb-1'>First Name <span className='text-red-500'>*</span></label>
                        <input
                            className='bg-richblack-800 p-2 rounded-md'
                            type="text"
                            placeholder='Enter first name'
                            id='firstName'
                            {...register('firstName', { required: 'Please enter your name' })}
                        />
                        {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName.message}</p>}
                    </div>

                    <div className='flex flex-col w-full'>
                        <label htmlFor="lastName" className='text-sm mb-1'>Last Name</label>
                        <input
                            className='bg-richblack-800 p-2 rounded-md'
                            type="text"
                            placeholder='Enter last name'
                            id='lastName'
                            {...register('lastName')}
                        />
                    </div>
                </div>

                <div className='flex flex-col text-start'>
                    <label htmlFor="email" className='text-sm mb-1'>Email Address <span className='text-red-500'>*</span></label>
                    <input
                        className='bg-richblack-800 p-2 rounded-md'
                        type="text"
                        id="email"
                        placeholder='Enter email address'
                        {...register('email', {
                            required: 'Please enter your email address',
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Enter a valid email address'
                            }
                        })}
                    />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                </div>

                {/* <div className='flex flex-col text-start'>
                    <label htmlFor="" className='text-sm'>Phone Number</label>
                    <div className='flex flex-row gap-4'>
                        <select name="" id="" className='bg-richblack-800 p-2 max-w-[4.5rem] rounded-md'>
                            {
                                CountryCode.map((item, index) => {
                                    return (
                                        <option className='' key={index} value={item.code}>
                                            {item.code} - {item.country}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <input className='bg-richblack-800 p-2 rounded-md w-full' type="tel" name="" id="" placeholder='Enter phone number' />
                    </div>
                </div> */}

                <label className='flex flex-col text-start'>
                    <p className='text-sm mb-1'>Phone Number <span className='text-red-500'>*</span></p>

                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            required: 'Please enter your phone number',
                            validate: (value) => {
                                return isValidPhoneNumber('+' + value) || 'Please enter a valid phone number'
                            }
                        }}
                        render={({ field }) => (
                            <PhoneInput
                                {...field}
                                country="in"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                enableSearch
                                placeholder="Enter phone number"
                                inputStyle={{
                                    backgroundColor: '#161D29',
                                    color: isFocused ? '#F1F2FF' : '#999DAA',
                                    padding: '0.5rem',
                                    borderRadius: '0.375rem',
                                    border: isFocused ? '1.5px solid white' : 'none',
                                    width: '99%',
                                    marginLeft: '15%',
                                    fontSize: '16px',
                                    height: '2.6rem',
                                }}
                                containerStyle={{
                                    width: '88%',
                                }}
                                buttonStyle={{
                                    backgroundColor: '#161D29',
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
                                searchStyle={{
                                    color:'black',
                                }}
                            />
                        )}
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                    )}

                </label>

                <div className='flex flex-col text-start'>
                    <label htmlFor="message" className='text-sm mb-1'>Message <span className='text-red-500'>*</span></label>
                    <textarea
                        id="message"
                        rows={5}
                        placeholder='Enter your message here'
                        className='bg-richblack-800 p-2 rounded-md'
                        {...register('message', { required: 'Please enter your message' })}
                    />
                    {errors.message && <p className='text-red-500 text-sm'>{errors.message.message}</p>}
                </div>

                <button type='submit' className='bg-yellow-50 mt-3 text-richblack-900 font-medium p-2 rounded-md'>
                    Send Message
                </button>
            </form>

        </div>
    )
}

export default ContactForm