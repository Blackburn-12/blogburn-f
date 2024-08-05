import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/darkblogburnnavlogo.png";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform z-50`}
        >
          <div className="p-4">
            <button
              className="text-xl text-gray-600 float-right"
              onClick={toggleMenu}
            >
              &times;
            </button>
            <div className="mt-12">
              <Link
                to="/"
                className="block text-gray-600 hover:text-gray-500 py-2 font-oswald"
                onClick={toggleMenu}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    to="/create-post"
                    className="block text-gray-600 hover:text-gray-500 py-2 font-oswald"
                    onClick={toggleMenu}
                  >
                    Create Post
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="block text-white hover:text-gray-200 py-2 font-oswald bg-buttonBeforeHover hover:bg-buttonAfterHover px-4 rounded"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-600 hover:text-gray-500 py-2 font-oswald"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-gray-600 hover:text-gray-500 py-2 font-oswald"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Overlay to close sidebar when clicking outside */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Logo and Toggle Button */}
        <div className="fixed top-0 right-0 flex items-center h-16 bg-white shadow-md w-full z-50">
          <img src={logo} alt="Logo" className="h-12 ml-4" />
          <button
            className="text-xl text-gray-600 ml-auto mr-4"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
