// src/MyMusic.jsx

import "./MyMusic.css";
import { Link, useNavigate } from "react-router-dom";

const MyMusic = () => {
  const navigate = useNavigate();

  return (
    <div className="my-music">
      <div className="sidebar">
        <h2>
          <Link to="/" className="logo">
            SPOTIGRAM
          </Link>
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

      {/* Botón para crear nueva playlist */}
      <div className="create-playlist-container">
        <button
          onClick={() => navigate("/create-playlist")}
          className="create-playlist-button"
        >
          Crear Nueva Playlist
        </button>
      </div>

      {/* Sección de Música */}
      <h2 className="Saludo-Musica">Creado para Gabriel</h2>
      <div className="music-grid">
        <Link to="/playlist" className="music-item">
          <img src="/img/Portada1.jpeg" alt="Mix diario 1" />
          <div className="music-info">
            <h3>Mix diario 1</h3>
            <p>Anuel AA, Bad Bunny, JHAYCO y más</p>
          </div>
          <button className="play-button">
            <img src="/icons/Play.svg" alt="Play" className="play-icon" />
          </button>
        </Link>

        <Link to="/playlist" className="music-item">
          <img src="/img/portada5.jpg" alt="Mix diario 2" />
          <div className="music-info">
            <h3>Mix diario 2</h3>
            <p>Eladio Carrion, Dei V, Bizarrap y más</p>
          </div>
          <button className="play-button">
            <img src="/icons/Play.svg" alt="Play" className="play-icon" />
          </button>
        </Link>

        <Link to="/playlist" className="music-item">
          <img src="/img/portada3.jpg" alt="Mix diario 4" />
          <div className="music-info">
            <h3>Mix diario 4</h3>
            <p>Myke Towers, Jhayco, y más</p>
          </div>
          <button className="play-button">
            <img src="/icons/Play.svg" alt="Play" className="play-icon" />
          </button>
        </Link>

        <Link to="/playlist" className="music-item">
          <img src="/img/portada4.jpeg" alt="Mix diario 5" />
          <div className="music-info">
            <h3>Mix diario 5</h3>
            <p>Duki, CRO, Khea, YSY A y más</p>
          </div>
          <button className="play-button">
            <img src="/icons/Play.svg" alt="Play" className="play-icon" />
          </button>
        </Link>

        <Link to="/playlist" className="music-item">
          <img src="/img/portada2.jpg" alt="Mix diario 6" />
          <div className="music-info">
            <h3>Mix diario 6</h3>
            <p>Metro Boomin, Post Malone, Travis Scott y más</p>
          </div>
          <button className="play-button">
            <img src="/icons/Play.svg" alt="Play" className="play-icon" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyMusic;
