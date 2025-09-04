import Course from "../models/Course.js";
import Section from "../models/Section.js";

export const createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const newSection = await Section.create({ sectionName });
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            { new: true }
        )
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
            message: "Section created successfully",
            updatedCourse,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating section",
            error: error.message,
        })
    }
}


export const sectionUpdate = async (req, res) => {
    try {
        const { sectionName, sectionID } = req.body;
        if (!sectionName || !sectionID) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const section = await Section.findByIdAndUpdate(
            sectionID, { sectionName }, { new: true }
        )

        const updatedCourse = await Course.findOne({ courseContent: sectionID })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections"
                }
            })
            .populate("ratingAndReviews")
            .populate("category");

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found for this section",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedCourse,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update section details",
            error: error.message,
        })
    }
}


export const deleteSection = async (req, res) => {
    try {
        const { sectionID } = req.body;

        if(!sectionID){
            return res.status(404).json({
                success:false,
                message:"SectionID is missing"
            })
        }

        const updatedCourse = await Course.findOneAndUpdate(
            { courseContent: sectionID },
            {
                $pull: {
                    courseContent: sectionID
                }
            },
            { new: true }
        )
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections"
                }
            })
            .populate("ratingAndReviews")
            .populate("category");

        await Section.findByIdAndDelete(sectionID);
        console.log(sectionID)
        console.log(updatedCourse)

        return res.status(200).json({
            success: true,
            message: "Section deleted seccessfully",
            updatedCourse
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section",
            error: error.message,
        })
    }
}