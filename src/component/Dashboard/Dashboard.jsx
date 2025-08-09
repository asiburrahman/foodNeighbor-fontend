import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import UseAxiosToken from "../hooks/UseAxiosToken";
import Loading from "../Loading/Loading";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = UseAxiosToken();

  // 1. Total Available Food
  const { data: totalFoods = [], isLoading: loading1 } = useQuery({
    queryKey: ["availableFood"],
    queryFn: async () => {
      const res = await axiosInstance("/availableFood");
      return res.data;
    },
  });

  // 2. My Posted Food
  const { data: myFoods = [], isLoading: loading2 } = useQuery({
    queryKey: ["myPostedFood", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance(`/myPostedFood/${user.email}`);
      return res.data;
    },
  });

  // 3. My Requested Food
  const { data: myRequests = [], isLoading: loading3 } = useQuery({
    queryKey: ["myRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
        const res = await axiosInstance(`/requestFood/${user.email}`);
        return res.data;
    },
  });

  const isLoading = loading1 || loading2 || loading3;

  if (isLoading) {
    return <Loading></Loading>
  }

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
          <h4 className="text-2xl font-bold">{totalFoods.length}</h4>
          <p>Total Available Foods</p>
        </div>
        <div className="bg-primary text-white p-6 rounded-xl shadow-md">
          <h4 className="text-2xl font-bold">{myFoods.length}</h4>
          <p>My Added Foods</p>
        </div>
        <div className="bg-accent text-white p-6 rounded-xl shadow-md">
          <h4 className="text-2xl font-bold">{myRequests.length}</h4>
          <p>My Requested Foods</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

