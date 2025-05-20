import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Logins = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const resultAction = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful!");
        navigate("/travel/home");
      } else {
        const error = resultAction.payload;
        toast.error(error?.message || "Login failed");

        // Set field-specific errors if available
        if (error?.details) {
          setErrors(error.details);
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {" "}
      {/* Full screen height */}
      {/* Image Section */}
      <div className="w-[50%]">
        <img
          className="object-cover h-full w-full bg-blend-color"
          src="https://scontent.fktm3-1.fna.fbcdn.net/v/t1.15752-9/494327528_580974298366909_7866041604739773220_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_ohc=_HWekiHfNywQ7kNvwFmQVKX&_nc_oc=AdkRxJE94agWTPUbGw2FS6ej0X32kLZ_9o8lhrax9DS9SDv7k_f54-UtLmuybtEH7yQU8XiuYedoIr7e6fPIvkvX&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&oh=03_Q7cD2QGQYS7HxwIXJj6xC8j9Y7fWQOdsR-ITQOUmLKoIqMHwng&oe=6851575F"
          alt="Login Image"
        />
      </div>
      {/* Login Section */}
      <div className="w-[50%] flex items-center justify-center bg-white h-screen">
        <div className="w-full max-w-xl px-10 py-12">
          <h2 className="text-4xl text-blue-700 font-bold text-center">
            Welcome Back
          </h2>
          <h6 className="mt-2 text-lg text-gray-500 text-center">
            Login to your account
          </h6>

          <form onSubmit={handleLoginSubmit} className="mt-10 space-y-6">
            {/* Email */}
            <div>
              <input
                className={`border-2 w-full p-4 text-lg ${
                  errors.email ? "border-red-500" : "border-blue-400"
                } rounded-md`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                className={`border-2 w-full p-4 text-lg ${
                  errors.password ? "border-red-500" : "border-blue-400"
                } rounded-md`}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link
                to="/auth/forgot-password"
                className="text-base text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-3 text-lg rounded-md hover:bg-blue-600 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-base">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logins;
