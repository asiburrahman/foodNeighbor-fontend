import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Task from './Food';
import Swal from 'sweetalert2';
import UseRequestApi from '../API/UseRequestApi';
// import { myRequest } from '../API/myrequested';

import UseAxiosToken from '../hooks/UseAxiosToken';
import { imageUpload } from '../../utils/imageUpload';

const UpdateTask = () => {
     const { user } = use(AuthContext)
     const axiosInstance = UseAxiosToken();

    const loadFood = useLoaderData();
    


    // useEffect(()=>{
    //                 //   myRequest(id, user.accessToken).then(data=>setLoadFood(data))
    //                 UpdateFood(user.email).then(data=>setLoadFood(data))
    //               },[user])

    //                 console.log(loadFood);


    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date(loadFood.date))

    const handleUpdateTask = async (e) => {

        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const foodImageFile = form.foodImage.files[0];

        try {
            let foodImage = loadFood.foodImage;

            if (foodImageFile) {
                foodImage = await imageUpload(foodImageFile);
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const date = startDate?.toLocaleDateString("en-CA");
            const { foodImage: _, ...otherData } = data;
            const userData = { date, foodImage, ...otherData }

            if (loadFood.email !== user.email) {
                setLoading(false);
                return alert("Don't Try This")
            }

            const res = await axiosInstance.patch(`/updateTask/${loadFood._id}`, userData);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Update has been successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error("Update error:", err);
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: err.message || "Something went wrong while updating."
            });
        } finally {
            setLoading(false);
        }

    }



    return (

        <div className=" lg:p-24 ">
            <h2 className="text-3xl text-center font-bold">Update Your Food</h2>
            <form onSubmit={handleUpdateTask}>

                <div className="flex flex-col gap-6 w-11/12 mx-auto ">



                    { /* Food name */}
                    <div className="form-control md:w-4/5 mx-auto">
                        <label className="label">
                            <span className="label-text font-bold">Food Name</span>
                        </label>
                        <input
                            type="text"
                            name="foodName"
                            placeholder="Food Name"
                            className="input input-bordered w-full"
                            required
                            defaultValue={loadFood.foodName}
                        />
                    </div>


                    {/* Food Image */}
                    <div className="form-control md:w-4/5 mx-auto">
                        <label className="label">
                            <span className="label-text font-bold">Food Image</span>
                        </label>
                        <div className="flex flex-col gap-2">
                            {loadFood.foodImage && (
                                <div className="avatar">
                                    <div className="w-20 rounded">
                                        <img src={loadFood.foodImage} alt="Current Food" />
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                name="foodImage"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                            />
                            <p className="text-xs text-gray-500">Leave blank to keep existing photo.</p>
                        </div>
                    </div>

                    {/* Food Quantity  */}

                    <div className="form-control md:w-4/5 mx-auto">
                        <label className="label">
                            <span className="label-text font-bold">Food Quantity</span>
                        </label>
                        <input
                            type="number"
                            name="foodQuantity"
                            placeholder="Food Quantity"
                            className="input input-bordered w-full"
                            defaultValue={loadFood.foodQuantity}
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
                            defaultValue={loadFood.foodLocation}
                            placeholder="PickUp Location"
                            className="input input-bordered w-full h-20"
                            required
                        />
                    </div>


                    {/* Expired Date */}
                    <div className="form-control lg:w-4/5 mt-6 md:mt-0 mx-auto">
                        <label className="label font-bold">
                            <span className="label-text">Deadline</span>
                        </label>
                        <DatePicker
                            className="input input-bordered w-full"
                            selected={startDate}
                            defaultValue={startDate}
                            onChange={(date) => setStartDate(date)}
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
                            defaultValue={loadFood.foodNotes}
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
                            Updating...
                        </span>
                    ) : (
                        "Update"
                    )}
                </button>
            </form>

        </div>


    );
};

export default UpdateTask;