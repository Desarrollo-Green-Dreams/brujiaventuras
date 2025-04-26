import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import BotonVolver from "../components/BotonVolver";

export default function SeleccionMision() {
  const navigate = useNavigate();
  const setMision = useGameStore((state) => state.setMision);
  const audioStartRef = useRef(null);

  const misiones = [
    {
      emoji: "🧹",
      titulo: "Limpia energética",
      descripcion: "Purifica una cabaña encantada que espanta a los visitantes.",
    },
    {
      emoji: "❤️",
      titulo: "Amarre de amor",
      descripcion: "Ayuda a una clienta a recuperar el cariño de su pareja.",
    },
    {
      emoji: "🌙",
      titulo: "Sueños proféticos",
      descripcion: "Invoca mensajes del más allá a través de los sueños.",
    },
  ];

  const seleccionarMision = (mision) => {
    if (audioStartRef.current) {
      audioStartRef.current.play();
    }

    setMision(mision);

    setTimeout(() => {
      navigate("/preparar-mochila");
    }, 1000); // esperar que el audio suene antes de cambiar
  };

  return (
    <div className="min-h-screen bg-violet-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Elige una misión mágica ✨
      </h2>
      <BotonVolver />

      <div className="grid md:grid-cols-3 gap-6">
        {misiones.map((mision, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="text-5xl mb-2">{mision.emoji}</div>
            <h3 className="text-xl font-semibold mb-2">{mision.titulo}</h3>
            <p className="text-gray-600 mb-4">{mision.descripcion}</p>
            <button
              onClick={() => seleccionarMision(mision)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition-all"
            >
              Elegir
            </button>
          </div>
        ))}
      </div>

      {/* Audio de inicio */}
      <audio ref={audioStartRef} src="/gameStart.mp3" />
    </div>
  );
}
