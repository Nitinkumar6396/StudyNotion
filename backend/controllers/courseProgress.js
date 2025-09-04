import CourseProgress from "../models/CourseProgess.js"
import SubSection from "../models/SubSection.js"


export const updateCourseProgress = async (req, res) => {
    const { courseId, subsectionId } = req.body
    const userId = req.user.id

    try {
        const subsection = await SubSection.findById(subsectionId)
        if (!subsection) {
            return res.status(404).json({ error: "Invalid subsection" })
        }

        let courseProgress = await CourseProgress.findOne({ courseId, userId })

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            })
        } else {
            // check if the subsection is already completed
            if (courseProgress.completedVideos.includes(subsectionId)) {
                return res.status(400).json({ error: "Subsection already completed" })
            }

            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subsectionId)
        }

        await courseProgress.save()

        return res.status(200).json({ message: "Course progress updated" })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const getCourseProgress = async (req, res) => {
    try {
        const {courseId} = req.query
        const userId = req.user.id

        // console.log(courseId)

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:'courseId is required'
            })
        }

        const courseProgress = await CourseProgress.findOne({userId,courseId})

        return res.status(200).json({
            success:true,
            message:'course progress fetched successfully',
            data:courseProgress
        })
    } 
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}