import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
    <div className="flex justify-center items-center min-h-screen w-full bg-blue-300 p-4">
      <div className="bg-white w-full max-w-screen-md lg:max-w-2xl rounded-2xl shadow-lg flex md:flex-row">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 block max-[770px]:hidden">
          <img
            src="https://s3-alpha-sig.figma.com/img/cdfd/c551/f9c6d619820566f61a6c7f8d4d236ae0?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ijmrp2JWfIXbn7jHpWJrH6KlsGXqcuPPvnyT7-rQW4s5c0VJsTFHA2bOeth-N-lScw5qVjfSvvmQKuEZqZbp82UJbGxxwI9cInc-qkbtrLgyxfZWwAigWIoOOLXI4wy2OWMS9~WBC4-P84KPOjXbDOwQhxw0r9YmZUHH0NtzXeOfhE761hd8zXgCANKaHDyoL-yEFq8ubTb7REm4JRth3zGunQldr3h9MvOz5z5JmVEMXrcvRvVxm9tio1fW76c26NannyLZ5AP4U3aHjSkrS-rqxcflzjj7n2UQmD1mRQhoCd6bhXycNyWmTalJ4nSoroksc6kqRYMYEHKNS6XVTQ__"
            alt="Login Image"
            className="object-center object-cover w-full h-[300px] md:h-[440px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center p-6">
          <div className="w-full max-w-sm text-center">
            <h2 className="text-2xl text-blue-700 font-semibold">
              Welcome Back
            </h2>
            <h6 className="mt-2 text-gray-500">Login to your account</h6>

            <form
              onSubmit={handleLoginSubmit}
              className="mt-8 flex flex-col items-center gap-4 w-full"
            >
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

              <div className="w-full text-right">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-5">
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
    </div>
  );
};

export default Login;
