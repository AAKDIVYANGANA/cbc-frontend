import { useState } from "react";
import getCart, {
  removeFromCart,
  addToCart,
  getTotal,
  getTotalForLabelledPrice,
} from "../../utils/cart";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(() => getCart());
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const handleQuantityChange = (item, amount) => {
    addToCart(item, amount);
    setCart(getCart());
  };

  const totalLabelled = getTotalForLabelledPrice();
  const total = getTotal();
  const discount = totalLabelled - total;

  return (
    <div
      className="w-full min-h-screen py-10 px-4"
      style={{ background: "#fdf6f9", fontFamily: "'Georgia', serif" }}
    >
      
      <div className="max-w-5xl mx-auto mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase mb-1"
          style={{ color: "#e879a0" }}>
          ✦ &nbsp; Your selections
        </p>
        <h1 className="text-3xl font-bold" style={{ color: "#1a0a0f" }}>Shopping Cart</h1>
        <div className="mt-2 w-12 h-[2px] rounded-full"
          style={{ background: "linear-gradient(to right, #e879a0, #f9a8c9)" }} />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">

        
        <div className="flex-1">
          {cart.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 rounded-2xl text-center"
              style={{ background: "#fff", border: "1px solid #f0c4d8" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5"
                style={{ background: "linear-gradient(135deg, #fdf0f5, #fce7f3)", border: "2px solid #f0c4d8" }}
              >
                🛒
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ color: "#3d1a2e" }}>
                Your cart is empty
              </h3>
              <p className="text-sm mb-6" style={{ color: "#c4527a" }}>
                Discover our beauty collection
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #e879a0, #c4527a)",
                  boxShadow: "0 4px 16px rgba(232,121,160,0.35)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #f0c4d8", boxShadow: "0 4px 16px rgba(232,121,160,0.08)" }}
            >
              
              <div
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest grid grid-cols-12"
                style={{ background: "linear-gradient(135deg, #1a0a0f, #3d1a2e)", color: "#f9a8c9" }}
              >
                <div className="col-span-5">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Subtotal</div>
                <div className="col-span-1" />
              </div>

              
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
                    
                    <div className="col-span-5 flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                        style={{ border: "1px solid #f0c4d8" }}
                      >
                        <img
                          src={item.images}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: "#3d1a2e" }}>
                          {item.name}
                        </p>
                        <p className="text-xs truncate" style={{ color: "#c4527a" }}>
                          LKR {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                  
                    <div className="col-span-3 flex items-center justify-center gap-2">
                      <button
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-all"
                        style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}
                        onClick={() => handleQuantityChange(item, -1)}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                      >−</button>
                      <span className="text-sm font-bold w-6 text-center" style={{ color: "#3d1a2e" }}>
                        {item.quantity}
                      </span>
                      <button
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-all"
                        style={{ background: "linear-gradient(135deg, #e879a0, #c4527a)" }}
                        onClick={() => handleQuantityChange(item, 1)}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                      >+</button>
                    </div>

                  
                    <div className="col-span-3 text-right text-sm font-bold" style={{ color: "#3d1a2e" }}>
                      LKR {itemTotal.toFixed(2)}
                    </div>

                  
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

        
        {cart.length > 0 && (
          <div className="w-full lg:w-[300px]">
            <div
              className="rounded-2xl p-6 sticky top-6"
              style={{
                background: "#fff",
                border: "1px solid #f0c4d8",
                boxShadow: "0 4px 20px rgba(232,121,160,0.1)",
              }}
            >
              <h2 className="text-base font-bold mb-5" style={{ color: "#1a0a0f" }}>
                Order Summary
              </h2>

              
              <div className="flex justify-between text-xs mb-4" style={{ color: "#c4527a" }}>
                <span>{cart.length} item{cart.length !== 1 ? "s" : ""} in cart</span>
                <span>{cart.reduce((s, i) => s + i.quantity, 0)} units</span>
              </div>

              <div className="h-[1px] mb-4" style={{ background: "#f0c4d8" }} />

              <div className="flex justify-between text-sm mb-2" style={{ color: "#6b2d4a" }}>
                <span>Subtotal</span>
                <span>LKR {totalLabelled.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3" style={{ color: "#e879a0" }}>
                <span>Discount</span>
                <span>− LKR {discount.toFixed(2)}</span>
              </div>

              <div className="h-[1px] mb-3" style={{ background: "#f0c4d8" }} />

              <div className="flex justify-between text-base font-bold mb-6">
                <span style={{ color: "#1a0a0f" }}>Net Total</span>
                <span style={{ color: "#e879a0" }}>LKR {total.toFixed(2)}</span>
              </div>

              <button
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #e879a0, #c4527a)",
                  boxShadow: "0 4px 20px rgba(232,121,160,0.4)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                onClick={() => navigate("/checkOut", { state: { items: cart } })}
              >
                Proceed to Checkout 🌸
              </button>

              <button
                className="w-full py-2.5 mt-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  color: "#c4527a",
                  border: "1px solid #f0c4d8",
                  background: "transparent",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#fdf0f5"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}