import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaSearch,
  FaFilter,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBed,
} from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import {
  getBookings as fetchHotelBookings,
  deleteBooking as deleteHotelBooking,
  updateBooking,
} from "../../store/booking";

import { getTourBookings, deleteTourBooking } from "../../store/tourBooking";

import EditBookingDialog from "../../components/admin/EditBookingDialog";

const AdminBookings = () => {
  const dispatch = useDispatch();
  const hotelBookings = useSelector((state) => state.booking.bookings) || [];
  const tourBookings = useSelector((state) => state.tourBooking.bookings) || [];
  const loading =
    useSelector((state) => state.booking.loading) ||
    useSelector((state) => state.tourBooking.loading);
  const error =
    useSelector((state) => state.booking.error) ||
    useSelector((state) => state.tourBooking.error);
  const user = useSelector((state) => state.auth.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  useEffect(() => {
    dispatch(fetchHotelBookings());
    dispatch(getTourBookings());
  }, [dispatch]);

  const allBookings = [...hotelBookings, ...tourBookings];

  const filteredBookings = allBookings.filter((booking) => {
    const search = searchTerm.trim().toLowerCase();
    const name = booking?.name?.toLowerCase() || "";
    const email = booking?.email?.toLowerCase() || "";
    const hotelName = booking?.hotel?.name?.toLowerCase() || "";
    const tourName = booking?.tour?.name?.toLowerCase() || "";
    const matchesSearch =
      !search ||
      name.includes(search) ||
      email.includes(search) ||
      hotelName.includes(search) ||
      tourName.includes(search);
    const matchesFilter =
      filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = (booking) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const deleteAction = booking.hotel
        ? deleteHotelBooking
        : deleteTourBooking;
      dispatch(deleteAction({ id: booking._id, token: user.token }));
    }
  };

  const handleEdit = (id) => {
    const selected = allBookings.find((b) => b._id === id);
    setCurrentBooking(selected);
    setIsEditDialogOpen(true);
  };

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
      dispatch(fetchHotelBookings());
      dispatch(getTourBookings());
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Booking Management</h1>
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded shadow mb-8">
          <div className="relative flex-grow">
            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-2 px-3 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No bookings found.
            </p>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded shadow p-4">
                <div
                  className={`flex justify-between items-center p-2 rounded-t text-sm font-medium capitalize ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {booking.status === "confirmed" && <FaCheckCircle />}
                    {booking.status === "pending" && <FaClock />}
                    {booking.status === "cancelled" && <FaTimesCircle />}
                    {booking.status}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(booking._id)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Edit Booking"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(booking)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete Booking"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-bold">
                    {booking.hotel?.name ||
                      booking.tour?.name ||
                      "Tour Package"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Booking ID: {booking._id}
                  </p>
                </div>
                <div className="mt-2 space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <FaUser className="mt-1 text-blue-500" />
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <p>{booking.email}</p>
                      <p>{booking.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCalendarAlt className="mt-1 text-blue-500" />
                    <div>
                      <p>
                        <span className="font-medium">Check-in:</span>{" "}
                        {formatDate(booking.checkIn)}
                      </p>
                      <p>
                        <span className="font-medium">Check-out:</span>{" "}
                        {formatDate(booking.checkOut)}
                      </p>
                      <p>
                        <span className="font-medium">Nights:</span>{" "}
                        {booking.nights || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaBed className="mt-1 text-blue-500" />
                    <p>
                      <span className="font-medium">Rooms:</span>{" "}
                      {booking.roomsRequired || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {isEditDialogOpen && currentBooking && (
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
