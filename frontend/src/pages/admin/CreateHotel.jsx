import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewHotel, fetchAllHotels } from "../../store/admin/admin";
import ContactInformation from "../../pages/admin/ContactInformation";
import { toast } from "react-toastify";
import ImageUpload from "../../components/admin/ImageUpload";
import axios from "axios";

const CreateHotel = () => {
  const [hotelImage, setHotelImage] = useState([]);
  const [hotelImageUrl, setHotelImageUrl] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    description: "",
    pricePerNight: "",
    peoples: "",
    amenities: "",
    images: [],
    roomsAvailable: "",
    checkInTime: "",
    checkOutTime: "",
    phone: "",
    email: "",
    website: "",
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const requiredFields = [
      "name",
      "location",
      "address",
      "description",
      "pricePerNight",
      "roomsAvailable",
      "peoples",
      "checkInTime",
      "checkOutTime",
      "phone",
      "email",
      "website",
    ];

    return (
      requiredFields.every((field) => {
        const value = formData[field];
        return value !== "" && value !== 0;
      }) && hotelImageUrl.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill all required fields and upload images");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/admin/api/create-hotel",
        formData
      );
      console.log(response.data);
      dispatch(addNewHotel(response.data));
      toast.success("Hotel created successfully!");
      setFormData({
        name: "",
        location: "",
        address: "",
        description: "",
        pricePerNight: "",
        peoples: "",
        amenities: "",
        images: [],
        roomsAvailable: "",
        checkInTime: "",
        checkOutTime: "",
        phone: "",
        email: "",
        website: "",
      });
      setHotelImage([]);
      setHotelImageUrl([]);
    } catch (error) {
      console.error("Error creating hotel:", error);
      setMessage("Error creating hotel. Please try again.");
      toast.error("Error creating hotel. Please try again.");
    }
  };

  const isFormEmpty = Object.values(formData).every(
    (value) =>
      value === "" ||
      value === 0 ||
      (Array.isArray(value) && value.length === 0)
  );

  return (
    <div
      className={`container mx-auto mt-6 p-4 shadow-lg rounded-lg max-w-6xl ${
        isFormEmpty ? "bg-gray-100" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Create Hotel</h2>

      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column - Hotel form */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Hotel Name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleChange}
                placeholder="Price/Night"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="roomsAvailable"
                value={formData.roomsAvailable}
                onChange={handleChange}
                placeholder="Rooms"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="peoples"
                value={formData.peoples}
                onChange={handleChange}
                placeholder="People"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Amenities"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
                placeholder="Check-in Time"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
                placeholder="Check-out Time"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-2 rounded-lg transition ${
                isFormValid()
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Create Hotel
            </button>
          </div>

          {/* Right column - Image upload and contact info */}
          <div className="space-y-4">
            <ImageUpload
              hotelImage={hotelImage}
              setHotelImage={setHotelImage}
              hotelImageUrl={hotelImageUrl}
              setHotelImageUrl={setHotelImageUrl}
              setFormData={setFormData}
            />

            {/* Contact Information */}
            <div className="mt-2">
              <ContactInformation
                formData={formData}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateHotel;
