import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaUser, FaCreditCard, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../store/booking";

const BookNow = ({ hotel, onClose, onBookingSubmit }) => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card",
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const { hotelList } = useSelector((state) => state.adminHotel);
  console.log("hotelList", hotelList);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (status === "succeeded") {
      onBookingSubmit?.();
      onClose();
    }
  }, [status, onBookingSubmit, onClose]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateRequiredRooms = () => {
    const MAX_ADULTS_PER_ROOM = 2;
    return Math.ceil(formData.adults / MAX_ADULTS_PER_ROOM);
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 1;

    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);

    if (checkOut <= checkIn) return 1;

    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const roomsRequired = calculateRequiredRooms();
    const nights = calculateNights();
    return nights * hotel.pricePerNight * roomsRequired;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.checkIn || !formData.checkOut) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    if (!user) {
      alert("Please log in to book a hotel");
      return;
    }

    const bookingPayload = {
      ...formData,
      hotel: hotel._id,
      user: user.id,
      roomsRequired: calculateRequiredRooms(),
      nights: calculateNights(),
      totalAmount: calculateTotal(),
    };

    dispatch(
      createBooking({
        bookingData: bookingPayload,
        token: user.token,
      })
    );
  };

  return (
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 py-5 sm:p-6">
            {/* Close button */}
            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            {/* Booking form header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Book Your Stay
              </h3>
              <p className="text-gray-600 mt-1">{hotel.name}</p>
              <p className="text-gray-800 font-medium mt-2">
                NPR {hotel.pricePerNight} per night
              </p>
            </div>

            {/* Booking form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Check-in */}
                <div>
                  <label
                    htmlFor="checkIn"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-pink-500" />
                      Check-in Date
                    </div>
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleBookingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label
                    htmlFor="checkOut"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-pink-500" />
                      Check-out Date
                    </div>
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleBookingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    required
                    min={
                      formData.checkIn || new Date().toISOString().split("T")[0]
                    }
                  />
                </div>

                {/* Adults */}
                <div>
                  <label
                    htmlFor="adults"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-pink-500" />
                      Adults
                    </div>
                  </label>
                  <select
                    id="adults"
                    name="adults"
                    value={formData.adults}
                    onChange={handleBookingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Children */}
                <div>
                  <label
                    htmlFor="children"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-pink-500" />
                      Children
                    </div>
                  </label>
                  <select
                    id="children"
                    name="children"
                    value={formData.children}
                    onChange={handleBookingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Child" : "Children"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest information */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Guest Information
                </h4>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleBookingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleBookingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleBookingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="specialRequests"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows="3"
                      value={formData.specialRequests}
                      onChange={handleBookingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Payment summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Booking Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {calculateRequiredRooms()}{" "}
                      {calculateRequiredRooms() > 1 ? "Rooms" : "Room"} × NPR{" "}
                      {hotel.pricePerNight} × {calculateNights()} nights
                    </span>
                    <span className="font-medium">NPR {calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-bold text-pink-600">
                      NPR {calculateTotal()}
                    </span>
                  </div>
                  {calculateRequiredRooms() > 1 && (
                    <div className="text-sm text-gray-500 mt-2">
                      <p>
                        Note: {calculateRequiredRooms()} rooms required for{" "}
                        {formData.adults} adults (max 2 adults per room)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment method */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Payment Method
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="paymentMethod"
                      type="radio"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleBookingChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <label
                      htmlFor="credit-card"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      <div className="flex items-center">
                        <FaCreditCard className="mr-2 text-pink-500" />
                        Credit/Debit Card
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="pay-on-arrival"
                      name="paymentMethod"
                      type="radio"
                      value="pay-on-arrival"
                      checked={formData.paymentMethod === "pay-on-arrival"}
                      onChange={handleBookingChange}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <label
                      htmlFor="pay-on-arrival"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Pay on Arrival
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  {status === "loading" ? "Processing..." : "Confirm Booking"}
                </button>
                {error && (
                  <div className="mt-2 text-sm text-red-600">{error}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
