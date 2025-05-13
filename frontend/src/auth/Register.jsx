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

        // Set field-specific errors if available
        if (error?.details) {
          setErrors(error.details);
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-blue-300 p-4">
      <div className="bg-white w-full max-w-screen-md lg:max-w-2xl rounded-2xl shadow-lg flex md:flex-row">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 block max-[770px]:hidden">
          <img
            src="https://s3-alpha-sig.figma.com/img/cdfd/c551/f9c6d619820566f61a6c7f8d4d236ae0?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ijmrp2JWfIXbn7jHpWJrH6KlsGXqcuPPvnyT7-rQW4s5c0VJsTFHA2bOeth-N-lScw5qVjfSvvmQKuEZqZbp82UJbGxxwI9cInc-qkbtrLgyxfZWwAigWIoOOLXI4wy2OWMS9~WBC4-P84KPOjXbDOwQhxw0r9YmZUHH0NtzXeOfhE761hd8zXgCANKaHDyoL-yEFq8ubTb7REm4JRth3zGunQldr3h9MvOz5z5JmVEMXrcvRvVxm9tio1fW76c26NannyLZ5AP4U3aHjSkrS-rqxcflzjj7n2UQmD1mRQhoCd6bhXycNyWmTalJ4nSoroksc6kqRYMYEHKNS6XVTQ__"
            alt="Register Image"
            className="object-center object-cover w-full h-[300px] md:h-[440px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center p-6">
          <div className="w-full max-w-sm text-center">
            <h2 className="text-2xl text-blue-700 font-semibold">
              Create Account
            </h2>
            <h6 className="mt-2 text-gray-500">Register to get started</h6>

            <form
              onSubmit={handleRegisterSubmit}
              className="mt-8 flex flex-col items-center gap-4 w-full"
            >
              <div className="w-full">
                <input
                  className={`border-2 w-full p-2 ${
                    errors.username ? "border-red-500" : "border-blue-400"
                  } rounded-md`}
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username}</p>
                )}
              </div>

              <div className="w-full">
                <input
                  className={`border-2 w-full p-2 ${
                    errors.firstname ? "border-red-500" : "border-blue-400"
                  } rounded-md`}
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder="First name"
                />
                {errors.firstname && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>

              <div className="w-full">
                <input
                  className={`border-2 w-full p-2 ${
                    errors.lastname ? "border-red-500" : "border-blue-400"
                  } rounded-md`}
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Last name"
                />
                {errors.lastname && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastname}</p>
                )}
              </div>

              <div className="w-full">
                <input
                  className={`border-2 w-full p-2 ${
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

              <div className="w-full">
                <input
                  className={`border-2 w-full p-2 ${
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

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Register
              </button>
            </form>

            <p className="mt-5">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
