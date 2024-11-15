// src/components/Player.jsx
import React from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { usePlayer } from "../contexts/PlayerContext";

const Player = () => {
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    playTrack,
    pauseTrack,
    resumeTrack,
    skipForward,
    skipBackward,
    nextTrack,
    previousTrack,
  } = usePlayer();

  const togglePlayPause = () => {
    isPlaying ? pauseTrack() : resumeTrack();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  console.log(currentTrack);

  return (
    <div className="bg-gray-800 text-green-500 flex items-center justify-between p-4 w-full">
      <div className="flex items-center">
        <img
          src={currentTrack?.portada_url || "https://via.placeholder.com/50"}
          alt="Album Cover"
          className="w-12 h-12 mr-4"
        />
        <div>
          <p className="font-semibold">{currentTrack?.title || "Título"}</p>
          <p className="text-sm text-gray-400">
            {currentTrack?.usuario
              ? typeof currentTrack.usuario === "string"
                ? currentTrack.usuario
                : currentTrack.usuario.nombre || "Artista desconocido"
              : "Artista desconocido"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={previousTrack} className="hover:text-green-300">
          <FaStepBackward size={20} />
        </button>
        <button onClick={skipBackward} className="hover:text-green-300">
          -10s
        </button>
        <button onClick={togglePlayPause} className="hover:text-green-300">
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={skipForward} className="hover:text-green-300">
          +10s
        </button>
        <button onClick={nextTrack} className="hover:text-green-300">
          <FaStepForward size={20} />
        </button>
      </div>

      <div className="flex items-center w-1/3">
        <span className="text-xs text-gray-400 mr-2">
          {formatTime(currentTime)}
        </span>
        <div className="w-full bg-gray-700 h-1 rounded relative">
          <div
            className="bg-green-500 h-1 rounded absolute"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-400 ml-2">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default Player;
