import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaBed,
  FaUsers,
  FaClock,
  FaStar,
  FaTimes,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSnowflake,
  FaTv,
  FaDumbbell,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import BookNow from "./BookingNow";

const UserViewDetails = ({ hotel, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (!hotel) return null;

  // Amenity icons mapping
  const amenityIcons = {
    wifi: <FaWifi className="text-pink-500 mr-2" />,
    pool: <FaSwimmingPool className="text-pink-500 mr-2" />,
    parking: <FaParking className="text-pink-500 mr-2" />,
    restaurant: <FaUtensils className="text-pink-500 mr-2" />,
    ac: <FaSnowflake className="text-pink-500 mr-2" />,
    tv: <FaTv className="text-pink-500 mr-2" />,
    gym: <FaDumbbell className="text-pink-500 mr-2" />,
    meditation: <FaStar className="text-pink-500 mr-2" />,
    garden: <FaStar className="text-pink-500 mr-2" />,
    yoga: <FaStar className="text-pink-500 mr-2" />,
    tours: <FaStar className="text-pink-500 mr-2" />,
  };

  // Function to extract amenities from the string
  const extractAmenities = (amenitiesString) => {
    const delimiterSplit = amenitiesString
      .split(/[,.\n-]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (delimiterSplit.length > 3) {
      return [...new Set(delimiterSplit)];
    }

    const capitalSplit = amenitiesString
      .split(/(?=[A-Z])/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return [...new Set(capitalSplit)];
  };

  const amenities = extractAmenities(hotel.amenities[0]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
  };

  const openFullImage = (index) => {
    setCurrentImageIndex(index);
    setShowFullImage(true);
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={onClose}
            ></div>
          </div>

          {/* Modal container */}
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
            <div className="bg-white px-8 pt-6 pb-5 sm:p-8 sm:pb-6">
              {/* Close button */}
              <div className="absolute top-6 right-6">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>

              {/* Modal content */}
              <div className="sm:flex sm:items-start gap-6">
                {/* Left column - Images and Contact Info */}
                <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
                  {/* Main image */}
                  <div
                    className="relative h-64 w-full rounded-lg overflow-hidden cursor-pointer mb-3"
                    onClick={() => openFullImage(currentImageIndex)}
                  >
                    <img
                      src={hotel.images[currentImageIndex]}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all duration-300" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                      <FaChevronLeft className="text-gray-800" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                      <FaChevronRight className="text-gray-800" />
                    </button>
                  </div>

                  {/* Image thumbnails */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {hotel.images.map((image, index) => (
                      <div
                        key={index}
                        className={`h-20 rounded overflow-hidden cursor-pointer border-2 ${
                          currentImageIndex === index
                            ? "border-pink-500"
                            : "border-transparent"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`${hotel.name} ${index + 1}`}
                          className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaPhone className="mr-3 text-pink-500" />
                        <a
                          href={`tel:${hotel.phone}`}
                          className="text-sm hover:underline"
                        >
                          {hotel.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="mr-3 text-pink-500" />
                        <a
                          href={`mailto:${hotel.email}`}
                          className="text-sm hover:underline"
                        >
                          {hotel.email}
                        </a>
                      </div>
                      {hotel.website && (
                        <div className="flex items-center">
                          <FaGlobe className="mr-3 text-pink-500" />
                          <a
                            href={hotel.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                          >
                            {hotel.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right column - Hotel details */}
                <div className="w-full sm:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-5">
                    <FaMapMarkerAlt className="mr-2 text-pink-500" />
                    <span>{hotel.location}</span>
                  </div>

                  {/* Rating and price */}
                  <div className="flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <FaStar className="text-amber-500 mr-2" />
                      <div>
                        <span className="font-semibold">4.8</span>
                        <span className="text-gray-600 ml-2">
                          (120 reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">
                        Starting from
                      </p>
                      <p className="text-xl font-bold text-pink-600">
                        NPR {hotel.pricePerNight}
                        <span className="text-sm font-normal text-gray-500 ml-1">
                          /night
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Description
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>

                  {/* Key information */}
                  <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
                            <div className="flex items-center">
                              <FaBed className="mr-3 text-pink-500" />
                              Rooms Available
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {hotel.roomsAvailable}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
                            <div className="flex items-center">
                              <FaUsers className="mr-3 text-pink-500" />
                              Maximum Capacity
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {hotel.peoples} people
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
                            <div className="flex items-center">
                              <FaClock className="mr-3 text-pink-500" />
                              Check-in/Check-out
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {hotel.checkInTime} / {hotel.checkOutTime}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Amenities
                    </h4>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {amenities.map((amenity, index) => {
                          const lowerAmenity = amenity.toLowerCase();
                          const iconKey = Object.keys(amenityIcons).find(
                            (key) => lowerAmenity.includes(key)
                          );

                          return (
                            <div key={index} className="flex items-center">
                              <div className="mr-3">
                                {iconKey ? (
                                  amenityIcons[iconKey]
                                ) : (
                                  <FaStar className="text-pink-500" />
                                )}
                              </div>
                              <span className="text-gray-600 text-sm">
                                {amenity}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with action buttons */}
            <div className="bg-gray-50 px-8 py-4 sm:flex sm:flex-row-reverse sm:px-8">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none sm:ml-4 sm:w-auto"
                onClick={() => setShowBookingForm(true)}
              >
                Book Now
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-4 sm:w-auto"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Image View Modal */}
      {showFullImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300"
            onClick={() => setShowFullImage(false)}
          >
            <FaTimes className="h-8 w-8" />
          </button>
          <button
            className="absolute left-6 text-white hover:text-gray-300 p-3 bg-black/50 rounded-full"
            onClick={handlePrevImage}
          >
            <FaChevronLeft className="h-6 w-6" />
          </button>
          <div className="max-w-6xl max-h-screen">
            <img
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              className="max-h-[85vh] object-contain"
            />
          </div>
          <button
            className="absolute right-6 text-white hover:text-gray-300 p-3 bg-black/50 rounded-full"
            onClick={handleNextImage}
          >
            <FaChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
            {hotel.images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookNow
          hotel={hotel}
          onClose={() => setShowBookingForm(false)}
          onBookingSubmit={(booking) => {
            console.log("Booking submitted:", booking);
            setShowBookingForm(false);
            alert("Booking request submitted successfully!");
          }}
        />
      )}
    </>
  );
};

export default UserViewDetails;
