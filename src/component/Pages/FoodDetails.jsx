import React, { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';

const FoodDetails = () => {
  const food = useLoaderData();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(food.userEmail || []);
  const hasEmail = email.includes(user?.email);
  const date = new Date();
  const d = date.toLocaleDateString("en-CA");


  const handleFoodRequest=()=>{
     if (hasEmail) {
      return Swal.fire({
        position: "top-end",
        icon: "info",
        title: "You have already placed a bid",
        showConfirmButton: false,
        timer: 1500
      });
    }
    document.getElementById('my_modal_3').showModal()
  }


  const handleRequest = (e) => {
    if (hasEmail) {
      return Swal.fire({
        position: "top-end",
        icon: "info",
        title: "You have already placed a bid",
        showConfirmButton: false,
        timer: 1500
      });
    }
    e.preventDefault();
    const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.foodStatus = "Requested"
       
        

    // const updatedBids = [...bids, user.email];

    fetch(`http://localhost:3000/post/${food._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          console.log(data);
          
          setEmail(user.email);
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



        {/* -------------------modal------------------------------- */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form onSubmit={handleRequest}>
            
                                <div className="flex flex-col gap-6 w-11/12 mx-auto ">
            
            
            
                                    { /* Food Name */}
                                    <div className="form-control md:w-4/5 mx-auto">
                                        <label className="label">
                                            <span className="label-text font-bold">Food Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="foodName"
                                            value={food.foodName}
                                            placeholder="Food Name"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                     <div className="form-control md:w-4/5 mx-auto">
                                        <label className="label">
                                            <span className="label-text font-bold">Food Image</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="foodImage"
                                            value={food.foodImage}
                                            placeholder="Food Image"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
            
                                    {/* Quantity  */}
                                    <div className="form-control md:w-4/5 mx-auto">
                                        <label className="label">
                                            <span className="label-text font-bold">Food Quantity</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="foodQuantity"
                                            value={food.foodQuantity}
                                            placeholder="Food Quantity"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                    {/* Donator Email  */}
                                    <div className="form-control md:w-4/5 mx-auto">
                                        <label className="label">
                                            <span className="label-text font-bold">Donator Email</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="foodEmail"
                                            value={food.email}
                                            placeholder="Food Quantity"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                    {/* Donator name  */}
                                    <div className="form-control md:w-4/5 mx-auto">
                                        <label className="label">
                                            <span className="label-text font-bold">Donator Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={food.displayName}
                                            placeholder="Donator Name"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                    {/* User Email  */}
                                    <div className="form-control md:w-4/5 mx-auto">
                                        <label className="label">
                                            <span className="label-text font-bold">User Email</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="userEmail"
                                            value={user.email}
                                            placeholder="User Email"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                    {/* Request Date */}
                                    <div className="form-control lg:w-4/5 mt-6 md:mt-0 mx-auto">
                                        <label className="label font-bold">
                                            <span className="label-text">Request Date</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="foodRequestDate"
                                            value={d}
                                            placeholder="Food Quantity"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                        
                                    </div>
            
                                    {/* PickUp Location */}
                                    <div className="form-control md:w-4/5 mx-auto">
                                        <label className="label">
                                            <span className="label-text font-bold">PickUp Location</span>
                                        </label>
                                        <textarea
                                            type="text"
                                            name="foodLocation"
                                            value={food.foodLocation}
                                            placeholder="PickUp Location"
                                            className="input input-bordered w-full h-20"
                                            required
                                        />
                                    </div>
            
            
                                    {/* Expired Date */}
                                    <div className="form-control lg:w-4/5 mt-6 md:mt-0 mx-auto">
                                        <label className="label font-bold">
                                            <span className="label-text">Expired Date</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="date"
                                            value={food.date}
                                            placeholder="Food Quantity"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                        
                                    </div>
            
                                    {/* Additional Notes */}
                                    <div className="form-control md:w-4/5 mx-auto">
                                        <label className="label">
                                            <span className="label-text font-bold">Additional Notes</span>
                                        </label>
                                        <textarea
                                            type="text"
                                            name="foodNotes"
                                            defaultValue={food.foodNotes}
                                            placeholder="Additional Notes"
                                            className="input input-bordered w-full h-20"
                                            required
                                        />
                                    </div>
            
                                </div>
            
                                {/* End of Labels */}
                                <input
                                    type="submit"
                                    value="Request"
                                    className="btn w-full bg-pink-500 text-white mt-6"
                                />
                            </form>
         
          </div>
        </dialog>
        {/* ------------------Modal End---------------------- */}


        <div className=" space-y-2 lg:flex items-center justify-between">
          <span className="text-sm dark:text-gray-600">Date: {food.date}</span>
          <button
            onClick={()=>handleFoodRequest()}
            className={`text-sm lg:text-md font-bold bg-white p-1  lg:p-2 shadow-md flex items-center lg:gap-2 transition-colors ${hasEmail ? 'bg-red-100 cursor-not-allowed' : 'hover:bg-red-100'
              }`}
          >
            <FaHeart className={hasEmail ? 'text-red-500' : 'text-gray-500'} />
            {` ${hasEmail ? `Already Bided, your opportunities ${email}`
              : `You bid for ${email} opportunities`} `}

            {/* task.bidsUser?.length? task.bidsUser?.length : 0 */}


          </button>
        </div>

        <div className="mt-3">
          <a
            href="#"
            className="text-2xl md:text-4xl font-bold hover:underline"
          >
            {food.category}
          </a>
          <p className="mt-2">{food.description}</p>
        </div>

        <div className=" flex items-center justify-between mt-3">
          <p className="text-xl font-bold">Rate: ${food.budget}</p>
          <div className="flex items-center">
            <img
              src="https://source.unsplash.com/50x50/?portrait"
              alt="avatar"
              className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500"
            />
            <span className="dark:text-gray-600">{food.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
