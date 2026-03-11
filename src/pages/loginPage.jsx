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
                console.log("✅ Google token received:", res.access_token);
                const response = await axios.post(
                    backendURL + "/api/user/google",
                    { accessToken: res.access_token }
                );
                console.log("✅ Backend response:", response.data);
                toast.success("Google login successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                const user = response.data.user;
                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("❌ Google login error:", error.response?.data || error.message);
                toast.error(error?.response?.data?.message || "Google login failed");
            } finally {
                setLoading(false);
            }
        },
        onError: (error) => {
            console.error("❌ Google OAuth error:", error);
            toast.error("Google login failed");
            setLoading(false);
        },
        flow: "implicit" // ✅ fixes popup blocked issue
    });

    function handleLogin() {
        setLoading(true);

        if (!email || !password) {
            toast.error("Please enter email and password");
            setLoading(false);
            return;
        }

        axios.post(`${backendURL}/api/user/login`, { email, password })
        .then(response => {
            toast.success("Login successful");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            const user = response.data.user;
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
            setLoading(false);
        })
        .catch(error => {
            const message = error?.response?.data?.message || error.message || "Login failed";
            toast.error(message);
            setLoading(false);
        });
    }

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full" />

            <div className="w-[50%] h-full flex items-center justify-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col items-center justify-center">
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                    <button
                        onClick={() => loginWithGoogle()} // ✅ wrap in arrow function
                        disabled={loading}
                        className="w-[400px] h-[50px] bg-green-500 mt-[20px] text-white border border-gray-300 rounded-xl cursor-pointer flex justify-center items-center disabled:opacity-50"
                    >
                        <GrGoogle className="mr-[10px] text-white" />
                        {loading ? "Loading..." : "Login with Google"}
                    </button>

                    <p className="text-gray-700 text-center mt-[10px]">
                        Don't have an account yet?
                        &nbsp;
                        <span className="text-green-500 cursor-pointer hover:text-green-700">
                            <Link to={"/register"}>Register Now</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}