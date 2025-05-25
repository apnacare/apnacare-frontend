import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-[#A5D6A7] w-full max-w-md rounded-lg shadow-lg p-6">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>
        <h2 className="text-xl font-semibold text-[#388E3C] mb-4 text-center">
          Change User Role
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col">
            <p className="text-[#388E3C] font-medium">Name:</p>
            <p className="text-gray-600">{name}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#388E3C] font-medium">Email:</p>
            <p className="text-gray-600">{email}</p>
          </div>

          <div className="flex flex-col">
            <p className="text-[#388E3C] font-medium">Role:</p>
            <select
              className="border-2 border-[#388E3C] rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#388E3C]"
              value={userRole}
              onChange={handleOnChangeSelect}
            >
              {Object.values(ROLE).map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              className="w-full py-2 px-4 rounded-full bg-[#388E3C] text-white hover:bg-[#2C6B2F] focus:outline-none focus:ring-2 focus:ring-[#2C6B2F] transition-all"
              onClick={updateUserRole}
            >
              Change Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
