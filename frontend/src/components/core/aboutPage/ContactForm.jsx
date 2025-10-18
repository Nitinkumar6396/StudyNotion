import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "react-toastify";
import axios from "axios";
import "react-phone-input-2/lib/style.css";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const formSumbit = async (data) => {
    const toastId = toast.loading("Sending message...");
    try {
      await axios.post(`https://studynotion-ohoh.onrender.com/api/user/send-contact-message`, {
        ...data,
      });
      toast.success("Message sent successfully!");
    } catch (error) {
      console.log("Error while sending contact message", error);
      toast.error("Unable to send message. Please try again.");
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="mt-10 text-richblack-5 w-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(formSumbit)}
        className="flex flex-col gap-6 w-full max-w-2xl px-4 sm:px-6"
      >
        {/* First & Last Name */}
        <div className="flex flex-col sm:flex-row gap-4 text-start">
          <div className="flex flex-col w-full">
            <label htmlFor="firstName" className="text-sm mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              className="bg-richblack-800 p-2 rounded-md outline-none focus:ring-1 focus:ring-yellow-50"
              type="text"
              placeholder="Enter first name"
              id="firstName"
              {...register("firstName", { required: "Please enter your name" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="lastName" className="text-sm mb-1">
              Last Name
            </label>
            <input
              className="bg-richblack-800 p-2 rounded-md outline-none focus:ring-1 focus:ring-yellow-50"
              type="text"
              placeholder="Enter last name"
              id="lastName"
              {...register("lastName")}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col text-start">
          <label htmlFor="email" className="text-sm mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-richblack-800 p-2 rounded-md outline-none focus:ring-1 focus:ring-yellow-50"
            type="text"
            id="email"
            placeholder="Enter email address"
            {...register("email", {
              required: "Please enter your email address",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <label className="flex flex-col text-start">
          <p className="text-sm mb-1">
            Phone Number <span className="text-red-500">*</span>
          </p>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: "Please enter your phone number",
              validate: (value) =>
                isValidPhoneNumber("+" + value) ||
                "Please enter a valid phone number",
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country="in"
                enableSearch
                placeholder="Enter phone number"
                containerClass="w-full"
                inputClass="!w-full !bg-richblack-800 !pl-12 !p-2 !rounded-md !text-richblack-50 !border-none focus:!ring-1 focus:!ring-yellow-50"
                buttonClass="!bg-richblack-800 !border-none !rounded-l-md"
                dropdownClass="!bg-richblack-800 !text-richblack-50 !rounded-md"
                searchClass="!bg-richblack-700 !text-richblack-50"
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
          )}
        </label>

        {/* Message */}
        <div className="flex flex-col text-start">
          <label htmlFor="message" className="text-sm mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Enter your message here"
            className="bg-richblack-800 p-2 rounded-md outline-none focus:ring-1 focus:ring-yellow-50"
            {...register("message", { required: "Please enter your message" })}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-50 mt-3 text-richblack-900 font-medium p-3 rounded-md hover:bg-yellow-100 transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;