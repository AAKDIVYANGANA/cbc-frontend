import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.items || []);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (!name || !address || !phone) {
      toast.error("Please fill all fields!");
      return;
    }
    const orderData = {
      name,
      address,
      phoneNumber: phone,
      billItems: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must login first!");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/order`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Order placed successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
        toast.error("Order placement failed");
      });
  };

  const handleRemove = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const handleQuantityChange = (index, amount) => {
    const newCart = [...cart];
    newCart[index] = {
      ...newCart[index],
      quantity: Math.max(newCart[index].quantity + amount, 1),
    };
    setCart(newCart);
  };

  const totalLabelled = cart.reduce((sum, item) => {
    const labelledPrice = item.labeledPrice ?? item.price;
    return sum + labelledPrice * item.quantity;
  }, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = totalLabelled - total;

  const inputStyle = {
    background: "#fff",
    borderColor: "#f0c4d8",
    boxShadow: "0 2px 8px rgba(232,121,160,0.08)",
  };

  return (
    <div
      className="w-full min-h-screen py-10 px-4"
      style={{ background: "#fdf6f9", fontFamily: "'Georgia', serif" }}
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#e879a0" }}>
          ✦ &nbsp; Review your order
        </p>
        <h1 className="text-3xl font-bold" style={{ color: "#1a0a0f" }}>Checkout</h1>
        <div className="mt-2 w-12 h-[2px] rounded-full"
          style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* LEFT — Cart Items */}
        <div className="flex-1">
          {cart.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 rounded-2xl text-center"
              style={{ background: "#fff", border: "1px solid #f0c4d8" }}
            >
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-xl font-bold mb-1" style={{ color: "#3d1a2e" }}>Your cart is empty</h3>
              <p className="text-sm mb-6" style={{ color: "#c4527a" }}>Add some products to get started</p>
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #f0c4d8", boxShadow: "0 4px 16px rgba(232,121,160,0.08)" }}
            >
              {/* Table Header */}
              <div
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest grid grid-cols-12"
                style={{ background: "linear-gradient(135deg, #1a0a0f, #3d1a2e)", color: "#f9a8c9" }}
              >
                <div className="col-span-5">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Subtotal</div>
                <div className="col-span-1" />
              </div>

              {/* Cart Items */}
              {cart.map((item, index) => {
                const itemTotal = item.price * item.quantity;
                return (
                  <div
                    key={item.productId}
                    className="grid grid-cols-12 px-6 py-4 items-center transition-all"
                    style={{
                      background: index % 2 === 0 ? "#fff" : "#fdf6f9",
                      borderTop: index === 0 ? "none" : "1px solid #f0c4d8",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fce7f3"}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "#fff" : "#fdf6f9"}
                  >
                    {/* Product Info */}
<div className="col-span-5 flex items-center gap-3">
  <div
    className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
    style={{ border: "1px solid #f0c4d8", minWidth: "64px" }}  // ✅ added minWidth
  >
    <img
      src={item.images?.[0] || item.images}  // ✅ handles both array and string
      alt={item.name}
      className="w-full h-full object-cover"
    />
  </div>
  <div className="min-w-0">  {/* ✅ added min-w-0 so text truncates */}
    <p className="text-sm font-bold truncate" style={{ color: "#3d1a2e" }}>{item.name}</p>
    <p className="text-xs" style={{ color: "#c4527a" }}>
      LKR {item.price.toFixed(2)}
    </p>
  </div>
</div>

                    {/* Quantity */}
                    <div className="col-span-3 flex items-center justify-center gap-2">
                      <button
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
                        style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)", color: "#fff" }}
                        onClick={() => handleQuantityChange(index, -1)}
                      >−</button>
                      <span className="text-sm font-bold w-6 text-center" style={{ color: "#3d1a2e" }}>
                        {item.quantity}
                      </span>
                      <button
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
                        style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)", color: "#fff" }}
                        onClick={() => handleQuantityChange(index, 1)}
                      >+</button>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-3 text-right text-sm font-bold" style={{ color: "#3d1a2e" }}>
                      LKR {itemTotal.toFixed(2)}
                    </div>

                    {/* Remove */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => handleRemove(item.productId)}
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
                        <TbTrash className="text-base" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT — Order Summary + Form */}
        {cart.length > 0 && (
          <div className="w-full lg:w-[340px] flex flex-col gap-4">

            {/* Order Summary */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "#fff",
                border: "1px solid #f0c4d8",
                boxShadow: "0 4px 16px rgba(232,121,160,0.08)",
              }}
            >
              <h2 className="text-base font-bold mb-4" style={{ color: "#1a0a0f" }}>Order Summary</h2>

              <div className="flex justify-between text-sm mb-2" style={{ color: "#6b2d4a" }}>
                <span>Subtotal</span>
                <span>LKR {totalLabelled.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3" style={{ color: "#e879a0" }}>
                <span>Discount</span>
                <span>− LKR {discount.toFixed(2)}</span>
              </div>
              <div className="h-[1px] mb-3" style={{ background: "#f0c4d8" }} />
              <div className="flex justify-between text-base font-bold" style={{ color: "#1a0a0f" }}>
                <span>Net Total</span>
                <span style={{ color: "#e879a0" }}>LKR {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Form */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "#fff",
                border: "1px solid #f0c4d8",
                boxShadow: "0 4px 16px rgba(232,121,160,0.08)",
              }}
            >
              <h2 className="text-base font-bold mb-4" style={{ color: "#1a0a0f" }}>Delivery Details</h2>

              <div className="flex flex-col gap-4">
                {[
                  { label: "Full Name", value: name, setter: setName, type: "text" },
                  { label: "Phone Number", value: phone, setter: setPhone, type: "tel" },
                  { label: "Address", value: address, setter: setAddress, type: "text" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: "#6b2d4a" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#e879a0")}
                      onBlur={(e) => (e.target.style.borderColor = "#f0c4d8")}
                    />
                  </div>
                ))}
              </div>

              {/* Place Order Button */}
              <button
                onClick={placeOrder}
                className="w-full mt-6 py-3 rounded-xl font-semibold text-sm text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #e879a0, #c4527a)",
                  boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Place Order 🌸
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}