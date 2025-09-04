import crypto from "crypto";
import User from "../models/User.js";
import Course from "../models/Course.js";
import { razorpayInstance } from '../config/razorpay.js'
import { mailSender } from '../utils/mailSender.js'
import { courseEnrollmentTemplate } from "../utils/courseEnrollmentTemplate.js";
import { paymentSuccessTemplate } from "../utils/paymentSuccessfulTemplate.js";
import CourseProgress from "../models/CourseProgess.js";


export const capturePayment = async (req, res) => {
    try {
        const { courses } = req.body;
        const userId = req.user.id;

        // console.log(courses)

        if (!courses || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No courses selected",
            });
        }

        //Fetch user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        //Filter out already enrolled courses
        const notEnrolledCourses = courses.filter(
            courseId => !user.courses.includes(courseId.toString())
        );


        if (notEnrolledCourses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "You are already enrolled in all selected courses",
            });
        }

        //Fetch course details
        const courseDetails = await Course.find({ _id: { $in: notEnrolledCourses } });


        //Calculate total amount
        let totalAmount = 0;
        courseDetails.forEach(course => {
            totalAmount += course.price;
        });

        //Create Razorpay order
        const options = {
            amount: totalAmount * 100, // convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options)
        // console.log(order)

        return res.json({
            success: true,
            order,
            amount: totalAmount,
            courses: courseDetails.map(c => ({ id: c._id, title: c.title })),
        });
    } catch (error) {
        console.error("Error capturing payment:", error);
        return res.status(500).json({
            success: false,
            message: "Could not initiate payment",
        });
    }
};


export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
        const userId = req.user.id;

        // console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature, courses, userId)
        // console.log(process.env.RAZORPAY_SECRET)

        // Generate expected signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // Compare signatures
        if (expectedSign !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature, payment verification failed",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Fetch order details from Razorpay to get amount
        const order = await razorpayInstance.orders.fetch(razorpay_order_id);
        const amount = order.amount

        // Send overall payment success mail
        await mailSender(
            user.email,
            "Payment Successful - StudyNotion",
            paymentSuccessTemplate(user, razorpay_order_id, razorpay_payment_id, amount)
        );

        // Enroll user to courses
        for (const c of courses) {
            const courseId = typeof c === "string" ? c : c.id;

            const progressDetails = await CourseProgress.create({
                userId,
                courseId
            })

            await User.findByIdAndUpdate(userId, {
                $addToSet: { courses: courseId },
                $push: { courseProgress: progressDetails._id }
            });

            const course = await Course.findByIdAndUpdate(courseId,
                { $addToSet: { studentsEnrolled: userId } },
                { new: true }
            );

            // console.log(course)

            // Send mail for each course
            await mailSender(
                user.email,
                `Enrolled in ${course.courseName}`,
                courseEnrollmentTemplate(user, course)
            );
        }

        return res.json({
            success: true,
            message: "Payment verified, user enrolled & emails sent",
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to verify payment",
        });
    }
};

//capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     const { courseId } = req.body;
//     const userId = req.user.id;

//     if (!courseId) {
//         return res.json({
//             success: false,
//             message: "Invalid course id",
//         })
//     }

//     let course;
//     try{
//         course = await Course.findById(courseId);
//         if(!course){
//             return res.json({
//                 success:false,
//                 message:"Could not find the course",
//             })
//         }

//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:true,
//                 message:"Student is already registered",
//             })
//         }
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }

//     //create order
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount:amount * 100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId,
//             userId,
//         }
//     }

//     try{
//         const paymentResponse = await instance.orders.create(options);
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             amount:paymentResponse.amount,
//             currency:paymentResponse.currency,
//         })
//     }
//     catch(error){
//         console.log(error.message);
//         return res.status(500).json({
//             success:false,
//             message:"could not initiate order"
//         })
//     }
// }

//verify signature of razorpay and server
// exports.verifySignature = async (req,res) => {
//     const webhookSecret = "12345678"
//     const signature = req.headers["x-razorpay-signature"]

//     const shasum = crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment is authourised");

//         const {courseId,userId} = req.body.payload.payment.entity.notes;

//         try{
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {$push:{studentsEnrolled:userId}},
//                 {new:true},
//             )

//             if(!enrolledCourse){
//                 return res.status(404).json({
//                     success:false,
//                     message:"Course not found",
//                 })
//             }

//             const enrolledStudent = await User.findByIdAndUpdate(
//                 {userId},
//                 {$push:{courses:courseId}},
//                 {new:true}
//             )

//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulation from StudyNotion",
//                 "Congratulation, you are onboarded into new StudyNotion course"
//             )

//             res.status(200).json({
//                 success:true,
//                 message:"Signature verified and course added",
//             })
//         }
//         catch(error){
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid signature",
//         })
//     }
// }