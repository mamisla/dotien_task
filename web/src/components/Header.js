import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">AI Assistant</h1>
      <nav className="flex space-x-4">
        <Link
          to="/"
          className="px-4 py-2 rounded w-24 text-center hover:bg-gray-700 transition-colors"
        >
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              to="/chat"
              className="px-4 py-2 rounded w-24 text-center hover:bg-gray-700 transition-colors"
            >
              Chat
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded w-24 text-center hover:bg-gray-700 transition-colors"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="px-4 py-2 rounded w-24 text-center hover:bg-gray-700 transition-colors"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded w-24 text-center hover:bg-gray-700 transition-colors"
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
