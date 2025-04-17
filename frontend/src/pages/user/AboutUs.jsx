import React from "react";
import {
  FaHotel,
  FaPlane,
  FaBus,
  FaInstagram,
  FaQuoteLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

const AboutUs = () => {
  const teamMembers = [
    {
      initials: "MG",
      name: "Meshiv Gauli",
      role: "Project Manager",
      statement:
        '"Building bridges between ideas and implementation is my passion."',
      instagram: "https://www.instagram.com/meshiv_g_auli/",
      handle: "@meshiv_g_auli",
    },
    {
      initials: "SR",
      name: "Spandai Rai",
      role: "Business Analyst",
      statement:
        '"Data tells stories that shape the future of travel experiences."',
      instagram: "https://www.instagram.com/spandan_raii/",
      handle: "@spandan_raii",
    },
    {
      initials: "SS",
      name: "Sanskar Sharma",
      role: "Developer",
      statement:
        '"Creating interfaces that inspire wanderlust one pixel at a time."',
      instagram: "https://instagram.com/sanskar.0_0/",
      handle: "@sanskar.0_0",
    },
    {
      initials: "KB",
      name: "Kriti Basnet",
      role: "Developer",
      statement:
        '"Building robust systems that connect travelers to their dreams."',
      instagram: "https://instagram.com/kreeti441/",
      handle: "@kreeti441",
    },
    {
      initials: "BM",
      name: "Bijen Maharjan",
      role: "Developer",
      statement:
        '"Design isn\'t just how it looks, but how the journey feels."',
      instagram: "https://instagram.com/bijen._01",
      handle: "@bijen._01",
    },
    {
      initials: "NG",
      name: "Nikita Gautam",
      role: "Developer",
      statement:
        '"Travel should be accessible anywhere, anytime, in your pocket."',
      instagram: "https://instagram.com/nikita_gautam05",
      handle: "@nikita_gautam05",
    },
    {
      initials: "PR",
      name: "Peyoosh Rai",
      role: "Developer",
      statement: '"Securing your journey is as important as planning it."',
      instagram: "https://instagram.com/peyoosh_rai_",
      handle: "@peyoosh_rai_",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Choose Package",
      description: "Browse our curated travel packages",
    },
    {
      number: 2,
      title: "Customize",
      description: "Adjust dates and preferences",
    },
    {
      number: 3,
      title: "Book",
      description: "Secure your reservation instantly",
    },
    {
      number: 4,
      title: "Travel",
      description: "Enjoy your hassle-free journey",
    },
  ];

  const features = [
    {
      icon: <FaHotel className="text-2xl" />,
      text: "Hotel Bookings",
      color: "text-indigo-400",
      border: "border-l-indigo-400",
    },
    {
      icon: <FaPlane className="text-2xl" />,
      text: "Flight Reservations",
      color: "text-blue-400",
      border: "border-l-blue-400",
    },
    {
      icon: <FaBus className="text-2xl" />,
      text: "Bus Tickets",
      color: "text-cyan-400",
      border: "border-l-cyan-400",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
          Yatri
        </h1>
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
          Crafting unforgettable journeys with passion and precision
        </p>
      </motion.header>

      {/* About Platform Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-20 relative overflow-hidden border border-gray-100"
      >
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 -top-32 -right-32 z-0"></div>
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-cyan-50 to-teal-50 -bottom-20 -left-20 z-0"></div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 text-center">
            Our <span className="text-indigo-600">Vision</span>
          </h2>

          <div className="space-y-6 text-gray-700 text-lg max-w-4xl mx-auto">
            <p>
              At Yatri, we believe travel should be effortless, accessible, and
              transformative. Our platform was born from a simple idea: to
              remove the stress from travel planning so you can focus on the
              experience.
            </p>
            <p>
              We've meticulously designed every aspect of our service to provide
              seamless booking for hotels, flights, and buses - all in one
              intuitive interface.
            </p>
          </div>

          {/* Features */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 relative z-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className={`bg-white p-6 rounded-xl shadow-sm flex items-start ${feature.border} border-l-4 hover:shadow-md transition-all duration-300`}
              >
                <span className={`mr-4 mt-1 ${feature.color}`}>
                  {feature.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {feature.text}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {index === 0
                      ? "Luxury to budget stays worldwide"
                      : index === 1
                      ? "Domestic and international flights"
                      : "Intercity and local bus routes"}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="relative z-10 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 md:p-10 mt-10 mb-6 border border-gray-200">
            <FaQuoteLeft className="text-indigo-200 text-4xl mb-4" />
            <p className="text-gray-700 text-lg italic mb-6">
              "We don't just book trips - we design experiences that create
              lasting memories and tell your unique travel story."
            </p>
            <div className="w-12 h-1 bg-indigo-400 mb-4"></div>
            <p className="text-gray-600 font-medium">Yatri Team Philosophy</p>
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Simple <span className="text-blue-500">Booking</span> Process
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our streamlined 4-step process makes planning your journey
            effortless
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-1 min-w-[150px] text-center relative group"
              >
                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-full ${
                      index === 0
                        ? "bg-indigo-500"
                        : index === 1
                        ? "bg-blue-500"
                        : index === 2
                        ? "bg-cyan-500"
                        : "bg-teal-400"
                    } text-white flex items-center justify-center mx-auto mb-4 font-semibold text-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.number}
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {index !== steps.length - 1 && (
                  <div className="hidden md:block absolute right-[-50px] top-7">
                    <svg
                      className="w-8 h-8 text-gray-300 group-hover:text-indigo-300 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </div>
                )}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 transform -translate-x-1/2 -bottom-6">
                    <svg
                      className="w-6 h-6 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      ></path>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Meet <span className="text-cyan-500">Our Team</span>
          </h2>
          <p className="text-gray-600 text-lg">
            The passionate individuals dedicated to making your travel
            experience exceptional
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => {
            const bgColors = [
              "bg-gradient-to-br from-indigo-500 to-indigo-600",
              "bg-gradient-to-br from-blue-500 to-blue-600",
              "bg-gradient-to-br from-cyan-500 to-cyan-600",
              "bg-gradient-to-br from-teal-400 to-teal-500",
              "bg-gradient-to-br from-emerald-400 to-emerald-500",
              "bg-gradient-to-br from-green-400 to-green-500",
              "bg-gradient-to-br from-cyan-400 to-cyan-500",
            ];
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div
                    className={`w-20 h-20 rounded-full ${
                      bgColors[index % bgColors.length]
                    } flex items-center justify-center mx-auto mb-5 font-bold text-2xl text-white group-hover:scale-105 transition-transform duration-300`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <span className="text-sm text-white bg-gradient-to-r from-indigo-400 to-blue-400 px-3 py-1 rounded-full inline-block font-medium mb-3">
                    {member.role}
                  </span>
                  <div className="h-16 flex items-center justify-center mb-4">
                    <p className="text-sm text-gray-600 italic">
                      {member.statement}
                    </p>
                  </div>
                  <a
                    href={member.instagram}
                    className="text-sm font-medium text-gray-600 hover:text-indigo-500 flex items-center justify-center transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="mr-2 text-indigo-400 group-hover:text-indigo-600 transition-colors duration-300" />
                    {member.handle}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 mb-16 text-center"
      >
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Ready to start your next adventure?
        </h3>
        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-indigo-600 hover:to-blue-600">
          Explore Packages
        </button>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-20 pt-8 border-t border-gray-200"
      >
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Yatri Travel. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
};

export default AboutUs;
