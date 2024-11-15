// src/AlbumForm.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AlbumForm.css";

const Album = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const navigate = useNavigate();

  // Obtener el usuario_id del localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const artistId = user?.value?.id;

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist_id", artistId);
    formData.append("portada_url", coverImage);

    try {
      const response = await axios.post(
        "http://localhost:3000/album",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Álbum creado:", response.data);
      setModalMessage("Álbum subido con éxito");
      setShowModal(true);

      // Navegar a la página de canciones después de un breve retraso
      setTimeout(() => {
        setShowModal(false);
        navigate("/add-canciones");
      }, 2000);
    } catch (error) {
      console.error("Error al subir el álbum:", error);
      setModalMessage("Error al subir el álbum");
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-green-500 p-6">
      <h2 className="text-4xl font-bold mb-8">Crear Álbum</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
      >
        <div>
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Título del álbum
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-green-500"
            required
          />
        </div>

        <div>
          <label htmlFor="coverImage" className="block text-lg font-semibold mb-2">
            Portada del álbum
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:outline-none text-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Crear Álbum
        </button>
      </form>

      {/* Modal de notificación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-800 text-green-500 p-6 rounded-lg shadow-lg w-80 text-center">
            <p>{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
