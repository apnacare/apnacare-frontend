import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-3xl font-semibold text-emerald-800 py-4">
        {heading}
      </h2>

      <div
        className="flex items-center gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-lg rounded-full p-3 absolute left-0 text-xl hidden md:block text-emerald-700 hover:bg-emerald-100 transition-all"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-lg rounded-full p-3 absolute right-0 text-xl hidden md:block text-emerald-700 hover:bg-emerald-100 transition-all"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] max-w-[280px] bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded-full animate-pulse"></div>
                  <div className="h-6 bg-slate-200 rounded-full animate-pulse"></div>
                  <div className="flex gap-4 justify-between">
                    <div className="h-6 bg-slate-200 rounded-full animate-pulse w-24"></div>
                    <div className="h-6 bg-slate-200 rounded-full animate-pulse w-24"></div>
                  </div>
                  <button className="h-10 bg-slate-200 rounded-full animate-pulse w-full"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={"product/" + product?._id}
                key={index}
                className="w-full min-w-[280px] max-w-[280px] bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="bg-[#ecfdf5] h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-6 space-y-4 bg-[#f6fdf8]">
                  <h2 className="font-semibold text-lg text-black text-ellipsis line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-emerald-600">
                    {product?.category}
                  </p>
                  <div className="flex gap-4 justify-between items-center">
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
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
