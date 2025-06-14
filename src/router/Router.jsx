import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";
  
  import React, { Children, Component } from "react";
  import ReactDOM from "react-dom/client";
import Root from "../lyout/Root";
import Home from "../component/Home/Home";
import Login from "../component/Login/Login";
import Register from "../component/Register/Register";
import PrivetRoutes from "../Routes/PrivetRoutes";
import Error from "../component/Error/Error";
import Loading from "../component/Loading/Loading";
import LoginProtectedRouts from "../Routes/LoginProtectedRouts";
import MyPostedTask from "../component/Pages/MyPostedTask";
import UpdateTask from "../component/Pages/UpdateTask";
import AddFood from "../component/Pages/AddFood";
import BrowseFood from "../component/Pages/BrowseTask";
import FoodDetails from "../component/Pages/FoodDetails";
  
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
          loader: ()=> fetch('http://localhost:3000/availableFood')
        },

        {
          path:'FoodDetails/:id',
          element: <PrivetRoutes><FoodDetails></FoodDetails></PrivetRoutes>,
          loader: ({params})=> fetch(`http://localhost:3000/FoodDetails/${params.id}`)
        },
        
        {
          path: '/addFood',
          element: <PrivetRoutes><AddFood></AddFood></PrivetRoutes>
        },

        {
          path: '/myTask',
          element: <PrivetRoutes><MyPostedTask></MyPostedTask></PrivetRoutes>,
          
          
        },
         {
          path:'updateTask/:id',
          element: <PrivetRoutes><UpdateTask></UpdateTask></PrivetRoutes>,
          loader: ({params})=> fetch(`http://localhost:3000/taskDetail/${params.id}`)
        },

        
      ]

    },
    
   
  ]);

  export default router