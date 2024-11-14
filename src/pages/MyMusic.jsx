// src/MyMusic.jsx
import { Link, useNavigate } from "react-router-dom";

const MyMusic = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full h-full p-6 space-y-8">
      {/* Botón para crear nueva playlist */}
      <div className="w-full flex justify-center">
        <button
          onClick={() => navigate("/create-playlist")}
          className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Crear Nueva Playlist
        </button>
      </div>

      {/* Saludo personalizado */}
      <h2 className="text-2xl font-bold text-gray-300">Creado para Gabriel</h2>

      {/* Sección de música en formato de cuadrícula */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/playlist" className="relative group">
          <img
            src="/img/Portada1.jpeg"
            alt="Mix diario 1"
            className="w-full h-52 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-white text-lg font-semibold">Mix diario 1</h3>
            <p className="text-gray-300 text-sm">
              Anuel AA, Bad Bunny, JHAYCO y más
            </p>
          </div>
          <button className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
            <img src="/icons/Play.svg" alt="Play" className="w-5 h-5" />
          </button>
        </Link>

        <Link to="/playlist" className="relative group">
          <img
            src="/img/portada5.jpg"
            alt="Mix diario 2"
            className="w-full h-52 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-white text-lg font-semibold">Mix diario 2</h3>
            <p className="text-gray-300 text-sm">
              Eladio Carrion, Dei V, Bizarrap y más
            </p>
          </div>
          <button className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
            <img src="/icons/Play.svg" alt="Play" className="w-5 h-5" />
          </button>
        </Link>

        <Link to="/playlist" className="relative group">
          <img
            src="/img/portada3.jpg"
            alt="Mix diario 4"
            className="w-full h-52 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-white text-lg font-semibold">Mix diario 4</h3>
            <p className="text-gray-300 text-sm">Myke Towers, Jhayco, y más</p>
          </div>
          <button className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
            <img src="/icons/Play.svg" alt="Play" className="w-5 h-5" />
          </button>
        </Link>

        <Link to="/playlist" className="relative group">
          <img
            src="/img/portada4.jpeg"
            alt="Mix diario 5"
            className="w-full h-52 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-white text-lg font-semibold">Mix diario 5</h3>
            <p className="text-gray-300 text-sm">
              Duki, CRO, Khea, YSY A y más
            </p>
          </div>
          <button className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
            <img src="/icons/Play.svg" alt="Play" className="w-5 h-5" />
          </button>
        </Link>

        <Link to="/playlist" className="relative group">
          <img
            src="/img/portada2.jpg"
            alt="Mix diario 6"
            className="w-full h-52 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-white text-lg font-semibold">Mix diario 6</h3>
            <p className="text-gray-300 text-sm">
              Metro Boomin, Post Malone, Travis Scott y más
            </p>
          </div>
          <button className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
            <img src="/icons/Play.svg" alt="Play" className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyMusic;
