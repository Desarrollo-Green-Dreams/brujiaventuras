import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import BotonVolver from "../components/BotonVolver";
import useGameStore from "../store/useGameStore";

export default function Introduccion() {
  const navigate = useNavigate();
  const nombreJugador = useGameStore((state) => state.nombreJugador);

  const audioStartRef = useRef(null);

  const handleElegirMision = () => {
    if (audioStartRef.current) {
      audioStartRef.current.play();
    }

    setTimeout(() => {
      navigate("/seleccion-mision");
    }, 1000); // Ajusta si quieres que espere más/menos según el audio
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center px-6">
      <BotonVolver />

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-800">
        ¡Bienvenido, {nombreJugador || "Aprendiz"} nuevo aprendiz del Brujito! 🧙‍♂️
      </h1>

      <p className="text-lg text-gray-700 max-w-xl mb-8">
        Hoy es tu primer día como ayudante mágico. El Brujito necesita tu ayuda para resolver una de
        tres misiones encantadas. Antes de salir, debes elegir cuál cumplirás...
      </p>

      <button
        onClick={handleElegirMision}
        className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-800 transition-colors"
      >
        Elegir misión
      </button>

      {/* Audio de inicio de misión */}
      <audio ref={audioStartRef} src="/gameStart.mp3" />
    </div>
  );
}
