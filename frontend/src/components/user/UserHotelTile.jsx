import React, { useState } from "react";
import PackageCard from "./PackageCard";
import UserViewDetails from "./UserViewDetails";

const UserHotelTile = ({
  hotels = [],
  showFilters = true,
  itemsPerPage = 8,
}) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [filters, setFilters] = useState({
    sort: "",
    minPrice: "",
    maxPrice: "",
    destination: "",
    page: 1,
  });

  const applyFilters = () => {
    let results = [...hotels];

    // Destination filter
    if (filters.destination) {
      results = results.filter((hotel) =>
        hotel.location.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }

    // Price range filter
    if (filters.minPrice) {
      results = results.filter(
        (hotel) => hotel.pricePerNight >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      results = results.filter(
        (hotel) => hotel.pricePerNight <= Number(filters.maxPrice)
      );
    }

    // Sorting
    if (filters.sort === "price-asc") {
      results.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (filters.sort === "price-desc") {
      results.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return results;
  };

  const filteredHotels = applyFilters();
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = showFilters
    ? filteredHotels.slice(
        (filters.page - 1) * itemsPerPage,
        filters.page * itemsPerPage
      )
    : filteredHotels;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      sort: "",
      minPrice: "",
      maxPrice: "",
      destination: "",
      page: 1,
    });
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Filters Section */}
        {showFilters && (
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-4 items-end">
              {/* Destination Filter */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  placeholder="Search by location"
                  value={filters.destination}
                  onChange={handleFilterChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Price Range Filter */}
              <div className="flex-1 min-w-[200px]">
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
                    className="w-full border p-2 rounded"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              {/* Sort Filter */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-pink-600 hover:text-pink-800 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        {showFilters && (
          <div className="mb-4 text-gray-600">
            Showing {paginatedHotels.length} of {filteredHotels.length} hotels
            {filters.destination && ` in "${filters.destination}"`}
          </div>
        )}

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedHotels.length > 0 ? (
            paginatedHotels.map((hotel) => (
              <PackageCard
                key={hotel._id}
                hotel={hotel}
                onSelectHotel={setSelectedHotel}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">
                No hotels found matching your criteria
              </h3>
              {showFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {showFilters && totalPages > 1 && (
          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                disabled={filters.page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {filters.page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                disabled={filters.page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Hotel Details Modal */}
        {selectedHotel && (
          <UserViewDetails
            hotel={selectedHotel}
            onClose={() => setSelectedHotel(null)}
          />
        )}
      </div>
    </div>
  );
};

export default UserHotelTile;
