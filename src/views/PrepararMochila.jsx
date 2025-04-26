import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import objetosMagicos from "../store/objetosMagicos";
import BotonVolver from "../components/BotonVolver";

export default function PrepararMochila() {
  const navigate = useNavigate();
  const { mochila, agregarObjeto, quitarObjeto, mision } = useGameStore();
  const audioBagRef = useRef(null);

  const toggleObjeto = (nombre) => {
    const yaEstaSeleccionado = mochila.includes(nombre);

    if (yaEstaSeleccionado) {
      quitarObjeto(nombre);
      reproducirSonido();
    } else {
      if (mochila.length < 5) {
        agregarObjeto(nombre);
        reproducirSonido();
      }
      // Si mochila.length >= 5 y haces click en uno NO seleccionado → NO hace nada ni suena
    }
  };

  const reproducirSonido = () => {
    if (audioBagRef.current) {
      audioBagRef.current.currentTime = 0;
      audioBagRef.current.play();
    }
  };

  const continuar = () => {
    navigate("/resultado-mision");
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-4">
        Prepara tu mochila mágica 🧳
      </h2>
      <BotonVolver />

      <p className="text-center text-lg text-gray-600 mb-6">
        Misión: <strong>{mision?.titulo || "Sin misión"}</strong>
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {objetosMagicos.map((objeto, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border shadow text-center cursor-pointer transition-transform hover:scale-105 ${
              mochila.includes(objeto.nombre)
                ? "bg-green-200 border-green-500"
                : "bg-white"
            }`}
            onClick={() => toggleObjeto(objeto.nombre)}
          >
            <div className="text-4xl">{objeto.emoji}</div>
            <p className="mt-2 font-medium">{objeto.nombre}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="mb-4 text-gray-700">
          Objetos seleccionados: <strong>{mochila.length}/5</strong>
        </p>
        <button
          onClick={continuar}
          disabled={mochila.length !== 5}
          className={`px-6 py-3 rounded-lg text-white font-bold transition-all duration-300 ${
            mochila.length === 5
              ? "bg-purple-600 hover:bg-purple-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {mochila.length === 5 ? "Continuar" : "Selecciona 5 objetos"}
        </button>
      </div>

      {/* Audio de abrir bolsa */}
      <audio ref={audioBagRef} src="/openBags.mp3" />
    </div>
  );
}
