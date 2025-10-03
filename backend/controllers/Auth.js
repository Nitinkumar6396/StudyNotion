
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import Profile from "../models/Profile.js";
import jwt from "jsonwebtoken";
import { mailSender } from "../utils/mailSender.js";
import validator from 'validator'

const sendVerificationMail = async (email, otp) => {
  try {
    await mailSender(
      email,
      "Verify your email address",
      `<h2>Email Verification</h2><p>Your OTP is: <b>${otp}</b></p>`
    );
    console.log("Verification email sent");
  } catch (err) {
    console.error("Failed to send verification email", err);
    throw err;
  }
};


// Send OTP
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const checkRegisteredUser = await User.findOne({ email });

    if (checkRegisteredUser) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
      })
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log(otp);

    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    const otpBody = await OTP.create({ email, otp });
    console.log(otpBody);

    try {
      await sendVerificationMail(email, otp);
    }
    catch (error) {
      console.error("Email sending failed:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Sign Up
export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    // console.log(firstName,lastName,email,password,confirmPassword,otp)

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    const signupData = {
      otp, firstName, lastName, email, password, confirmPassword, accountType, contactNumber
    }

    console.log("sign up data: ", signupData)

    // Find most recent OTP
    const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(recentOTP)
    if (recentOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otp !== recentOTP[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: "",
      dateOfBirth: "",
      about: "",
      contactNumber: contactNumber,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
      error: error.message
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).populate('additionalDetails');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please sign up first",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure:true,
      sameSite:'none'
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
    });
  }
};



// Change Password
export const changePassword = async (req, res) => {
  try {

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // console.log(oldPassword, "---------", newPassword, "--------", confirmNewPassword)

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      console.log(oldPassword, "---------", newPassword, "--------", confirmNewPassword)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the old password"
      })
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;


    await user.save();

    await mailSender(
      user.email,
      "Password Updated Successfully",
      `<p>Hello ${user.firstName},<br>Your password has been updated successfully.</p>`
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while changing password",
    });
  }
};

