import React, { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';

const TaskDetails = () => {
  const task = useLoaderData();
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState(task.bidsUser || []);
  const hasBid = bids.includes(user?.email);

  
  const handleBidsCount = () => {
    if (hasBid) {
      return Swal.fire({
        position: "top-end",
        icon: "info",
        title: "You have already placed a bid",
        showConfirmButton: false,
        timer: 1500
      });
    }

    const updatedBids = [...bids, user.email];

    fetch(`http://localhost:3000/post/${task._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bidsUser: updatedBids })
    })
    .then(res => res.json())
    .then(data => {
      if (data.modifiedCount > 0) {
        setBids(updatedBids);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your bid has been submitted",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
    .catch(err => {
      console.error("Bid error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while bidding."
      });
    });
  };

  return (
    <div className="dark:text-gray-800 my-10">
      <div className="w-11/12 px-10 py-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <div className=" space-y-2 lg:flex items-center justify-between">
          <span className="text-sm dark:text-gray-600">Date: {task.date}</span>
          <button
            onClick={handleBidsCount}
            className={`text-sm lg:text-md font-bold bg-white p-1  lg:p-2 shadow-md flex items-center lg:gap-2 transition-colors ${
              hasBid ? 'bg-red-100 cursor-not-allowed' : 'hover:bg-red-100'
            }`}
          >
            <FaHeart className={hasBid ? 'text-red-500' : 'text-gray-500'} />
            {` ${hasBid? `Already Bided, your opportunities ${bids.length}`
              : `You bid for ${bids.length} opportunities` } `}

              {/* task.bidsUser?.length? task.bidsUser?.length : 0 */}


          </button>
        </div>

        <div className="mt-3">
          <a
            href="#"
            className="text-2xl md:text-4xl font-bold hover:underline"
          >
            {task.category}
          </a>
          <p className="mt-2">{task.description}</p>
        </div>

        <div className=" sflex items-center justify-between mt-3">
          <p className="text-xl font-bold">Rate: ${task.budget}</p>
          <div className="flex items-center">
            <img
              src="https://source.unsplash.com/50x50/?portrait"
              alt="avatar"
              className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500"
            />
            <span className="dark:text-gray-600">{task.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
