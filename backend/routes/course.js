import express from 'express'
import { auth, isAdmin, isInstructor, isStudent } from '../middlewares/auth.js'
import { createCourse, deleteCourse, editCourse, getCourseDetails, instructorCourses, showAllCourses } from '../controllers/Course.js'
import { createSection, deleteSection, sectionUpdate } from '../controllers/Section.js'
import { createSubSection, deleteSubSection, updateSubSection } from '../controllers/SubSection.js'
import { createRating, getAllRatingReview, getAverageRating } from '../controllers/RatingAndReview.js'
import { getCourseProgress, updateCourseProgress } from '../controllers/courseProgress.js'

const courseRouter = express.Router()

courseRouter.post('/createCourse',auth,isInstructor,createCourse)
courseRouter.put('/editCourse',auth,isInstructor,editCourse)
courseRouter.post('/createSection',auth,isInstructor,createSection)
courseRouter.put('/updateSection',auth,isInstructor,sectionUpdate)
courseRouter.delete('/deleteSection',auth,isInstructor,deleteSection)
courseRouter.post('/createSubSection',auth,isInstructor,createSubSection)
courseRouter.put('/updateSubSection',auth,isInstructor,updateSubSection)
courseRouter.delete('/deleteSubSection',auth,isInstructor,deleteSubSection)
courseRouter.get('/getInstructorCourses',auth,isInstructor,instructorCourses)
courseRouter.delete('/deleteCourse',auth,isInstructor,deleteCourse)
courseRouter.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)
courseRouter.get('/getCourseProgress', auth, isStudent, getCourseProgress)

courseRouter.get('/getCourseDetail',getCourseDetails)
courseRouter.get('/showAllCourses',showAllCourses)

courseRouter.post('/createRatingAndReview',auth,isStudent,createRating)
courseRouter.get('/getAllRatingAndReview',getAllRatingReview)
courseRouter.get('/averageRating',getAverageRating)

export default courseRouter



































// const express = require('express');
// const router = express.Router();

// const { createCourse, getCourseDetails, showAllCourses } = require('../controllers/course')

// // const { updateCourseProgress } = require('../controllers/courseProgress')

// const { createCategory, showAllCategory, getCategoryPageDetails } = require('../controllers/category');

// const { createSection, sectionUpdate, deleteSection } = require('../controllers/section');

// const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subSection');

// const { createRating, getAverageRating, getAllRatingReview } = require('../controllers/ratingAndReview');

// const { auth, isAdmin, isInstructor, isStudent } = require('../middlewares/auth')


// // Courses can Only be Created by Instructors
// router.post('/createCourse', auth, isInstructor, createCourse);
// router.post('/addSection', auth, isInstructor, createSection);
// router.post('/updateSection', auth, isInstructor, sectionUpdate);
// router.post('/deleteSection', auth, isInstructor, deleteSection);
// router.post('/addSubSection', auth, isInstructor, createSubSection);
// router.post('/updateSubSection', auth, isInstructor, updateSubSection);
// router.post('/deleteSubSection', auth, isInstructor, deleteSubSection);


// router.post('/getCourseDetails', getCourseDetails);
// router.get('/showAllCourses', showAllCourses);
// // router.post('/getFullCourseDetails', auth, getFullCourseDetails);
// // Get all Courses Under a Specific Instructor
// // router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)


// // router.post("/editCourse", auth, isInstructor, editCourse)
// // router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
// // router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)


// // Category can Only be Created by Admin
// router.post('/createCategory', auth, isAdmin, createCategory);
// // router.delete('/deleteCategory', auth, isAdmin, deleteCategory);
// router.get('/showAllCategories', showAllCategory);
// router.post("/getCategoryPageDetails", getCategoryPageDetails)


// router.post('/createRating', auth, isStudent, createRating);
// router.get('/getAverageRating', getAverageRating);
// router.get('/getReviews', getAllRatingReview);


// module.exports = router;