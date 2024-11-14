// src/Register.jsx
import { useState } from "react";
import "./Register.css";
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
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="Usuario">Usuario</option>
          <option value="Artista">Artista</option>
        </select>
        <button type="submit">Crear Cuenta</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
