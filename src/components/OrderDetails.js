import React, { useEffect, useState } from "react";
import SummaryApi from "../common";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(SummaryApi.allOrder.url, {
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

  const cancelOrder = async (orderId) => {
    try {
      const res = await fetch(`${SummaryApi.cancelOrder.url}/${orderId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to cancel order");

      setActionMsg(`Order ${orderId} cancelled successfully.`);
      fetchOrders();
    } catch (err) {
      setActionMsg(`Error cancelling order: ${err.message}`);
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center text-leafGreen mb-10">
        Your Orders
      </h2>

      {actionMsg && (
        <div className="text-center mb-6 text-green-700 font-medium">
          {actionMsg}
        </div>
      )}

      {orders.map((order, idx) => (
        <div
          key={order._id || idx}
          className="bg-white shadow-lg rounded-2xl p-6 mb-10 border border-gray-100"
        >
          <div className="mb-6">
            <div className="flex flex-wrap justify-between items-center">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Order ID:</span>{" "}
                {order._id}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.orderStatus === "delivered"
                    ? "bg-green-100 text-green-600"
                    : order.orderStatus === "cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold text-gray-800">Payment:</span>{" "}
              {order.paymentStatus}
            </p>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold text-gray-800">Total:</span> ₹
              {order.totalAmount}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Products
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {order.products?.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 bg-gray-50 p-4 rounded-xl shadow-sm"
                >
                  <img
                    src={item.productId?.productImage[0] || "/no-image.png"}
                    alt={item.productId?.productName || "Product"}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex flex-col justify-center text-gray-700">
                    <p>
                      <strong>Name:</strong>{" "}
                      {item.productId?.productName || "Unknown"}
                    </p>
                    <p>
                      <strong>ID:</strong>{" "}
                      {item.productId?._id || item.productId}
                    </p>
                    <p>
                      <strong>Qty:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{item.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {["processing", "ready-to-shipped", "shipped"].includes(
            order.orderStatus
          ) && (
            <div className="mt-6 text-right">
              <button
                onClick={() => cancelOrder(order._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
              >
                Cancel Order
              </button>
            </div>
          )}

          {order.orderStatus === "delivered" && (
            <p className="mt-4 text-green-600 font-medium text-right">
              Delivered ✅
            </p>
          )}

          {order.orderStatus === "cancelled" && (
            <p className="mt-4 text-red-600 font-medium text-right">
              Cancelled ❌
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
