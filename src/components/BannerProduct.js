import React, { useEffect, useState } from "react";
import banner1 from "../assest/banner/banner-1.jpg";
import banner2 from "../assest/banner/banner-2.png";
import banner3 from "../assest/banner/banner-3.jpg";
import banner4 from "../assest/banner/banner-4.jpg";
import banner5 from "../assest/banner/banner-5.png";
import banner6 from "../assest/banner/banner-6.webp";
import banner7 from "../assest/banner/banner-7.jpg";

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];

  // const mobileImages = [
  //   image1Mobile,
  //   image2Mobile,
  //   image3Mobile,
  //   image4Mobile,
  //   image5Mobile,
  // ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="relative h-56 md:h-72 w-full bg-slate-200 overflow-hidden rounded-lg shadow-lg">
        {/* Desktop / Tablet Navigation */}
        <div className="absolute z-10 w-full h-full top-0 left-0 flex justify-between items-center px-4 md:px-8">
          <button
            onClick={preveImage}
            className="bg-[#4CAF50] text-white rounded-full p-2 shadow-lg hover:bg-[#388E3C] transition-all"
          >
            <FaAngleLeft className="text-xl" />
          </button>
          <button
            onClick={nextImage}
            className="bg-[#4CAF50] text-white rounded-full p-2 shadow-lg hover:bg-[#388E3C] transition-all"
          >
            <FaAngleRight className="text-xl" />
          </button>
        </div>

        {/* Desktop and Tablet Version */}
        <div className="hidden md:flex h-full w-full">
          {desktopImages.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="w-full h-full min-w-full min-h-full transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Mobile Version */}
        <div className="flex md:hidden h-full w-full">
          {desktopImages.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="w-full h-full min-w-full min-h-full transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                alt={`Mobile Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
