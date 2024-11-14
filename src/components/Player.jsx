import  { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(225);
  const progressRef = useRef(null);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime < duration) {
            return prevTime + 1;
          } else {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
        });
      }, 1000);
    } else if (!isPlaying && currentTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-zinc-900 text-green-500 flex items-center justify-between p-4 w-full font-oswald">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/50"
          alt="Album Cover"
          className="w-12 h-12 mr-4"
        />
        <div>
          <p className="font-semibold text-2xl">Romeo Santos</p>
          <p className="text-lg text-gray-300">Odio</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="hover:text-green-300">
          <FaStepBackward size={20} />
        </button>
        <button onClick={togglePlayPause} className="hover:text-green-300">
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button className="hover:text-green-300">
          <FaStepForward size={20} />
        </button>
      </div>

      <div className="flex items-center w-1/3">
        <span className="text-lg text-gray-300 mr-2">
          {formatTime(currentTime)}
        </span>
        <div className="w-full bg-gray-700 h-1 rounded relative">
          <div
            ref={progressRef}
            className="bg-green-500 h-1 rounded absolute"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <span className="text-lg text-gray-300 ml-2">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default Player;
