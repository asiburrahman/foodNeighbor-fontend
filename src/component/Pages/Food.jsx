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

    <div className="group w-full bg-base-100 border border-base-200 rounded-3xl overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl premium-shadow">
      {/* Food Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={food.foodImage}
          alt={food.foodName}
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
           <span className={`badge border-none px-4 py-3 h-auto shadow-md font-bold text-xs uppercase tracking-widest ${food.foodStatus === 'Requested' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
            {food.foodStatus}
          </span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link
              to={`/FoodDetails/${food._id}`}
              className="btn btn-primary border-none text-white rounded-full px-8 shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              See Details
            </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow text-left">
        {/* Donor Profile */}
        <div className="flex items-center gap-3 mb-5 p-2 rounded-2xl bg-base-200/50 transition-colors group-hover:bg-primary/5">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={food.photoURL} alt={food.displayName} />
            </div>
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-sm text-base-content">{food.displayName}</span>
             <span className="text-[10px] text-base-content/40 flex items-center gap-1">
               Donor <FaCheckCircle className="text-emerald-500" />
             </span>
          </div>
        </div>

        {/* Food Details */}
        <div className="space-y-4 flex-grow">
          <div>
            <h3 className="text-xl font-bold text-base-content line-clamp-1 group-hover:text-primary transition-colors">
              {food.foodName}
            </h3>
            <div className="flex items-center gap-1 text-base-content/40 mt-1">
               <FaMapMarkerAlt className="text-xs" />
               <span className="text-xs font-medium">{food.foodLocation || "Safe House, Nearby"}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-dashed border-base-200">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-tighter">Quantity</span>
              <span className="font-black text-primary">{food.foodQuantity} Units</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-tighter">Expires</span>
              <span className="text-xs font-bold text-base-content/60">{food.date}</span>
            </div>
          </div>
        </div>

        {/* Mobile-only See Details Link */}
        <div className="mt-6 md:hidden">
           <Link
              to={`/FoodDetails/${food._id}`}
              className="btn btn-primary btn-block text-white rounded-xl"
            >
              See Details
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Food;