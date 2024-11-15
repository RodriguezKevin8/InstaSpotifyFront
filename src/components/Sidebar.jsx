// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCompass, FaHeart, FaMusic, FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-52 bg-black text-green-500 flex flex-col items-center min-h-screen py-6">
      <Link to="/">
        <h2 className="text-green-500 text-2xl font-bold mb-8">SPOTIGRAM</h2>
      </Link>
      <nav className="w-full">
        <Link
          to="/search"
          className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaSearch className="mr-3" />
          <span>Search</span>
        </Link>
        <Link
          to="/explore"
          className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaCompass className="mr-3" />
          <span>Explore</span>
        </Link>

        <Link
          to="/my-music"
          className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaMusic className="mr-3" />
          <span>My Music</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaUser className="mr-3" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
