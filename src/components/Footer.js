import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const shopLinks = ["Laptops", "Mobiles", "Accessories", "Offers"];
  const helpLinks = ["Shipping", "Returns", "FAQs", "Contact"];
  const companyLinks = ["About Us", "Careers", "Privacy Policy", "Terms"];

  const socialIcons = [
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaLinkedinIn />, link: "#" },
  ];

  return (
    <footer className="bg-[#2C6B2F] text-white py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-2">Filma</h2>
          <p className="text-gray-300 mb-4">
            Premium electronics at your fingertips. Shop smart, shop Filma.
          </p>
          <div className="flex space-x-4">
            {socialIcons.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-gray-300 hover:text-white transition text-xl"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-gray-300">
            {shopLinks.map((link, idx) => (
              <li key={idx} className="hover:text-white cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Customer Service</h4>
          <ul className="space-y-2 text-gray-300">
            {helpLinks.map((link, idx) => (
              <li key={idx} className="hover:text-white cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-gray-300">
            {companyLinks.map((link, idx) => (
              <li key={idx} className="hover:text-white cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {year} Filma. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
