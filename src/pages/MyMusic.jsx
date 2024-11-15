import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MyMusic = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  // Obtener el ID del usuario desde el localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.value?.id;

  // Cargar las playlists del usuario en sesión
  useEffect(() => {
    console.log("User ID:", userId); // Confirmación en consola
    const fetchUserPlaylists = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/playlist/user/${userId}`
          );
          setPlaylists(response.data);
        } catch (error) {
          console.error("Error al obtener las playlists del usuario:", error);
        }
      }
    };

    fetchUserPlaylists();
  }, [userId]);

  return (
    <div className="flex flex-col items-center w-full h-full p-6 space-y-8">
      {/* Botón para crear nueva playlist */}
      

      {/* Saludo personalizado */}
      <h2 className="text-5xl font-bold text-green-500">Mis Playlists</h2>

      {/* Sección de playlists en formato de cuadrícula */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <Link
              to={`/playlist/${playlist.id}`}
              key={playlist.id}
              className="relative group"
            >
              <img
                src={playlist.portada_url || "/img/default-cover.jpg"}
                alt={playlist.name}
                className="w-full h-52 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-lg font-semibold">
                  {playlist.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {playlist.description || "Sin descripción"}
                </p>
              </div>
              <button className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full hover:bg-black">
                <img src="/icons/Play.svg" alt="Play" className="w-5 h-5" />
              </button>
            </Link>
          ))
        ) : (
          <p className="text-gray-400">No tienes playlists disponibles.</p>
        )}
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={() => navigate("/create-playlist")}
          className="bg-green-500 text-black font-semibold  px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Crear Nueva Playlist
        </button>
      </div>
    </div>
  );
};

export default MyMusic;
