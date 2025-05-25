import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-gray-800 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl h-full max-h-[90%] overflow-auto shadow-lg">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Upload Product
          </h2>
          <div
            className="text-2xl text-gray-600 hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productName" className="block text-gray-700">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              placeholder="Enter product name"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              className="w-full p-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="brandName" className="block text-gray-700">
              Brand Name:
            </label>
            <input
              type="text"
              id="brandName"
              placeholder="Enter brand name"
              value={data.brandName}
              name="brandName"
              onChange={handleOnChange}
              className="w-full p-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700">
              Category:
            </label>
            <select
              required
              value={data.category}
              name="category"
              onChange={handleOnChange}
              className="w-full p-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="productImage" className="block text-gray-700">
              Product Image:
            </label>
            <label htmlFor="uploadImageInput">
              <div className="w-full p-4 bg-gray-100 border border-dashed rounded-lg flex justify-center items-center cursor-pointer">
                <div className="text-gray-500 text-center">
                  <FaCloudUploadAlt className="text-4xl mb-2" />
                  <p className="text-sm">Upload Product Image</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  />
                </div>
              </div>
            </label>
            <div className="flex flex-wrap gap-2 mt-4">
              {data?.productImage[0] ? (
                data.productImage.map((el, index) => (
                  <div key={index} className="relative">
                    <img
                      src={el}
                      alt={el}
                      width={100}
                      height={100}
                      className="rounded-md bg-gray-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-red-600 text-xs">
                  *Please upload product image
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={data.price}
              name="price"
              onChange={handleOnChange}
              className="w-full p-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="sellingPrice" className="block text-gray-700">
              Selling Price:
            </label>
            <input
              type="number"
              id="sellingPrice"
              placeholder="Enter selling price"
              value={data.sellingPrice}
              name="sellingPrice"
              onChange={handleOnChange}
              className="w-full p-3 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description:
            </label>
            <textarea
              id="description"
              className="w-full p-3 bg-gray-100 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product description"
              rows={3}
              onChange={handleOnChange}
              name="description"
              value={data.description}
            ></textarea>
          </div>

          <div>
            <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
              Upload Product
            </button>
          </div>
        </form>
      </div>

      {/* Fullscreen Image Modal */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
