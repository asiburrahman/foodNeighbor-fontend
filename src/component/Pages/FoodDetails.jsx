import React, { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router';

const FoodDetails = () => {
  const food = useLoaderData();
  const navigate = useNavigate()
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
        title: "You have already Request the Food",
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
        title: "You have already Request the Food",
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

    fetch(`https://foodsharing-ce4a2.web.app/post/${food._id}`, {
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
            title: "Your request has been successful",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/myRequestedFood')
        }
      })
      .catch(err => {
        console.error("Bid error:", err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong while requesting."
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
                                            placeholder="Expired Date"
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
        <section className="dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between rounded-2xl">
		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
			<h1 className="text-5xl font-bold leading-none sm:text-6xl">{food.foodName}
			
			</h1>
			<p className="mt-6  text-lg font-bold"> Pickup Location: <span className='text-secondary'>{food.foodLocation}</span></p>
			<p className="mt-6  text-lg font-bold"> Notes: <span className='text-secondary'>{food.foodNotes}</span> </p>
			<p className="mt-6  text-lg font-bold"> Donor Name: <span className='text-secondary'>{food.displayName}</span>  </p>
			<p className="mt-6  text-lg font-bold"> Donner Email: <span className='text-secondary'>{food.email}</span>  </p>
			<p className="mt-6  text-lg font-bold"> Food Quantity:< span className='text-secondary'>{food.foodQuantity}</span> </p>
			<div className="flex mt-5 flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
			 <button
            onClick={()=>handleFoodRequest()}
            className={`text-sm lg:text-md font-bold bg-primary text-white border-2 border-gray-500 rounded-2xl p-1  lg:p-2 shadow-md flex items-center lg:gap-2 transition-colors ${hasEmail ? 'bg-red-100 cursor-not-allowed' : 'hover:bg-gray-500' 
              }`}
          >
            {` ${hasEmail ? `Requested ${email}`
              : `Request This Food`} `}

            {/* task.bidsUser?.length? task.bidsUser?.length : 0 */}


          </button>
      </div>
		</div>
		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src={food.foodImage} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 rounded-4xl" />
		</div>
	</div>
  <div className=" flex items-center justify-between p-4">
          <p className="text-xl font-bold">Food Posted By</p>
          <div className="flex items-center">
            <img
              src={food.photoURL}
              alt="avatar"
              className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500"
            />
            <span className="dark:text-gray-600">{food.displayName}</span>
          </div>
        </div>
</section>



       
      </div>
    </div>
  );
};

export default FoodDetails;
