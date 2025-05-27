import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,320px))] justify-center md:justify-between md:gap-6 overflow-x-auto scrollbar-none transition-all">
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full max-w-[320px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-slate-200 h-56 flex justify-center items-center animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-slate-200 rounded-full animate-pulse w-24"></div>
                  <div className="h-4 bg-slate-200 rounded-full animate-pulse w-20"></div>
                </div>
                <button className="h-10 bg-slate-200 rounded-full animate-pulse w-full"></button>
              </div>
            </div>
          ))
        : data.map((product, index) => (
            <Link
              to={"/product/" + product?._id}
              className="w-full max-w-[320px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={scrollTop}
              key={index}
            >
              <div className="bg-[#ecfdf5] h-56 flex justify-center items-center">
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className="object-cover h-full w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-4 bg-[#f6fdf8]">
                <h2 className="font-semibold text-lg text-black text-ellipsis line-clamp-1">
                  {product?.productName}
                </h2>
                <p className="capitalize text-emerald-600">
                  {product?.category}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-emerald-700 font-semibold">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-gray-500 line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <button
                  className="text-sm bg-emerald-600 text-white px-6 py-2 rounded-full transition-colors duration-200 hover:bg-emerald-700"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;
