import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        console.log("Email:", email);
        console.log("Password:", password);

        // DEBUG: Check if backend URL is loaded
        const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        console.log("Backend URL:", backendURL);

        // Check if email and password are filled
        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        axios.post(`${backendURL}/api/user/login`, {
            email,
            password
        })
        .then(response => {
            console.log("Login successful:", response.data);
            toast.success("Login successful");

            // Save token
            localStorage.setItem("token", response.data.token);

            const user = response.data.user;
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        })
        .catch(error => {
            // DEBUG: Log full error object
            console.error("Login failed full error:", error);

            // Axios errors may have response.data or just message
            const message = error?.response?.data?.message || error.message || "Login failed";
            console.error("Login failed message:", message);
            toast.error(message);
        });

        console.log("Login button clicked");
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
                        placeholder="email" 
                    />
                    <input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" 
                        type="password" 
                        placeholder="password" 
                    />
                    <button 
                        onClick={handleLogin} 
                        className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
