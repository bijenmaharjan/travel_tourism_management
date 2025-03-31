import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { GoPersonFill } from "react-icons/go";
import { LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth";
import { BsSearch } from "react-icons/bs";
import UserSidebar from "../user/UserSidebar";
import { useSearchParams, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  const handleCategoryClick = (category) => {
    navigate(`/packages?category=${encodeURIComponent(category)}`);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-xl">
      <div className="container mx-auto flex justify-between items-center p-2 max-w-7xl">
        <UserSidebar />
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.9KLeunCM__IakKq2mlI0dAHaEo&pid=Api&P=0&h=220"
            alt="Logo"
            className="h-16 w-auto"
          />
          <span className="text-white text-2xl font-semibold">Travel</span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex gap-8">
          <Button
            variant="ghost"
            className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-6 py-2 rounded-lg text-lg"
            onClick={() => handleCategoryClick("Adventure")}
          >
            Adventure Tours
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-6 py-2 rounded-lg text-lg"
            onClick={() => handleCategoryClick("Cultural")}
          >
            Cultural Tours
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-6 py-2 rounded-lg text-lg"
            onClick={() => handleCategoryClick("Trekking")}
          >
            Trekking
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-6 py-2 rounded-lg text-lg"
            onClick={() => handleCategoryClick("Wildlife")}
          >
            Wildlife
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-6 py-2 rounded-lg text-lg"
          >
            Search <BsSearch className="mt-1 ml-2" />
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 px-6 py-2 rounded-lg text-lg bg-green-500"
          >
            Booking
          </Button>

          {/* Person Icon with Dropdown */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 p-2 rounded-full"
                  onClick={toggleDropdown}
                >
                  <GoPersonFill />
                </Button>
              </DropdownMenuTrigger>

              {isOpen && (
                <DropdownMenuContent className="absolut mt-5 bg-white shadow-xl border border-gray-300 rounded-lg w-48 ml-5">
                  <DropdownMenuItem className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md">
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md"
                    onClick={() => handleLogoutUser()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </nav>

        {/* Mobile Menu - Dropdown */}
        <div className="lg:hidden ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 p-2 rounded-full"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white mt-5 lg:hidden shadow-xl border border-gray-300 rounded-lg w-48 transition-transform transform ease-out duration-300"
            >
              <DropdownMenuItem
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md"
                onClick={() => handleCategoryClick("Adventure")}
              >
                Adventure Tours
              </DropdownMenuItem>
              <DropdownMenuItem
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md"
                onClick={() => handleCategoryClick("Cultural")}
              >
                Cultural Tours
              </DropdownMenuItem>
              <DropdownMenuItem
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md"
                onClick={() => handleCategoryClick("Trekking")}
              >
                Trekking
              </DropdownMenuItem>
              <DropdownMenuItem
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md"
                onClick={() => handleCategoryClick("Wildlife")}
              >
                Wildlife
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md">
                Search
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md">
                Booking
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md">
                Login
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLogoutUser()}
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md"
              >
                Logout
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 text-lg text-gray-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-300 rounded-md">
                Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
