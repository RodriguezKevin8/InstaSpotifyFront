import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaCompass, FaMusic, FaUser, FaFolder, FaRss, FaRecordVinyl, FaPlus, FaMusic as FaMusicNote } from "react-icons/fa";
import { FaArrowRightFromBracket, FaChevronDown, FaChevronUp, FaList, FaSliders } from "react-icons/fa6";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para el dropdown "Subir"
  const [isMyMusicDropdownOpen, setIsMyMusicDropdownOpen] = useState(false); // Estado para el dropdown "My Music"
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMyMusicDropdown = () => {
    setIsMyMusicDropdownOpen((prev) => !prev);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(false);
    setIsMyMusicDropdownOpen(false);
  };

  return (
    <div className="w-52 bg-black text-green-500 flex flex-col justify-between min-h-screen py-6">
      <div>
        <Link to="/">
          <h2 className="text-green-500 text-2xl font-bold mb-8 text-center font-sans">
            SPOTIGRAM
          </h2>
        </Link>
        <nav className="flex flex-col">
          <Link
            to="/search"
            className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
          >
            <FaSearch className="mr-3" />
            <span>Search</span>
          </Link>

          {/* Dropdown My Music */}
          <div>
            <button
              onClick={toggleMyMusicDropdown}
              className="flex items-center w-full py-3 px-4 bg-black text-green-500 hover:text-green-300 focus:outline-none"
            >
              <FaMusicNote className="mr-3" />
              <span className="flex-1 text-left">Music</span>
              {isMyMusicDropdownOpen ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
            {isMyMusicDropdownOpen && (
              <div className="ml-4">
                <Link
                  to="/generos"
                  className="flex items-center py-2 px-4 text-green-500 hover:text-green-300"
                  onClick={handleDropdownClick} // Cierra el dropdown al seleccionar
                >
                  <FaList className="mr-3" />
                  <span>Explorar Música</span>
                </Link>
                <Link
                  to="/albums"
                  className="flex items-center py-2 px-4 text-green-500 hover:text-green-300"
                  onClick={handleDropdownClick} // Cierra el dropdown al seleccionar
                >
                  <FaRecordVinyl className="mr-3" />
                  <span>Explorar Álbum</span>
                </Link>
                <Link
                    to="/my-music"
                    className="flex items-center py-2 px-4 text-green-500 hover:text-green-300"
                    onClick={handleDropdownClick} // Cierra el dropdown al seleccionar
                  >
                    <FaSliders className="mr-3" />
                    <span>Mis Playlist</span>
                  </Link>
              </div>
            )}
          </div>

          {userRole === "Artista" && (
            <div>
              {/* Botón del dropdown Subir */}
              <button
                onClick={toggleDropdown}
                className="flex items-center w-full py-3 px-4 bg-black text-green-500 hover:text-green-300 focus:outline-none"
              >
                <FaPlus className="mr-3" />
                <span className="flex-1 text-left">Subir</span>
                {isDropdownOpen ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>
              {/* Opciones del dropdown */}
              {isDropdownOpen && (
                <div className="ml-4">
                  <Link
                    to="/add-canciones"
                    className="flex items-center py-2 px-4 text-green-500 hover:text-green-300"
                    onClick={handleDropdownClick} // Cierra el dropdown al seleccionar
                  >
                    <FaRss className="mr-3" />
                    <span>Subir Canción</span>
                  </Link>
                  <Link
                    to="/album"
                    className="flex items-center py-2 px-4 text-green-500 hover:text-green-300"
                    onClick={handleDropdownClick} // Cierra el dropdown al seleccionar
                  >
                    <FaFolder className="mr-3" />
                    <span>Subir Álbum</span>
                  </Link>
                  
                  
                </div>
              )}
            </div>
          )}

          <Link
            to="/profile"
            className="flex items-center py-3 px-4 text-green-500 hover:text-green-300"
          >
            <FaUser className="mr-3" />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Botón de Cerrar Sesión ubicado al final */}
      <button
        onClick={openLogoutModal}
        className="w-full text-left flex items-center py-3 px-4 bg-black text-green-500 hover:text-green-300"
      >
        <FaArrowRightFromBracket className="mr-3" />
        <span>Cerrar Sesión</span>
      </button>

      {/* Modal de confirmación para cerrar sesión */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-green-500 mb-4">
              ¿Estás seguro de que deseas cerrar sesión?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 rounded bg-green-500 text-gray-800 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-black hover:bg-red-600"
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
