import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";

const Navbar = ({
  showAbout,
  showProfileDropdown,
  setShowProfileDropdown,
  navigate,
}) => {
  const [user, setUser] = useState({
    name: "User",
    email: "user@example.com",
    profileIcon:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Default profile picture
  });

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <nav className="bg-white bg-opacity-20 shadow-lg backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 text-4xl"
              style={{ fontFamily: '"Comic Sans MS", cursive' }}
            >
              Taskify
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={showAbout}
              className="text-gray-600 hover:text-indigo-600 transition-colors text-xl"
            >
              About
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <img
                  src={user.profileIcon}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white bg-opacity-90 rounded-lg shadow-lg py-2 backdrop-blur-md border border-white/20">
                  {/* Greeting Section */}
                  <div className="px-4 py-3 border-b border-white/20 flex items-center gap-3">
                    <img
                      src={user.profileIcon}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-gray-700 text-sm">Welcome back,</p>
                      <p className="text-gray-900 font-semibold text-lg">
                        {user.name}
                      </p>
                    </div>
                  </div>

                  {/* Logout Option */}
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("userData");
                      navigate("/login");
                    }}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                  >
                    <FiLogOut className="text-gray-600" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
