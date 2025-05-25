import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-4 transition-transform hover:scale-[1.02] duration-200 w-60">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-slate-100 rounded-lg overflow-hidden flex justify-center items-center">
            <img
              src={data?.productImage[0]}
              alt={data?.productName}
              className="object-cover h-full w-full"
            />
          </div>

          <h2 className="text-center font-semibold mt-3 text-gray-800 text-sm line-clamp-2">
            {data.productName}
          </h2>

          <p className="text-[#4CAF50] font-bold mt-2 text-lg">
            {displayINRCurrency(data.sellingPrice)}
          </p>

          <button
            className="mt-3 flex items-center gap-1 bg-[#4CAF50]/10 text-[#4CAF50] hover:bg-[#4CAF50]/20 hover:text-white px-3 py-1 rounded-full text-sm transition-all"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline className="text-lg" />
            Edit
          </button>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </>
  );
};

export default AdminProductCard;
