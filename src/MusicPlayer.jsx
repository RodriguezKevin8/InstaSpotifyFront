// src/MusicPlayer.jsx
import './MusicPlayer.css';

const MusicPlayer = () => {
  return (
    <div className="music-player">
      {/* Información de la canción */}
      <div className="song-info">
        <img src="/img/ameri.jpeg" alt="Album Cover" className="album-cover" />
        <div className="song-details">
          <h3 className="song-title">Leitmotiv</h3>
          <p className="song-artist">Duki</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="progress-bar">
        <span className="current-time">0:00</span>
        <input type="range" min="0" max="100" className="progress-slider" />
        <span className="total-time">1:25</span>
      </div>

      {/* Controles de reproducción */}
      <div className="player-controls">
        <button className="control-button">
          <img src="/icons/Previ.svg" alt="Previous" className="control-icon" />
        </button>
        <button className="control-button">
          <img src="/icons/Play.svg" alt="Play" className="control-icon" />
        </button>
        <button className="control-button">
          <img src="/icons/Next.svg" alt="Next" className="control-icon" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
