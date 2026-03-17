import { useState } from "react";
import axios from "axios";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState("email-input");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    function handleSendResetLink() {
        if (!email) {
            setError("Please enter your email.");
            return;
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/send-otp`, { email })
            .then(() => {
                setError("");
                setStatus("reset-input");
            })
            .catch((e) => {
                setError(e.response?.data?.message || "Failed to send reset link.");
            });
    }

    function handleResetPassword() {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        if (!password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password`, { email, otp, password })
            .then(() => {
                setError("");
                setStatus("success");
            })
            .catch((e) => {
                setError(e.response?.data?.message || "Failed to reset password.");
            });
    }

    return (
        <div className="h-screen w-full flex bg-gray-100 items-center justify-center">
            <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg">

                {error && (
                    <p className="mb-4 text-red-500 text-sm">{error}</p>
                )}

                {/* Step 1: Email Input */}
                {status === "email-input" && (
                    <>
                        <h1 className="text-2xl font-bold mb-6">Forget Password</h1>
                        <label className="text-sm text-gray-600 mb-1 block">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-6"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={handleSendResetLink}
                        >
                            Send Reset Link
                        </button>
                    </>
                )}

                {/* Step 2: OTP + New Password + Confirm Password */}
                {status === "reset-input" && (
                    <>
                        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
                        <label className="text-sm text-gray-600 mb-1 block">OTP</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <label className="text-sm text-gray-600 mb-1 block">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-6"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </button>
                    </>
                )}

                {/* Success */}
                {status === "success" && (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Password Reset!</h1>
                        <p className="text-green-500 mb-6">Your password has been reset successfully.</p>
                        <a
                            href="/login"
                            className="block w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center"
                        >
                            Go to Login
                        </a>
                    </>
                )}

            </div>
        </div>
    );
}