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
    <div className="w-full min-h-screen bg-gray-100 flex justify-center pt-10">
      <div className="w-[800px]">
        
        {cart.length === 0 && (
          <div className="text-center text-xl font-semibold">
            Your cart is empty 🛒
          </div>
        )}

        {cart.map((item) => {
          const itemTotal = item.price * item.quantity;
          return (
            <div
              key={item.productId}
              className="w-full bg-white shadow-sm mb-3 px-4 py-3 flex items-center"
            >
              {/* IMAGE */}
              <img
                src={item.images}
                alt={item.name}
                className="w-[80px] h-[80px] object-cover rounded-md"
              />

              {/* PRODUCT INFO */}
              <div className="flex flex-col justify-center ml-4 flex-1">
                <h1 className="text-base font-semibold">{item.name}</h1>
                <p className="text-sm text-gray-400">
                  {item.altNames?.join(" | ")}
                </p>
                <p className="text-sm text-gray-500">
                  LKR: {item.price.toFixed(2)}
                </p>
              </div>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-2 mx-6">
                <button
                  className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-base font-bold"
                  onClick={() => handleQuantityChange(item, -1)}
                >
                  -
                </button>
                <span className="text-base font-semibold w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-base font-bold"
                  onClick={() => handleQuantityChange(item, 1)}
                >
                  +
                </button>
              </div>

              {/* ITEM TOTAL */}
              <div className="w-[80px] text-right font-semibold text-base mr-4">
                {itemTotal.toFixed(2)}
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleRemove(item.productId)}
                className="w-9 h-9 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <TbTrash className="text-lg" />
              </button>
            </div>
          );
        })}

        {/* Summary Section */}
        {cart.length > 0 && (
          <>
            <div className="w-full flex justify-end mt-2">
              <span className="w-[100px] text-right text-base pr-2">Total</span>
              <span className="w-[100px] text-right text-base pr-2">
                {totalLabelled.toFixed(2)}
              </span>
            </div>

            <div className="w-full flex justify-end mt-1">
              <span className="w-[100px] text-right text-base pr-2">Discount</span>
              <span className="w-[100px] text-right text-base border-b pr-2">
                {discount.toFixed(2)}
              </span>
            </div>

            <div className="w-full flex justify-end mt-1">
              <span className="w-[100px] text-right text-base pr-2">Net total</span>
              <span className="w-[100px] text-right text-base border-b-4 border-double pr-2">
                {total.toFixed(2)}
              </span>
            </div>

            <div className="w-full flex justify-end mt-4">
              <button
                className="w-[150px] bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer text-base"
                onClick={() =>
                  navigate("/checkout", {
                    state: { items: cart },
                  })
                }
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}