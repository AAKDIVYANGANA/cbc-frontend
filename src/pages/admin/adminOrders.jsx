import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
  const [displayingOrder, setDisplayingOrder] = useState(null);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setLoaded(true);
        });
    }
  }, [loaded]);

  function changeOrderStatus(orderId, status) {
    const token = localStorage.getItem("token");
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId,
        { status: status },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(() => {
        toast.success("Order status updated successfully");
        setLoaded(false); // ✅ triggers reload
      })
      .catch(() => {
        toast.error("Failed to update order status");
      });
  }

  return (
    <div className="w-full h-full">
      {loaded ? (
        <div className="w-full h-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">Customer Email</th>
                <th className="p-2 text-left">Customer Name</th>
                <th className="p-2 text-left">Address</th>
                <th className="p-2 text-left">Phone Number</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-2">{order.orderId}</td>
                  <td className="p-2">{order.email}</td>
                  <td className="p-2">{order.name}</td>
                  <td className="p-2">{order.address}</td>
                  <td className="p-2">{order.phoneNumber}</td>

                  {/* STATUS DROPDOWN */}
                  <td className="p-2" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      className="border border-gray-300 rounded px-1 py-[2px] text-sm bg-white cursor-pointer"
                      onChange={(e) => {
                        e.stopPropagation();
                        changeOrderStatus(order.orderId, e.target.value);
                      }}
                    >
                      <option value="Pending">Pending</option>       {/* ✅ fixed: optipn -> option */}
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>   {/* ✅ fixed: wrong value */}
                    </select>
                  </td>

                  <td className="p-2">{order.total.toFixed(2)}</td>
                  <td className="p-2">{new Date(order.date).toDateString()}</td>

                  {/* DETAILS BUTTON */}
                  <td className="p-2">
                    <button
                      className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-900"
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ prevent row click
                        setDisplayingOrder(order);
                        setModalIsDisplaying(true);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* MODAL */}
          {modalIsDisplaying && displayingOrder && (
            <div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center z-50">
              <div className="w-[600px] max-h-[600px] bg-white relative flex flex-col rounded-md shadow-lg">

                {/* CLOSE BUTTON */}
                <button
                  className="w-[40px] h-[40px] rounded-full bg-white shadow shadow-black flex justify-center items-center absolute right-[-15px] top-[-15px] z-10"
                  onClick={() => setModalIsDisplaying(false)}
                >
                  <IoCloseSharp />
                </button>

                {/* ORDER INFO */}
                <div className="p-4 border-b border-gray-200">
                  <h1 className="text-sm font-bold">Order ID: {displayingOrder.orderId}</h1>
                  <h1 className="text-sm font-bold">Order Date: {new Date(displayingOrder.date).toDateString()}</h1>
                  <h1 className="text-sm font-bold">Order Status: {displayingOrder.status}</h1>
                  <h1 className="text-sm font-bold">Order Total: {displayingOrder.total.toFixed(2)}</h1>
                </div>

                {/* BILL ITEMS */}
                <div className="w-full overflow-y-auto flex-1 p-4">
                  {displayingOrder.billItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4 border-b pb-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-[80px] h-[80px] object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <h2 className="text-base font-semibold">{item.productName}</h2>
                        <p className="text-sm text-gray-500">LKR: {item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="ml-auto font-bold text-base">
                        LKR: {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
