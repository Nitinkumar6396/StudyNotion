import User from "../models/User.js";
import Profile from "../models/Profile.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import CourseProgress from "../models/CourseProgess.js";
import Course from "../models/Course.js";

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const {
            gender = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            firstName,
            lastName,
        } = req.body;

        const userId = req.user.id;

        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();

        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        const updatedUserDetails = await User.findById(userId)
            .populate("additionalDetails")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUserDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating profile",
            error: error.message,
        });
    }
};

// update profile picture

export const updateProfileImage = async (req, res) => {
    try {
        const image = req.files?.image;
        console.log(req.files)

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Please select an image",
            });
        }

        const imageURL = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME
        );

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { image: imageURL.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating profile picture",
            error: error.message,
        });
    }
};


// Delete Account
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting account",
            error: error.message,
        });
    }
};

// Get User Details
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId)
            .populate("additionalDetails")
            .exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching user details",
            error: error.message,
        });
    }
};

// Convert seconds into hh:mm:ss or Xh Ym format
function convertSecondsToDuration(totalSeconds) {
    if (!totalSeconds || isNaN(totalSeconds)) return "0m"

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
        return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`
    } else {
        return `${seconds}s`
    }
}

// get enrolled courses
export const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id

        // Find user with enrolled courses
        let userDetails = await User.findById(userId)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSections",
                    },
                },
            })
            .exec()

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `User not found with id: ${userId}`,
            })
        }

        // Convert to plain object
        userDetails = userDetails.toObject()

        // Process each course
        for (let course of userDetails.courses) {
            let totalDurationInSeconds = 0
            let totalSubSections = 0

            // Calculate total duration & subsections
            for (let section of course.courseContent) {
                totalDurationInSeconds += (section.subSections || []).reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration || 0),
                    0
                )
                totalSubSections += (section.subSections || []).length
            }

            // Store duration in readable format
            course.totalDuration = convertSecondsToDuration(totalDurationInSeconds)

            // Fetch completed videos for progress
            const progress = await CourseProgress.findOne({
                courseId: course._id,
                userId,
            })

            const completedCount = progress?.completedVideos?.length || 0
            course.progressCompleted = completedCount
            course.progressTotal = totalSubSections

            // Calculate progress %
            course.progressPercentage =
                totalSubSections === 0
                    ? 100
                    : Math.round((completedCount / totalSubSections) * 10000) / 100
        }

        // Send response
        res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    // console.log(courseDetails)

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

