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
          loader: ()=> fetch('https://foodsharing-ce4a2.web.app/availableFood')
        },

        {
          path:'FoodDetails/:id',
          element: <PrivetRoutes><FoodDetails></FoodDetails></PrivetRoutes>,
          loader: ({params})=> fetch(`https://foodsharing-ce4a2.web.app/FoodDetails/${params.id}`)
        },
        
        {
          path: '/addFood',
          element: <PrivetRoutes><AddFood></AddFood></PrivetRoutes>
        },

        {
          path: '/myRequestedFood',
          element: <PrivetRoutes><MyRequestedFood></MyRequestedFood></PrivetRoutes>,
          
          
        },

        {
          path: '/myPostedFood',
          element: <PrivetRoutes><MyPostedFood></MyPostedFood></PrivetRoutes>,
          
          
        },
         {
          path:'updateTask/:id',
          element: <PrivetRoutes><UpdateTask ></UpdateTask></PrivetRoutes>,
          loader: ({params})=> fetch(`https://foodsharing-ce4a2.web.app/taskDetail/${params.id}`)
          // loader: UpdateTaskLoader
        },

        
      ]

    },
    
   
  ]);

  export default router