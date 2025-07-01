import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";
  
  import React, { Children, Component, use } from "react";
  import ReactDOM from "react-dom/client";
import Root from "../lyout/Root";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import Register from "../component/Register/Register";
import PrivetRoutes from "../Routes/PrivetRoutes";
import Error from "../component/Error/Error";
import Loading from "../component/Loading/Loading";
import LoginProtectedRouts from "../Routes/LoginProtectedRouts";
import UpdateTask from "../component/Pages/UpdateTask";
import AddFood from "../component/Pages/AddFood";
import BrowseFood from "../component/Pages/BrowseFood";
import FoodDetails from "../component/Pages/FoodDetails";
import MyRequestedFood from "../component/Pages/MyRequestedFood";
import MyPostedFood from "../component/Pages/MyPostedFood";
import { AuthContext } from "../context/AuthContext";
import UpdateTaskLoader from "../component/API/UpdateTaskLoader";
import Contact from "../component/Pages/Contact";
import About from "../component/Pages/About";
import DashboardLayout from "../lyout/DashboardLayout";
import Dashboard from "../component/Dashboard/Dashboard";
  
  const router = createBrowserRouter([
    
    {
      path: "/",
      Component: Root,
      errorElement: <Error></Error>,
      children:[
        {
            path:'/',
            Component: Home,
            hydrateFallbackElement: <Loading></Loading>,
        },
    

        {
          path: '/login',
          element: <LoginProtectedRouts><Login></Login></LoginProtectedRouts>
        },
        {
          path: '/register',
          element: <LoginProtectedRouts><Register></Register></LoginProtectedRouts>
        },

        {
          path:'/availableFood',
          Component: BrowseFood,
          // loader: ()=> fetch('https://food-neighbor-backend.vercel.app/availableFood')
        },
         {
          path:'/FoodDetails/:id',
          element: <PrivetRoutes><FoodDetails></FoodDetails></PrivetRoutes>,
          loader: ({params})=> fetch(`https://food-neighbor-backend.vercel.app/FoodDetails/${params.id}`)
        },
        

       
        {
          path: '/contact',
          Component: Contact
    
        },
        {
          path: '/about',
          Component: About
    
        },
         

        
      ]

    },
    {
      path: "/dashboard",
      element: <PrivetRoutes><DashboardLayout></DashboardLayout></PrivetRoutes>,
      errorElement: <Error></Error>,
      children:[

        {
          index: true,
          Component: Dashboard,
          // loader: ()=> fetch('https://food-neighbor-backend.vercel.app/availableFood')
        },

         {
          path:'/dashboard/availableFood',
          Component: BrowseFood,
          // loader: ()=> fetch('https://food-neighbor-backend.vercel.app/availableFood')
        },
        
        {
          path: '/dashboard/addFood',
          element: <PrivetRoutes><AddFood></AddFood></PrivetRoutes>
        },

        {
          path: '/dashboard/myRequestedFood',
          element: <PrivetRoutes><MyRequestedFood></MyRequestedFood></PrivetRoutes>,
          
          
        },

        {
          path: '/dashboard/myPostedFood',
          element: <PrivetRoutes><MyPostedFood></MyPostedFood></PrivetRoutes>,
    
        },
        {
          path:'/dashboard/updateTask/:id',
          element: <PrivetRoutes><UpdateTask ></UpdateTask></PrivetRoutes>,
          loader: ({params})=> fetch(`https://food-neighbor-backend.vercel.app/taskDetail/${params.id}`)
          // loader: UpdateTaskLoader
        },
      ]}
    
   
  ]);

  export default router