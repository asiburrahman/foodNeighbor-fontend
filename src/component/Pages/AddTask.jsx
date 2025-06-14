import React, { use, useState } from 'react';
import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const AddTask = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = use(AuthContext)
    console.log(user);



    const handleAddTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const date = startDate.toLocaleDateString("en-CA");
        const userData = { date, ...data }
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
                                <span className="label-text font-bold">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Category  */}
                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">Category</span>
                            </label>

                            <select className="input input-bordered w-full" name="category" id="day">
                                <option value="Web Development">Web Development</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="Content Writing">Content Writing</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Video Editing">Video Editing</option>
                                <option value="UI/UX design">UI/UX design</option>
                                <option value="Internet of Things Solutions">IoT (Internet of Things) Solutions</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">Description</span>
                            </label>
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Description"
                                className="input input-bordered w-full h-20"
                                required
                            />
                        </div>


                        {/* Deadline */}
                        <div className="form-control lg:w-1/2 mt-6 md:mt-0 mx-auto">
                            <label className="label font-bold">
                                <span className="label-text">Deadline</span>
                            </label>
                            <DatePicker
                                className="input input-bordered w-full"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </div>


                        {/* Budget  */}

                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">Budget</span>
                            </label>
                            <input
                                type="number"
                                name="budget"
                                placeholder="Price"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* User Name  */}
                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">User Name</span>
                            </label>
                            <input
                                type="Text"
                                name="name"
                                value={user.displayName}
                                placeholder="User Name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* User Name  */}
                        <div className="form-control md:w-1/2 mx-auto">
                            <label className="label">
                                <span className="label-text font-bold">User Mail</span>
                            </label>
                            <input
                                type="Email"
                                name="email"
                                value={user.email}
                                placeholder="Email"
                                className="input input-bordered w-full"
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

export default AddTask;