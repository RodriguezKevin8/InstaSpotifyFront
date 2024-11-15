// src/components/RandomAnuncios.jsx
import { useState, useEffect } from "react";
import axios from "axios";

// Mapeo de descripciones a imágenes
const anunciosImagenes = {
  "Descuento exclusivo en productos Nike": "/img/nike.jpg",
  "Prueba gratis de Netflix Premium por 1 mes": "/img/netflix.webp",
  "Descubre los nuevos iPhones en Apple Store": "/img/apple.png",
  "Rebajas en ropa Adidas: hasta un 50% de descuento": "/img/adidas.jpeg",
  "Ofertas exclusivas en Amazon Prime Video": "/img/amazon.png",
};

const RandomAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnuncio, setSelectedAnuncio] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Función para obtener anuncios aleatorios
  const fetchRandomAnuncios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/anuncio/random");
      setAnuncios(response.data);
    } catch (err) {
      console.error("Error al obtener anuncios aleatorios:", err);
      setError("No se pudieron cargar los anuncios.");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la interacción con el anuncio
  const handleAnuncioClick = async (anuncio) => {
    setSelectedAnuncio(anuncio);
    setShowModal(true);

    try {
      await axios.post(
        `http://localhost:3000/anuncio/${anuncio.id}/interaccion`,
        {
          monto: 0.5, // Valor fijo de la ganancia por interacción
        }
      );
      console.log(
        "Interacción registrada correctamente con el anuncio ID:",
        anuncio.id
      );
    } catch (error) {
      console.error("Error al registrar la interacción:", error);
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedAnuncio(null);
  };

  // Llamar a la función cuando se monta el componente
  useEffect(() => {
    fetchRandomAnuncios();
  }, []);

  if (loading) return <p>Cargando anuncios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (anuncios.length === 0) return <p>No hay anuncios disponibles.</p>;

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-500 mb-4">Anuncios</h2>

      <ul className="text-gray-300 space-y-4">
        {anuncios.map((anuncio) => (
          <li
            key={anuncio.id}
            className="border-b border-gray-700 pb-4 cursor-pointer flex items-center space-x-4"
            onClick={() => handleAnuncioClick(anuncio)}
          >
            <img
              src={anunciosImagenes[anuncio.descripcion]}
              alt={anuncio.descripcion}
              className="w-16 h-16 object-cover rounded-md"
            />
            <p>
              <strong>Descripción:</strong> {anuncio.descripcion}
            </p>
          </li>
        ))}
      </ul>

      {showModal && selectedAnuncio && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-green-700 p-8 rounded-lg max-w-md mx-auto shadow-lg text-white transform scale-90 sm:scale-100">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-lg font-bold hover:text-gray-300"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={anunciosImagenes[selectedAnuncio.descripcion]}
                alt={selectedAnuncio.descripcion}
                className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-white"
              />
              <p className="text-center italic text-xl font-semibold mb-4">
                "{selectedAnuncio.descripcion}"
              </p>
              <p className="text-center text-sm">Patrocinado</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomAnuncios;
