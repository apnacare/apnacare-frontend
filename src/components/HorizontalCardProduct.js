import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);

  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault(); // Prevents navigating to product page when clicking "Add to Cart"
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 320;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 320;
  };

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="text-3xl font-semibold mb-4">{heading}</h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-sm shadow-md p-2 rounded-full hidden md:flex items-center justify-center"
        >
          <FaAngleLeft className="text-xl" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-sm shadow-md p-2 rounded-full hidden md:flex items-center justify-center"
        >
          <FaAngleRight className="text-xl" />
        </button>

        {/* Product List */}
        <div
          ref={scrollElement}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-none pb-2"
        >
          {(loading ? loadingList : data).map((product, index) => (
            <div key={index}>
              <Link
                to={"/product/" + product?._id}
                // className="w-full max-w-[320px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
                className="min-w-[280px] md:min-w-[320px] max-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex"
                onClick={scrollTop}
                key={index}
              >
                {/* Image or Skeleton */}
                <div className="min-w-[120px] md:min-w-[145px] p-4 flex items-center justify-center">
                  {loading ? (
                    <div className="w-full h-28 bg-slate-200 rounded-md animate-pulse"></div>
                  ) : (
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="h-28 object-contain transition-transform duration-200 hover:scale-110"
                    />
                  )}
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-between p-4 w-full bg-[#f6f9f7] rounded-r-2xl">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold line-clamp-1">
                      {loading ? (
                        <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                      ) : (
                        product?.productName
                      )}
                    </h3>
                    <p className="text-sm capitalize text-gray-500">
                      {loading ? (
                        <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                      ) : (
                        product?.category
                      )}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-sm">
                      {loading ? (
                        <>
                          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mb-1" />
                          <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
                        </>
                      ) : (
                        <>
                          <p className="text-red-600 font-semibold">
                            {displayINRCurrency(product?.sellingPrice)}
                          </p>
                          <p className="text-gray-500 line-through text-xs">
                            {displayINRCurrency(product?.price)}
                          </p>
                        </>
                      )}
                    </div>
                    {!loading && (
                      <button
                        onClick={(e) => handleAddToCart(e, product?._id)}
                        className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full transition"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
