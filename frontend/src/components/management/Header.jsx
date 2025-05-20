import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { GoPersonFill } from "react-icons/go";
import { LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth";
import { BsSearch } from "react-icons/bs";
import UserSidebar from "../user/UserSidebar";
import { useNavigate, Link } from "react-router-dom";
import UserSidebarBooking from "../user/UserSidebarBooking";

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingSidebarOpen, setBookingSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    hotels: [],
    packages: [],
  });
  const [showResults, setShowResults] = useState(false);

  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults({ hotels: [], packages: [] });
      setShowResults(false);
      return;
    }

    try {
      const { data } = await axios.get(`/api/search`, {
        params: { query: searchTerm },
      });

      setSearchResults({
        hotels: data.hotels || [],
        packages: data.packages || [],
      });
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults({ hotels: [], packages: [] });
      setShowResults(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogoutUser = () => dispatch(logoutUser());
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleBookingSidebarToggle = () =>
    setBookingSidebarOpen(!bookingSidebarOpen);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-2 px-4 sm:px-6 max-w-7xl">
          <UserSidebar />

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {/* Search input and results - unchanged */}
            <div className="flex items-center gap-2 relative">
              <input
                type="text"
                placeholder="Search hotels or packages..."
                className="bg-gray-300 opacity-40 px-2 pb-2 pt-1 rounded-md text-white placeholder:text-white w-40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => searchTerm && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              <BsSearch
                className="h-5 w-5 sm:w-6 sm:h-6 text-gray-700 cursor-pointer"
                onClick={handleSearch}
              />

              {showResults && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md z-50 max-h-96 overflow-y-auto border border-gray-300">
                  {/* Search results content - unchanged */}
                </div>
              )}
            </div>

            {/* Navigation links - unchanged */}
            <Link
              to="home"
              onClick={scrollToTop}
              className={`px-4 py-2 rounded-lg text-sm xl:text-base hover:text-black ${
                isScrolled
                  ? "text-gray-700 hover:text-white"
                  : "text-gray-700 font-semibold"
              }`}
            >
              Home
            </Link>
            <Link
              to="travelPackage"
              onClick={scrollToTop}
              className={`px-4 py-2 rounded-lg text-sm xl:text-base hover:text-black ${
                isScrolled
                  ? "text-gray-500 hover:text-white"
                  : "text-gray-600 font-semibold"
              }`}
            >
              Tour Packages
            </Link>
            <Link
              onClick={scrollToTop}
              to="userhotel"
              className={`px-4 py-2 rounded-lg text-sm xl:text-base hover:text-black ${
                isScrolled
                  ? "text-gray-700 hover:text-white"
                  : "text-gray-600 font-semibold"
              }`}
            >
              Hotels
            </Link>
            <Link
              to="blog"
              onClick={scrollToTop}
              className={`px-4 py-2 rounded-lg text-sm xl:text-base hover:text-black ${
                isScrolled
                  ? "text-gray-700 hover:text-white"
                  : "text-gray-600 font-semibold"
              }`}
            >
              Blog
            </Link>
            <Link
              onClick={scrollToTop}
              to="aboutus"
              className={`px-4 py-2 rounded-lg text-sm xl:text-base hover:text-black ${
                isScrolled
                  ? "text-gray-700 hover:text-white"
                  : "text-gray-600 font-semibold"
              }`}
            >
              About Us
            </Link>
            <Link
              onClick={scrollToTop}
              to="contact"
              className={`px-4 py-2 rounded-lg text-sm xl:text-base hover:text-black ${
                isScrolled
                  ? "text-gray-700 hover:text-white"
                  : "text-gray-600 font-semibold"
              }`}
            >
              Contact Us
            </Link>

            <button
              onClick={handleBookingSidebarToggle}
              className={`px-4 py-2 rounded-lg text-sm xl:text-base ${
                isScrolled
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Booking
            </button>

            {/* Profile dropdown - now using native elements */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 p-2 rounded-full ${
                  isScrolled ? "text-gray-700 hover:text-white" : "text-white"
                }`}
              >
                <GoPersonFill className="w-5 h-5" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-xl border border-gray-300 rounded-lg w-48 z-50">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Sign In
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Profile
                  </button>
                  <button
                    onClick={handleLogoutUser}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 p-2 rounded-full ${
                isScrolled ? "text-gray-700 hover:text-white" : "text-white"
              }`}
            >
              <BsSearch className="w-6 h-6" />
            </button>

            <div className="relative" ref={mobileMenuRef}>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 p-2 rounded-full ${
                  isScrolled ? "text-gray-700 hover:text-white" : "text-white"
                }`}
              >
                <Menu className="w-8 h-8" />
              </button>

              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-xl border border-gray-300 rounded-lg w-56 z-50">
                  <button className="w-full text-left px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Tour Packages
                  </button>
                  <button className="w-full text-left px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Hotels
                  </button>
                  <button className="w-full text-left px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Blog
                  </button>
                  <button className="w-full text-left px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    About Us
                  </button>
                  <button className="w-full text-left px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Contact Us
                  </button>
                  <button
                    onClick={handleBookingSidebarToggle}
                    className="w-full text-left px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md"
                  >
                    Booking
                  </button>
                  <button className="w-full text-left px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md">
                    Sign In
                  </button>
                  <button
                    onClick={handleLogoutUser}
                    className="w-full text-left px-4 py-3 text-lg text-gray-700 hover:bg-gray-100 transition duration-300 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <UserSidebarBooking
        open={bookingSidebarOpen}
        onClose={() => setBookingSidebarOpen(false)}
      />
    </>
  );
};

export default Header;
