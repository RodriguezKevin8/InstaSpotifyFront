// src/CreatePost.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener usuario_id del localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const usuarioId = user?.value?.id;

    if (!usuarioId) {
      alert("Usuario no identificado");
      return;
    }

    // Crear un FormData para enviar la imagen y descripción
    const formData = new FormData();
    formData.append("content_url", image);
    formData.append("descripcion", description);
    formData.append("user_id", usuarioId);

    try {
      // Hacer la solicitud POST a la API de creación de publicación
      const response = await axios.post(
        "http://localhost:3000/publicacion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Publicación creada:", response.data);
      navigate("/profile"); // Navegar de regreso al perfil después de crear la publicación
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      alert("Hubo un error al crear la publicación.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-500 mb-6">
          Crear Publicación
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="image-upload"
            className="block text-sm font-medium text-gray-300"
          >
            Selecciona una imagen
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Vista previa"
              className="w-full h-64 object-cover rounded-lg mt-4"
            />
          )}

          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mt-4"
          >
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribe una descripción..."
            required
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full p-3 mt-4 rounded bg-green-500 text-black hover:bg-green-600 font-semibold transition duration-200"
          >
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
