import React from "react";
import { ShieldCheck, Heart, Star, Headset } from "lucide-react";
import { FaFirstAid } from "react-icons/fa";

const SupportClientBox = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
      title: "Best Price Guarantee",
      description:
        "We promise the best rates for your travels. Found a better deal? We'll match it!",
    },
    {
      icon: <Heart className="w-8 h-8 text-purple-600" />,
      title: "Traveller Love Us",
      description:
        "Join thousands of satisfied travelers who trust us for their perfect vacations.",
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      title: "Best Travel Agent",
      description:
        "Award-winning service with expert travel consultants to plan your dream trip.",
    },
    {
      icon: <Headset className="w-8 h-8 text-purple-600" />,
      title: "Dedicated Support",
      description:
        "24/7 customer service to assist you before, during, and after your travels.",
    },
    {
      icon: <FaFirstAid className="w-8 h-8 text-purple-600" />,
      title: "First Aid Care",
      description:
        "Safety first! Emergency assistance and medical support available when you need it.",
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-16">
      {" "}
      {/* Removed max-w-7xl and mx-auto */}
      <div className="px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Added inner container for content */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-900">
            Why Travelers Choose Us
          </h2>
          <p className="mt-4 text-lg text-purple-700 max-w-3xl mx-auto">
            We're committed to making your travel experience seamless, safe, and
            memorable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100 flex flex-col items-center text-center hover:border-purple-200 hover:-translate-y-1"
            >
              <div className="mb-4 p-3 bg-purple-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-purple-700 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportClientBox;
