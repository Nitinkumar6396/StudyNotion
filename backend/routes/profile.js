import express from 'express'
import { auth, isInstructor, isStudent } from '../middlewares/auth.js'
import { deleteAccount, getEnrolledCourses, getUserDetails, instructorDashboard, updateProfile, updateProfileImage } from '../controllers/Profile.js'

const profileRouter = express.Router()

profileRouter.delete('/delete-account',auth,isStudent,deleteAccount)
profileRouter.put('/update-profile',auth,updateProfile)
profileRouter.put('/update-profile-picture',auth,updateProfileImage)
profileRouter.get('/getUserDetails',auth,getUserDetails)
profileRouter.get('/enrolledCourses',auth,getEnrolledCourses)
profileRouter.get('/instructorDashboard', auth, isInstructor, instructorDashboard)


export default profileRouter





























// const express = require("express");
// const router = express.Router();

// const { auth} = require("../middlewares/auth");

// const { updateProfile, getUserDetails, deleteAccount } = require('../controllers/profile');


// router.delete('/deleteProfile', auth, deleteAccount);
// router.put('/updateProfile', auth, updateProfile);
// router.get('/getUserDetails', auth, getUserDetails);
// // router.get('/getEnrolledCourses', auth, getEnrolledCourses);
// // router.put('/updateUserProfileImage', auth, updateUserProfileImage);
// // router.get('/instructorDashboard', auth, isInstructor, instructorDashboard);

// module.exports = router
