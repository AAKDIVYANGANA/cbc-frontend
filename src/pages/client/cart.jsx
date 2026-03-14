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
    <div className="w-full min-h-screen bg-gray-100 flex justify-center pt-[90px] px-4">
      <div className="w-full max-w-[800px]"> {/* ✅ max-w instead of fixed w */}

        {cart.length === 0 && (
          <div className="text-center text-xl font-semibold mt-10">
            Your cart is empty 🛒
          </div>
        )}

        {cart.map((item) => {
          const itemTotal = item.price * item.quantity;
          return (
            <div
              key={item.productId}
              className="w-full bg-white shadow-sm mb-3 px-3 py-3 flex items-center rounded-md"
            >
              {/* IMAGE */}
              <img
                src={item.images}
                alt={item.name}
                className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] object-cover rounded-md flex-shrink-0"
              />

              {/* PRODUCT INFO */}
              <div className="flex flex-col justify-center ml-3 flex-1 min-w-0">
                <h1 className="text-sm md:text-base font-semibold truncate">{item.name}</h1>
                <p className="text-xs md:text-sm text-gray-400 truncate">
                  {item.altNames?.join(" | ")}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  LKR: {item.price.toFixed(2)}
                </p>
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-1 md:gap-2 mx-2 md:mx-6 flex-shrink-0">
                <button
                  className="w-6 h-6 md:w-7 md:h-7 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold"
                  onClick={() => handleQuantityChange(item, -1)}
                >-</button>
                <span className="text-sm md:text-base font-semibold w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  className="w-6 h-6 md:w-7 md:h-7 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold"
                  onClick={() => handleQuantityChange(item, 1)}
                >+</button>
              </div>

              {/* ITEM TOTAL */}
              <div className="w-[65px] md:w-[80px] text-right font-semibold text-sm md:text-base mr-2 flex-shrink-0">
                {itemTotal.toFixed(2)}
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleRemove(item.productId)}
                className="w-8 h-8 md:w-9 md:h-9 bg-red-500 text-white rounded-full flex items-center justify-center flex-shrink-0"
              >
                <TbTrash className="text-base md:text-lg" />
              </button>
            </div>
          );
        })}

        {/* Summary Section */}
        {cart.length > 0 && (
          <div className="w-full flex flex-col items-end mt-4 pr-[44px]">

            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm md:text-base text-gray-700 w-[80px] md:w-[100px] text-right">Total</span>
              <span className="text-sm md:text-base w-[90px] md:w-[100px] text-right">
                {totalLabelled.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm md:text-base text-gray-700 w-[80px] md:w-[100px] text-right">Discount</span>
              <span className="text-sm md:text-base w-[90px] md:w-[100px] text-right border-b border-gray-400">
                {discount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm md:text-base text-gray-700 w-[80px] md:w-[100px] text-right">Net total</span>
              <span className="text-sm md:text-base w-[90px] md:w-[100px] text-right border-b-4 border-double border-gray-400">
                {total.toFixed(2)}
              </span>
            </div>

            <button
              className="w-[130px] md:w-[150px] bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer text-sm md:text-base"
              onClick={() => navigate("/checkout", { state: { items: cart } })}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}