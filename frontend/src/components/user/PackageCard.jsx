import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const PackageCard = ({ hotel, onSelectHotel }) => {
  console.log("PackageCard", hotel);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageNavigation = (direction) => (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      direction === "next"
        ? prev === hotel.images.length - 1
          ? 0
          : prev + 1
        : prev === 0
        ? hotel.images.length - 1
        : prev - 1
    );
  };

  const generateRating = () => (Math.random() * 2 + 3).toFixed(1);

  return (
    <div
      className="w-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
      onClick={() => onSelectHotel(hotel)}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
        <img
          src={hotel.images[currentImageIndex]}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
          <div>
            <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
            <div className="flex items-center text-white/90 mt-1">
              <FaMapMarkerAlt className="mr-1 text-sm" />
              <span className="text-sm">{hotel.location}</span>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 text-amber-500 px-2 py-1 rounded-full flex items-center text-sm font-semibold">
          <FaStar className="mr-1" />
          <span>{generateRating()}</span>
        </div>

        {/* Image Navigation */}
        {hotel.images.length > 1 && (
          <>
            <button
              onClick={handleImageNavigation("prev")}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/80 text-gray-800 p-1 rounded-full shadow-md hover:bg-white transition-all duration-200"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleImageNavigation("next")}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/80 text-gray-800 p-1 rounded-full shadow-md hover:bg-white transition-all duration-200"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Details Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Price Section */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-500 text-sm">Starting from</p>
              <p className="text-xl font-bold text-pink-600">
                NPR {hotel.pricePerNight}
                <span className="text-sm font-normal text-gray-500">
                  /night
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Rooms available</p>
              <p className="font-semibold">{hotel.roomsAvailable}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities[0]
              .split(" ")
              .slice(0, 4)
              .map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
          </div>

          {/* Meta Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <FaClock className="mr-1 text-pink-500" />
                <span>
                  {hotel.checkInTime} - {hotel.checkOutTime}
                </span>
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-1 text-pink-500" />
                <span>Max {hotel.peoples}</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectHotel(hotel);
          }}
          className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition-colors duration-300 font-medium flex items-center justify-center"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
