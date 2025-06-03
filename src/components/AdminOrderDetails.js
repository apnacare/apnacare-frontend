import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
const backendDomain = process.env.REACT_APP_BACKEND_URL;

const AdminOrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [updating, setUpdating] = useState(null);

  const statusOptions = [
    "processing",
    "ready-to-shipped",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(SummaryApi.allOrderAdmin.url, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to fetch orders");

      const orderArray = Array.isArray(data.orderDetails)
        ? data.orderDetails
        : [data.orderDetails];

      setOrders(orderArray);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      const res = await fetch(
        `https://apnacare-backend.onrender.com/api/update-order-status/${orderId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to update status");

      setActionMsg(`Order ${orderId} updated to ${newStatus}.`);
      fetchOrders();
    } catch (err) {
      setActionMsg(`Error: ${err.message}`);
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return <div className="text-center mt-8 text-leafGreen">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!orders.length)
    return (
      <div className="text-center mt-8 text-gray-500">No orders found.</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-leafGreen mb-12">
        Admin - Manage Orders
      </h2>

      {actionMsg && (
        <div className="text-center mb-6 text-green-700 font-semibold">
          {actionMsg}
        </div>
      )}

      <div className="space-y-10">
        {orders.map((order, idx) => (
          <div
            key={order._id || idx}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 transition hover:shadow-2xl"
          >
            <div className="flex flex-wrap justify-between items-start mb-6">
              <div className="text-sm md:text-base">
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">Order ID:</span>{" "}
                  {order._id}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold text-gray-900">Payment:</span>{" "}
                  {order.paymentStatus}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-semibold text-gray-900">Total:</span> ₹
                  {order.totalAmount}
                </p>
              </div>

              <div className="flex flex-col gap-2 items-end mt-4 sm:mt-0">
                <select
                  defaultValue={order.orderStatus}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-800 shadow-sm focus:outline-leafGreen"
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  disabled={updating === order._id}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                {updating === order._id && (
                  <span className="text-xs text-gray-500 animate-pulse">
                    Updating...
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Products in this Order
              </h3>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.products?.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 bg-gray-50 p-4 rounded-xl shadow-sm"
                  >
                    <img
                      src={item.productId?.productImage[0] || "/no-image.png"}
                      alt={item.productId?.productName || "Product"}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium text-gray-900">
                        {item.productId?.productName}
                      </p>
                      <p className="text-xs">
                        <strong>ID:</strong> {item.productId?._id}
                      </p>
                      <p className="text-xs">
                        <strong>Qty:</strong> {item.quantity}
                      </p>
                      <p className="text-xs">
                        <strong>Price:</strong> ₹{item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderDetails;
