import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Bed,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDumbbell,
  FaMapMarkerAlt,
  FaParking,
  FaSnowflake,
  FaStar,
  FaSwimmingPool,
  FaTimes,
  FaTv,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";
import { BookingForm } from "./BookingNowTour";

export const PackageCardTour = ({ package: pkg }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
    availableSeats = 0,
    images = [],
    rating = 0,
  } = pkg || {};

  const finalPrice = price.basePrice - price.discount;

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    setSelectedPackage(pkg);
    setShowBookingForm(true);
  };

  return (
    <>
      <div
        className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col cursor-pointer"
        onClick={handleViewDetails}
      >
        {/* Image Section */}
        <div className="relative h-56 w-full">
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
              No image available
            </div>
          )}

          {images.length > 1 && (
            <>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1}/{images.length}
              </div>
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 p-1 rounded-full shadow"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 p-1 rounded-full shadow"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div className="absolute top-3 left-3 flex gap-2">
            <span className="flex items-center bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
              <Star size={12} className="mr-1" />
              {rating.toFixed(1)}
            </span>
            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {category}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-4 flex flex-col justify-between space-y-3 flex-grow">
          <div>
            <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>

          <div className="flex items-center text-sm text-gray-500 gap-2">
            <MapPin size={14} />
            <span className="truncate">
              {location.city}, {location.country}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Bed size={14} />
              <span>{roomtype}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>
                {duration.days}D / {duration.nights}N
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-teal-600 font-bold text-lg">
              NPR {finalPrice.toLocaleString()}
            </p>
            {price.discount > 0 && (
              <p className="text-xs text-gray-400 line-through">
                NPR {price.basePrice.toLocaleString()}
              </p>
            )}
          </div>

          {mealsIncluded.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-1">
                Meals Included:
              </p>
              <div className="flex flex-wrap gap-2">
                {mealsIncluded.map((meal, index) => (
                  <span
                    key={index}
                    className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full"
                  >
                    {meal}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-4 flex justify-between items-center">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              availableSeats > 5
                ? "bg-green-100 text-green-800"
                : availableSeats > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {availableSeats > 0 ? `${availableSeats} seats left` : "Sold Out"}
          </span>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 text-sm rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(e);
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedPackage && (
        <div className="fixed inset-0 z-50  flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
            <button
              onClick={() => setShowBookingForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <BookingForm
              selectedPackage={selectedPackage}
              onClose={() => setShowBookingForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

const PackageGrid = ({ packages = [] }) => {
  // State management
  const [selectedPackage, setSelectedPackage] = useState(null);
  console.log("packagesselected", selectedPackage);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  console.log("clicked", showBookingForm);

  // Filter state
  const [filters, setFilters] = useState({
    sort: "",
    minPrice: "",
    maxPrice: "",
    destination: "",
    category: "",
    duration: "",
    page: 1,
    limit: 8,
  });

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

  // Extract amenities from string
  const extractAmenities = (str = "") => {
    if (!str) return [];
    return str
      .split(/[,.\n-]/)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // Filter packages based on current filters
  const filteredPackages = packages.filter((pkg) => {
    // Destination filter
    if (
      filters.destination &&
      !`${pkg.location?.city} ${pkg.location?.country}`
        .toLowerCase()
        .includes(filters.destination.toLowerCase())
    ) {
      return false;
    }

    // Category filter
    if (
      filters.category &&
      pkg.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }

    // Duration filter
    if (filters.duration && pkg.duration?.days < Number(filters.duration)) {
      return false;
    }

    // Price filters
    const finalPrice = pkg.price?.basePrice - (pkg.price?.discount || 0);
    if (filters.minPrice && finalPrice < Number(filters.minPrice)) return false;
    if (filters.maxPrice && finalPrice > Number(filters.maxPrice)) return false;

    return true;
  });

  // Sort packages
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    const priceA = a.price?.basePrice - (a.price?.discount || 0);
    const priceB = b.price?.basePrice - (b.price?.discount || 0);

    switch (filters.sort) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "duration":
        return (b.duration?.days || 0) - (a.duration?.days || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPackages.length / filters.limit);
  const paginatedPackages = sortedPackages.slice(
    (filters.page - 1) * filters.limit,
    filters.page * filters.limit
  );

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      sort: "",
      minPrice: "",
      maxPrice: "",
      destination: "",
      category: "",
      duration: "",
      page: 1,
      limit: 8,
    });
  };

  // Get unique categories for filter dropdown
  const uniqueCategories = [...new Set(packages.map((pkg) => pkg.category))];

  // Image navigation
  const handleNextImage = () => {
    if (!selectedPackage?.images) return;
    setCurrentImageIndex((idx) =>
      idx === selectedPackage.images.length - 1 ? 0 : idx + 1
    );
  };

  const handlePrevImage = () => {
    if (!selectedPackage?.images) return;
    setCurrentImageIndex((idx) =>
      idx === 0 ? selectedPackage.images.length - 1 : idx - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Filter Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Destination Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={filters.destination}
              onChange={handleFilterChange}
              placeholder="Search location..."
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-1/2 p-2 border rounded-md"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-1/2 p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Duration</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      {paginatedPackages.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">
            No packages found matching your filters
          </h3>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedPackage(pkg);
                  setCurrentImageIndex(0);
                }}
              >
                {/* Package Image */}
                {pkg.images?.[0] ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={pkg.images[0]}
                      alt={pkg.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                {/* Package Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">
                    {pkg.name}
                  </h3>

                  {pkg.location && (
                    <p className="text-gray-600 mb-2 flex items-center">
                      <FaMapMarkerAlt className="inline mr-1 text-pink-500" />
                      <span className="line-clamp-1">
                        {pkg.location.city}, {pkg.location.country}
                      </span>
                    </p>
                  )}

                  {pkg.price && (
                    <p className="text-pink-600 font-bold">
                      NPR {pkg.price.basePrice - (pkg.price.discount || 0)}
                      <span className="text-gray-500 text-sm ml-1">
                        /person
                      </span>
                    </p>
                  )}

                  {pkg.duration && (
                    <p className="text-gray-500 text-sm mt-2">
                      {pkg.duration.days} Days / {pkg.duration.nights} Nights
                    </p>
                  )}
                </div>
                <button className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition-colors duration-300 font-medium flex items-center justify-center">
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() =>
                    handleFilterChange({
                      target: {
                        name: "page",
                        value: Math.max(1, filters.page - 1),
                      },
                    })
                  }
                  disabled={filters.page === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() =>
                        handleFilterChange({
                          target: { name: "page", value: page },
                        })
                      }
                      className={`px-3 py-1 border rounded-md ${
                        filters.page === page ? "bg-pink-600 text-white" : ""
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    handleFilterChange({
                      target: {
                        name: "page",
                        value: Math.min(totalPages, filters.page + 1),
                      },
                    })
                  }
                  disabled={filters.page === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Package Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={() => setSelectedPackage(null)}
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
                    onClick={() => setSelectedPackage(null)}
                  >
                    <span className="sr-only">Close</span>
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal content */}
                <div className="sm:flex sm:items-start gap-6">
                  {/* Left column - Images */}
                  <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
                    {selectedPackage.images?.length > 0 && (
                      <>
                        <div
                          className="relative h-64 w-full rounded-lg overflow-hidden cursor-pointer mb-3"
                          onClick={() => setShowFullImage(true)}
                        >
                          <img
                            src={selectedPackage.images[currentImageIndex]}
                            alt={selectedPackage.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          {selectedPackage.images.length > 1 && (
                            <>
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
                            </>
                          )}
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-3 mb-6">
                          {selectedPackage.images.map((image, index) => (
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
                                alt={`${selectedPackage.name} ${index + 1}`}
                                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right column - Package Details */}
                  <div className="w-full sm:w-1/2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {selectedPackage.name}
                    </h3>

                    {/* Location */}
                    {selectedPackage.location && (
                      <div className="flex items-center text-gray-600 mb-5">
                        <FaMapMarkerAlt className="mr-2 text-pink-500" />
                        <span>
                          {selectedPackage.location.city},{" "}
                          {selectedPackage.location.country}
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    {selectedPackage.price && (
                      <div className="flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-lg">
                        <div className="text-right">
                          <p className="text-xl font-bold text-pink-600">
                            NPR{" "}
                            {selectedPackage.price.basePrice -
                              (selectedPackage.price.discount || 0)}
                            <span className="text-sm font-normal text-gray-500 ml-1">
                              /per person
                            </span>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Duration */}
                    {selectedPackage.duration && (
                      <div className="mb-4">
                        <p className="text-gray-600">
                          <span className="font-semibold">Duration:</span>{" "}
                          {selectedPackage.duration.days} Days /{" "}
                          {selectedPackage.duration.nights} Nights
                        </p>
                      </div>
                    )}

                    {/* Description */}
                    {selectedPackage.description && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Description
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                          {selectedPackage.description}
                        </p>
                      </div>
                    )}

                    {/* Amenities */}
                    {selectedPackage.amenities && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Amenities
                        </h4>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-4">
                            {extractAmenities(selectedPackage.amenities).map(
                              (amenity, index) => (
                                <div key={index} className="flex items-center">
                                  {amenityIcons[amenity.toLowerCase()] || (
                                    <FaStar className="text-pink-500 mr-2" />
                                  )}
                                  <span className="text-gray-600 text-sm">
                                    {amenity}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer buttons */}
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
                  onClick={() => setSelectedPackage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Image Modal */}
      {showFullImage && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            <img
              src={selectedPackage.images[currentImageIndex]}
              alt={selectedPackage.name}
              className="w-full max-h-[90vh] object-contain"
            />
            {selectedPackage.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                >
                  <FaChevronLeft className="text-gray-800" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                >
                  <FaChevronRight className="text-gray-800" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showBookingForm && (
        <BookingForm
          selectedPackage={selectedPackage}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Booking Form Modal */}
      {/* {showBookingForm && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Book {selectedPackage.name}</h3>
              <button onClick={() => setShowBookingForm(false)}>
                <FaTimes />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Travel Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of People
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
              >
                Submit Booking
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PackageGrid;
