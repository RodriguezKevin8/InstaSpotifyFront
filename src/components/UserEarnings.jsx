// src/components/UserEarnings.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const UserEarnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener el userId directamente del localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.value?.id;

    // Verificar si userId es válido antes de hacer la solicitud
    if (!userId) {
      setError("ID de usuario no válido");
      setLoading(false);
      return;
    }

    const fetchEarnings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/ganancias/${userId}`
        );
        console.log("Datos de ganancias recibidos:", response.data); // Log para depuración
        setEarnings(response.data);
      } catch (err) {
        console.error("Error al obtener las ganancias:", err);
        setError("No se pudieron cargar las ganancias.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  if (loading) return <p>Cargando ganancias...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!earnings) return <p>No hay datos de ganancias disponibles.</p>;

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-500 mb-4">
        Ganancias del Usuario
      </h2>
      <div className="text-gray-300">
        <p>
          <strong>Ganancias Totales:</strong> ${earnings.total_ganancias}
        </p>
        <p>
          <strong>Ganancias por Canción:</strong> $
          {earnings.ganancias_por_cancion}
        </p>
        <p>
          <strong>Ganancias por anuncios:</strong> $
          {earnings.ganancias_por_anuncio}
        </p>
        <p>
          <strong>Total de Reproducciones:</strong>{" "}
          {earnings.total_reproducciones || 0}
        </p>

        <p>
          <strong>Fecha Última Actualización:</strong>{" "}
          {earnings.fecha_actualizacion
            ? new Date(earnings.fecha_actualizacion).toLocaleString()
            : "No disponible"}
        </p>
      </div>
    </div>
  );
};

export default UserEarnings;
