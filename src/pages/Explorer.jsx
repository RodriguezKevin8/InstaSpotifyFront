// Explore.js
import { Link } from "react-router-dom";

const Explore = () => {
  const explorePosts = [
    { id: 1, image: "/img/post.jpg" },
    { id: 2, image: "/img/post2.jpg" },
    { id: 3, image: "/img/post3.jpg" },
    { id: 4, image: "/img/post4.jpg" },
    { id: 5, image: "/img/post5.jpg" },
    { id: 6, image: "/img/post6.jpg" },
    { id: 7, image: "/img/post7.jpg" },
    { id: 8, image: "/img/post8.jpg" },
    { id: 9, image: "/img/post.jpg" },
    { id: 10, image: "/img/post2.jpg" },
    { id: 11, image: "/img/post3.jpg" },
    { id: 12, image: "/img/post4.jpg" },
  ];

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
              src={post.image}
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
