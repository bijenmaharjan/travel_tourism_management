import React, { useState } from "react";
// import medicare from "../assets/images/medicare.png";
import google from "../assets/images/google.png";
import apple from "../assets/images/apple.png";
import { Link, useNavigate } from "react-router-dom";

const AuthSign = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accountType, setAccountType] = useState("patient");
  const navigate = useNavigate();
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center mx-auto p-5  text-[#3D3743] border">
        <h1 className="text-center font-bold flex gap-3 text-[24px] font-Archivo">
          Welcome Back
        </h1>
        <p className="text-sm text-[#8895A6] pt-6">
          Enter your credentials to sign to your account
        </p>

        <div className="bg-[#F1F5F9] mt-10 py-2 px-4  flex justify-between w-[512px] h-[50px] top-[124px] left-[464px] rounded-[4px] border">
          <button
            onClick={() => setIsLogin(true)}
            className={`${
              isLogin ? "bg-[#CBF3F0]" : "bg-[#F1F5F9]"
            } text-[#222E40]  left-[277px] rounded-[16px] h-[36px] w-[217px] top-[5px] p-2 `}
          >
            Patient
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`${
              !isLogin ? "bg-[#CBF3F0]" : "bg-[#F1F5F9]"
            } text-[#222E40]  left-[277px] rounded-[16px] h-[36px] w-[217px] top-[7px] p-2 `}
          >
            Doctor
          </button>
        </div>

        <div className="p-5 w-[507px]  mt-4 rounded-[10px] ">
          {isLogin ? (
            <>
              <form onSubmit={handleLogin}>
                <label className="font-bold text-[15px]">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border mt-1 bg-[#E8F0FE] mb-6 rounded-[6px]"
                  placeholder="kritana@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="font-bold  text-[15px]">Password</label>
                <input
                  type="password"
                  className="w-full p-3 bg-[#E8F0FE] rounded-[6px] border mt-1 mb-3"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-[#FFA829] text-white w-full p-2  mt-3 rounded-[30px]"
                >
                  Sign in
                </button>
              </form>
              <div>
                <h1 className="text-center mt-10 text-[#8B95AC]">
                  OR CONTINUE WITH
                </h1>

                <div className="flex justify-between mt-6 gap-3  w-full ">
                  <button className="border text-center w-1/2 items-center flex flex-row gap-4 border-[#D5F3F0] p-2 rounded-[10px] ">
                    <img src={google} alt="" className="h-[22px]" />
                    Google
                  </button>
                  <button className="border w-1/2 flex flex-row gap-4 rounded-[10px] p-2  items-center border-[#D5F3F0]">
                    <img src={apple} alt="" className="h-[20px]" />
                    Apple
                  </button>
                </div>
              </div>
              <p className="mt-2 text-[#2F5760] text-center">
                Don't have an account?{" "}
                <Link
                  to="/auth/signPatient"
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => setIsLogin(false)}
                >
                  Register Now
                </Link>
              </p>
            </>
          ) : (
            <>
              <form onSubmit={handleLogin}>
                <label className="font-bold text-[15px]">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border mt-1 bg-[#E8F0FE] mb-6 rounded-[6px]"
                  placeholder="kritana@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="font-bold  text-[15px]">Password</label>
                <input
                  type="password"
                  className="w-full p-3 bg-[#E8F0FE] rounded-[6px] border mt-1 mb-3"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-[#FFA829] text-white w-full p-2  mt-3 rounded-[30px]"
                >
                  Sign in
                </button>
              </form>
              <div>
                <h1 className="text-center mt-10 text-[#8B95AC]">
                  OR CONTINUE WITH
                </h1>

                <div className="flex justify-between mt-6 gap-3  w-full ">
                  <button className="border text-center w-1/2 items-center flex flex-row gap-4 border-[#D5F3F0] p-2 rounded-[10px] ">
                    <img src={google} alt="" className="h-[22px]" />
                    Google
                  </button>
                  <button className="border w-1/2 flex flex-row gap-4 rounded-[10px] p-2  items-center border-[#D5F3F0]">
                    <img src={apple} alt="" className="h-[20px]" />
                    Apple
                  </button>
                </div>
              </div>
              <p className="mt-2 text-[#2F5760] text-center">
                Don't have an account?{" "}
                <span
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => setIsLogin(false)}
                >
                  <Link to="/auth/signDoctor"> Register here</Link>
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthSign;
