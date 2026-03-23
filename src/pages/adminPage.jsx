import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import AdminProductPage from "./admin/product";
import AdminOrdersPage from "./admin/adminOrders";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminUsersPage from "./admin/adminUsers";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You are not logged in");
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          if (response.data.user.role == "admin") {
            setUserValidated(true);
          } else {
            toast.error("You are not an admin");
            navigate("/login");
          }
        })
        .catch(() => {
          toast.error("Authentication failed");
          navigate("/login");
        });
    }
  }, [navigate]);

  const navLinks = [
    { to: "/admin/users",    label: "Users",    icon: <HiOutlineUsers className="text-lg" /> },
    { to: "/admin/products", label: "Products", icon: <BsBoxSeam className="text-lg" /> },
    { to: "/admin/orders",   label: "Orders",   icon: <HiOutlineClipboardList className="text-lg" /> },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <div
      className="w-full h-screen flex"
      style={{ fontFamily: "'Georgia', serif", background: "#fdf6f9" }}
    >
      {userValidated ? (
        <>
          
          <div
            className="h-full w-[220px] flex flex-col flex-shrink-0"
            style={{
              background: "linear-gradient(160deg, #1a0a0f 0%, #3d1a2e 55%, #6b2d4a 100%)",
              boxShadow: "4px 0 24px rgba(26,10,15,0.3)",
            }}
          >
        
            <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(249,168,201,0.15)" }}>
              <div className="text-lg font-bold" style={{ color: "#f9a8c9" }}>Crystal Beauty</div>
              <div className="text-xs font-semibold text-white">Admin Panel</div>
              <div className="mt-2 w-8 h-[2px] rounded-full"
                style={{ background: "linear-gradient(to right, #f9a8c9, #e879a0)" }} />
            </div>

        
            <nav className="flex flex-col gap-2 px-3 py-6 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    color: isActive(link.to) ? "#f9a8c9" : "#f0c4d8",
                    background: isActive(link.to) ? "rgba(249,168,201,0.12)" : "transparent",
                    border: isActive(link.to) ? "1px solid rgba(249,168,201,0.2)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.to)) e.currentTarget.style.background = "rgba(249,168,201,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.to)) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.icon}
                  {link.label}
                  {isActive(link.to) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: "#e879a0" }} />
                  )}
                </Link>
              ))}
            </nav>

            
            <div className="px-4 py-5" style={{ borderTop: "1px solid rgba(249,168,201,0.15)" }}>
          
              <div className="flex items-center gap-3 mb-4 px-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}
                >
                  A
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Administrator</p>
                  <p className="text-[10px]" style={{ color: "#f0c4d8" }}>Super Admin</p>
                </div>
              </div>

          
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
                style={{
                  background: "rgba(232,121,160,0.12)",
                  color: "#f9a8c9",
                  border: "1px solid rgba(249,168,201,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #e879a0, #c4527a)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.border = "1px solid transparent";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(232,121,160,0.12)";
                  e.currentTarget.style.color = "#f9a8c9";
                  e.currentTarget.style.border = "1px solid rgba(249,168,201,0.2)";
                }}
              >
                <HiOutlineLogout className="text-base" />
                Logout
              </button>
            </div>
          </div>

        
          <div className="flex-1 h-full flex flex-col overflow-hidden">

      
            <div
              className="w-full px-8 py-4 flex items-center justify-between flex-shrink-0"
              style={{
                background: "#fff",
                borderBottom: "1px solid #f0c4d8",
                boxShadow: "0 2px 12px rgba(232,121,160,0.06)",
              }}
            >
              <div>
                <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#c4527a" }}>
                  Admin Dashboard
                </p>
                <h1 className="text-lg font-bold" style={{ color: "#1a0a0f" }}>
                  {navLinks.find((l) => isActive(l.to))?.label || "Dashboard"}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🌸</div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#3d1a2e" }}>Crystal Beauty Clear</p>
                  <p className="text-xs" style={{ color: "#c4527a" }}>Management Console</p>
                </div>
              </div>
            </div>

            
            <div className="flex-1 overflow-y-auto p-6">
              <div
                className="w-full min-h-full rounded-2xl p-6"
                style={{
                  background: "#fff",
                  border: "1px solid #f0c4d8",
                  boxShadow: "0 4px 20px rgba(232,121,160,0.06)",
                }}
              >
                <Routes>
                  <Route path="users"       element={<AdminUsersPage />} />
                  <Route path="products"    element={<AdminProductPage />} />
                  <Route path="orders"      element={<AdminOrdersPage />} />
                  <Route path="addproduct"  element={<AddProductForm />} />
                  <Route path="editProduct" element={<EditProductForm />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: "#f0c4d8", borderTopColor: "#e879a0" }} />
            <p className="text-sm font-semibold" style={{ color: "#c4527a" }}>Verifying access...</p>
          </div>
        </div>
      )}
    </div>
  );
}