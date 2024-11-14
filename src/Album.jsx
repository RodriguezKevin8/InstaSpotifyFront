// src/AlbumForm.jsx
import { useState } from "react";
import axios from "axios";
import "./AlbumForm.css";

const Album = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);

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
      alert("Álbum subido con éxito");
    } catch (error) {
      console.error("Error al subir el álbum:", error);
      alert("Error al subir el álbum");
    }
  };

  return (
    <div className="album-form-container">
      <h2>Crear Álbum</h2>
      <form onSubmit={handleSubmit} className="album-form">
        <label htmlFor="title">Título del álbum</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="coverImage">Portada del álbum</label>
        <input
          type="file"
          id="coverImage"
          name="coverImage"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="submit-button">
          Crear Álbum
        </button>
      </form>
    </div>
  );
};

export default Album;
