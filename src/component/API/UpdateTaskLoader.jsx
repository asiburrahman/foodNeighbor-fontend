import React, { use, useEffect, useState } from 'react';
import UseRequestApi from './UseRequestApi';
import { AuthContext } from '../../context/AuthContext';


const UpdateTaskLoader = ({params}) => {
    const {id}= params
    const {user} = use(AuthContext)


const [task, setTask] = useState([]);

  useEffect(() => {
    

    fetch(`http://localhost:3000/taskDetail/${id}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => setTask(data));
  }, [id]);

    console.log(task);
    
  
    //  const {MyFood} =UseRequestApi();
    
    
    // const [tasks, setTask] = useState([]);
   
    // console.log(MyFood);
    
   
    
    // useEffect(()=>{
    // UpdateTask(id).then(data=>setTask(data))
    // },[])
    // console.log(tasks);
    
    return task;
};

export default UpdateTaskLoader;