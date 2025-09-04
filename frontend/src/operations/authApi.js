import axios from 'axios';
import { setToken, setLoading } from '../slices/authSlice';
import { setUser } from '../slices/profileSlice';
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_APP_BASE_URL;

// SEND OTP
export const sendOtp = (email, navigate) => {

    return async (dispatch) => {

        const toastId = toast.loading("Sending OTP...");
        dispatch(setLoading(true));

        try {

            const response = await axios.post(`${base_url}/user/otp`, { email });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('OTP Sent Successfully');
            navigate('/verify-email');

        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error(error?.response?.data?.message || 'Could not send OTP');
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);

    };
};

// SIGNUP
export const signup = (
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    otp,
    accountType,
    contactNumber,
    navigate
) => {
    return async (dispatch) => {

        const toastId = toast.loading("Creating account...");
        dispatch(setLoading(true));

        try {

            const response = await axios.post(`${base_url}/user/signup`, {
                email,
                firstName,
                lastName,
                password,
                confirmPassword,
                otp,
                accountType,
                contactNumber,
            });

            if (!response.data.success) {
                toast.error(response.data.message || "Something went wrong!")
                throw new Error(response.data.message);
            }

            toast.success('Signup Successful');
            navigate('/login');

        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error?.response?.data?.message || 'Signup failed');
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
};

// LOGIN
export const login = (email, password, navigate) => {

    return async (dispatch) => {

        const toastId = toast.loading("Logging in...");
        dispatch(setLoading(true));

        try {
            const response = await axios.post(`${base_url}/user/login`, {
                email,
                password,
            },
                {
                    withCredentials: true
                }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const token = response.data.token;
            const user = response.data.user;

            dispatch(setToken(token));
            dispatch(setUser(user));

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Login Successful');
            navigate('/dashboard/my-profile');

        } catch (error) {
            console.log("Login error:", error);
            toast.error(error?.response?.data?.message || 'Login failed');
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
};


//get reset password token
export const getPasswordResetToken = (email, setEmailSent) => {
    return async (dispatch) => {

        const toastId = toast.loading("Sending email...")
        dispatch(setLoading(true))

        try {
            const response = await axios.post(`${base_url}/user/reset-password-token`, { email })

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        }
        catch (error) {
            console.log("Reset Password Token error:", error)
            toast.error(error?.response?.data?.message || 'Unable to send mail');
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

//reset password
export const resetPassword = (password, confirmPassword, token, navigate) => {
    return async (dispatch) => {

        const toastId = toast.loading('Reseting password...')
        dispatch(setLoading(true))

        try {
            const response = await axios.post(`${base_url}/user/reset-password`, { password, confirmPassword, token })

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Password Reset Successfully')
            navigate('/login')
        }
        catch (error) {
            console.log("Reset password error:", error)
            toast.error(error?.response?.data?.message || 'Could not reset password')
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

//logout
export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}
