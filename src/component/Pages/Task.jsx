import React from 'react';
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from 'react-router';
const Task = ({task}) => {



    

    return (
        <div className="max-w-sm rounded-xl overflow-hidden shadow-lg border">
      {/* Top image with heart icon */}
      <div className="relative">
        <Link to={`/taskDetail/${task._id}`} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-100">
          {/* <FaHeart className="text-gray-500" /> */}
          See Details
        </Link>
      </div>

      {/* Freelancer info */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Ava Anderson"
          />
          <span className="font-semibold text-gray-900">{task.name}</span>
          <FaCheckCircle className="text-green-500" />
        </div>

        <p className="mt-2 text-lg font-semibold text-gray-800">
          {task.title}
        </p>

        {/* Rating */}
        <div className="flex items-center text-sm mt-2 text-gray-500">
          
        </div>

        {/* Deadline */}
        <div className="flex items-center text-sm text-gray-500 mt-2">
          
          <span>Deadline: {task.date}</span>
        </div>

        {/* Price */}
        <div className="border-t mt-4 pt-2 text-sm text-gray-500 flex justify-between">
          <span>Starting from</span>
          <span className="font-bold text-black">${task.budget}</span>
        </div>
      </div>
    </div>
    );
};

export default Task;