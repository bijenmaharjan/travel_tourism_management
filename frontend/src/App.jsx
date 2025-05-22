import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/dancing-script";

// Auth & Pages

import Logins from "./auth/Logins";
import Register from "./auth/Register";
import Home from "./pages/user/Home";
import Unauthorized from "./pages/Unauthorized";
import Nopage from "./pages/Nopage";
import AboutUs from "./pages/user/AboutUs";
import ScrollToTop from "./components/user/ScrollToTop";
import MapComponent from "./components/user/MapComponent";
import PaymentSuccess from "./components/user/PaymentSuccess";
import PaymentFailure from "./components/user/PaymentFailure";
import Blog from "./pages/user/Blog";
import Contact from "./pages/user/Contact";

// Admin
import AdminLayout from "./components/admin/Layout";
import GetAllHotels from "./pages/admin/GetAllHotels";
import CreateHotel from "./pages/admin/CreateHotel";
import AdminBookings from "./pages/admin/AdminBooked";
import TravelPackageList from "./pages/admin/TravelPackageList";

// User
import Layout from "./components/management/Layout";
import TravelPackages from "./pages/user/TravelPackages";
import HotelPackage from "./pages/user/HotelPackage";

// Store
import { checkAuth } from "./store/auth";
import { Skeleton } from "./components/UI/skeleton";
import CheckAuth from "./common/CheckAuth";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/auth">
          <Route path="login" element={<Logins />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failure" element={<PaymentFailure />} />

        {/* Protected Routes */}
        <Route
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
        >
          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="addhotel" element={<CreateHotel />} />
            <Route path="getallhotels" element={<GetAllHotels />} />
            <Route path="booked" element={<AdminBookings />} />
            <Route path="package" element={<TravelPackageList />} />
            <Route index element={<Navigate to="/admin  " />} />
          </Route>

          {/* User */}
          <Route path="/travel" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="travelPackage" element={<TravelPackages />} />
            <Route path="userhotel" element={<HotelPackage />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="map" element={<MapComponent />} />
            <Route path="blog" element={<Blog />} />
            <Route index element={<Navigate to="/travel/home" />} />
          </Route>

          {/* Landing redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to={
                  user?.role === "admin" ? "/admin/dashboard" : "/travel/home"
                }
              />
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="/unauth-page" element={<Unauthorized />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </div>
  );
};

export default App;
