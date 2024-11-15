// src/AllSongs.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePlayer } from "../contexts/PlayerContext.jsx";
import { FaPlay, FaPlus, FaRandom } from "react-icons/fa";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [songToAdd, setSongToAdd] = useState(null);

  const { genreId } = useParams();
  const { playTrack, playTrackList } = usePlayer();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.value?.id;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const endpoint = genreId
          ? `http://localhost:3000/cancion/genero/${genreId}`
          : "http://localhost:3000/cancion/";
        const response = await axios.get(endpoint);
        setSongs(response.data);
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };
    fetchSongs();
  }, [genreId]);

  const handleOpenModal = async (songId) => {
    setSongToAdd(songId);
    setShowModal(true);
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

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylist) {
      alert("Selecciona una playlist antes de añadir la canción.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:3000/playlist/${selectedPlaylist}/song`,
        {
          cancionId: Number(songToAdd),
        }
      );
      setModalMessage("Canción añadida a la playlist!");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setModalMessage("La canción ya está en la playlist.");
      } else {
        console.error("Error al añadir la canción a la playlist:", error);
        setModalMessage("Hubo un problema al añadir la canción a la playlist.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlaylist(null);
    setSongToAdd(null);
    setModalMessage("");
  };

  const handleShufflePlay = () => {
    if (songs.length > 0) {
      // Mezclar canciones
      const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
      playTrackList(shuffledSongs, 0); // Reproducir lista mezclada desde el inicio
    }
  };

  return (
    <div className="all-songs-container p-6 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Canciones del Género Seleccionado
      </h2>

      {/* Botón de reproducción aleatoria */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleShufflePlay}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
        >
          <FaRandom className="mr-2" />
          Reproducir Aleatorio
        </button>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full">
        <table className="table-auto w-full text-left text-gray-400">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Título</th>
              <th className="py-2 px-4">Artista</th>
              <th className="py-2 px-4">Álbum</th>
              <th className="py-2 px-4 text-right">Añadir</th>
            </tr>
          </thead>
          <tbody>
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <tr
                  key={song.id}
                  className="hover:bg-gray-800 cursor-pointer"
                  onClick={() => playTrack(song, index, songs)}
                >
                  <td className="py-2 px-4 text-gray-500">{index + 1}</td>
                  <td className="py-2 px-4 flex items-center space-x-4">
                    <img
                      src={song.portada_url}
                      alt={song.title}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-white font-semibold">{song.title}</p>
                      <p className="text-gray-400 text-sm">{song.usuario}</p>
                    </div>
                  </td>
                  <td className="py-2 px-4">{song.usuario || "Desconocido"}</td>
                  <td className="py-2 px-4">{song.album || "Desconocido"}</td>
                  <td className="py-2 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el clic inicie la reproducción
                        handleOpenModal(song.id);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                    >
                      <FaPlus size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No hay canciones disponibles para este género.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-xl font-bold mb-4">
              {modalMessage || "Selecciona una Playlist"}
            </h3>
            {modalMessage ? (
              <button
                onClick={closeModal}
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
              >
                Cerrar
              </button>
            ) : (
              <>
                <select
                  className="mb-4 p-2 border rounded w-full"
                  value={selectedPlaylist || ""}
                  onChange={(e) => setSelectedPlaylist(Number(e.target.value))}
                >
                  <option value="">Selecciona una Playlist</option>
                  {playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddToPlaylist}
                  className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 w-full"
                >
                  Confirmar
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 w-full mt-2"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSongs;
