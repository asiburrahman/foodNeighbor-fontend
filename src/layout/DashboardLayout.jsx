import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import {
  FaHome,
  FaBoxOpen,
  FaPlusCircle,
  FaUtensils,
  FaHandshake,
  FaTachometerAlt,
} from 'react-icons/fa';
import ScrollToTop from '../component/ScrollToTop';

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <ScrollToTop />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden font-bold text-xl">
            Dashboard
          </div>
        </div>

        {/* Main Content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="bg-base-100 border-r border-base-200 min-h-full w-72 flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-base-100 mb-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img className="w-10 h-10 rounded-xl premium-shadow" src="/Food.jpg" alt="Logo" />
              <span className="text-xl font-bold tracking-tight text-base-content">
                Food<span className="text-primary font-black">Neighbor</span>
              </span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <ul className="menu menu-md px-4 flex-grow space-y-1">
            <li className="menu-title text-xs uppercase tracking-wider opacity-40 font-bold mb-2 ml-2 text-base-content">Main Menu</li>
            
            <li>
              <NavLink 
                to="/dashboard" 
                end
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200 text-base-content/70'}`}
              >
                <FaTachometerAlt className="text-lg" />
                <span>Overview</span>
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/dashboard/availableFood" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200 text-base-content/70'}`}
              >
                <FaBoxOpen className="text-lg" />
                <span>Available Food</span>
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/dashboard/addFood" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200 text-base-content/70'}`}
              >
                <FaPlusCircle className="text-lg" />
                <span>Add Food</span>
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/dashboard/myPostedFood" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200 text-base-content/70'}`}
              >
                <FaUtensils className="text-lg" />
                <span>My Added Food</span>
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/dashboard/myRequestedFood" 
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200 text-base-content/70'}`}
              >
                <FaHandshake className="text-lg" />
                <span>My Requested Food</span>
              </NavLink>
            </li>
          </ul>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-base-100 mt-auto">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 text-base-content/70 hover:text-primary transition-colors hover:bg-base-200 rounded-lg"
            >
              <FaHome className="text-lg" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
