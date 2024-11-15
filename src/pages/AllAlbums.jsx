// src/AllAlbums.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la navegación
import axios from "axios";

const AllAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("http://localhost:3000/album/");
        setAlbums(response.data);
      } catch (error) {
        console.error("Error al obtener los álbumes:", error);
      }
    };
    fetchAlbums();
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`); // Redirigimos a la página de detalles del álbum
  };

  return (
    <div className="all-albums-container p-6 mx-auto">
      <h2 className="text-5xl text-green-500 font-bold mb-8 text-center">Álbumes</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div
            key={album.id}
            onClick={() => handleAlbumClick(album.id)}
            className="album-card bg-zinc-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
          >
            <img
              src={album.portada_url || "/img/default-cover.jpg"}
              alt={album.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold text-green-500 mt-4">
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

export default AllAlbums;
