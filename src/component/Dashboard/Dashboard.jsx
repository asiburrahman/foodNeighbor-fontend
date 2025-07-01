import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UseAxiosToken from "../hooks/UseAxiosToken";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosToken();

  const [totalFoodCount, setTotalFoodCount] = useState(0);
  const [myFoodsCount, setMyFoodsCount] = useState(0);
  const [myRequestsCount, setMyRequestsCount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      // 1. Total available food count
      axiosSecure("/availableFood").then((res) =>
        setTotalFoodCount(res.data.length)
      );

      // 2. My added food count
      axiosSecure(`/myPostedFood/${user.email}`).then((res) =>
        setMyFoodsCount(res.data.length)
      );

      // 3. My requested food count
      axiosSecure(`/requestFood/${user.email}`).then((res) =>
        setMyRequestsCount(res.data.length)
      );
    }
  }, [user, axiosSecure]);

  return (
    <div className="w-11/12 max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-10">📊 Dashboard</h2>

      {/* User Info */}
      <div className="bg-base-200 rounded-xl p-6 mb-6 text-center shadow-md">
        <h3 className="text-xl font-semibold mb-1">👤 {user?.displayName}</h3>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        <div className="bg-secondary text-white p-6 rounded-xl shadow-md">
          <h4 className="text-2xl font-bold">{totalFoodCount}</h4>
          <p>Total Available Foods</p>
        </div>
        <div className="bg-primary text-white p-6 rounded-xl shadow-md">
          <h4 className="text-2xl font-bold">{myFoodsCount}</h4>
          <p>My Added Foods</p>
        </div>
        <div className="bg-accent text-white p-6 rounded-xl shadow-md">
          <h4 className="text-2xl font-bold">{myRequestsCount}</h4>
          <p>My Requested Foods</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
