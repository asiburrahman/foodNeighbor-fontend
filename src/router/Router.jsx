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
import AddTask from "../component/Pages/AddTask";
import BrowseTask from "../component/Pages/BrowseTask";
import MyPostedTask from "../component/Pages/MyPostedTask";
import TaskDetails from "../component/Pages/TaskDetails";
import UpdateTask from "../component/Pages/UpdateTask";
  
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
          path:'/browseTask',
          Component: BrowseTask,
          loader: ()=> fetch('http://localhost:3000/task')
        },

        {
          path:'taskDetail/:id',
          element: <PrivetRoutes><TaskDetails></TaskDetails></PrivetRoutes>,
          loader: ({params})=> fetch(`http://localhost:3000/taskDetail/${params.id}`)
        },
        
        {
          path: '/addTask',
          element: <PrivetRoutes><AddTask></AddTask></PrivetRoutes>
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