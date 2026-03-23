import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState("email-input");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    function handleSendResetLink() {
        if (!email) { setError("Please enter your email."); return; }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/send-otp`, { email })
            .then(() => { setError(""); setStatus("reset-input"); })
            .catch((e) => setError(e.response?.data?.message || "Failed to send reset link."));
    }

    function handleResetPassword() {
        if (!otp) { setError("Please enter the OTP."); return; }
        if (!password || !confirmPassword) { setError("Please fill in all fields."); return; }
        if (password !== confirmPassword) { setError("Passwords do not match."); return; }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password`, { email, otp, password })
            .then(() => { setError(""); setStatus("success"); })
            .catch((e) => setError(e.response?.data?.message || "Failed to reset password."));
    }

    const inputStyle = {
        background: "#fff",
        borderColor: "#f0c4d8",
        boxShadow: "0 2px 8px rgba(232,121,160,0.08)",
    };

    return (
        <div
            className="w-full h-screen flex overflow-hidden"
            style={{ fontFamily: "'Georgia', serif" }}
        >
            {/* LEFT PANEL */}
            <div
                className="hidden lg:flex w-[55%] h-full flex-col items-center justify-center relative"
                style={{
                    background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 40%, #6b2d4a 70%, #c4527a 100%)",
                }}
            >
                <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #f9a8c9, transparent)" }} />
                <div className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full opacity-15"
                    style={{ background: "radial-gradient(circle, #f472b6, transparent)" }} />
                <div className="absolute top-[40%] left-[10%] w-[120px] h-[120px] rounded-full opacity-10 border border-pink-300" />
                <div className="absolute top-[20%] right-[15%] w-[80px] h-[80px] rounded-full opacity-10 border border-pink-200" />
                <span className="absolute top-[15%] left-[25%] text-pink-300 opacity-20 text-2xl">✦</span>
                <span className="absolute bottom-[20%] right-[20%] text-pink-300 opacity-20 text-xl">✦</span>

                <div className="relative z-10 text-center px-12">
                    <div className="text-6xl mb-6">🔐</div>
                    <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                        Reset Your<br />
                        <span style={{ color: "#f9a8c9" }}>Password</span>
                    </h1>
                    <div className="w-16 h-[2px] rounded-full mx-auto mb-5"
                        style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
                    <p className="text-lg leading-relaxed max-w-[300px] mx-auto" style={{ color: "#f0c4d8" }}>
                        Don't worry — it happens to the best of us. Let's get you back in.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        {["✨ Secure", "🌿 Private", "💎 Safe"].map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full text-xs text-pink-100 border border-pink-400 border-opacity-50">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div
                className="w-full lg:w-[45%] h-full flex items-center justify-center px-8"
                style={{ background: "#fdf6f9" }}
            >
                <div className="w-full max-w-[400px]">

                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-8">
                        {["Email", "Reset", "Done"].map((step, i) => {
                            const stepKeys = ["email-input", "reset-input", "success"];
                            const currentIndex = stepKeys.indexOf(status);
                            const isActive = i === currentIndex;
                            const isDone = i < currentIndex;
                            return (
                                <div key={step} className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                                            style={{
                                                background: isActive || isDone
                                                    ? "linear-gradient(135deg, #e879a0, #c4527a)"
                                                    : "#f0c4d8",
                                                color: isActive || isDone ? "#fff" : "#c4527a",
                                            }}
                                        >
                                            {isDone ? "✓" : i + 1}
                                        </div>
                                        <span className="text-xs font-semibold"
                                            style={{ color: isActive ? "#e879a0" : "#c4527a", opacity: isActive ? 1 : 0.5 }}>
                                            {step}
                                        </span>
                                    </div>
                                    {i < 2 && (
                                        <div className="w-8 h-[1px] rounded-full"
                                            style={{ background: isDone ? "#e879a0" : "#f0c4d8" }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Error */}
                    {error && (
                        <div
                            className="mb-5 px-4 py-3 rounded-xl text-sm"
                            style={{ background: "#fff0f5", color: "#c4527a", border: "1px solid #f0c4d8" }}
                        >
                            ⚠️ {error}
                        </div>
                    )}

                    {/* STEP 1 — Email */}
                    {status === "email-input" && (
                        <>
                            <div className="mb-8">
                                <p className="text-pink-400 text-sm tracking-widest uppercase mb-2">Step 1</p>
                                <h2 className="text-4xl font-bold text-gray-800">Forgot Password</h2>
                                <div className="mt-3 w-12 h-1 rounded-full"
                                    style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
                            </div>

                            <p className="text-sm mb-6" style={{ color: "#c4527a" }}>
                                Enter your registered email and we'll send you an OTP to reset your password.
                            </p>

                            <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: "#6b2d4a" }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all mb-6"
                                style={inputStyle}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                            />

                            <button
                                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all mb-4"
                                style={{
                                    background: "linear-gradient(135deg, #e879a0, #c4527a)",
                                    boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                onClick={handleSendResetLink}
                            >
                                Send Reset OTP
                            </button>

                            <p className="text-center text-sm" style={{ color: "#6b2d4a" }}>
                                Remember it?{" "}
                                <Link to="/login" className="font-semibold" style={{ color: "#e879a0" }}>
                                    Back to Login
                                </Link>
                            </p>
                        </>
                    )}

                    {/* STEP 2 — OTP + New Password */}
                    {status === "reset-input" && (
                        <>
                            <div className="mb-8">
                                <p className="text-pink-400 text-sm tracking-widest uppercase mb-2">Step 2</p>
                                <h2 className="text-4xl font-bold text-gray-800">Reset Password</h2>
                                <div className="mt-3 w-12 h-1 rounded-full"
                                    style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
                            </div>

                            <p className="text-sm mb-6" style={{ color: "#c4527a" }}>
                                OTP sent to <strong>{email}</strong>. Enter it below with your new password.
                            </p>

                            {[
                                { label: "OTP Code", value: otp, setter: setOtp, type: "text", placeholder: "Enter OTP" },
                                { label: "New Password", value: password, setter: setPassword, type: "password", placeholder: "Min. 6 characters" },
                                { label: "Confirm Password", value: confirmPassword, setter: setConfirmPassword, type: "password", placeholder: "••••••••" },
                            ].map((field) => (
                                <div key={field.label} className="mb-4">
                                    <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: "#6b2d4a" }}>
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                                        style={inputStyle}
                                        value={field.value}
                                        onChange={(e) => field.setter(e.target.value)}
                                        onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                        onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                                    />
                                </div>
                            ))}

                            <button
                                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all mt-2 mb-4"
                                style={{
                                    background: "linear-gradient(135deg, #e879a0, #c4527a)",
                                    boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                onClick={handleResetPassword}
                            >
                                Reset Password
                            </button>

                            <button
                                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                                style={{ color: "#c4527a", border: "1px solid #f0c4d8", background: "transparent" }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#fdf0f5"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                onClick={() => { setStatus("email-input"); setError(""); }}
                            >
                                ← Back
                            </button>
                        </>
                    )}

                    {/* STEP 3 — Success */}
                    {status === "success" && (
                        <div className="text-center">
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-6"
                                style={{
                                    background: "linear-gradient(135deg, #fdf0f5, #fce7f3)",
                                    border: "2px solid #f0c4d8",
                                }}
                            >
                                🌸
                            </div>
                            <p className="text-pink-400 text-sm tracking-widest uppercase mb-2">All Done!</p>
                            <h2 className="text-3xl font-bold mb-3" style={{ color: "#1a0a0f" }}>
                                Password Reset!
                            </h2>
                            <div className="w-12 h-[2px] rounded-full mx-auto mb-5"
                                style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
                            <p className="text-sm mb-8" style={{ color: "#c4527a" }}>
                                Your password has been reset successfully. You can now log in with your new password.
                            </p>
                            <Link
                                to="/login"
                                className="block w-full py-3 rounded-xl font-semibold text-sm text-white transition-all text-center"
                                style={{
                                    background: "linear-gradient(135deg, #e879a0, #c4527a)",
                                    boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                                }}
                            >
                                Go to Login
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}