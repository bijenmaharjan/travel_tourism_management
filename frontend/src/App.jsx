import React, { useEffect } from "react";
import Login from "./auth/login";
import Register from "./auth/Register";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toasts
import Home from "./pages/user/Home";
import "@fontsource/dancing-script"; // Import Dancing Script font
import Unauthorized from "./pages/Unauthorized";
import Nopage from "./pages/Nopage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth";
import { Skeleton } from "./components/UI/skeleton";
import CheckAuth from "./common/CheckAuth";
import Layout from "./components/management/Layout";

import GetAllHotels from "./pages/admin/GetAllHotels";

import AdminLayout from "./components/admin/Layout";
import CreateHotel from "./pages/admin/CreateHotel";
import AdminBookings from "./pages/admin/AdminBooked";

import TravelPackageList from "./pages/admin/TravelPackageList";
import TravelPackages from "./pages/user/TravelPackages";
import HotelPackage from "./pages/user/HotelPackage";
import AboutUs from "./pages/user/AboutUs";
import ScrollToTop from "./components/user/ScrollToTop";
import MapComponent from "./components/user/MapComponent";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  console.log("userDatasApp:", user?.role, isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  // const isAuthenticated = true;
  // const user = {
  //   name: "bijen",
  //   role: "admin",
  // };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        // Update your App.jsx routes
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="addhotel" element={<CreateHotel />} />
          <Route path="getallhotels" element={<GetAllHotels />} />
          <Route path="booked" element={<AdminBookings />} />
        </Route>
        <Route path="/traveling" element={<AdminLayout />}>
          <Route path="package" element={<TravelPackageList />} />
        </Route>
        <Route path="/travel" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="travelPackage" element={<TravelPackages />} />
          <Route path="userhotel" element={<HotelPackage />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="map" element={<MapComponent />} />
        </Route>
        <Route path="/unauth-page" element={<Unauthorized />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </div>
  );
};

export default App;
