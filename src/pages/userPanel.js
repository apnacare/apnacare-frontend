import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.GENERAL) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex">
      <aside className="bg-white w-[250px] h-full shadow-lg p-4 rounded-xl">
        <div className="flex flex-col items-center pb-8">
          <div className="relative mb-4">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-24 h-24 rounded-full border-4 border-blue-500"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser className="text-blue-500 text-6xl" />
            )}
          </div>
          <p className="capitalize text-xl font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        <nav className="space-y-4">
          <Link
            to={"all-order"}
            className="block px-4 py-2 rounded-lg text-lg text-gray-800 hover:bg-gray-100 hover:text-blue-600 transition-all"
          >
            All Users
          </Link>
          {/* <Link
            to={"all-products"}
            className="block px-4 py-2 rounded-lg text-lg text-gray-800 hover:bg-gray-100 hover:text-blue-600 transition-all"
          >
            All Products
          </Link> */}
        </nav>
      </aside>

      <main className="w-full h-full p-8 overflow-auto bg-gray-50 rounded-xl">
        <Outlet />
      </main>
    </div>
  );
};

export default UserPanel;
