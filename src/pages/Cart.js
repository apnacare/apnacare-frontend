import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import PaymentSuccessModal from "../modal/PaymentSuccessModal";
import { toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const [isModalOpen, setIsModalOpen] = useState(false);  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    address1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types in a field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "fullname",
      "mobile",
      "address1",
      "city",
      "state",
      "pincode",
    ];

    requiredFields.forEach((field) => {      if (!formData[field].trim()) {
        newErrors[field] = `${
          field === "mobile"
            ? "Mobile number"
            : field === "address1"
            ? "Address"
            : field === "pincode"
            ? "Pincode"
            : field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    // Validate mobile number (10 digits)
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    // Validate pincode (6 digits)
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const deleteAllCart = async () => {
    const response = await fetch(SummaryApi.deleteAllCart.url, {
      method: SummaryApi.deleteAllCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData([]);
      context.fetchUserAddToCart();
    }
  };  const handlePaymentClick = async () => {
    setFormSubmitted(true);
    
    // Validate form before proceeding with payment
    if (!validateForm()) {
      toast.error("Please fill in all required shipping details");
      
      // Scroll to the form for better visibility of errors
      document.querySelector('.shipping-form-container')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      return;
    }
    
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const orderData = data.map((item) => ({
      _id: item.productId._id,
      quantity: item.quantity,
    }));

    const response = await fetch(SummaryApi.order.url, {
      method: SummaryApi.order.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ cart: orderData }),
    });

    const responseData = await response.json();

    if (responseData) {
      const options = {
        key: "rzp_test_nlAJXraG5BZKmo",
        amount: responseData.amount,
        currency: "INR",
        name: "Apnacare",
        description: "Order Payment",
        order_id: responseData.id,
        handler: function (response) {
          fetch(SummaryApi.verifyPayment.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: responseData._id,
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          })
            .then((data) => data.json())
            .then(() => {
              toast.success("Payment successful");
              deleteAllCart();
            })
            .catch((e) => console.log(e));
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#4CAF50", // leaf green
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };
  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: id, quantity: qty + 1 }),
    });

    const responseData = await response.json();
    if (responseData.success) fetchData();
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: id, quantity: qty - 1 }),
      });

      const responseData = await response.json();
      if (responseData.success) fetchData();
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (validateForm()) {
      toast.success("Address saved successfully");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* Product View */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                />
              ))
            : data.map((product) => (
                <div
                  key={product._id}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product.productId.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                      alt="Service"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl line-clamp-1">
                      {product.productId.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product.productId.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-green-600 font-medium text-lg">
                        {displayINRCurrency(product.productId.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRCurrency(
                          product.productId.sellingPrice * product.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          decraseQty(product._id, product.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() =>
                          increaseQty(product._id, product.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}
        {totalPrice > 0 && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            <div className="h-36 bg-white">
              <h2 className="text-white bg-green-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button
                onClick={handlePaymentClick}
                className="bg-green-600 p-2 text-white w-full mt-2 hover:bg-green-700"
              >
                Payment
              </button>
              <PaymentSuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Address Form */}        <div className="mt-5 lg:mt-0 w-full max-w-sm shipping-form-container">
          <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Shipping Address
            </h2>
            {formSubmitted && Object.keys(errors).length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                Please fill in all required fields correctly to proceed with payment.
              </div>
            )}
            <form onSubmit={handleSubmit}>              {[
                {
                  id: "fullname",
                  label: "Full Name",
                  placeholder: "Rahul Sharma",
                },
                {
                  id: "mobile",
                  label: "Mobile Number",
                  placeholder: "9876543210",
                },
                {
                  id: "address1",
                  label: "Address",
                  placeholder: "Flat, House no., Building, Area, Colony, Street",
                },
                { id: "city", label: "City", placeholder: "Mumbai" },
                { id: "state", label: "State", placeholder: "Maharashtra" },
                { id: "pincode", label: "Pincode", placeholder: "400001" },
              ].map(({ id, label, placeholder }) => (
                <div key={id} className="mb-3">                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {label} <span className="text-red-500">*</span>
                  </label>                  <input
                    type="text"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    value={formData[id]}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border ${
                      errors[id] && (formSubmitted || formData[id].trim() !== '') 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none`}
                  />
                  {errors[id] && (formSubmitted || formData[id].trim() !== '') && (
                    <p className="text-red-500 text-xs mt-1">{errors[id]}</p>
                  )}
                </div>
              ))}              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                  Save Address & Continue
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Address must be filled before proceeding with payment
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
