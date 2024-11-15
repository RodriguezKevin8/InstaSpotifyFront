// src/GenreList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:3000/genero/");
        setGenres(response.data);
      } catch (error) {
        console.error("Error al obtener los géneros:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    navigate(`/songs/${genreId}`);
  };

  return (
    <div className="genre-list grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {genres.map((genre) => (
        <div
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
          className="genre-card bg-gray-800 text-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all"
        >
          <img
            src={genre.portada_url || "/img/default-genre.jpg"} // Asumiendo que cada género tiene una imagen o usa una predeterminada
            alt={genre.nombre}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{genre.nombre}</h3>
            <p className="text-sm text-gray-300">
              Explora las canciones de {genre.nombre}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenreList;
