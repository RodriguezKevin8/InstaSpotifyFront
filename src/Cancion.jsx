// src/SongForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "./SongForm.css";

const Cancion = () => {
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [genres, setGenres] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader

  // Obtener el usuario_id del localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const artistId = user?.value?.id;

  // Cargar géneros y álbumes al cargar el componente
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:3000/genero");
        setGenres(response.data);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };

    const fetchAlbums = async () => {
      if (artistId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/album/usuario/${artistId}`
          );
          setAlbums(response.data);
        } catch (error) {
          console.error("Error al obtener álbumes:", error);
        }
      }
    };

    fetchGenres();
    fetchAlbums();
  }, [artistId]);

  const handleFileChange = (e) => {
    if (e.target.name === "songFile") {
      setSongFile(e.target.files[0]);
    } else if (e.target.name === "coverImage") {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Inicia el loader

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre_id", genreId);
    formData.append("album_id", albumId);
    formData.append("artist_id", artistId);
    formData.append("file_url", songFile);
    formData.append("portada_url", coverImage);

    try {
      const response = await axios.post(
        "http://localhost:3000/cancion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Canción creada:", response.data);
      alert("Canción subida con éxito");
    } catch (error) {
      console.error("Error al subir la canción:", error);
      alert("Error al subir la canción");
    } finally {
      setIsLoading(false); // Detiene el loader
    }
  };

  return (
    <div className="song-form-container">
      <h2>Subir Canción</h2>
      {isLoading ? ( // Mostrar el loader si está cargando
        <div className="loader">Subiendo canción...</div>
      ) : (
        <form onSubmit={handleSubmit} className="song-form">
          <label htmlFor="title">Título de la canción</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="genreId">Género</label>
          <select
            id="genreId"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            required
          >
            <option value="">Selecciona un género</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.nombre}
              </option>
            ))}
          </select>

          <label htmlFor="albumId">Álbum</label>
          <select
            id="albumId"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          >
            <option value="">Selecciona un álbum</option>
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>

          <label htmlFor="songFile">Archivo de la canción</label>
          <input
            type="file"
            id="songFile"
            name="songFile"
            accept="audio/*"
            onChange={handleFileChange}
            required
          />

          <label htmlFor="coverImage">Portada de la canción</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button type="submit" className="submit-button">
            Subir Canción
          </button>
        </form>
      )}
    </div>
  );
};

export default Cancion;
