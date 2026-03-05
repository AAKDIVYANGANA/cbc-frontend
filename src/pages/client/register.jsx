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
        // Validate fields
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
            setLoading(false);
        })
        .catch((error) => {
            const message = error?.response?.data?.message || error.message || "Registration failed";
            toast.error(message);
            setLoading(false);
        });
    }

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full" />

            <div className="w-[50%] h-full flex items-center justify-center">
                <div className="w-[450px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col items-center justify-center py-[40px]">
                    <h1 className="text-2xl font-bold text-gray-700 mb-[15px]">Create Account</h1>

                    <input
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="text"
                        placeholder="Last Name"
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
                        type="password"
                        placeholder="Confirm Password"
                    />

                    <button
                        onClick={handleRegister}
                        className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer mt-[5px] hover:bg-green-600"
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>

                    <p className="text-gray-700 text-center mt-[10px]">
                        Already have an account?
                        &nbsp;
                        <span className="text-green-500 cursor-pointer hover:text-green-700">
                            <Link to={"/login"}>Login Now</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}