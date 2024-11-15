import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaCompass, FaMusic, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userResponse = JSON.parse(localStorage.getItem("user"));
  const userRole = userResponse?.value?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const openLogoutModal = () => {
    setIsModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

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
          to="/my-music"
          className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaMusic className="mr-3" />
          <span>My Music</span>
        </Link>

        <Link
          to="/generos"
          className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaCompass className="mr-3" />
          <span>Explorar música</span>
        </Link>

        {userRole === "Artista" && (
          <>
            <Link
              to="/add-canciones"
              className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
            >
              <FaCompass className="mr-3" />
              <span>Subir canciones</span>
            </Link>

            <Link
              to="/album"
              className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
            >
              <FaCompass className="mr-3" />
              <span>Subir Álbum</span>
            </Link>
          </>
        )}

        <Link
          to="/albums"
          className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaCompass className="mr-3" />
          <span>Explorar Álbumes</span>
        </Link>

        <Link
          to="/profile"
          className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaUser className="mr-3" />
          <span>Profile</span>
        </Link>

        {/* Botón de Cerrar Sesión */}
        <button
          onClick={openLogoutModal}
          className="w-full text-left flex items-center py-3 px-4 text-green-500 hover:text-green-300"
        >
          <FaUser className="mr-3" />
          <span>Cerrar Sesión</span>
        </button>
      </nav>

      {/* Modal de confirmación para cerrar sesión */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-4">
              ¿Estás seguro de que deseas cerrar sesión?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
