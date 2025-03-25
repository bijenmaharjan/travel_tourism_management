import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../store/admin/admin";
import UserHotelTile from "./UserHotelTile";

const Home = () => {
  const { hotelList } = useSelector((state) => state.adminHotel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  return (
    <div className="w-full h-full">
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
    </div>
  );
};

export default Home;
