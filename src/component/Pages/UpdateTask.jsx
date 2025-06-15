import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Task from './Food';
import Swal from 'sweetalert2';
import UseRequestApi from '../API/UseRequestApi';
// import { myRequest } from '../API/myrequested';

const UpdateTask = () => {
    // const {id}= useParams();
    // const {UpdateFood} = UseRequestApi();
    // const [loadFood, setLoadFood] = useState([])
     const { user } = use(AuthContext)

    const loadFood = useLoaderData();
    


    // useEffect(()=>{
    //                 //   myRequest(id, user.accessToken).then(data=>setLoadFood(data))
    //                 UpdateFood(user.email).then(data=>setLoadFood(data))
    //               },[user])

    //                 console.log(loadFood);


    const [startDate, setStartDate] = useState(new Date(loadFood.date))

    const handleUpdateTask = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const date = startDate?.toLocaleDateString("en-CA");
        const userData = { date, ...data }
        
        if (loadFood.email !== user.email) {
            return alert("Don't Try This")
        }

        fetch(`http://localhost:3000/UpdateTask/${loadFood._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Update has been successful",
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
                    text: "Something went wrong while requesting."
                });
            });

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
                        {/* <textarea
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        className="input input-bordered w-full h-20"
                                        defaultValue={loadUser.description}
                                        required
                                    /> */}
                        <input
                            type="url"
                            name="foodImage"
                            placeholder="Food Image URL"
                            className="input input-bordered w-full"
                            defaultValue={loadFood.foodImage}
                            required
                        />
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
                <input
                    type="submit"
                    value="Update"
                    className="btn w-full bg-pink-500 text-white mt-6"
                />
            </form>

        </div>


    );
};

export default UpdateTask;