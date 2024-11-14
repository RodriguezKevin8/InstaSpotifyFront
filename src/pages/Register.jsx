// src/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombre: "",
    role: "Usuario",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/usuario/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          nombre: formData.nombre,
        }
      );

      console.log("Registro exitoso:", response.data);
      navigate("/login");
    } catch (err) {
      setError("Error al crear la cuenta. Inténtalo nuevamente.");
      console.error("Error al registrar usuario:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-white mx-4">
        <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
          Crear Cuenta
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Usuario">Usuario</option>
            <option value="Artista">Artista</option>
          </select>
          <button
            type="submit"
            className="w-full p-3 mt-4 rounded-lg bg-green-500 hover:bg-green-600 font-semibold transition duration-200"
          >
            Crear Cuenta
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <p className="text-center mt-4 text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
