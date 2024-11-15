import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import RandomAnuncios from "../components/RandomAnuncios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [reload, setReload] = useState(false);

  const userResponse = JSON.parse(localStorage.getItem("user"));
  const userId = userResponse?.value?.id;
  const userRole = userResponse?.value?.role; // Obtener el rol del usuario

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/publicacion/followed/${userId}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [reload]);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setCommentText("");
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

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

  const handleLikeToggle = async (post) => {
    const alreadyLiked = post.megusta.some((like) => like.user_id === userId);

    try {
      if (alreadyLiked) {
        const like = post.megusta.find((like) => like.user_id === userId);
        await axios.delete(`http://localhost:3000/megusta/${like.id}`);

        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  megusta: p.megusta.filter((like) => like.user_id !== userId),
                }
              : p
          )
        );
        if (selectedPost?.id === post.id) {
          setSelectedPost((prev) => ({
            ...prev,
            megusta: prev.megusta.filter((like) => like.user_id !== userId),
          }));
        }
      } else {
        const response = await axios.post("http://localhost:3000/megusta/", {
          user_id: userId,
          publicacion_id: post.id,
          cancion_id: null,
        });

        const newLike = { user_id: userId, id: response.data.id };
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, megusta: [...p.megusta, newLike] } : p
          )
        );
        if (selectedPost?.id === post.id) {
          setSelectedPost((prev) => ({
            ...prev,
            megusta: [...prev.megusta, newLike],
          }));
        }
      }
    } catch (error) {
      console.error("Error al manejar 'Me gusta':", error);
    }
  };

  return (
    <div className="flex w-full h-full overflow-y-auto">
      {/* Columna de Publicaciones */}
      <div className="flex flex-col items-center w-3/4 h-full p-4 space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full max-w-md bg-zinc-800 rounded-lg shadow-lg"
          >
            <div className="flex items-center p-4">
              <img
                src={
                  post.usuario.perfil.avatar_url || "/img/default-avatar.jpg"
                }
                alt={post.usuario.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-white">
                  {post.usuario.username}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <img
              src={post.content_url}
              alt="Post"
              className="w-full rounded-b-lg"
            />

            <div className="p-4">
              <div className="flex space-x-4 mb-2">
                <button
                  onClick={() => handleLikeToggle(post)}
                  className="text-2xl"
                >
                  {post.megusta.some((like) => like.user_id === userId) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => openModal(post)}
                  className="text-2xl text-gray-400"
                >
                  <FaComment />
                </button>
              </div>
              <p className="text-sm text-gray-300 mb-1">
                {post.megusta.length} Me gusta
              </p>
              <p className="text-sm text-gray-400 mb-2">
                {post.descripcion || "No description available"}
              </p>
              <p
                className="text-sm text-gray-400 cursor-pointer"
                onClick={() => openModal(post)}
              >
                View all {post.comentario.length} comments
              </p>
            </div>
          </div>
        ))}

        {isModalOpen && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-zinc-800 rounded-lg max-w-lg w-full overflow-hidden">
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
                    onClick={() => handleLikeToggle(selectedPost)}
                    className="text-2xl"
                  >
                    {selectedPost.megusta.some(
                      (like) => like.user_id === userId
                    ) ? (
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
                    className="flex-grow p-2 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-black px-4 py-1 rounded-lg hover:bg-green-600"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mostrar Anuncios solo si el rol es "Usuario" */}
      {userRole === "Usuario" && (
        <div className="w-1/4 p-4">
          <RandomAnuncios />
        </div>
      )}
    </div>
  );
};

export default Home;
