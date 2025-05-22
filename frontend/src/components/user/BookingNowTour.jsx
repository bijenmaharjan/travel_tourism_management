import React, { useState, useEffect } from "react";
import { FaTimes, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createTourBooking } from "../../store/tourBooking";

export const BookingForm = ({ selectedPackage, onClose }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.tourBooking);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    checkIn: "",
    name: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
    specialRequests: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Booking successful!");
      onClose();
    }
  }, [status, onClose]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book a tour package.");
      return;
    }

    try {
      const adults = parseInt(formData.adults);
      const children = parseInt(formData.children);
      const totalPeople = adults + children;

      const finalPricePerAdult =
        selectedPackage.price.basePrice - selectedPackage.price.discount;
      const totalAmount = adults * finalPricePerAdult; // Children are free

      const bookingPayload = {
        ...formData,
        tour: selectedPackage._id,
        user: user.id,
        totalPeople,
        totalAmount,
      };

      dispatch(
        createTourBooking({
          bookingData: bookingPayload,
          token: user.token,
        })
      )
    } catch (err) {
      console.error(err);
      toast.error("Booking failed. Try again.");
    }
  };

  if (!selectedPackage) return null;

  const { name, location, price, images, duration, availableSeats, amenities } =
    selectedPackage;

  const finalPricePerAdult = price.basePrice - price.discount;
  const adults = parseInt(formData.adults);
  const children = parseInt(formData.children);
  const totalPeople = adults + children;
  const totalAmount = adults * finalPricePerAdult;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block bg-white rounded-lg text-left shadow-xl transform transition-all sm:align-middle sm:max-w-3xl sm:w-full z-50 overflow-hidden">
          <div className="relative p-6 bg-gray-100">
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              onClick={onClose}
            >
              <FaTimes className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Book: {name}
            </h2>
            <p className="text-center text-sm text-gray-600">
              {location.city}, {location.country} – {duration.nights}N /{" "}
              {duration.days}D
            </p>
            <img
              src={images[0]}
              alt={name}
              className="w-full h-56 object-cover mt-4 rounded"
            />
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaCalendarAlt className="mr-2 text-pink-500" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleBookingChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaUser className="mr-2 text-pink-500" />
                  Adults
                </label>
                <select
                  name="adults"
                  value={formData.adults}
                  onChange={handleBookingChange}
                  className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-pink-500"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Adult" : "Adults"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Children (Free)
                </label>
                <select
                  name="children"
                  value={formData.children}
                  onChange={handleBookingChange}
                  className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-pink-500"
                >
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Child" : "Children"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-sm font-medium text-gray-700">
                  Available Seats:
                </span>
                <span className="text-lg font-semibold text-green-600">
                  {availableSeats}
                </span>
              </div>
            </div>

            {/* Guest Info */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleBookingChange}
                required
                className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-pink-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleBookingChange}
                required
                className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-pink-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleBookingChange}
                required
                className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-pink-500"
              />
              <textarea
                name="specialRequests"
                placeholder="Special Requests (Optional)"
                value={formData.specialRequests}
                onChange={handleBookingChange}
                className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-pink-500"
              />
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900">
                What's Included:
              </h4>
              <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                {amenities}
              </p>
            </div>

            {/* Price & Submit */}
            <div className="flex items-center justify-between flex-wrap gap-y-3">
              <p className="text-base text-gray-700 bg-gray-100 rounded-md p-5">
                NPR {finalPricePerAdult.toLocaleString()} per adult × {adults} ={" "}
                <span className="text-xl font-bold text-pink-600">
                  NPR {totalAmount.toLocaleString()}
                </span>
              </p>
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
              >
                Confirm Booking
              </button>
            </div>

            {status === "loading" && (
              <p className="text-sm text-gray-500 mt-2">Booking...</p>
            )}
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
