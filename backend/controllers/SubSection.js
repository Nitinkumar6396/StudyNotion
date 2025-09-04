import Course from "../models/Course.js";
import Section from "../models/Section.js";
import SubSection from "../models/SubSection.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";

export const createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description } = req.body;
        const video = req.files.videoFile;

        // console.log(typeof sectionId)
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // console.log(uploadDetails)

        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: uploadDetails.duration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })
        console.log(SubSectionDetails)

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSections: SubSectionDetails._id,
                }
            },
            { new: true }
        )

        const updatedCourse = await Course.findOne(
            { courseContent: sectionId }
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
            message: "SubSection created",
            updatedCourse,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating SubSection",
            error: error.message,
        })
    }
}


export const deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId } = req.body

        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "sectionId and subSectionId are required",
            });
        }

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subSections: subSectionId
                },
            },
            { new: true }
        )

        const updatedCourse = await Course.findOne(
            { courseContent: sectionId }
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
            message: "SubSection deleted successfully",
            updatedCourse
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting SubSection",
            error: error.message,
        });
    }
};



export const updateSubSection = async (req, res) => {
    try {
        const { SubSectionId, sectionId, title, description } = req.body;

        if (!SubSectionId) {
            return res.status(400).json({
                success: false,
                message: "subSectionId is required to update",
            })
        }

        const subSection = await SubSection.findById(SubSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "subSection not found",
            })
        }

        if (title) {
            subSection.title = title;
        }
        if (description) {
            subSection.description = description;
        }

        if (req.files && req.files.videoFile) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = uploadDetails.duration;
        }

        await subSection.save()

        const updatedCourse = await Course.findOne(
            { courseContent: sectionId }
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
            message: "subSection updated successfully",
            updatedCourse
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating SubSection",
            error: error.message,
        })
    }
}