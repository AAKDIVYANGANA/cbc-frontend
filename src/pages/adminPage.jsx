import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import AdminProductPage from "./admin/product";
import AdminOrdersPage from "./admin/adminOrders";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; 

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You are not logged in");
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
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

  return (
    <div className="w-full h-screen bg-gray-200 flex p-2">
      {userValidated ? (
        <>
          {/* Sidebar */}
          <div className="h-full w-[200px] flex flex-col gap-4 mr-2">
            <Link
              to="/admin/users"
              className="p-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
            >
              <HiOutlineUsers />
              Users
            </Link>
            <Link to="/admin/products" className="p-2 bg-blue-500 text-white rounded-lg">
              Products
            </Link>
            <Link to="/admin/orders" className="p-2 bg-blue-500 text-white rounded-lg">
              Orders
            </Link>
          </div>

          {/* Content */}
          <div className="h-full bg-white w-[calc(100vw-216px)] rounded-lg p-4">
            <Routes>
              <Route path="users" element={<h1>Users</h1>} />
              <Route path="products" element={<AdminProductPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="addproduct" element={<AddProductForm />} />
              <Route path="editProduct" element={<EditProductForm />} />
            </Routes>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}