import React from "react";

const ContactInformation = ({ formData, handleChange }) => {
  return (
    <div className="p-10 bg-white shadow-xl rounded-lg max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Contact Information
      </h1>
      <form>
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            name="phone" // Ensure name is set correctly
            value={formData.phone} // Bind the value from formData
            onChange={handleChange} // Ensure the change handler is passed
            placeholder="Enter phone number"
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email" // Ensure name is set correctly
            value={formData.email} // Bind the value from formData
            onChange={handleChange} // Ensure the change handler is passed
            placeholder="Enter your email"
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Website
          </label>
          <input
            id="website"
            type="url"
            name="website" // Ensure name is set correctly
            value={formData.website} // Bind the value from formData
            onChange={handleChange} // Ensure the change handler is passed
            placeholder="Enter website URL"
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactInformation;
