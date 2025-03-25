import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaBed,
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaStar,
} from "react-icons/fa";
import UserViewDetails from "./UserViewDetails";

const UserHotelTile = ({ hotels }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Function to generate random rating (for demo purposes)
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Discover Amazing Hotels
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find your perfect stay in Nepal's most beautiful locations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full" // Added flex-col and h-full
            >
              {/* Hotel Image - Fixed height */}
              <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                {" "}
                {/* Added flex-shrink-0 */}
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
                  <div className="flex items-center text-white/90 mt-1">
                    <FaMapMarkerAlt className="mr-1 text-sm" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 text-amber-500 px-2 py-1 rounded-full flex items-center text-sm font-semibold">
                  <FaStar className="mr-1" />
                  {getRandomRating()}
                </div>
              </div>

              {/* Hotel Details - Flex container with fixed bottom button */}
              <div className="p-5 flex flex-col flex-grow">
                {" "}
                {/* Added flex classes */}
                <div className="flex-grow">
                  {" "}
                  {/* Content that can grow */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <p className="text-xl font-bold text-pink-600">
                        NPR {hotel.pricePerNight}
                        <span className="text-sm font-normal text-gray-500">
                          {" "}
                          /night
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">Rooms available</p>
                      <p className="font-semibold">{hotel.roomsAvailable}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hotel.description}
                  </p>
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
                {/* Fixed position button at bottom */}
                // Modify the button click handler to pass the hotel ID
                <button
                  onClick={() => setSelectedHotel(hotel)}
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
          ))}
        </div>
      </div>

      {/* Modal for hotel details */}
      {selectedHotel && (
        <UserViewDetails
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </div>
  );
};

export default UserHotelTile;
