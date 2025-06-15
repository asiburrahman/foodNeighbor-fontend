import React from 'react';
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Link } from 'react-router';

const AvailableFood = ({food}) => {
    return (
        <div className="max-w-sm rounded-xl bg-base-300 overflow-hidden shadow-lg border">
              {/* Top image with heart icon */}
              <div className="relative">
                <Link to={`/FoodDetails/${food._id}`} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-100">
                  
                  See Details
                </Link>
              </div>
        
              {/* Freelancer info */}
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={food.photoURL}
                    alt="Ava Anderson"
                  />
                  <span className="font-semibold ">{food.displayName}</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div className='p-3'>
                  <img className='object-cover rounded-2xl' src={food.foodImage} alt="" />
                </div>
        
                
                {/* Food name  */}
                <div className="flex items-center text-xl font-bold  mt-2">
                  
                  <span>Food name: {food.foodName}</span>
                </div>
             
        
                {/* Quantity */}
                <div className="flex items-center text-sm  mt-2">
                  
                  <span className='font-semibold text-xl'>Quantity: {food.foodQuantity}</span>
                </div>
                {/* Date */}
                <div className="flex items-center text-sm  mt-2">
                  
                  <span>Date: {food.date}</span>
                </div>
        
                {/* Status */}
                <div className="flex items-center text-sm gap-2 mt-2">
                  
                 <p className='font-semibold'>Food Status: </p> <span className='p-2 rounded-3xl font-bold bg-accent'>{food.foodStatus}</span>
                </div>
              </div>
            </div>
    );
};

export default AvailableFood;