// src/components/UserEarnings.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const UserEarnings = ({ userId }) => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/ganancias/${userId}`
        );
        setEarnings(response.data);
      } catch (err) {
        console.error("Error al obtener las ganancias:", err);
        setError("No se pudieron cargar las ganancias.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [userId]);

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
          <strong>Ganancias Totales:</strong> $
          {earnings.total_ganancias?.toFixed(2)}
        </p>
        <p>
          <strong>Ganancias por Canción:</strong> $
          {earnings.ganancias_por_cancion?.toFixed(2)}
        </p>
        <p>
          <strong>Ganancias por Anuncio:</strong> $
          {earnings.ganancias_por_anuncio?.toFixed(2)}
        </p>
        <p>
          <strong>Total de Reproducciones:</strong>{" "}
          {earnings.total_reproducciones}
        </p>
        <p>
          <strong>Monto por Reproducción:</strong> $
          {earnings.monto_por_reproduccion?.toFixed(2)}
        </p>
        <p>
          <strong>Fecha Última Actualización:</strong>{" "}
          {new Date(earnings.fecha_actualizacion).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default UserEarnings;
