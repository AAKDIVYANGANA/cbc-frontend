import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { HiOutlineUsers, HiOutlineSearch } from "react-icons/hi";
import { MdOutlineAdminPanelSettings, MdOutlinePersonOutline } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchUsers = useCallback(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/all", { 
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            setUsers(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Error:", err.response?.status, err.response?.data);
            toast.error("Failed to load users");
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    function handleRoleChange(userId, newRole) {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/user/" + userId,
            { role: newRole },
            { headers: { Authorization: "Bearer " + token } }
        )
        .then(() => {
            toast.success("Role updated successfully");
            fetchUsers();
        })
        .catch(() => toast.error("Failed to update role"));
    }

    function handleDelete(userId) {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        const token = localStorage.getItem("token");
        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/user/" + userId, {
            headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
            toast.success("User deleted");
            fetchUsers();
        })
        .catch(() => toast.error("Failed to delete user"));
    }

    const filtered = users.filter((u) =>
        `${u.firstname} ${u.lastname} ${u.email}` 
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const adminCount = users.filter((u) => u.role === "admin").length;
    const customerCount = users.filter((u) => u.role !== "admin").length;

    return (
        <div style={{ fontFamily: "'Georgia', serif" }}>

            
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { icon: <HiOutlineUsers className="text-2xl" />, label: "Total Users", value: users.length },
                    { icon: <MdOutlineAdminPanelSettings className="text-2xl" />, label: "Admins", value: adminCount },
                    { icon: <MdOutlinePersonOutline className="text-2xl" />, label: "Customers", value: customerCount },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl px-5 py-4 flex items-center gap-4"
                        style={{
                            background: "#fff",
                            border: "1px solid #f0c4d8",
                            boxShadow: "0 2px 12px rgba(232,121,160,0.08)",
                        }}
                    >
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #fdf0f5, #fce7f3)", color: "#e879a0" }}
                        >
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-bold" style={{ color: "#3d1a2e" }}>{stat.value}</p>
                            <p className="text-xs" style={{ color: "#c4527a" }}>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            
            <div className="flex items-center justify-between mb-4 gap-4">
                <h2 className="text-lg font-bold" style={{ color: "#1a0a0f" }}>All Users</h2>
                <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl flex-1 max-w-xs"
                    style={{
                        background: "#fff",
                        border: "1px solid #f0c4d8",
                        boxShadow: "0 2px 8px rgba(232,121,160,0.08)",
                    }}
                >
                    <HiOutlineSearch style={{ color: "#e879a0" }} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 text-sm bg-transparent outline-none"
                        style={{ color: "#3d1a2e" }}
                    />
                </div>
            </div>

            
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-10 h-10 border-4 rounded-full animate-spin"
                        style={{ borderColor: "#f0c4d8", borderTopColor: "#e879a0" }} />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-4xl mb-3">👤</div>
                    <p className="font-bold mb-1" style={{ color: "#3d1a2e" }}>No users found</p>
                    <p className="text-sm" style={{ color: "#c4527a" }}>Try a different search term</p>
                </div>
            ) : (
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{ border: "1px solid #f0c4d8" }}
                >
                    
                    <div
                        className="grid grid-cols-12 px-5 py-3 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "linear-gradient(135deg, #1a0a0f, #3d1a2e)", color: "#f9a8c9" }}
                    >
                        <div className="col-span-1">#</div>
                        <div className="col-span-4">User</div>
                        <div className="col-span-4">Email</div>
                        <div className="col-span-2">Role</div>
                        <div className="col-span-1 text-center">Action</div>
                    </div>

                    
                    {filtered.map((user, index) => (
                        <div
                            key={user._id}
                            className="grid grid-cols-12 px-5 py-4 items-center transition-all"
                            style={{
                                background: index % 2 === 0 ? "#fff" : "#fdf6f9",
                                borderTop: "1px solid #f0c4d8",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "#fce7f3"}
                            onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "#fff" : "#fdf6f9"}
                        >
                        
                            <div className="col-span-1 text-xs" style={{ color: "#c4527a" }}>
                                {index + 1}
                            </div>

                            
                            <div className="col-span-4 flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                    style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}
                                >
                                    {user.firstname?.charAt(0).toUpperCase() || "U"} 
                                </div>
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: "#3d1a2e" }}>
                                        {user.firstname} {user.lastname} 
                                    </p>
                                </div>
                            </div>

                            
                            <div className="col-span-4 text-sm truncate" style={{ color: "#6b2d4a" }}>
                                {user.email}
                            </div>

                            
                            <div className="col-span-2">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="text-xs px-3 py-1.5 rounded-lg font-semibold outline-none cursor-pointer"
                                    style={{
                                        background: user.role === "admin"
                                            ? "linear-gradient(135deg, #e879a0, #c4527a)"
                                            : "linear-gradient(135deg, #fdf0f5, #fce7f3)",
                                        color: user.role === "admin" ? "#fff" : "#c4527a",
                                        border: "1px solid #f0c4d8",
                                    }}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option> 
                                </select>
                            </div>

                            
                            <div className="col-span-1 flex justify-center">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                                    style={{ color: "#e879a0", background: "#fdf0f5" }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#e879a0";
                                        e.currentTarget.style.color = "#fff";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "#fdf0f5";
                                        e.currentTarget.style.color = "#e879a0";
                                    }}
                                >
                                    <IoTrashOutline className="text-base" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}