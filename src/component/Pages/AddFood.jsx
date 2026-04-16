import React, { use, useState } from 'react';
import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import UseAxiosToken from '../hooks/UseAxiosToken';
import { imageUpload } from '../../utils/imageUpload';

const AddFood = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const { user } = use(AuthContext);
    const axiosInstance = UseAxiosToken();




    const handleAddTask = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const foodImageFile = form.foodImage.files[0];

        try {
            // Upload image to ImgBB
            const foodImage = await imageUpload(foodImageFile);

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const date = startDate.toLocaleDateString("en-CA");
            const foodQuantity = parseInt(data.foodQuantity)
            const { foodQuantity: _, foodImage: __, ...restData } = data;
            const displayName = user.displayName
            const email = user.email
            const photoURL = user.photoURL
            const foodStatus = 'Available'
            const userData = { displayName, email, photoURL, foodStatus, date, foodQuantity, foodImage, ...restData }

            const res = await axiosInstance.post('/task', userData);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Food has been added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
                setStartDate(new Date());
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: err.message || "Something went wrong while adding food."
            });
        } finally {
            setLoading(false);
        }

    };


    return (
        <div>
            <div className=" lg:p-24 ">
                <h2 className="text-3xl text-center font-bold">Add A Food</h2>
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
                                type="file"
                                name="foodImage"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
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

                    </div>

                    {/* End of Labels */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-full bg-pink-500 text-white mt-6"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="loading loading-spinner"></span>
                                Processing...
                            </span>
                        ) : (
                            "Add Food"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;