import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePlayer } from "../contexts/PlayerContext";
import { FaPlay, FaRandom, FaPlus } from "react-icons/fa";

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [songToAdd, setSongToAdd] = useState(null);
  const { playTrackList, playTrack } = usePlayer();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.value?.id;

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/album/${albumId}`
        );
        setAlbum(response.data);
        setSongs(response.data.cancion || []);
      } catch (error) {
        console.error("Error al obtener los detalles del álbum:", error);
      }
    };
    fetchAlbumDetails();
  }, [albumId]);

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

  const handleOpenModal = (songId) => {
    setSongToAdd(songId);
    setShowModal(true);
    fetchUserPlaylists();
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
          cancionId: songToAdd,
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

  const handlePlayAlbum = () => {
    if (songs.length > 0) {
      playTrackList(songs, 0);
    }
  };

  const handleShufflePlay = () => {
    if (songs.length > 0) {
      const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
      playTrackList(shuffledSongs, 0);
    }
  };

  if (!album || songs.length === 0) {
    return <p className="text-gray-400">Cargando álbum...</p>;
  }

  return (
    <div className="album-detail-container max-w-5xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <img
          src={album.portada_url || "/img/default-cover.jpg"}
          alt={album.title}
          className="w-40 h-40 object-cover rounded-lg mr-6"
        />
        <div>
          <h2 className="text-4xl font-bold text-green-500">{album.title}</h2>
          <p className="text-gray-500 mt-1">{songs.length} canciones</p>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handlePlayAlbum}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
            >
              <FaPlay className="mr-2" />
              Reproducir
            </button>
            <button
              onClick={handleShufflePlay}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
            >
              <FaRandom className="mr-2" />
              Aleatorio
            </button>
          </div>
        </div>
      </div>

      <table className="w-full text-left text-gray-300">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4">Título</th>
            <th className="py-2 px-4">Artista</th>
            <th className="py-2 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              className="hover:bg-gray-800 cursor-pointer"
              onClick={() => playTrack(song, index, songs)} // Reproduce la canción al hacer clic en la fila
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4 font-semibold text-white">
                <img
                  className="w-12 rounded-md h-12"
                  src={song.portada_url}
                  alt=""
                />
              </td>
              <td className="py-2 px-4 font-semibold text-white">
                {song.title || "Sin título"}
              </td>
              <td className="py-2 px-4">
                {song.usuario?.nombre || "Artista desconocido"}
              </td>
              <td className="py-2 px-4 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(song.id);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                >
                  <FaPlus size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default AlbumDetail;
