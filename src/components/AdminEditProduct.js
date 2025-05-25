import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productImage: productData?.productImage || [],
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newImages = [...data.productImage];
    newImages.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
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
      fetchdata();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[85vh] h-full overflow-hidden relative">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b bg-softbeige">
          <h2 className="text-xl font-semibold text-leafgreen">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-700 hover:text-red-600 transition"
          >
            <CgClose />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 overflow-y-auto h-full space-y-4"
        >
          <div>
            <label htmlFor="productName" className="font-medium text-leafgreen">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              required
              className="mt-1 w-full p-2 border bg-softbeige rounded focus:outline-none focus:ring-2 focus:ring-leafgreen"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="brandName" className="font-medium text-leafgreen">
              Brand Name
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              required
              className="mt-1 w-full p-2 border bg-softbeige rounded focus:outline-none focus:ring-2 focus:ring-leafgreen"
              placeholder="Enter brand name"
            />
          </div>

          <div>
            <label htmlFor="category" className="font-medium text-leafgreen">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              required
              className="mt-1 w-full p-2 border bg-softbeige rounded focus:outline-none focus:ring-2 focus:ring-leafgreen"
            >
              <option value="">Select Category</option>
              {productCategory.map((el, i) => (
                <option value={el.value} key={el.value + i}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-leafgreen">Product Images</label>
            <label htmlFor="uploadImageInput" className="block cursor-pointer">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-leafgreen bg-softbeige rounded h-32 hover:bg-lightgreen transition">
                <FaCloudUploadAlt className="text-4xl text-leafgreen" />
                <p className="text-sm text-leafgreen">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  onChange={handleUploadProduct}
                  className="hidden"
                />
              </div>
            </label>

            <div className="flex gap-3 mt-3 flex-wrap">
              {data.productImage?.map((img, i) => (
                <div className="relative group" key={i}>
                  <img
                    src={img}
                    alt={`Product ${i}`}
                    className="w-20 h-20 object-cover border rounded-md cursor-pointer hover:scale-105 transition"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(img);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteProductImage(i)}
                    className="absolute -top-1 -right-1 p-1 bg-red-600 text-white rounded-full hidden group-hover:block"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
              {!data.productImage.length && (
                <p className="text-xs text-red-600">
                  *Please upload at least one product image
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="font-medium text-leafgreen">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                required
                className="mt-1 w-full p-2 border bg-softbeige rounded focus:outline-none focus:ring-2 focus:ring-leafgreen"
                placeholder="Enter original price"
              />
            </div>

            <div>
              <label
                htmlFor="sellingPrice"
                className="font-medium text-leafgreen"
              >
                Selling Price
              </label>
              <input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                value={data.sellingPrice}
                onChange={handleOnChange}
                required
                className="mt-1 w-full p-2 border bg-softbeige rounded focus:outline-none focus:ring-2 focus:ring-leafgreen"
                placeholder="Enter selling price"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="font-medium text-leafgreen">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleOnChange}
              rows={4}
              className="w-full p-2 border bg-softbeige rounded resize-none focus:outline-none focus:ring-2 focus:ring-leafgreen"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-leafgreen hover:bg-olivegreen text-white font-medium px-5 py-2 rounded transition"
            >
              Update Product
            </button>
          </div>
        </form>

        {/* Fullscreen image view */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;
