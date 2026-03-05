import { Routes, Route, Link } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import AdminProductPage from "./admin/product";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";

export default function AdminPage() {
  return (
    <div className="w-full h-screen bg-gray-200 flex p-2">
      
      {/* Sidebar */}
      <div className="h-full w-[200px] flex flex-col gap-4">
        <Link to="/admin/users" className="p-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 "><HiOutlineUsers />
          Users
        </Link>
        <Link to="/admin/products" className="p-2 bg-blue-500 text-white rounded-lg">
          Products
        </Link>
        <Link to="/admin/orders" className="p-2 bg-blue-500 text-white rounded-lg ">
          Orders
        </Link>
      </div>

      {/* Content */}
      <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg p-4">
        <Routes>
          <Route path="users" element={<h1>Users</h1>} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="addproduct" element={<AddProductForm/>} />
          <Route path="editProduct" element={<EditProductForm/>} />
        </Routes>
      </div>

    </div>
  );
}
