import React from "react"; // Add this line
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllRooms from "./pages/AllRooms";
import MainLayout from "./Layout/MainLayout";
import MyBookingRoom from "./pages/MyBookingRoom";
import Home from "./pages/Home";
import AuthProvider from "./provider/AuthProvider";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import RoomDetails from "./components/RoomDetails";
import Error from "./components/Error";
import PrivateRoutes from "./routes/PrivateRoutes";
import BookNow from "./components/BookNow";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "rooms",
        element: <AllRooms></AllRooms>,
      },
      {
        path: "/rooms/:id",
        element: (
          <PrivateRoutes>
            <RoomDetails></RoomDetails>
          </PrivateRoutes>
        )},
        {
          path: "/rooms/:id",
          element: <PrivateRoutes><RoomDetails /></PrivateRoutes>,
        }
        
        ,
          {
          path: "/rooms/:id",
          element: <PrivateRoutes><RoomDetails/></PrivateRoutes>,
          loader: ({ params }) => {
             fetch(`http://localhost:5000/rooms/${params.id}`);
         
        },
        },
      {
        path: "/book-now/:id",
        element: (
          <PrivateRoutes>
            <BookNow></BookNow>
          </PrivateRoutes>
        ),
      },
      {
        path: "my-booking-room",
        element: (
          <PrivateRoutes>
            <MyBookingRoom></MyBookingRoom>
          </PrivateRoutes>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
      <RouterProvider router={router} />

      </HelmetProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  </StrictMode>
);
