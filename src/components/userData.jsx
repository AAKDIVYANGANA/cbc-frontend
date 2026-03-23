import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserData() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token != null) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/current`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((e) => {
                console.log("Error:", e);
                setUser(null);
            });
        }
    }, [token]);

    return (
        user == null ? (
            <div className="h-full flex flex-row items-center gap-3">
                <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                        color: "#c4527a",
                        border: "1px solid #f0c4d8",
                        background: "transparent",
                        fontFamily: "'Georgia', serif",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = "#fdf0f5";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                    }}
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                    style={{
                        background: "linear-gradient(135deg, #e879a0, #c4527a)",
                        boxShadow: "0 2px 12px rgba(232,121,160,0.35)",
                        fontFamily: "'Georgia', serif",
                    }}
                >
                    Register
                </Link>
            </div>
        ) : (
            <div className="h-full flex flex-row items-center gap-3">
            
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}
                    >
                        {user.firstName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span
                        className="text-sm font-medium hidden md:block"
                        style={{ color: "#6b2d4a", fontFamily: "'Georgia', serif" }}
                    >
                        {user.firstName}
                    </span>
                </div>

                
                <button
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                        color: "#c4527a",
                        border: "1px solid #f0c4d8",
                        background: "transparent",
                        fontFamily: "'Georgia', serif",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fdf0f5";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                    }}
                    onClick={() => {
                        localStorage.removeItem("token");
                        setUser(null);
                        window.location = "/login";
                    }}
                >
                    Logout
                </button>
            </div>
        )
    );
}