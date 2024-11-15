// src/components/AlbumsByUserId.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AlbumsByUserId = () => {
  const { userId } = useParams(); // Obtiene el userId de los parámetros de la URL
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumsByUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:3000/album/usuario/${userId}`
        );
        setAlbums(response.data);
      } catch (err) {
        console.error("Error al obtener los álbumes del usuario:", err);
        setError("No se pudieron cargar los álbumes.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumsByUser();
  }, [userId]);

  if (loading) return <p>Cargando álbumes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (albums.length === 0)
    return <p>No hay álbumes disponibles para este usuario.</p>;

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`); // Redirige a la página de detalles del álbum
  };

  return (
    <div className="albums-by-user-container p-6 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-500">
        Álbumes del Usuario
      </h2>
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

export default AlbumsByUserId;
