// src/CreatePlaylist.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  // Obtener el userId desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.value?.id;

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setModalMessage("No se ha encontrado el ID del usuario. Inicia sesión nuevamente.");
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", playlistName);
    formData.append("user_id", userId);
    formData.append("portada_url", coverImage);

    try {
      const response = await axios.post(
        "http://localhost:3000/playlist",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Playlist creada:", response.data);
      setModalMessage("Playlist creada con éxito");
      setShowModal(true);

      // Navegar de vuelta a la vista de playlist después de un breve retraso
      setTimeout(() => {
        setShowModal(false);
        navigate("/my-music");
      }, 2000);
    } catch (error) {
      console.error("Error al crear la playlist:", error);
      setModalMessage("Error al crear la playlist");
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-green-500 p-6">
      <h2 className="text-5xl font-bold mb-6">Crear Nueva Playlist</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <div>
          <label
            htmlFor="playlistName"
            className="block mb-2 text-lg font-semibold"
          >
            Nombre de la Playlist
          </label>
          <input
            type="text"
            id="playlistName"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="coverImage"
            className="block mb-2 text-lg font-semibold"
          >
            Portada de la Playlist
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 bg-zinc-700 rounded focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600 transition duration-200"
        >
          Crear
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

export default CreatePlaylist;
