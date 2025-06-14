import React, { use, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';
import { myRequest } from '../API/myrequested';



const MyRequestedFood = () => {
    const {user} = use(AuthContext)
        const [tasks, setTask] = useState([])
        

    
    
    
    
        useEffect(()=>{
                    
                //     console.log(location);
                //    fetch(`http://localhost:3000/requestFood/${user.email}`,{
                //     method:"GET"
                //    }).then(res=> res.json()).then(data=>setTask(data))
                //    )

                 myRequest(user.email, user.accessToken).then(data=>setTask(data))
                 
            
                    
                },[user])
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
                        
                       
                       
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
};

export default MyRequestedFood;