import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiUsers, HiShoppingBag, HiClipboardList } from "react-icons/hi";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  // Check if the given path is active
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="bg-white w-[280px] min-h-screen shadow-xl p-6 fixed left-0 top-0">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Flima Admin</h1>
        </div>
        
        <div className="flex flex-col items-center py-6 border-y border-gray-100">
          <div className="relative mb-4">
            {user?.profilePic ? (
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100">
                <img
                  src={user?.profilePic}
                  className="w-full h-full object-cover"
                  alt={user?.name}
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center ring-4 ring-blue-100">
                <FaRegCircleUser className="text-blue-600 text-4xl" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <p className="capitalize text-xl font-semibold text-gray-800">{user?.name}</p>
          <p className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full mt-1">{user?.role}</p>
        </div>

        <nav className="mt-8 space-y-1">
          <Link
            to={"all-users"}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
              isActive("all-users") 
                ? "bg-blue-50 text-blue-600" 
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <HiUsers className={`text-lg ${isActive("all-users") ? "text-blue-600" : "text-gray-500"}`} />
            <span>All Users</span>
            {isActive("all-users") && <div className="w-1.5 h-6 bg-blue-600 rounded-full ml-auto"></div>}
          </Link>
          
          <Link
            to={"all-products"}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
              isActive("all-products") 
                ? "bg-blue-50 text-blue-600" 
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <HiShoppingBag className={`text-lg ${isActive("all-products") ? "text-blue-600" : "text-gray-500"}`} />
            <span>All Services</span>
            {isActive("all-products") && <div className="w-1.5 h-6 bg-blue-600 rounded-full ml-auto"></div>}
          </Link>
          
          <Link
            to={"admin-order"}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
              isActive("admin-order") 
                ? "bg-blue-50 text-blue-600" 
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            }`}
          >
            <HiClipboardList className={`text-lg ${isActive("admin-order") ? "text-blue-600" : "text-gray-500"}`} />
            <span>All Orders</span>
            {isActive("admin-order") && <div className="w-1.5 h-6 bg-blue-600 rounded-full ml-auto"></div>}
          </Link>
        </nav>

        {/* <div className="mt-auto pt-6">
          <div className="px-4 py-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Admin Dashboard</p>
            <p className="text-xs text-blue-600 mt-1">Manage your ecommerce services</p>
          </div>
        </div> */}
      </aside>

      <main className="ml-[280px] w-full p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
