import RatingAndReview from "../models/RatingAndReview.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";

export const createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }
        });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by the user",
            });
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            course: courseId,
        });

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            { $push: { ratingAndReviews: ratingReview._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
            ratingReview,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid courseId",
            });
        }

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no rating has been given yet",
            averageRating: 0,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getAllRatingReview = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: -1 })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            });

        return res.status(200).json({
            success: true,
            data: allReviews,
            message: "All reviews fetched successfully",
        });
    }
    catch (error) {
        console.error("Error while fetching all ratings:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error while fetching all ratings",
            error: error.message,
        });
    }
};

