import axios from "axios"
import { toast } from "react-toastify";
import { resetCart } from "../slices/cartSlice";

const base_url = import.meta.env.VITE_APP_BASE_URL;

export async function buyCourses(courses, navigate, user, setLoading, dispatch = null) {
    try {

        const { data } = await axios.post(`${base_url}/payment/capturePayment`, { courses }, { withCredentials: true })

        if (!data.success) {
            toast.error('Payment initialization failed')
            return
        }

        // console.log(user)

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: data.order.amount,
            currency: 'INR',
            name: "StudyNotion",
            description: 'Thank you for Purchasing the Course.',
            order_id: data.order.id,
            prefill: {
                name: user.firstName + " " + user.lastName,
                email: user.email,
                contact: user.phone || "9999999999",
            },
            theme: {
                color: "#2563eb",
            },
            handler: async function (response) {
                // console.log(response)
                setLoading(true)
                const toastId = toast.loading('Verifying payment...')
                await verifyPayment({ ...response, courses }, navigate, dispatch)
                setLoading(false)
                toast.dismiss(toastId)
            }
        }

        console.log(options)

        const rzp = new window.Razorpay(options)
        rzp.open()

        rzp.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed.");
            console.log(response.error)
        });

    }
    catch (error) {
        console.log("Payment Error:", error);
        toast.error("Something went wrong in payment");
    }
}

async function verifyPayment(bodyData, navigate, dispatch) {
    try {
        console.log(bodyData)
        const { data } = await axios.post(`${base_url}/payment/verifyPayment`, bodyData, { withCredentials: true })

        if (data.success) {
            toast.success("Payment Successful");
            dispatch && dispatch(resetCart())
            navigate("/dashboard/enrolled-courses");
        } else {
            toast.error("Payment Verification Failed");
        }

    } catch (error) {
        console.log("Verification Error:", error);
        toast.error("Something went wrong during verification");
    }
}