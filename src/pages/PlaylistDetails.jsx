// src/PlaylistDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePlayer } from "../contexts/PlayerContext";
import { FaPlay, FaRandom } from "react-icons/fa";

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const { playTrackList, playTrack } = usePlayer();

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/playlist/${playlistId}/details`
        );
        console.log("Datos de la playlist:", response.data);

        setPlaylist(response.data);
        setSongs(response.data.playlistcancion.map((pc) => pc.cancion));
      } catch (error) {
        console.error("Error al obtener los detalles de la playlist:", error);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  if (!playlist || songs.length === 0) {
    return <p className="text-gray-400">Cargando playlist...</p>;
  }

  const handlePlayPlaylist = () => {
    if (songs.length > 0) {
      playTrackList(songs, 0);
    }
  };

  const handleShufflePlay = () => {
    if (songs.length > 0) {
      // Mezclar canciones
      const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
      playTrackList(shuffledSongs, 0); // Reproducir lista mezclada desde el inicio
    }
  };

  return (
    <div className="all-songs-container max-w-5xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <img
          src={playlist?.portada_url || "/img/default-cover.jpg"}
          alt={playlist?.name || "Playlist"}
          className="w-40 h-40 object-cover rounded-lg mr-6"
        />
        <div>
          <h2 className="text-4xl font-bold text-green-500">
            {playlist?.name}
          </h2>
          <p className="text-gray-500 mt-1">{songs.length} canciones</p>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handlePlayPlaylist}
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
            <th className="py-2 px-4">Álbum</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              className="hover:bg-gray-800 cursor-pointer"
              onClick={() => playTrack(song, index, songs)}
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
              <td className="py-2 px-4">
                {song.album?.title || "Álbum desconocido"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistDetail;
