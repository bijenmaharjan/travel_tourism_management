import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaSearch,
  FaFilter,
  FaUser,
  FaHotel,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPhone,
  FaEnvelope,
  FaCreditCard,
  FaCashRegister,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBed,
} from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteBooking, getBookings, updateBooking } from "../../store/booking";
import EditBookingDialog from "../../components/admin/EditBookingDialog";

const AdminBookings = () => {
  const dispatch = useDispatch();

  // Get bookings from Redux store
  const { bookings, loading, error } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);

  console.log("bookings", bookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  // Fetch bookings when component mounts
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  // Filter bookings based on search and filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.hotel &&
        booking.hotel.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterStatus === "all" || booking.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle booking status change
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateBookingStatus(id, newStatus));
  };

  // Handle booking deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBooking({ id, token: user.token }));
    }
  };

  const handleEdit = (id) => {
    const bookingToEdit = bookings.find((b) => b._id === id);
    setCurrentBooking(bookingToEdit);
    setIsEditDialogOpen(true);
  };

  // Add this function to handle saving:
  const handleSaveBooking = async (updatedBooking) => {
    try {
      await dispatch(
        updateBooking({
          id: updatedBooking._id,
          bookingData: updatedBooking,
          token: user.token,
        })
      );
      setIsEditDialogOpen(false);
      // Optionally refresh bookings
      dispatch(getBookings());
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-700">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading bookings: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-gray-600">View and manage all hotel bookings</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search bookings by name, email or hotel"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              {/* Booking Header */}
              <div
                className={`px-4 py-3 flex justify-between items-center ${
                  booking.status === "confirmed"
                    ? "bg-green-50"
                    : booking.status === "pending"
                    ? "bg-yellow-50"
                    : booking.status === "cancelled"
                    ? "bg-red-50"
                    : "bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  {booking.status === "confirmed" && (
                    <FaCheckCircle className="text-green-500 mr-2" />
                  )}
                  {booking.status === "pending" && (
                    <FaClock className="text-yellow-500 mr-2" />
                  )}
                  {booking.status === "cancelled" && (
                    <FaTimesCircle className="text-red-500 mr-2" />
                  )}
                  <span className="font-medium capitalize">
                    {booking.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(booking._id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(booking._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.hotel?.name || "Unknown Hotel"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Booking ID: {booking._id}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Guest Info */}
                  <div className="flex items-start">
                    <FaUser className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-sm text-gray-600">{booking.email}</p>
                      <p className="text-sm text-gray-600">{booking.phone}</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Check-in:</span>{" "}
                        {formatDate(booking.checkIn)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Check-out:</span>{" "}
                        {formatDate(booking.checkOut)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Nights:</span>{" "}
                        {booking.nights}
                      </p>
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="flex items-start">
                    <FaBed className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Rooms:</span>{" "}
                        {booking.roomsRequired}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Guests:</span>{" "}
                        {booking.adults} adults, {booking.children} children
                      </p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="flex items-start">
                    <FaMoneyBillWave className="mt-1 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Total:</span> NPR{" "}
                        {booking.totalAmount}
                      </p>
                      <p className="text-sm flex items-center">
                        <span className="font-medium">Payment:</span>
                        {booking.paymentMethod === "credit-card" ? (
                          <>
                            <FaCreditCard className="ml-1 mr-1 text-green-500" />{" "}
                            Credit Card
                          </>
                        ) : (
                          <>
                            <FaCashRegister className="ml-1 mr-1 text-purple-500" />{" "}
                            On Arrival
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {booking.specialRequests && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700">
                        Special Requests:
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        {booking.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-gray-50 flex justify-between">
                <select
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={booking.status}
                  onChange={(e) =>
                    handleStatusChange(booking._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <FaHotel className="w-full h-full" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No bookings found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
      {isEditDialogOpen && (
        <EditBookingDialog
          booking={currentBooking}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSaveBooking}
        />
      )}
    </div>
  );
};

export default AdminBookings;
