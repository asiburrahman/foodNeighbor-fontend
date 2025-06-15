import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';
import UseRequestApi from '../API/UseRequestApi';
// import { myRequest } from '../API/myrequested';



const MyRequestedFood = () => {
    const { user } = use(AuthContext)
    const [tasks, setTask] = useState([])
    const { myRequestFood } = UseRequestApi();




    useEffect(() => {



        //  myRequest(user.email, user.accessToken).then(data=>setTask(data))
        myRequestFood(user.email).then(data => setTask(data))



    }, [user])
    return (
        <div>
            <div className="overflow-x-auto   w-11/12 mx-auto ">
                <div>
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Food Name</th>
                                <th>Pickup Location</th>
                                <th>Expire Date</th>
                                <th>Requested Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task, index) => <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={task.foodImage}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{task.foodName}</div>
                                                <div className="text-xs opacity-50">Donner: <span className='font-bold'>{task.displayName}</span></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        {task.foodLocation}

                                    </td>

                                    <td>
                                        {task.date}
                                    </td>
                                    <td>
                                        {task.foodRequestDate}
                                    </td>

                                </tr>)
                            }



                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
};

export default MyRequestedFood;