import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../store/admin/admin";
import { fetchTravelPackages } from "../../store/admin/admintravel";
import PackageCard from "../../components/user/PackageTile";
import UserHotelTile from "../../components/user/UserHotelTile";
import SupportClientbox from "../../components/user/SupportClientbox";
import Footer from "../../components/management/Footer";


const Home = () => {
  const { hotelList } = useSelector((state) => state.adminHotel);
  const { packages } = useSelector((state) => state.travelPackage);
  console.log("travelPackages", packages);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 15;

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTravelPackages());
  }, [dispatch]);

  return (
    <div className="w-full h-full bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-full">
        {/* Background Image */}
        <img
          src="https://i.pinimg.com/736x/4d/33/1d/4d331dd1f9603443d17f6116f93cff7c.jpg"
          alt="Travel"
          className="w-full max-w-[1700px] h-[500px] md:h-[600px] object-cover object-center mx-auto"
        />

        {/* Overlay Text - Main Heading */}
        <div className="absolute top-20 sm:top-24 md:top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 font-bold italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
          <span className="font-dancing-script">TRAVEL IS TO LIVE</span>
        </div>

        {/* Subtext */}
        <div className="absolute top-40 sm:top-44 md:top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-800 font-bold italic text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center">
          <span className="font-sans">EXPLORE THE UNSEEN</span>
        </div>

        {/* Button */}
        <div className="absolute right-1/2 transform translate-x-1/2 top-[350px] sm:top-[380px] md:top-[400px] lg:top-[450px]">
          <button className="bg-pink-300 text-gray-700 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl animate-bounce text-lg sm:text-xl md:text-2xl">
            Start Travel
          </button>
        </div>
      </div>
      {/* Hotels Listing Section */}
      {hotelList && hotelList.length > 0 && (
        <UserHotelTile hotels={hotelList} />
      )}
      <div className="w-full mt-30">
        <SupportClientbox />
      </div>
      <div className="text-center mb-12 mt-30">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Explore Nepal's Hidden Treasures
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Immersive tour packages combining adventure, culture, and breathtaking
          scenery
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  py-12 px-4 sm:px-6 lg:px-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} package={pkg} />
        ))}
      </div>

     

      <Footer />
    </div>
  );
};

export default Home;
