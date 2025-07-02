import React from 'react';
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from 'react-router';
const Food = ({ food }) => {





  return (
    //     <div className="max-w-sm rounded-xl bg-base-300 overflow-hidden shadow-lg border">
    //   {/* Top image with heart icon */}
    //   <div className="relative">
    //     {/* <Link to={`/taskDetail/${food._id}`} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-100">

    //       See Details
    //     </Link> */}
    //   </div>

    //   {/* Freelancer info */}
    //   <div className="p-4">
    //     <div className="flex items-center space-x-2">
    //       <img
    //         className="w-8 h-8 rounded-full object-cover"
    //         src={food.photoURL}
    //         alt="Ava Anderson"
    //       />
    //       <span className="font-semibold ">{food?.displayName}</span>
    //       <FaCheckCircle className="text-green-500" />
    //     </div>
    //     <div className='p-3'>
    //       <img className='object-cover rounded-2xl' src={food?.foodImage} alt="" />
    //     </div>


    //     {/* Food name  */}
    //     <div className="flex items-center text-xl font-bold  mt-2">

    //       <span>Food name: {food?.foodName}</span>
    //     </div>


    //     {/* Quantity */}
    //     <div className="flex items-center text-sm  mt-2">

    //       <span>Quantity: {food?.foodQuantity}</span>
    //     </div>

    //     {/* Price */}
    //     <div className="flex items-center text-sm gap-2 mt-2">

    //              <p className='font-semibold'>Food Status: </p> <span className={`p-2 rounded-3xl font-bold ${food.foodStatus === "Available" ? 'bg-accent': 'bg-secondary' }`}>{food.foodStatus}</span>
    //             </div>

    //   </div>
    // </div>

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
          <div className="flex items-center gap-2">
            <span className="font-semibold">Food Status:</span>
            <span className={`btn ${food.foodStatus==='Requested'?'btn-secondary':'btn-primary'} btn-xs rounded-full px-4`}>
              {food.foodStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;