import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';
import UseRequestApi from '../API/UseRequestApi';

const MyRequestedFood = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTask] = useState([]);
  const { myRequestedFood } = UseRequestApi();

  useEffect(() => {
    if (user?.email) {
      myRequestedFood(user.email).then(data => setTask(data));
    }
  }, [user?.email]);

  return (
    <div className="overflow-x-auto w-11/12 mx-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Pickup Location</th>
            <th>Expire Date</th>
            <th>Requested Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={task.foodImage} alt="Food" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{task.foodName}</div>
                    <div className="text-xs opacity-50">
                      Donor: <span className="font-bold">{task.displayName}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td>{task.foodLocation}</td>
              <td>{task.date}</td>
              <td>{task.foodRequestDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequestedFood;