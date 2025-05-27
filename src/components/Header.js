// Paste this entire code into your Header.jsx file

import React, { useContext, useState } from "react";
import logo from "../assest/logo/apnacare_logo_black.svg";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [eco, setEco] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  return (
    <header className="px-20 fixed w-full z-50 bg-white/80 backdrop-blur border-b shadow-sm">
      <div className="h-16 flex items-center justify-between px-4 lg:px-8 container mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="logo"
            className="h-[35px] object-contain"
          />
        </Link>

        {/* Search + Eco (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 w-full max-w-md">
          <div className="bg-white flex items-center w-full border rounded-full px-3 shadow-sm focus-within:ring-2 ring-emerald-500 transition">
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full outline-none py-1.5 text-sm text-gray-700"
              onChange={handleSearch}
              value={search}
            />
            <button className="text-lg text-white bg-emerald-500 hover:bg-emerald-600 rounded-full p-2 transition">
              <GrSearch />
            </button>
          </div>

          {/* Eco Toggle */}
          {/* <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Eco</span>
            <button
              onClick={() => setEco((prev) => !prev)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                eco ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  eco ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div> */}
        </div>

        {/* User Controls (Desktop) */}
        <div className="hidden lg:flex items-center gap-5">
          {user?._id && (
            <div className="relative">
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full object-cover"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
              {menuDisplay && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-lg overflow-hidden z-50">
                  <nav className="flex flex-col text-sm">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="hover:bg-gray-100 px-4 py-2"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    {user?.role === ROLE.GENERAL && (
                      <Link
                        to="/user-panel"
                        className="hover:bg-gray-100 px-4 py-2"
                        onClick={() => setMenuDisplay(false)}
                      >
                        User Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Cart */}
          {user?._id && (
            <Link to="/cart" className="relative text-2xl">
              <FaShoppingCart />
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {context?.cartProductCount}
              </div>
            </Link>
          )}

          {/* Login / Logout */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={() => navigate("/search")}>
            <GrSearch className="text-xl" />
          </button>
          {/* <button
            onClick={() => setEco((prev) => !prev)}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition ${
              eco ? "bg-emerald-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                eco ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button> */}
          <button
            onClick={() => setDrawerOpen((prev) => !prev)}
            className="text-2xl"
          >
            {drawerOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pt-4 pb-6 border-t">
          {user?._id && (
            <div className="flex items-center gap-3 mb-4">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser className="text-2xl" />
              )}
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
          )}
          <nav className="flex flex-col gap-2 text-sm text-gray-800">
            {user?.role === ROLE.ADMIN && (
              <Link
                to="/admin-panel/all-products"
                onClick={() => setDrawerOpen(false)}
              >
                Admin Panel
              </Link>
            )}
            {user?.role === ROLE.GENERAL && (
              <Link to="/user-panel" onClick={() => setDrawerOpen(false)}>
                User Panel
              </Link>
            )}
            {user?._id && (
              <Link
                to="/cart"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2"
              >
                <FaShoppingCart />
                Cart ({context?.cartProductCount})
              </Link>
            )}
            {user?._id ? (
              <button
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                className="text-left text-emerald-600 font-medium"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setDrawerOpen(false)}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
