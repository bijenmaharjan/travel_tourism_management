import React, { useEffect, useState } from "react";
import { MapPin, Clock, Bed, ChevronLeft, ChevronRight } from "lucide-react";

const PackageCard = ({ package: pkg }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Destructure with defaults
  const {
    name = "",
    description = "",
    category = "",
    location = { country: "", city: "" },
    duration = { days: 0, nights: 0 },
    price = { basePrice: 0, discount: 0 },
    mealsIncluded = [],
    roomtype = "",
    amenities = "",
    transportation = "",
    availableSeats = 0,
    images = [],
  } = pkg || {};

  const finalPrice = price.basePrice - price.discount;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Auto slideshow effect
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [images.length]);

      
  return (
    <div className="w-full h-full bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 flex flex-col">

      {/* Image Carousel - Modified to full width */}
      <div className="relative w-full h-48 overflow-hidden">
        {" "}
        {/* Fixed height or use aspect ratio */}
        {images.length > 0 ? (
          <img
            src={images[currentImageIndex]}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        {images.length > 1 && (
          <>
            <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1}/{images.length}
            </div>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-1.5 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-1.5 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        {/* Category Badge */}
        <div className="absolute top-2 right-2 bg-teal-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
          {category}
        </div>
      </div>

      {/* Rest of your card content remains the same */}
      {/* Card Content */}
      <div className="p-5 space-y-3 flex-grow">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{name}</h2>

        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">
            {location.city}, {location.country}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500 text-sm">
              <Bed className="h-4 w-4 mr-1" />
              <span>{roomtype}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {duration.days} Days / {duration.nights} Nights
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-bold text-teal-600">
              NPR {finalPrice.toLocaleString()}
            </span>
            {price.discount > 0 && (
              <span className="block text-xs text-gray-400 line-through">
                NPR {price.basePrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meals Section */}
      {mealsIncluded.length > 0 && (
        <div className="px-5 pb-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            Meals Included:
          </h4>
          <div className="flex flex-wrap gap-2">
            {mealsIncluded.map((meal, index) => (
              <span
                key={index}
                className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded"
              >
                {meal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {amenities && (
        <div className="px-5 pb-3 text-sm text-gray-600 line-clamp-2">
          <span className="font-medium">Amenities: </span>
          {amenities}
        </div>
      )}

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center mt-auto">
        <div className="flex items-center">
          <span
            className={`px-2 py-1 rounded text-sm ${
              availableSeats > 5
                ? "bg-green-100 text-green-800"
                : availableSeats > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {availableSeats > 0 ? `${availableSeats} seats left` : "Sold out"}
          </span>
        </div>

        <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition-colors duration-300 text-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
