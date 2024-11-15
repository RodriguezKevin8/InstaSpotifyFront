// src/contexts/PlayerContext.jsx
import { createContext, useState, useContext, useRef, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackList, setTrackList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [originalTrackList, setOriginalTrackList] = useState([]); // Guardar la lista original para el modo aleatorio

  const audioRef = useRef(new Audio());

  // Función para mezclar un array usando el algoritmo de Fisher-Yates
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Alternar el modo aleatorio
  const toggleShuffle = () => {
    setIsShuffled((prev) => !prev);
    if (!isShuffled) {
      setOriginalTrackList(trackList); // Guarda la lista original
      setTrackList(shuffleArray(trackList)); // Mezcla la lista
      setCurrentIndex(0); // Comienza desde el principio en el modo aleatorio
    } else {
      setTrackList(originalTrackList); // Restaura la lista original
      setCurrentIndex(0);
    }
  };

  // Función para cargar y reproducir una lista de canciones
  const playTrackList = (tracks, startIndex = 0) => {
    setTrackList(tracks);
    setOriginalTrackList(tracks); // Guarda la lista original para el modo aleatorio
    setCurrentIndex(startIndex);
    playTrack(tracks[startIndex], startIndex, tracks);
  };

  // Función para cargar y reproducir una canción específica
  const playTrack = (track, index, tracks) => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setTrackList(tracks || []);
    setCurrentIndex(index);
    setCurrentTrack(track);

    audioRef.current.src = track.file_url; // Asegurarse de que file_url es correcto
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
      setCurrentTime(0);
    };
  };

  // Función para pausar la canción actual
  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // Función para reanudar la canción actual
  const resumeTrack = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  // Función para adelantar 10 segundos
  const skipForward = () => {
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 10,
      audioRef.current.duration
    );
    setCurrentTime(audioRef.current.currentTime);
  };

  // Función para retroceder 10 segundos
  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 10,
      0
    );
    setCurrentTime(audioRef.current.currentTime);
  };

  // Función para reproducir la siguiente canción en la lista
  const nextTrack = () => {
    if (trackList.length > 0) {
      const nextIndex = (currentIndex + 1) % trackList.length;
      playTrack(trackList[nextIndex], nextIndex, trackList);
    }
  };

  // Función para reproducir la canción anterior en la lista
  const previousTrack = () => {
    if (trackList.length > 0) {
      const prevIndex =
        (currentIndex - 1 + trackList.length) % trackList.length;
      playTrack(trackList[prevIndex], prevIndex, trackList);
    }
  };

  // Actualizar el tiempo actual cuando se reproduce
  useEffect(() => {
    const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        playTrack,
        playTrackList,
        pauseTrack,
        resumeTrack,
        skipForward,
        skipBackward,
        nextTrack,
        previousTrack,
        toggleShuffle,
        isShuffled,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export default PlayerContext;
