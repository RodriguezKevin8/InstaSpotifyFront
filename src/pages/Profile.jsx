// Profile.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("publicaciones");
  const [seguimientoData, setSeguimientoData] = useState({
    seguidos: 0,
    seguidores: 0,
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [formData, setFormData] = useState({
    bio: "",
    avatar: null,
    birth_date: "",
  });
  const [reload, setReload] = useState(false);
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
            setFormData({
              bio: response.data.perfil.bio || "",
              avatar: null,
              birth_date: response.data.perfil.birth_date || "",
            });

            console.log("Perfil:", response.data);
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
          console.log("Publicaciones:", response.data);
        } catch (error) {
          console.error("Error al obtener las publicaciones:", error);
        }
      };
      const fetchSeguimientoData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/seguimiento/${userId}`
          );
          setSeguimientoData(response.data);
        } catch (error) {
          console.error("Error al obtener datos de seguimiento:", error);
        }
      };

      fetchProfile();
      fetchUserPosts();
      fetchSeguimientoData();
    }
  }, [reload]);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    setLikedPosts(post.megusta.map((like) => like.user_id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setCommentText("");
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({
      bio: profileData?.perfil?.bio || "",
      avatar: null,
      birth_date: profileData?.perfil?.birth_date || "",
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const userResponse = JSON.parse(localStorage.getItem("user"));
    const userId = userResponse?.value?.id;

    if (!userId || !selectedPost) return;

    try {
      const newComment = {
        texto: commentText,
        usuario_id: userId,
        publicacion_id: selectedPost.id,
      };

      const response = await axios.post(
        "http://localhost:3000/comentario/",
        newComment
      );

      setSelectedPost((prev) => ({
        ...prev,
        comentario: [...prev.comentario, response.data],
      }));

      setCommentText("");
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleLike = async () => {
    const userResponse = JSON.parse(localStorage.getItem("user"));
    const userId = userResponse?.value?.id;

    if (!userId || !selectedPost) return;
    if (likedPosts.includes(userId)) {
      console.log("Ya has dado 'Me gusta' a esta publicación");
      return;
    }

    const likeData = {
      user_id: userId,
      publicacion_id: selectedPost.id,
      cancion_id: null,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/megusta/",
        likeData
      );

      setSelectedPost((prev) => ({
        ...prev,
        megusta: [...prev.megusta, { user_id: userId, id: response.data.id }],
      }));

      setLikedPosts((prev) => [...prev, userId]);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al dar 'Me gusta':", error);
    }
  };

  const handleUnlike = async () => {
    const userResponse = JSON.parse(localStorage.getItem("user"));
    const userId = userResponse?.value?.id;

    if (!userId || !selectedPost) return;

    const like = selectedPost.megusta.find((like) => like.user_id === userId);

    if (!like) return;

    try {
      await axios.delete(`http://localhost:3000/megusta/${like.id}`);
      setSelectedPost((prev) => ({
        ...prev,
        megusta: prev.megusta.filter((like) => like.user_id !== userId),
      }));

      setLikedPosts((prev) => prev.filter((id) => id !== userId));
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar 'Me gusta':", error);
    }
  };

  const isLikedByUser = likedPosts.includes(
    JSON.parse(localStorage.getItem("user")).value.id
  );

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const userResponse = JSON.parse(localStorage.getItem("user"));
    const userId = userResponse?.value?.id;

    if (!userId) return;

    const editData = new FormData();
    editData.append("bio", formData.bio);
    editData.append("birth_date", formData.birth_date);
    if (formData.avatar) {
      editData.append("avatar_url", formData.avatar);
    }

    try {
      await axios.put(`http://localhost:3000/perfil/${userId}`, editData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      closeEditModal();
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 w-full">
      {profileData ? (
        <div className="flex flex-col items-center text-center space-y-4 w-full max-w-2xl">
          <img
            src={profileData.perfil.avatar_url || "/img/default-avatar.jpg"}
            alt="Profile"
            className="h-32 w-32 rounded-full mb-2"
          />

          <h2 className="text-3xl font-bold text-green-500">
            {profileData.username || "Usuario"}
          </h2>

          <div className="flex justify-center gap-8 text-gray-400">
            <span>
              <strong>{userPosts.length}</strong> Publicaciones
            </span>
            <span>
              <strong>{seguimientoData.seguidores}</strong> Seguidores
            </span>
            <span>
              <strong>{seguimientoData.seguidos}</strong> Seguidos
            </span>
          </div>

          <p className="text-gray-400">
            {profileData.perfil.bio || "El chico de las poesías"}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={openEditModal}
            >
              Editar Perfil
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => navigate("/create-post")}
            >
              Crear Publicación
            </button>
          </div>

          {/* Modal de edición de perfil */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Editar Perfil
                </h2>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="bio"
                    placeholder="Biografía"
                    value={formData.bio}
                    onChange={handleEditChange}
                    className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  />
                  <input
                    type="date"
                    name="birth_date"
                    placeholder="Fecha de nacimiento"
                    value={formData.birth_date}
                    onChange={handleEditChange}
                    className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  />
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleAvatarChange}
                    className="w-full text-white"
                  />
                  <button
                    type="submit"
                    className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={closeEditModal}
                    className="w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-2"
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Contenido de publicaciones */}
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
          </div>

          <div className="mt-8 w-full">
            {activeTab === "publicaciones" ? (
              <div className="grid grid-cols-3 gap-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="relative w-full h-40 bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => openModal(post)}
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

      {/* Modal de publicación y comentarios */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg max-w-lg w-full overflow-hidden">
            <button
              className="text-white absolute top-4 right-4"
              onClick={closeModal}
            >
              ✖
            </button>
            <div className="p-4">
              <img
                src={selectedPost.content_url}
                alt="Post"
                className="w-full max-h-64 object-cover mb-4 rounded-lg"
              />
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={isLikedByUser ? handleUnlike : handleLike}
                  className="text-2xl"
                >
                  {isLikedByUser ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
                <span className="text-gray-400 ml-2">
                  {selectedPost.megusta.length} Me gusta
                </span>
                <FaComment className="text-gray-400 ml-4 text-xl" />
              </div>
              <h3 className="text-lg text-white mb-2">Comentarios</h3>
              <div className="max-h-40 overflow-y-auto text-gray-300 space-y-2 mb-4">
                {selectedPost.comentario.length > 0 ? (
                  selectedPost.comentario.map((comment) => (
                    <p key={comment.id} className="mb-2">
                      <strong>Usuario {comment.usuario_id}:</strong>{" "}
                      {comment.texto}
                    </p>
                  ))
                ) : (
                  <p>No hay comentarios en esta publicación.</p>
                )}
              </div>
              <form
                onSubmit={handleCommentSubmit}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Agregar un comentario..."
                  className="flex-grow p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
