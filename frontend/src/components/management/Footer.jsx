import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Globe,
  CreditCard,
  Shield,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 mt-50 pb-8 pt-20 p-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Company */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Yatri Nepal</h3>
            <p className="mb-6">
              Your trusted travel partner for unforgettable experiences in
              Nepal's majestic landscapes and vibrant culture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Tour Packages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Popular Destinations
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition">
                  Kathmandu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pokhara
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chitwan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Lumbini
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Everest Base Camp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Annapurna Circuit
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                <span>Thamel, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>+977 9828027653</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>yatri@travelnepal.com</span>
              </div>
              <div className="flex items-center gap-10 mt-9">
                <span>
                  <FaFacebook />
                </span>
                <span>
                  <FaTwitter />
                </span>
                <span>
                  <FaInstagram />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Security */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm">We accept:</span>
              <div className="flex space-x-2">
                <CreditCard className="w-6 h-6" />
                <span>Visa</span>
                <CreditCard className="w-6 h-6" />

                <span>Esewa</span>
                <span>Khalti</span>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm">Secure Payment Processing</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Travel Nepal. All rights reserved.
            |
            <a href="#" className="hover:text-white ml-2">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-white ml-2">
              Terms of Service
            </a>
          </p>
          <p className="mt-2">
            Registered with Nepal Tourism Board | License No: 1234/XYZ
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
