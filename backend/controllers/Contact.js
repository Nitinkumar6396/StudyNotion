import { mailSender } from "../utils/mailSender.js";

export const sendContactMessage = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, message } = req.body

        console.log(firstName)
        console.log(process.env.MAIL_HOST)

        if (!firstName || !email || !phoneNumber || !message) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        console.log(process.env.MAIL_HOST)

        await mailSender(
            process.env.MAIL_USER,
            "New Message from Contact form",
            `
                <h2>New Message from Contact Form</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phoneNumber}</p>
                <p><strong>Message:</strong><br><br/>${message}</p>
            `
        )

        // console.log(firstName,lastName,email,phoneNumber,message)

        return res.status(200).json({
            success:true,
            message:"Message sent successfully!"
        })
    }
    catch (error) {
        console.log("Error sending contact message:", error)
        return res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
            error
        })
    }
}