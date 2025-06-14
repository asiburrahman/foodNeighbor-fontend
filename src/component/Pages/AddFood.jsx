import React, { use, useState } from 'react';
import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const AddFood = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = use(AuthContext)
    console.log(user);



    const handleAddTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const date = startDate.toLocaleDateString("en-CA");
        const displayName = user.displayName
        const email = user.email
        const photoURL = user.photoURL
        const foodStatus = 'Available'
        const userData = {displayName, email, photoURL, foodStatus, date, ...data }
        console.log(userData);


        fetch('http://localhost:3000/task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(res => res.json()).then(data => {
            if (data.insertedId) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Task has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

                form.reset()
            }
        })

    };


    return (
        <div>
            <div className=" lg:p-24 ">
                <h2 className="text-3xl text-center font-bold">Add A Task</h2>
                <form onSubmit={handleAddTask}>

                    <div className="flex flex-col gap-6 w-11/12 mx-auto ">



                        { /* Task Title */}
                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">Food Name</span>
                            </label>
                            <input
                                type="text"
                                name="foodName"
                                placeholder="Food Name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                         <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">Food Image</span>
                            </label>
                            <input
                                type="text"
                                name="foodImage"
                                placeholder="Food Image"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Quantity  */}
                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">Food Quantity</span>
                            </label>
                            <input
                                type="text"
                                name="foodQuantity"
                                placeholder="Food Quantity"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* PickUp Location */}
                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">PickUp Location</span>
                            </label>
                            <textarea
                                type="text"
                                name="foodLocation"
                                placeholder="PickUp Location"
                                className="input input-bordered w-full h-20"
                                required
                            />
                        </div>


                        {/* Expired Date */}
                        <div className="form-control lg:w-1/2 mt-6 md:mt-0 mx-auto">
                            <label className="label font-bold">
                                <span className="label-text">Expired Date</span>
                            </label>
                            <DatePicker
                                className="input input-bordered w-full"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </div>

                        {/* Additional Notes */}
                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">Additional Notes</span>
                            </label>
                            <textarea
                                type="text"
                                name="foodNotes"
                                placeholder="Additional Notes"
                                className="input input-bordered w-full h-20"
                                required
                            />
                        </div>

                        

                       
                        {/* <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Time</span>
              </label>

              <DatePicker
                className="input input-bordered w-full"
                selected={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div> */}
                    </div>

                    {/* End of Labels */}
                    <input
                        type="submit"
                        value="Add Task"
                        className="btn w-full bg-pink-500 text-white mt-6"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddFood;