import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Bed,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

export const PackageCardTour = ({ package: pkg, onClick }) => {
  console.log("package", pkg);
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
    availableSeats = 0,
    images = [],
    rating = 0,
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

  return (
    <div
      className="w-full h-full bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Image Carousel */}
      <div className="relative w-full h-48 overflow-hidden">
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
        {/* Rating and Category Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-semibold flex items-center">
            <Star className="h-3 w-3 mr-1" />
            {rating.toFixed(1)}
          </div>
          <div className="bg-teal-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
            {category}
          </div>
        </div>
      </div>

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

export const PackageGrid = ({ packages = [] }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
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

  // Apply filters to packages
  const applyFilters = () => {
    let filteredPackages = [...packages];

    // Destination filter (case-insensitive)
    if (filters.destination) {
      filteredPackages = filteredPackages.filter(
        (pkg) =>
          pkg.location.city
            .toLowerCase()
            .includes(filters.destination.toLowerCase()) ||
          pkg.location.country
            .toLowerCase()
            .includes(filters.destination.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filteredPackages = filteredPackages.filter(
        (pkg) => pkg.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Duration filter
    if (filters.duration) {
      filteredPackages = filteredPackages.filter(
        (pkg) => pkg.duration.days >= Number(filters.duration)
      );
    }

    // Price range filter
    if (filters.minPrice) {
      filteredPackages = filteredPackages.filter(
        (pkg) =>
          pkg.price.basePrice - pkg.price.discount >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filteredPackages = filteredPackages.filter(
        (pkg) =>
          pkg.price.basePrice - pkg.price.discount <= Number(filters.maxPrice)
      );
    }

    // Sorting
    if (filters.sort === "price-asc") {
      filteredPackages.sort(
        (a, b) =>
          a.price.basePrice -
          a.price.discount -
          (b.price.basePrice - b.price.discount)
      );
    } else if (filters.sort === "price-desc") {
      filteredPackages.sort(
        (a, b) =>
          b.price.basePrice -
          b.price.discount -
          (a.price.basePrice - a.price.discount)
      );
    } else if (filters.sort === "duration") {
      filteredPackages.sort((a, b) => b.duration.days - a.duration.days);
    } else if (filters.sort === "rating") {
      filteredPackages.sort((a, b) => b.rating - a.rating);
    }

    return filteredPackages;
  };

  const filteredPackages = applyFilters();
  const totalPages = Math.ceil(filteredPackages.length / filters.limit);
  const paginatedPackages = filteredPackages.slice(
    (filters.page - 1) * filters.limit,
    filters.page * filters.limit
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      page: 1, // Reset to first page when filters change
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

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

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Filter Controls */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Destination Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Search by city or country"
                value={filters.destination}
                onChange={handleFilterChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Type
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="border p-2 rounded w-full"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Duration (Days)
              </label>
              <select
                name="duration"
                value={filters.duration}
                onChange={handleFilterChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Any Duration</option>
                <option value="1">1+ Days</option>
                <option value="3">3+ Days</option>
                <option value="5">5+ Days</option>
                <option value="7">7+ Days</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range (NPR)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="border p-2 rounded w-full"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>

            {/* Sort Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Default</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="duration">Duration (Longest First)</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-teal-600 hover:text-teal-800 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {paginatedPackages.length} of {filteredPackages.length}{" "}
          packages
          {filters.destination && ` in "${filters.destination}"`}
          {filters.category && ` of type "${filters.category}"`}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPackages.length > 0 ? (
            paginatedPackages.map((pkg) => (
              <PackageCardTour
                key={pkg._id || pkg.id}
                package={pkg}
                onClick={() => setSelectedPackage(pkg)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">
                No packages found matching your criteria
              </h3>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {filters.page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for package details */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{selectedPackage.name}</h2>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Package Details
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Destination:</span>{" "}
                      {selectedPackage.location.city},{" "}
                      {selectedPackage.location.country}
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span>{" "}
                      {selectedPackage.duration.days} Days /{" "}
                      {selectedPackage.duration.nights} Nights
                    </p>
                    <p>
                      <span className="font-medium">Room Type:</span>{" "}
                      {selectedPackage.roomtype}
                    </p>
                    <p>
                      <span className="font-medium">Category:</span>{" "}
                      {selectedPackage.category}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Base Price:</span> NPR{" "}
                      {selectedPackage.price.basePrice.toLocaleString()}
                    </p>
                    {selectedPackage.price.discount > 0 && (
                      <p>
                        <span className="font-medium">Discount:</span> NPR{" "}
                        {selectedPackage.price.discount.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xl font-bold text-teal-600">
                      <span className="font-medium">Final Price:</span> NPR{" "}
                      {(
                        selectedPackage.price.basePrice -
                        selectedPackage.price.discount
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {selectedPackage.mealsIncluded.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Meals Included</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPackage.mealsIncluded.map((meal, index) => (
                      <span
                        key={index}
                        className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                      >
                        {meal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPackage.amenities && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                  <p className="text-gray-700">{selectedPackage.amenities}</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-medium">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageGrid;
