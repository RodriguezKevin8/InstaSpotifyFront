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
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const artistId = user?.value?.id;

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
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-green-500 p-6">
      <h2 className="text-4xl font-bold mb-8">Subir Canción</h2>
      {isLoading ? (
        <div className="loader mb-6">Subiendo canción...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
        >
          <div>
            <label htmlFor="title" className="block text-lg font-semibold mb-2">
              Título de la canción
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="genreId" className="block text-lg font-semibold mb-2">
              Género
            </label>
            <select
              id="genreId"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Selecciona un género</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="albumId" className="block text-lg font-semibold mb-2">
              Álbum
            </label>
            <select
              id="albumId"
              value={albumId}
              onChange={(e) => setAlbumId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecciona un álbum</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="songFile" className="block text-lg font-semibold mb-2">
              Archivo de la canción
            </label>
            <input
              type="file"
              id="songFile"
              name="songFile"
              accept="audio/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-gray-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-lg font-semibold mb-2">
              Portada de la canción
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-gray-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition duration-200"
          >
            Subir Canción
          </button>
        </form>
      )}
    </div>
  );
};

export default Cancion;
