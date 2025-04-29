import React, { useState } from "react";
import medicare from "../assets/images/medicare.png";

const SignPatient = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("patient");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register data:", {
      fullname,
      username,
      email,
      password,
      confirmPassword,
      accountType,
    });

    setFullname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    alert("Registration successful!");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login data:", {
      email,
      password,
    });

    setEmail("");
    setPassword("");
    alert("Login successful!");
  };

  return (
    <div className="flex flex-col items-center mx-auto p-5  text-[#3D3743]">
      <h1 className="text-center font-bold flex gap-3 text-[24px] font-Archivo">
        <img
          className="flex h-[40px] w-[40px] rounded-[6px]"
          src={medicare}
          alt=""
        />{" "}
        MediCare
      </h1>

      <div className="bg-[#F1F5F9] mt-10 py-2 px-4  flex justify-between w-[512px] h-[50px] top-[124px] left-[464px] rounded-[4px] border">
        <button
          onClick={() => setIsLogin(true)}
          className={`${
            isLogin ? "bg-[#CBF3F0]" : "bg-[#F1F5F9]"
          } text-[#222E40]  left-[277px] rounded-[16px] h-[36px] w-[217px] top-[7px] p-2 `}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`${
            !isLogin ? "bg-[#CBF3F0]" : "bg-[#F1F5F9]"
          } text-[#222E40]  left-[277px] rounded-[16px] h-[36px] w-[217px] top-[7px] p-2 `}
        >
          Register
        </button>
      </div>

      <div className="p-5 w-[507px] bg-[#F3FBFA] mt-10 rounded-[10px] ">
        {isLogin ? (
          <>
            <form onSubmit={handleLogin}>
              <h1 className="font-bold font-Archivo w-[248px] mb-1  text-[18px] ">
                Sign in to your account
              </h1>
              <h6 className="mb-6 text-[#29293E]">
                Enter your credentials to access your account
              </h6>

              <label>Username</label>
              <input
                type="email"
                className="w-full p-2 border mt-1 bg-[#E8F0FE] mb-3 rounded-[6px]"
                placeholder="kritana@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="font-bold text-[15px]">Password</label>
              <input
                type="password"
                className="w-full p-2 bg-[#E8F0FE] rounded-[6px] border mt-1 mb-3"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-between mt-2 ">
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">Remember me</label>
                </div>
                <div className="flex">
                  {" "}
                  <a className="text-[#286F76] " href="">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#FFA829] text-white w-full p-2  mt-3 rounded-[30px]"
              >
                Sign in
              </button>
            </form>
            <p className="mt-2 text-[#2F5760]">
              Don't have an account?{" "}
              <span
                className="cursor-pointer hover:text-blue-400"
                onClick={() => setIsLogin(false)}
              >
                Register here
              </span>
            </p>
          </>
        ) : (
          <>
            <h4 className="text-lg font-bold">Create an account</h4>
            <p className="mb-4 text-[#3D3743]">
              Fill in your details to register a new account
            </p>
            <form onSubmit={handleRegister}>
              <h5 className="mb-1">Account Type</h5>
              <div className="flex flex-col gap-2 mb-2 mx-6">
                <label>
                  <input
                    type="radio"
                    name="accountType"
                    value="patient"
                    checked={accountType === "patient"}
                    onChange={() => setAccountType("patient")}
                  />
                  Patient
                </label>
                <label>
                  <input
                    type="radio"
                    name="accountType"
                    className="mb-5"
                    value="doctor"
                    checked={accountType === "doctor"}
                    onChange={() => setAccountType("doctor")}
                  />
                  Doctor
                </label>
              </div>

              <label className="">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border mt-1 mb-3 text-[#2D2C45]"
                placeholder="Enter your full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />

              <div className="flex flex-row justify-between gap-4 ">
                <div className="flex flex-col w-1/2 ">
                  <label>Username</label>
                  <input
                    type="text"
                    className=" bg-[#E8F0FE] text-[#2D2C45] border-none  p-2  mt-2 mb-3 border-[#B9E9E2] border-[1px] rounded-[6px] top-[351px] h-[46px] w-[220px]  "
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label>Email</label>
                  <input
                    type="email"
                    className="p-2  mt-2 mb-3 border-[#B9E9E2] border-[1px] text-[#2D2C45] rounded-[6px] top-[351px] h-[46px] w-[220px]  "
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between gap-4 ">
                <div className="flex flex-col w-1/2 ">
                  <label>Password</label>
                  <input
                    type="password"
                    className=" bg-[#E8F0FE] text-[#2D2C45] border-none  p-2  mt-2 mb-3 border-[#B9E9E2] border-[1px] rounded-[6px] top-[351px] h-[46px] w-[220px]  "
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="p-2  mt-2 mb-3 border-[#B9E9E2] border-[1px] text-[#2D2C45] rounded-[6px] top-[351px] h-[46px] w-[220px]  "
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 my-2 border border-[#2F5760] rounded-[5px] p-4">
                <input type="checkbox" className="mt-1 " />
                <p className="text-[#2F5760] text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </p>
              </div>

              <button
                type="submit"
                className="bg-[#FFA829] text-white w-full p-2 rounded-lg mt-3"
              >
                Create Account
              </button>
            </form>
            <p className="mt-5 text-[#2E3F4E] text-center">
              Already have an account?{" "}
              <span
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignPatient;
