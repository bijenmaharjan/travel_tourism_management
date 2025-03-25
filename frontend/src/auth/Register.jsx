import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleonRegisterSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    try {
      const response = await dispatch(registerUser(newUser));
      console.log("res", response);
      if (response?.payload?.success) {
        toast.success(response?.payload.message || "Registration successful!");
        // Clear form after success
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        navigate("/auth/login");
      } else {
        toast.error(response?.payload?.message || "Registration failed.");
      }
    } catch (err) {
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-blue-300 p-4">
      <div className="bg-white w-full max-w-screen-md lg:max-w-2xl rounded-2xl shadow-lg flex md:flex-row">
        {/* Left Side - Image (Hidden on Small Screens) */}
        <div className="w-full md:w-1/2 block max-[770px]:hidden">
          <img
            src="https://s3-alpha-sig.figma.com/img/cdfd/c551/f9c6d619820566f61a6c7f8d4d236ae0?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ijmrp2JWfIXbn7jHpWJrH6KlsGXqcuPPvnyT7-rQW4s5c0VJsTFHA2bOeth-N-lScw5qVjfSvvmQKuEZqZbp82UJbGxxwI9cInc-qkbtrLgyxfZWwAigWIoOOLXI4wy2OWMS9~WBC4-P84KPOjXbDOwQhxw0r9YmZUHH0NtzXeOfhE761hd8zXgCANKaHDyoL-yEFq8ubTb7REm4JRth3zGunQldr3h9MvOz5z5JmVEMXrcvRvVxm9tio1fW76c26NannyLZ5AP4U3aHjSkrS-rqxcflzjj7n2UQmD1mRQhoCd6bhXycNyWmTalJ4nSoroksc6kqRYMYEHKNS6XVTQ__"
            alt="Login Image"
            className="object-center object-cover w-full h-[300px] md:h-[440px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>
        {/* Right Side - Content (Centered Properly) */}
        <div className="w-full md:w-1/2 flex flex-col items-center p-6">
          <div className="w-full max-w-sm text-center">
            <h2 className="text-2xl text-blue-700 font-semibold">
              Welcome Back
            </h2>
            <h6 className="mt-2 text-gray-500">Register</h6>

            {/* Form Section */}
            <form
              onSubmit={handleonRegisterSubmit}
              className="mt-8 flex flex-col items-center gap-4 w-full"
            >
              <input
                className="border-2 w-full p-2 border-blue-400 rounded-md"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                className="border-2 w-full p-2 border-blue-400 rounded-md"
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Firstname"
              />
              <input
                className="border-2 w-full p-2 border-blue-400 rounded-md"
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Lastname"
              />
              <input
                className="border-2 w-full p-2 border-blue-400 rounded-md"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <input
                className="border-2 w-full p-2 border-blue-400 rounded-md"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Register
              </button>
            </form>
            <p className="mt-5">
              Have an account?{" "}
              <Link to="/auth/login" className="font-semibold">
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
