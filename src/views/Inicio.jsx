import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";

export default function Inicio() {
  const navigate = useNavigate();
  const audioInicioRef = useRef(null);
  const audioStartRef = useRef(null);
  const setNombreJugador = useGameStore((state) => state.setNombreJugador);

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (audioInicioRef.current) {
      audioInicioRef.current.volume = 0.5;
      audioInicioRef.current.play().catch(() => {
        console.warn("Reproducción automática bloqueada.");
      });
    }
  }, []);

  const nombreEsValido = nombre.trim().length >= 3;

  const handleComenzar = () => {
    if (!nombreEsValido) return;

    setNombreJugador(nombre.trim());

    if (audioStartRef.current) {
      audioStartRef.current.play();
    }

    setTimeout(() => {
      navigate("/introduccion");
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/fondo.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Audios */}
      <audio ref={audioInicioRef} src="/inicio.mp3" loop />
      <audio ref={audioStartRef} src="/gameStart.mp3" />

      {/* Contenido principal */}
      <div className="relative z-10 bg-white bg-opacity-80 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 rounded-xl text-center max-w-sm sm:max-w-md md:max-w-lg w-full mx-4 shadow-lg space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800">
          ✨ Bruji Aventuras ✨
        </h1>

        <input
          type="text"
          placeholder="Ingresa tu nombre (mínimo 3 letras)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-2 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
        />

        <button
          onClick={handleComenzar}
          disabled={!nombreEsValido}
          className={`px-6 py-3 rounded text-white font-semibold transition-all w-full ${
            nombreEsValido
              ? "bg-purple-600 hover:bg-purple-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Comenzar
        </button>
      </div>
    </div>
  );
}
