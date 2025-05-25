import React from "react";

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful !!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction is complete.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
