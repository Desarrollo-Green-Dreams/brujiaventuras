import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import useGameStore from "../store/useGameStore";
import magoAnimacion from "../../public/mago.json"; // Animación Lottie

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
    }, 500);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center overflow-hidden">
      {/* Fondo en video */}
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

      {/* Contenedor central con fondo de pergamino */}
      <div
        className="relative z-10 flex justify-center items-center flex-col gap-8 bg-cover bg-center bg-no-repeat p-8 md:p-12 mx-4 w-1/3 h-full"
        style={{
          backgroundImage: 'url("/pergamino.png")',
          backgroundSize: "100% 100%",
          borderRadius: "1rem",
        }}
      >
        {/* Formulario */}
        <div className="text-center flex justify-center flex-col items-center w-1/2">
          {/* Título */}
          <h1 className="mb-10 text-3xl sm:text-4xl font-bold text-[#4A09A7] drop-shadow-sm font-[Aleo]">
            Bruji Aventuras
          </h1>

          {/* Input de nombre */}
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="text-center my-10 w-[150px] px-4 py-2 rounded border border-[#4A09A7] focus:outline-none focus:ring-2 focus:ring-[#B1B63A] text-sm bg-transparent text-[#4A09A7] placeholder-[#4A09A7] max-w-md backdrop-blur-xs"
          />

          <button
            onClick={handleComenzar}
            disabled={!nombreEsValido}
            type="button"
            className={`btn mt-[120px] relative font-aleo text-white font-semibold transition-all duration-300 ${
              nombreEsValido
                ? ""
                : "opacity-60 cursor-not-allowed pointer-events-none"
            }`}
          >
            <strong className="relative z-10 tracking-[0.2em]">
              Continuar
            </strong>

            {nombreEsValido && (
              <>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>

                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
