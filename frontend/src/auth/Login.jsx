import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email || !password) {
      if (!email) setEmailError("Email is required.");
      if (!password) setPasswordError("Password is required.");
      return;
    }

    try {
      const formData = { email, password };
      const response = await dispatch(loginUser(formData));
      console.log("response", response);

      if (response?.payload?.success) {
        toast.success(response.payload.message || "Login successful!");
        localStorage.setItem("token", response?.payload?.user?.token);
        setEmail("");
        setPassword("");

        navigate("/travel/home");
      } else {
        // Show the exact message returned from the backend
        toast.error(
          response?.payload?.message ||
            "Wrong password or email.Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred.Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-blue-300 p-4">
      <div className="bg-white w-full max-w-screen-md lg:max-w-2xl rounded-2xl shadow-lg flex md:flex-row">
        <div className="w-full md:w-1/2 block max-[770px]:hidden">
          <img
            src="https://s3-alpha-sig.figma.com/img/cdfd/c551/f9c6d619820566f61a6c7f8d4d236ae0?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ijmrp2JWfIXbn7jHpWJrH6KlsGXqcuPPvnyT7-rQW4s5c0VJsTFHA2bOeth-N-lScw5qVjfSvvmQKuEZqZbp82UJbGxxwI9cInc-qkbtrLgyxfZWwAigWIoOOLXI4wy2OWMS9~WBC4-P84KPOjXbDOwQhxw0r9YmZUHH0NtzXeOfhE761hd8zXgCANKaHDyoL-yEFq8ubTb7REm4JRth3zGunQldr3h9MvOz5z5JmVEMXrcvRvVxm9tio1fW76c26NannyLZ5AP4U3aHjSkrS-rqxcflzjj7n2UQmD1mRQhoCd6bhXycNyWmTalJ4nSoroksc6kqRYMYEHKNS6XVTQ__"
            alt="Login Image"
            className="object-center object-cover w-full h-[300px] md:h-[440px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center p-6">
          <div className="w-full max-w-sm text-center">
            <h2 className="text-2xl text-blue-700 font-semibold">
              Welcome Back
            </h2>
            <h6 className="mt-2 text-gray-500">Login with Email</h6>

            <form
              onSubmit={handleLoginSubmit}
              className="mt-8 flex flex-col items-center gap-4 w-full"
            >
              <div className="w-full">
                <input
                  className={`border-2 w-full p-2 ${
                    emailError ? "border-red-500" : "border-blue-400"
                  } rounded-md`}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                {emailError && (
                  <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
              </div>

              <div className="w-full">
                <input
                  className={`border-2 w-full p-2 ${
                    passwordError ? "border-red-500" : "border-blue-400"
                  } rounded-md`}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                {passwordError && (
                  <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                )}
              </div>

              <p className="text-sm text-gray-600 self-start mt-1">
                Forgot your password?
              </p>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>

            <p className="mt-5">
              Don't have an account?{" "}
              <Link to="/auth/register" className="font-semibold">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
