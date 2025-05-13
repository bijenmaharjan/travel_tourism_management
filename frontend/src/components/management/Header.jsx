import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { GoPersonFill } from "react-icons/go";
import { LogOut, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth";
import { BsSearch } from "react-icons/bs";
import UserSidebar from "../user/UserSidebar";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
// import ScrollToTop from "../user/ScrollToTop";
import UserSidebarBooking from "../user/UserSidebarBooking"; // Import BookingSidebar

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookingSidebarOpen, setBookingSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBookingSidebarToggle = () => {
    setBookingSidebarOpen(!bookingSidebarOpen);
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 `}
      >
        <div className="container mx-auto flex justify-between items-center p-2 px-4 sm:px-6 max-w-7xl">
          {/* Mobile Sidebar */}
          <UserSidebar />

          {/* Logo */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center space-x-2"
          >
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.9KLeunCM__IakKq2mlI0dAHaEo&pid=Api&P=0&h=220"
              alt="Logo"
              className={`h-12 sm:h-16 w-auto transition-all duration-300 ${
                isScrolled ? "filter brightness-0" : ""
              }`}
            />
            <span
              className={`text-xl sm:text-2xl font-semibold transition-all duration-300 ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Travel
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              onClick={scrollToTop}
              to="home"
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="travelPackage"
              onClick={scrollToTop}
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              Tour Packages
            </Link>
            <Link
              onClick={scrollToTop}
              to="userhotel"
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              Hotels
            </Link>
            <Button
              onClick={scrollToTop}
              variant="ghost"
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              Blog
            </Button>
            <Link
              onClick={scrollToTop}
              to="aboutus"
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              About Us
            </Link>
            <Button
              onClick={scrollToTop}
              variant="ghost"
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              Contact Us
            </Button>
            <Button
              onClick={scrollToTop}
              variant="ghost"
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              <BsSearch className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button
              onClick={handleBookingSidebarToggle}
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Booking
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 p-2 rounded-full ${
                    isScrolled ? "text-gray-700 hover:text-white" : "text-white"
                  }`}
                  onClick={toggleDropdown}
                >
                  <GoPersonFill className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              {isOpen && (
                <DropdownMenuContent className="mt-2 bg-white shadow-xl border border-gray-300 rounded-lg w-48">
                  <DropdownMenuItem className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md"
                    onClick={handleLogoutUser}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 p-2 rounded-full ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              <BsSearch className="w-6 h-6" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 p-2 rounded-full ${
                    isScrolled ? "text-gray-700 hover:text-white" : "text-white"
                  }`}
                >
                  <Menu className="w-8 h-8" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white mt-2 shadow-xl border border-gray-300 rounded-lg w-56"
              >
                <DropdownMenuItem className="px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                  Tour Packages
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                  Hotels
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                  Blog
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                  About Us
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleBookingSidebarToggle}
                  className="px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md"
                >
                  Booking
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                  Sign In
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogoutUser}
                  className="px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Booking Sidebar */}
      <UserSidebarBooking
        open={bookingSidebarOpen}
        onClose={() => setBookingSidebarOpen(false)}
      />
    </>
  );
};

export default Header;
