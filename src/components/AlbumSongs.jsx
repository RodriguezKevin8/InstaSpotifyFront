// src/AlbumSongs.jsx
import React from "react";
import { FaPlay } from "react-icons/fa";
import { usePlayer } from "../contexts/PlayerContext";

const AlbumSongs = ({ songs, albumTitle }) => {
  const { playTrackList } = usePlayer();

  const handlePlayAlbum = () => {
    if (songs.length > 0) {
      playTrackList(songs, 0);
    }
  };

  return (
    <div className="album-songs mt-8">
      <div className="flex items-center mb-6">
        <h3 className="text-3xl font-bold text-white mr-6">
          {albumTitle || "Álbum"}
        </h3>
        <button
          onClick={handlePlayAlbum}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 flex items-center"
        >
          <FaPlay className="mr-2" />
          Reproducir Álbum
        </button>
      </div>

      <table className="w-full text-left text-gray-300">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Título</th>
            <th className="py-2 px-4">Duración</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              className="hover:bg-gray-800 cursor-pointer"
              onClick={() => playTrackList(songs, index)}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4 font-semibold text-white">
                {song.title || "Sin título"}
              </td>
              <td className="py-2 px-4">{song.duration || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumSongs;
