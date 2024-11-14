// Profile.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [formData, setFormData] = useState({
    bio: "",
    birth_date: "",
    avatar: null,
  });
  const [activeTab, setActiveTab] = useState("publicaciones");
  const navigate = useNavigate();

  useEffect(() => {
    const userResponse = JSON.parse(localStorage.getItem("user"));
    const userId = userResponse?.value?.id;

    if (userId) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/perfil/${userId}`
          );
          if (response.data.perfil) {
            setProfileData(response.data);
          }
        } catch (error) {
          console.error("Error al obtener el perfil:", error);
        }
      };

      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/publicacion/usuario/${userId}`
          );
          setUserPosts(response.data);
        } catch (error) {
          console.error("Error al obtener las publicaciones:", error);
        }
      };

      fetchProfile();
      fetchUserPosts();
    }
  }, []);

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  return (
    <div className="flex flex-col items-center p-8 w-full">
      {profileData ? (
        <div className="flex flex-col items-center text-center space-y-4 w-full max-w-2xl">
          {/* Imagen de Perfil */}
          <img
            src={profileData.perfil.avatar_url || "/img/default-avatar.jpg"}
            alt="Profile"
            className="h-32 w-32 rounded-full mb-2"
          />

          {/* Nombre de Usuario */}
          <h2 className="text-3xl font-bold text-green-500">
            {profileData.username || "Usuario"}
          </h2>

          {/* Estadísticas */}
          <div className="flex justify-center gap-8 text-gray-400">
            <span>
              <strong>{userPosts.length}</strong> Publicaciones
            </span>
            <span>
              <strong>23 M</strong> Seguidores
            </span>
            <span>
              <strong>30</strong> Seguidos
            </span>
          </div>

          {/* Biografía */}
          <p className="text-gray-400">
            {profileData.perfil.bio || "El chico de las poesías"}
          </p>

          {/* Botones de Acción */}
          <div className="flex gap-4 mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Editar Perfil
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => navigate("/create-post")}
            >
              Crear Publicación
            </button>
          </div>

          {/* Pestañas */}
          <div className="flex justify-center mt-6 gap-8 border-b border-gray-500 w-full">
            <button
              onClick={() => setActiveTab("publicaciones")}
              className={`px-4 py-2 ${
                activeTab === "publicaciones"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400"
              }`}
            >
              Publicaciones
            </button>
            <button
              onClick={() => setActiveTab("guardados")}
              className={`px-4 py-2 ${
                activeTab === "guardados"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400"
              }`}
            >
              Guardados
            </button>
          </div>

          {/* Contenido de la Pestaña Activa */}
          <div className="mt-8 w-full">
            {activeTab === "publicaciones" ? (
              <div className="grid grid-cols-3 gap-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="relative w-full h-40 bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <img
                      src={post.content_url || "/img/default-image.jpg"}
                      alt="Post"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 text-center">
                No hay publicaciones guardadas
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400">Cargando perfil...</div>
      )}
    </div>
  );
};

export default Profile;
