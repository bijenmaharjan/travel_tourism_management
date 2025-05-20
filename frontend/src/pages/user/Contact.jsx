import React from "react";
import call from "../../assets/images/call.png";
import help from "../../assets/images/help.png";
const Contact = () => {
  return (
    <div className="items-center text-center pt-15 ">
      <h1 className="text-center font-bold text-[30px] text-white pt-10">
        Contact Us
      </h1>

      <div className="bg-[url('https://scontent.fktm3-1.fna.fbcdn.net/v/t1.15752-9/494574000_1038220971741258_5272314596804788479_n.png?_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_ohc=xpftzwHjaNcQ7kNvwFzYGgJ&_nc_oc=AdkwQ-6A1JDWCouhwBSJhsziQGhHciBUD1ttg9yuxlEOTV0EZKg36gywBRUAvX3ScU0ozZQ-Ry3pXIbM-bdU4xgC&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&oh=03_Q7cD2QGCmHOquNY94dogZ9rTleIdaXR3vS5VgovXylLMhDQ8ug&oe=68529937')] bg-center bg-cover h-[500px] mx-40 pt-20">
        <div className="flex flex-wrap gap-10 justify-center px-4 py-10 ">
          <div className="bg-gray-100 p-6 w-80 flex flex-col justify-between rounded-xl shadow-md">
            <div className="flex flex-col items-center">
              <img src={call} alt="" className="mb-4 h-[70px] " />
              <h1 className="text-xl font-semibold">Talk to us</h1>
              <p className="mt-3 text-gray-600">
                "Get in touch with us - we're happy to help!"
              </p>
            </div>
            <button className="bg-pink-300 mt-6 py-2 px-5 rounded-md self-center w-full">
              Contact us
            </button>
          </div>

          <div className="bg-gray-100 p-6 w-80 flex flex-col justify-between rounded-xl shadow-md">
            <div className="flex flex-col items-center">
              <img src={help} alt="image" className="mb-4 h-[70px] " />
              <h1 className="text-xl font-semibold">Help Center</h1>
              <p className="mt-3 text-gray-600">
                "Empowering your journey with instant answers and support."
              </p>
            </div>
            <button className="bg-pink-300 mt-6 py-2 px-5 rounded-md self-center w-full">
              Go to Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
