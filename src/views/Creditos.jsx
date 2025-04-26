import React from "react";
import { useNavigate } from "react-router-dom";

export default function Creditos() {
  const navigate = useNavigate();

  const regresarAlInicio = () => {
    navigate("/");  // Regresa al inicio del juego
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8 text-white">
      <h2 className="text-4xl font-bold text-center mb-8">Créditos ✨</h2>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg mb-4">Agradecemos a todos los que han hecho posible este juego:</p>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Desarrolladores:</h3>
          <ul className="list-none mt-2">
            <li>👨‍💻 Julio Tornero - Desarrollador Frontend</li>
            <li>👩‍💻 Equipo de diseño gráfico - Creación de la UI</li>
            <li>🎨 [Nombre del diseñador] - Diseño de personajes y escenarios</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Música y Sonidos:</h3>
          <ul className="list-none mt-2">
            <li>🎶 [Nombre del músico] - Música original y efectos</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold">Especiales agradecimientos:</h3>
          <ul className="list-none mt-2">
            <li>💻 Comunidad de desarrolladores de React y Vite</li>
            <li>📚 Recursos de [nombre de recursos] para aprender sobre juegos 2D</li>
          </ul>
        </div>

        <button
          onClick={regresarAlInicio}
          className="px-6 py-3 rounded-lg text-white font-bold bg-blue-600 hover:bg-blue-800 mt-6"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
