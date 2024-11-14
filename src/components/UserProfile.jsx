// src/UserProfile.jsx
import React from "react";

const UserProfile = () => {
  return (
    <div className="flex flex-col items-center w-full h-full bg-gray-900 text-white p-8 overflow-y-auto">
      {/* Encabezado del Perfil */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src="/img/romeo.jpeg"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-green-500"
        />
        <div>
          <div className="text-3xl font-semibold">R.SANTOS</div>
          <div className="flex space-x-8 mt-4 text-gray-400">
            <div>
              <span className="text-white font-bold">3</span> Publicaciones
            </div>
            <div>
              <span className="text-white font-bold">23 M</span> Seguidores
            </div>
            <div>
              <span className="text-white font-bold">30</span> Seguidos
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Romeo Santos</h2>
            <p className="text-gray-300">El chico de las poesías</p>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex justify-center w-full border-b border-gray-700 mb-6">
        <button className="py-2 px-4 text-green-500 font-semibold border-b-2 border-green-500 focus:outline-none">
          Publicaciones
        </button>
      </div>

      {/* Sección de Publicaciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <img
          src="/img/post.jpg"
          alt="Post 1"
          className="w-full h-60 object-cover rounded-lg"
        />
        <img
          src="/img/post2.jpg"
          alt="Post 2"
          className="w-full h-60 object-cover rounded-lg"
        />
        <img
          src="/img/post3.jpg"
          alt="Post 3"
          className="w-full h-60 object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default UserProfile;
