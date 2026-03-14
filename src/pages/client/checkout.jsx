import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage(){
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
      name: name,
      address: address,
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center pt-10">
      <div className="w-[900px]">

        {cart.length === 0 && (
          <div className="text-center text-xl font-semibold">
            Your cart is empty 🛒
          </div>
        )}

        {cart.map((item, index) => {
          const itemTotal = item.price * item.quantity;
          return (
            <div
              key={item.productId}
              className="w-full bg-white shadow-sm mb-[1px] px-4 py-4 flex items-center border-b border-gray-200"
            >
              <img
                src={item.images}
                alt={item.name}
                className="w-[90px] h-[90px] object-cover rounded-md"
              />
              <div className="flex flex-col justify-center ml-4 flex-1">
                <h1 className="text-base font-bold">{item.name}</h1>
                <p className="text-sm text-gray-400">{item.altNames?.join(" | ")}</p>
                <p className="text-sm text-gray-500">LKR: {item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3 mr-8">
                <button
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold"
                  onClick={() => handleQuantityChange(index, -1)}
                >-</button>
                <span className="text-base font-semibold w-5 text-center">
                  {item.quantity}
                </span>
                <button
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold"
                  onClick={() => handleQuantityChange(index, 1)}
                >+</button>
              </div>
              <div className="w-[120px] text-right font-bold text-base mr-4">
                {itemTotal.toFixed(2)}
              </div>
              <button
                onClick={() => handleRemove(item.productId)}
                className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <TbTrash className="text-lg" />
              </button>
            </div>
          );
        })}

        {cart.length > 0 && (
          <div className="w-full flex flex-col items-end mt-4 pr-[56px]">

            <div className="flex items-center gap-4 mb-1">
              <span className="text-base text-gray-700 w-[90px] text-right">Total</span>
              <span className="text-base w-[120px] text-right">{totalLabelled.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-4 mb-1">
              <span className="text-base text-gray-700 w-[90px] text-right">Discount</span>
              <span className="text-base w-[120px] text-right border-b border-gray-500">{discount.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-base text-gray-700 w-[90px] text-right">Net total</span>
              <span className="text-base w-[120px] text-right border-b-4 border-double border-gray-500">{total.toFixed(2)}</span>
            </div>

            <div className="w-full flex justify-end mb-2">
              <h1 className="w-[100px] text-xl text-end pr-2">Name</h1>
              <input
                className="w-[200px] text-xl border-b-[2px] text-end pr-2 bg-transparent outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end mb-2">
              <h1 className="w-[100px] text-xl text-end pr-2">Phone</h1>
              <input
                className="w-[200px] text-xl border-b-[2px] text-end pr-2 bg-transparent outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end mb-6">
              <h1 className="w-[100px] text-xl text-end pr-2">Address</h1>
              <input
                className="w-[200px] text-xl border-b-[2px] text-end pr-2 bg-transparent outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button
              className="w-[180px] bg-pink-400 text-white h-[42px] rounded-lg cursor-pointer text-base"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}