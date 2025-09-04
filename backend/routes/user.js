import express from 'express'
import { changePassword, login, sendOTP, signUp } from "../controllers/Auth.js";
import {auth} from "../middlewares/auth.js"
import { resetPassword, resetPasswordToken } from '../controllers/ResetPassword.js';
import { sendContactMessage } from '../controllers/Contact.js';

const userRouter = express.Router()

userRouter.post('/otp', sendOTP)
userRouter.post('/signUp', signUp)
userRouter.post('/login',login)
userRouter.post('/change-password',auth,changePassword)
userRouter.post('/send-contact-message',sendContactMessage)

userRouter.post('/reset-password-token',resetPasswordToken)
userRouter.post('/reset-password',resetPassword)


export default userRouter















// const express = require('express');
// const router = express.Router();

// const { signUp, login, sendOTP } = require('./controllers/auth');

// const { resetPasswordToken, resetPassword, } = require('../controllers/resetPassword');


// const { auth, isAdmin } = require('../middlewares/auth');


// // Routes for Login, Signup, and Authentication
// router.post('/signup', signUp);
// router.post('/login', login);
// router.post('/sendotp', sendOTP);
// // router.post('/changepassword', auth, changePassword);


// router.post('/reset-password-token', resetPasswordToken);
// router.post("/reset-password", resetPassword)


// // router.get("/all-students", auth, isAdmin, getAllStudents)
// // router.get("/all-instructors", auth, isAdmin, getAllInstructors)



// module.exports = router
