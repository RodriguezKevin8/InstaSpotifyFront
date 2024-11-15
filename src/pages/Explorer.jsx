import { useState, useEffect } from "react";
import axios from "axios";

const Explore = () => {
  const [explorePosts, setExplorePosts] = useState([]);

  useEffect(() => {
    const fetchExplorePosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/publicacion"); // Asegúrate de que esta URL sea la correcta
        setExplorePosts(response.data); // Se asume que `response.data` contiene directamente el array de publicaciones
      } catch (error) {
        console.error("Error fetching explore posts:", error);
      }
    };

    fetchExplorePosts();
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-8">
      <h2 className="text-3xl font-bold text-green-500 mb-8">Explorar</h2>

      {/* Grid de publicaciones */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
        {explorePosts.map((post) => (
          <div
            key={post.id}
            className="relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={post.content_url} // Usamos `content_url` como la URL de la imagen
              alt={`Post ${post.id}`}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
