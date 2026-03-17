import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleRegister() {
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

        axios.post(`${backendURL}/api/user`, {
            firstName: firstname,
            lastName: lastname,
            email,
            password,
        })
        .then(() => {
            toast.success("Registration successful! Please login.");
            navigate("/login");
        })
        .catch((error) => {
            toast.error(error?.response?.data?.message || "Registration failed");
        })
        .finally(() => setLoading(false));
    }

    const inputStyle = {
        background: "#fff",
        borderColor: "#f0c4d8",
        boxShadow: "0 2px 8px rgba(232,121,160,0.08)",
    };

    return (
        <div className="w-full min-h-screen flex overflow-hidden" style={{ fontFamily: "'Georgia', serif" }}>

            {/* Left Panel */}
            <div
                className="hidden lg:flex w-[55%] h-screen sticky top-0 flex-col items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, #1a0a0f 0%, #3d1a2e 40%, #6b2d4a 70%, #c4527a 100%)",
                }}
            >
                {/* Decorative circles */}
                <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #f9a8c9, transparent)" }} />
                <div className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[250px] rounded-full opacity-15"
                    style={{ background: "radial-gradient(circle, #f472b6, transparent)" }} />
                <div className="absolute top-[40%] left-[10%] w-[120px] h-[120px] rounded-full opacity-10 border border-pink-300" />
                <div className="absolute top-[20%] right-[15%] w-[80px] h-[80px] rounded-full opacity-10 border border-pink-200" />

                <div className="relative z-10 text-center px-12">
                    <div className="text-6xl mb-6">🌸</div>
                    <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                        Crystal<br />
                        <span style={{ color: "#f9a8c9" }}>Beauty</span>
                        <span className="text-white"> Clear</span>
                    </h1>
                    <p className="text-pink-200 text-lg leading-relaxed max-w-[320px] mx-auto">
                        Join thousands of beauty lovers. Your journey to radiant skin starts here.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        {["✨ Premium", "🌿 Natural", "💎 Luxury"].map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full text-xs text-pink-100 border border-pink-400 border-opacity-50">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div
                className="w-full lg:w-[45%] min-h-screen flex items-center justify-center px-8 py-12"
                style={{ background: "#fdf6f9" }}
            >
                <div className="w-full max-w-[400px]">

                    {/* Header */}
                    <div className="mb-8">
                        <p className="text-pink-400 text-sm tracking-widest uppercase mb-2">Get started</p>
                        <h2 className="text-4xl font-bold text-gray-800">Create Account</h2>
                        <div className="mt-3 w-12 h-1 rounded-full" style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
                    </div>

                    {/* Name Row */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">First Name</label>
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="Jane"
                                className="w-full px-4 py-3 rounded-xl border text-gray-700 text-sm outline-none transition-all"
                                style={inputStyle}
                                onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Last Name</label>
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Doe"
                                className="w-full px-4 py-3 rounded-xl border text-gray-700 text-sm outline-none transition-all"
                                style={inputStyle}
                                onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border text-gray-700 text-sm outline-none transition-all"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                            onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                            className="w-full px-4 py-3 rounded-xl border text-gray-700 text-sm outline-none transition-all"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                            onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-8">
                        <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border text-gray-700 text-sm outline-none transition-all"
                            style={inputStyle}
                            onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                            onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-50"
                        style={{
                            background: "linear-gradient(135deg, #e879a0, #c4527a)",
                            boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                        }}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-pink-500 font-semibold hover:text-pink-700 transition-colors">
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}