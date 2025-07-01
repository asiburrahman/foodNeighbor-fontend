import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router';

const AvailableFood = ({ food }) => {
  return (
    <div className="w-full max-w-sm bg-base-300 border shadow-md rounded-xl overflow-hidden flex flex-col h-full">
      {/* See Details Button */}
      <div className="relative">
        <Link
          to={`/FoodDetails/${food._id}`}
          className="absolute top-3 right-3 btn btn-primary btn-sm rounded-full"
        >
          See Details
        </Link>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* User Info */}
        <div className="flex items-center gap-2 mb-2">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={food.photoURL}
            alt={food.displayName}
          />
          <span className="font-semibold text-sm">{food.displayName}</span>
          <FaCheckCircle className="text-green-500 text-sm" />
        </div>

        {/* Food Image */}
        <div className="w-full h-48 flex items-center justify-center mb-3">
          <img
            className="h-full w-full object-cover rounded-xl"
            src={food.foodImage}
            alt={food.foodName}
          />
        </div>

        {/* Food Info */}
        <div className="space-y-2 text-sm">
          <p className="text-lg font-bold">Food Name: {food.foodName}</p>
          <p className="font-semibold text-base">Quantity: {food.foodQuantity}</p>
          <p>Date: {food.date}</p>
          <p className="flex items-center gap-2">
            <span className="font-semibold">Food Status:</span>
            <span className="btn btn-primary btn-xs rounded-full px-4">
              {food.foodStatus}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailableFood;
