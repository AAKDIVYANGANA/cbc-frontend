import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (res) => {
            setLoading(true);
            try {
                const response = await axios.post(backendURL + "/api/user/google", {
                    accessToken: res.access_token,
                });
                toast.success("Google login successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                const user = response.data.user;
                navigate(user.role === "admin" ? "/admin" : "/");
            } catch (error) {
                toast.error(error?.response?.data?.message || "Google login failed");
            } finally {
                setLoading(false);
            }
        },
        onError: () => {
            toast.error("Google login failed");
            setLoading(false);
        },
        flow: "implicit",
    });

    function handleLogin() {
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }
        setLoading(true);
        axios.post(`${backendURL}/api/user/login`, { email, password })
            .then((response) => {
                toast.success("Login successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                const user = response.data.user;
                navigate(user.role === "admin" ? "/admin" : "/");
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Login failed");
            })
            .finally(() => setLoading(false));
    }

    return (
        <div className="w-full h-screen flex overflow-hidden" style={{ fontFamily: "'Georgia', serif" }}>
            {/* Left Panel */}
            <div
                className="hidden lg:flex w-[55%] h-full relative flex-col items-center justify-center"
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
                        Discover your radiance. Premium beauty products crafted for your unique glow.
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
                className="w-full lg:w-[45%] h-full flex items-center justify-center px-8"
                style={{ background: "#fdf6f9" }}
            >
                <div className="w-full max-w-[400px]">
                    {/* Header */}
                    <div className="mb-10">
                        <p className="text-pink-400 text-sm tracking-widest uppercase mb-2">Welcome back</p>
                        <h2 className="text-4xl font-bold text-gray-800">Sign In</h2>
                        <div className="mt-3 w-12 h-1 rounded-full" style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border text-gray-700 text-sm outline-none transition-all"
                                style={{
                                    background: "#fff",
                                    borderColor: "#f0c4d8",
                                    boxShadow: "0 2px 8px rgba(232,121,160,0.08)",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase tracking-widest mb-1 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border text-gray-700 text-sm outline-none transition-all"
                                style={{
                                    background: "#fff",
                                    borderColor: "#f0c4d8",
                                    boxShadow: "0 2px 8px rgba(232,121,160,0.08)",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                                onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                            />
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div className="text-right mb-6">
                        <Link to="/forgetPassword" className="text-sm text-pink-400 hover:text-pink-600 transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-50 mb-3"
                        style={{
                            background: "linear-gradient(135deg, #e879a0, #c4527a)",
                            boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                        }}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-pink-100" />
                        <span className="text-xs text-gray-400">or continue with</span>
                        <div className="flex-1 h-px bg-pink-100" />
                    </div>

                    {/* Google Button */}
                    <button
                        onClick={() => loginWithGoogle()}
                        disabled={loading}
                        className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 border"
                        style={{
                            background: "#fff",
                            borderColor: "#f0c4d8",
                            color: "#6b2d4a",
                            boxShadow: "0 2px 8px rgba(232,121,160,0.1)",
                        }}
                    >
                        <GrGoogle className="text-pink-500" />
                        {loading ? "Loading..." : "Sign in with Google"}
                    </button>

                    {/* Register */}
                    <p className="text-center text-sm text-gray-500 mt-8">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-pink-500 font-semibold hover:text-pink-700 transition-colors">
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}