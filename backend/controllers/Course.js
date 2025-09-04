import Course from "../models/Course.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import RatingAndReview from "../models/RatingAndReview.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import dotenv, { populate } from "dotenv";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
dotenv.config();


export const createCourse = async (req, res) => {
    try {

        let { courseName, courseDescription, whatYouWillLearn, price, category, tag, instruction, status } = req.body;

        const thumbnail = req.files.thumbnailImage;
        tag = JSON.parse(tag)
        instruction = JSON.parse(instruction)

        // console.log(thumbnail)

        if (!thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail image is missing",
            });
        }


        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !instruction) {
            console.log(courseName, "----", courseDescription, "----", whatYouWillLearn, "----", price, "----", category, "----", tag, "----", instruction)
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found"
            })
        }

        console.log(category)
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found"
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail: thumbnailImage.secure_url,
            category,
            tag,
            instruction,
            status: status ? status : "Drafted"
        });

        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true }
        )

       const temp =  await Category.findByIdAndUpdate(
            category,
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true }
        )

        console.log(temp)

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        })
    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseId, ...data } = req.body

        // console.log(courseId)

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            })
        }

        if (req.files?.thumbnailImage) {
            const thumbnail = await uploadImageToCloudinary(
                req.files.thumbnailImage,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnail.secure_url
        }

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'tag' || key === 'instruction') {
                course[key] = JSON.parse(value)
            }
            else {
                course[key] = value
            }
        })

        await course.save()

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: 'instructor',
                populate: {
                    path: 'additionalDetails'
                }
            })
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSections'
                }
            })
            .populate('ratingAndReviews')
            .populate('category')

        return res.status(200).json({
            success: true,
            message: "Course edited successfully",
            data: updatedCourse
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to edit course",
            error: error.message,
        })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: "courseId is required"
            })
        }

        const course = await Course.findById(courseId)
            .populate('courseContent')
            .populate('category')

        if (req.user.id != course.instructor) {
            return res.status(401).json({
                success: false,
                message: "You cannot delete this course"
            })
        }

        const sections = course.courseContent

        for (const section of sections) {
            const sectionDetail = await Section.findById(section._id);
            if (sectionDetail) {
                for (const subSection of sectionDetail.subSections) {
                    await SubSection.findByIdAndDelete(subSection._id);
                }
            }
            await Section.findByIdAndDelete(section._id);
        }


        await Category.findByIdAndUpdate(
            course.category,
            {
                $pull: {
                    courses: courseId
                }
            }
        )

        await User.findByIdAndUpdate(
            course.instructor,
            {
                $pull: {
                    courses: courseId
                }
            }
        )

        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete course",
            error: error.message,
        })
    }
}

export const showAllCourses = async (req, res) => {
    try {
        console.log('first')
        const allCourses = await Course.find();
        console.log(allCourses)
        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourses,
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all course",
            error: err.message,
        })
    }
}

export const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.query;
        // console.log(courseId)

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const courseDetails = await Course.findById(courseId)
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails"
                    }
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSections"
                    }
                }
            )
            .exec()

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find course with id:${courseId}`,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data:courseDetails,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course details",
            error: err.message,
        })
    }
}

export const instructorCourses = async (req, res) => {
    try {

        const userId = req.user.id

        if (!userId) {
            res.status(404).json({
                success: false,
                message: "Instructor Id is required"
            })
        }

        const courses = await Course.find({ instructor: userId })
            .populate("category")
            .populate("ratingAndReviews")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSections"
                    }
                }
            )

        return res.status(200).json({
            success: true,
            message: "Instructor courses fetched successfully",
            data: courses
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch instructor courses",
            error: err.message,
        })
    }
}