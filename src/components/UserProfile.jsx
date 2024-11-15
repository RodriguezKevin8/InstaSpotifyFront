import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const UserProfile = () => {
  const { userId } = useParams();
  const currentUserId = JSON.parse(localStorage.getItem("user")).value.id;
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [seguimientoData, setSeguimientoData] = useState({
    seguidos: 0,
    seguidores: 0,
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
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

      const checkIfFollowing = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/seguimiento/check/${currentUserId}/${userId}`
          );
          setIsFollowing(response.data.isFollowing);
        } catch (error) {
          console.error("Error al verificar el seguimiento:", error);
        }
      };

      fetchProfile();
      fetchUserPosts();
      fetchSeguimientoData();
      checkIfFollowing();
    }
  }, [userId, reload]);

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/seguimiento/create",
        {
          follower_id: parseInt(currentUserId),
          followed_id: parseInt(userId),
        }
      );
      setIsFollowing(true);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al seguir usuario:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete("http://localhost:3000/seguimiento/delete", {
        data: {
          follower_id: parseInt(currentUserId),
          followed_id: parseInt(userId),
        },
      });
      setIsFollowing(false);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error);
    }
  };

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await handleUnfollow();
    } else {
      await handleFollow();
    }
  };

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPost) return;

    try {
      const newComment = {
        texto: commentText,
        usuario_id: currentUserId,
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
    if (!selectedPost) return;
    if (likedPosts.includes(currentUserId)) {
      console.log("Ya has dado 'Me gusta' a esta publicación");
      return;
    }

    const likeData = {
      user_id: currentUserId,
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
        megusta: [
          ...prev.megusta,
          { user_id: currentUserId, id: response.data.id },
        ],
      }));

      setLikedPosts((prev) => [...prev, currentUserId]);
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al dar 'Me gusta':", error);
    }
  };

  const handleUnlike = async () => {
    if (!selectedPost) return;

    const like = selectedPost.megusta.find(
      (like) => like.user_id === currentUserId
    );

    if (!like) return;

    try {
      await axios.delete(`http://localhost:3000/megusta/${like.id}`);
      setSelectedPost((prev) => ({
        ...prev,
        megusta: prev.megusta.filter((like) => like.user_id !== currentUserId),
      }));

      setLikedPosts((prev) => prev.filter((id) => id !== currentUserId));
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar 'Me gusta':", error);
    }
  };

  const isLikedByUser = selectedPost && likedPosts.includes(currentUserId);

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

          <p className="text-gray-400">{profileData.perfil.bio || ""}</p>

          {/* Botón de Seguir / Dejar de Seguir */}
          <button
            onClick={handleFollowToggle}
            className={`mt-4 px-4 py-2 rounded ${
              isFollowing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {isFollowing ? "Dejar de seguir" : "Seguir"}
          </button>

          {/* Contenido de publicaciones */}
          <div className="flex justify-center mt-6 gap-8 border-b border-gray-500 w-full">
            <button className="px-4 py-2 text-green-500 border-b-2 border-green-500">
              Publicaciones
            </button>
          </div>

          <div className="mt-8 w-full">
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

export default UserProfile;
