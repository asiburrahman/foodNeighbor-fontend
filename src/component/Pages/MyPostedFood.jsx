import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';
import MyFood from '../API/UseRequestApi';
import { Link } from 'react-router';
import useRequestApi from '../API/UseRequestApi';

const MyPostedFood = () => {
    const {user, loading, setLoading} = use(AuthContext)
    const [tasks, setTask] = useState([])
    const {MyFood} =useRequestApi();
    
        // MyFood(user.email).then(data=>setTask(data))



    useEffect(()=>{
                
    //             // console.log(location);
    //            fetch(`http://localhost:3000/task/${user.email}`,{
    //             method:"GET"
    //            }).then(res=> res.json()).then(data=>setTask(data)
    //            )
        
    MyFood(user.email).then(data=>setTask(data))
                
            },[user])

            
          const  handleDelete=(id)=>{
                Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        }).then((result) => {
                            console.log(result.isConfirmed)
                            if (result.isConfirmed) {
                
                                // start deleting the coffee
                                fetch(`http://localhost:3000/myTask/${id}`, {
                                    method: 'DELETE'
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.deletedCount) {
                                            Swal.fire({
                                                title: "Deleted!",
                                                text: "Your Coffee has been deleted.",
                                                icon: "success"
                                            });
                
                                            // remove the coffee from the state
                                            const remainingTasks = tasks.filter(task => task._id !== id);
                                            setTask(remainingTasks);
                                        }
                                    })
                
                
                            }
                        });

         
            }
           
            
            



    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map( (task, index) => <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td >
                                {task.title}
                                <br />
                                <span className="badge badge-ghost badge-sm">Rate: {task.budget}$</span>
                            </td>
                            
                            <td>
                                {task.category}
                            </td>
                            <td>
                                {task.date}
                            </td>
                            <th className='space-x-2'>
                                <Link to={`/updateTask/${task._id}`} className="btn  bg-amber-700 hover:bg-amber-50 btn-ghost btn-xs">Update</Link>
                                <button onClick={()=> handleDelete(task._id)} className="btn  bg-amber-700 hover:bg-amber-50 btn-ghost btn-xs">Delete</button>
                                <button  className="btn cursor-not-allowed bg-amber-700 hover:bg-amber-50 btn-ghost btn-xs">{task.bidsUser?.length || 0 } Bids</button>
                            </th>
                        </tr>)
                        }
                        
                        {/* <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>Purple</td>
                            <td>
                                <p>11-11-11</p>
                            </td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                                <button className="btn btn-ghost btn-xs">details</button>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr> */}
                       
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default MyPostedFood;