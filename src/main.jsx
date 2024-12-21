import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Layout/MainLayout';
import AllRooms from './pages/AllRooms';
import MyBookingRoom from './pages/MyBookingRoom';
import Home from './pages/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"all-rooms",
        element:<AllRooms></AllRooms>
      },
      {
        path:"my-booking-room",
        element:<MyBookingRoom></MyBookingRoom>
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    </StrictMode>,
)
