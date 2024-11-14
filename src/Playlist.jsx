// src/PlaylistView.jsx

import "./Playlist.css";
import { Link } from "react-router-dom";

const Playlist = () => {
  return (
    <div className="playlist-view">
      <div className="sidebar">
        <h2>
          <Link to="/" className="logo">
            SPOTIGRAM
          </Link>{" "}
          {/* Enlace al Home Feed */}
        </h2>
        <ul>
          <Link to="/search" className="icon-button">
            <img
              src="/icons/SearchIcon.svg"
              alt="Search Icon"
              className="search-icon"
            />
            <span className="icon-text">Buscar</span>
          </Link>
          <Link to="/explore" className="icon-button">
            <img
              src="/icons/ExploreIcon.svg"
              alt="Explore Icon"
              className="search-icon"
            />
            <span className="icon-text">Explorar</span>
          </Link>
          <Link to="/notifications" className="icon-button">
            <img
              src="/icons/NotificationsIcon.svg"
              alt="Notifications Icon"
              className="search-icon"
            />
            <span className="icon-text">Notificaciones</span>
          </Link>
          <Link to="/music" className="icon-button">
            <img
              src="/icons/MusicIcon.svg"
              alt="Music Icon"
              className="search-icon"
            />
            <span className="icon-text">Mi Música</span>
          </Link>
          <Link to="/profile" className="icon-button profile-button">
            <img
              src="/icons/UserIcon.svg"
              alt="Profile Icon"
              className="search-icon"
            />
            <span className="icon-text">Mi Perfil</span>
          </Link>
        </ul>
      </div>

      <div className="playlist-header">
        <img
          src="/img/Portada1.jpeg"
          alt="Playlist Cover"
          className="playlist-cover"
        />
        <div className="playlist-info">
          <h2 className="playlist-title">Mix diario 1</h2>
          <p className="playlist-description">
            Mora, Eladio Carrion, Dei V y más
          </p>
          <p className="playlist-details">
            Hecho para Gabriel - 50 canciones, 2 h 51 min
          </p>
          <div className="playlist-actions">
            <button>
              <img
                src="/icons/Play.svg"
                alt="Play"
                className="PlaylistButtons"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Encabezados de la lista de canciones */}
      <div className="track-list-header">
        <span>#</span>
        <span>Título</span>
        <span>Artista</span>
        <span>Álbum</span>
        <span>Duración</span>
      </div>

      {/* Lista de canciones */}
      <div className="track-list">
        <div className="track">
          <span className="track-number">1</span>
          <span className="track-title">RÁPIDO</span>
          <span className="track-artist">Mora</span>
          <span className="track-album">RÁPIDO</span>
          <span className="track-duration">3:03</span>
        </div>
        <div className="track">
          <span className="track-number">2</span>
          <span className="track-title">Hola Como Vas</span>
          <span className="track-artist">Eladio Carrion</span>
          <span className="track-album">Sauce Boyz 2</span>
          <span className="track-duration">3:19</span>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
