import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaUtensils, FaHandshake, FaBoxOpen, FaPlusCircle } from "react-icons/fa";
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
    <div className="w-11/12 max-w-7xl mx-auto py-12 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="bg-base-100 p-8 rounded-2xl border border-base-200 mb-10 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="avatar">
          <div className="w-24 h-24 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden premium-shadow">
            <img src={user?.photoURL || '/default-avatar.png'} alt="Profile" />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black tracking-tight mb-2 text-base-content">
            Welcome back, <span className="text-primary">{user?.displayName}!</span>
          </h2>
          <p className="text-base-content/70 max-w-md">
            Manage your food donations and requests from your personal command center.
          </p>
        </div>
        <div className="md:ml-auto flex flex-col gap-2">
           <div className="badge badge-outline border-base-300 px-4 py-3 h-auto gap-2 text-base-content/40">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             User Active
           </div>
           <p className="text-xs text-center md:text-right font-mono text-base-content/60 opacity-60">
             {user?.email}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Stats Column */}
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {/* Stat Card 1 */}
             <div className="bg-base-100 p-6 rounded-2xl border border-base-200 premium-shadow group">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                   <FaUtensils className="text-xl" />
                 </div>
                 <div>
                    <h4 className="text-3xl font-black text-base-content">{myFoods.length}</h4>
                    <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">My Added Foods</p>
                 </div>
               </div>
             </div>

             {/* Stat Card 2 */}
             <div className="bg-base-100 p-6 rounded-2xl border border-base-200 premium-shadow group">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-orange-100/10 flex items-center justify-center text-orange-500 transition-transform group-hover:scale-110">
                   <FaHandshake className="text-xl" />
                 </div>
                 <div>
                    <h4 className="text-3xl font-black text-base-content">{myRequests.length}</h4>
                    <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">My Requests</p>
                 </div>
               </div>
             </div>

             {/* Stat Card 3 (Available) */}
             <div className="bg-base-100 p-6 rounded-2xl border border-base-200 premium-shadow group sm:col-span-2">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-emerald-100/10 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                   <FaBoxOpen className="text-xl" />
                 </div>
                 <div>
                    <h4 className="text-3xl font-black text-base-content">{totalFoods.length}</h4>
                    <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Total Community Food</p>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Quick Actions Column */}
        <div className="space-y-6 text-left">
           <div className="bg-neutral text-neutral-content p-8 rounded-2xl premium-shadow relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
               <div className="flex flex-col gap-3">
                 <Link to="/dashboard/addFood" className="btn btn-primary border-none text-white hover:saturate-150 transition-all font-bold">
                   <FaPlusCircle /> Add New Food
                 </Link>
                 <Link to="/dashboard/availableFood" className="btn bg-white/10 border-white/20 text-white hover:bg-white/20">
                   Browse Community
                 </Link>
               </div>
             </div>
             {/* Decoration */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

