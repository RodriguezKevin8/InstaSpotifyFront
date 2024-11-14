// Home.js
import React from "react";
import Story from "../components/Stories";

const posts = [
  {
    id: 1,
    username: "DRAKE_RAPPER",
    timeAgo: "1 hour ago",
    avatar:
      "https://variety.com/wp-content/uploads/2021/09/Drake-publicity9-2021-e1631312720295.jpg",
    image:
      "https://variety.com/wp-content/uploads/2021/09/Drake-publicity9-2021-e1631312720295.jpg",
    likes: 120,
    comments: 15,
  },
  {
    id: 2,
    username: "BAD_BUNNY",
    timeAgo: "2 hours ago",
    avatar:
      "https://variety.com/wp-content/uploads/2021/09/Drake-publicity9-2021-e1631312720295.jpg",
    image:
      "https://variety.com/wp-content/uploads/2021/09/Drake-publicity9-2021-e1631312720295.jpg",
    likes: 200,
    comments: 25,
  },
];

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full h-full p-4 space-y-8 overflow-y-auto">
      <Story />
      {/* Publicaciones */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg"
        >
          {/* Header de la Publicación */}
          <div className="flex items-center p-4">
            <img
              src={post.avatar}
              alt={post.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">
                {post.username}
              </p>
              <p className="text-xs text-gray-400">{post.timeAgo}</p>
            </div>
          </div>

          {/* Imagen de la Publicación */}
          <img src={post.image} alt="Post" className="w-full rounded-b-lg" />

          {/* Interacciones */}
          <div className="p-4">
            <div className="flex space-x-4 mb-2">
              <button className="text-white hover:text-red-500">❤️</button>
              <button className="text-white hover:text-blue-500">💬</button>
              <button className="text-white hover:text-green-500">📤</button>
            </div>
            <p className="text-sm text-gray-300 mb-1">{post.likes} likes</p>
            <p className="text-sm text-gray-400">
              View all {post.comments} comments
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
