import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser = {
      username: formData.username,
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
    };

    try {
      const resultAction = await dispatch(registerUser(newUser));
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("Registration successful!");
        navigate("/auth/login");
      } else {
        const error = resultAction.payload;
        toast.error(error?.message || "Registration failed");
        if (error?.details) setErrors(error.details);
      }
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left - Image */}
      <div className="w-[50%] hidden md:block">
        <img
          className="object-cover w-full h-full"
          src="https://scontent.fktm3-1.fna.fbcdn.net/v/t1.15752-9/494327528_580974298366909_7866041604739773220_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_ohc=_HWekiHfNywQ7kNvwFmQVKX&_nc_oc=AdkRxJE94agWTPUbGw2FS6ej0X32kLZ_9o8lhrax9DS9SDv7k_f54-UtLmuybtEH7yQU8XiuYedoIr7e6fPIvkvX&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&oh=03_Q7cD2QGQYS7HxwIXJj6xC8j9Y7fWQOdsR-ITQOUmLKoIqMHwng&oe=6851575F"
          alt="Register Visual"
        />
      </div>

      {/* Right - Form */}
      <div className="w-full md:w-[50%] flex flex-col justify-center items-center px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">Register to get started</p>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {[
              { name: "username", placeholder: "Username" },
              { name: "firstname", placeholder: "First Name" },
              { name: "lastname", placeholder: "Last Name" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "password", placeholder: "Password", type: "password" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  className={`w-full border-2 p-2 rounded-md focus:outline-none ${
                    errors[field.name] ? "border-red-500" : "border-blue-400"
                  }`}
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                />
                {errors[field.name] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-5 text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
