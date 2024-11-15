// src/AlbumsByUser.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AlbumsByUser = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAlbums = async () => {
      const userResponse = JSON.parse(localStorage.getItem("user"));
      const userId = userResponse?.value?.id;

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/album/usuario/${userId}`
          );
          setAlbums(response.data);
        } catch (error) {
          console.error("Error al obtener los álbumes del usuario:", error);
        }
      }
    };

    fetchUserAlbums();
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className="albums-by-user-container p-6 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Mis Álbumes</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div
            key={album.id}
            onClick={() => handleAlbumClick(album.id)}
            className="album-card bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
          >
            <img
              src={album.portada_url || "/img/default-cover.jpg"}
              alt={album.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold text-white mt-4">
              {album.title}
            </h3>
            <p className="text-gray-400">
              {album.usuario?.nombre || "Artista desconocido"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsByUser;
