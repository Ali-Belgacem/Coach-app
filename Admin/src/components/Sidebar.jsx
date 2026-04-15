import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import sidebarLogo from "../assets/logo.jpeg";

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  return (
    <div
      className={`fixed top-0 left-0 min-h-screen h-full bg-white border-r-2 z-40 transition-transform duration-300 ease-in-out w-64 md:w-[18%] ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex flex-col gap-4 pt-6 pl-6 pr-4 md:pl-[20%] text-[15px]">
        <div className="mb-2 pr-4 md:pr-0">
          <img
            className="w-28 md:w-32 h-auto object-contain"
            src={sidebarLogo}
            alt="Logo"
          />
        </div>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-blue-100 font-medium" : "hover:bg-gray-100"
            }`
          }
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add" />
          <p className="hidden md:block">Add Transformation</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-blue-100 font-medium" : "hover:bg-gray-100"
            }`
          }
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List" />
          <p className="hidden md:block">List Transformation</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-blue-100 font-medium" : "hover:bg-gray-100"
            }`
          }
          to="/clients"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List" />
          <p className="hidden md:block">Clients</p>
        </NavLink>
        <button
          onClick={onClose}
          className="md:hidden mt-4 self-start text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
