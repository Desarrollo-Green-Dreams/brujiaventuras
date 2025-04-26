import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import objetosMagicos from "../store/objetosMagicos";

export default function Resultado() {
  const navigate = useNavigate();
  const { mochila, mision, reiniciarJuego } = useGameStore();
  const audioWinRef = useRef(null);
  const audioLoseRef = useRef(null);
  const nombreJugador = useGameStore((state) => state.nombreJugador);
  const esExito = mochila.length === 5 && mochila.every(nombre => {
    const objetoEncontrado = objetosMagicos.find(obj => obj.nombre === nombre);
    return objetoEncontrado?.correcto;
  });

  useEffect(() => {
    if (esExito && audioWinRef.current) {
      audioWinRef.current.play();
    } else if (!esExito && audioLoseRef.current) {
      audioLoseRef.current.play();
    }
  }, [esExito]);

  const manejarNuevoJuego = () => {
    reiniciarJuego();
    navigate("/seleccion-mision");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-300 p-8 overflow-hidden">
      
      {/* Fondo desenfocado detrás */}
      <div className="relative z-10 bg-white bg-opacity-80 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 rounded-xl text-center max-w-sm sm:max-w-md md:max-w-lg w-full mx-4 shadow-lg space-y-6">
        
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800">
          {esExito ? `¡Misión cumplida  ${nombreJugador || "Aprendiz"} ! 🎉` : `¡Ups, algo salió mal ${nombreJugador || "Aprendiz"}! 😥`}
        </h2>

        <div className="text-lg text-gray-700 space-y-4">
          {esExito ? (
            <>
              <p>
                ¡Felicitaciones! Has completado la misión <strong>{mision?.titulo}</strong> con éxito.
              </p>
              <p>¡El Brujito está muy orgulloso de ti! 🧙‍♂️✨</p>
            </>
          ) : (
            <>
              <p>
                Parece que algo salió mal con los objetos. ¡El Brujito tendrá que improvisar!
              </p>
              <p>
                Por ejemplo, el calcetín sucio se convirtió en un duende travieso 🧦😆. ¡Pero no te preocupes! A veces lo inesperado también puede ser divertido.
              </p>
            </>
          )}
        </div>

        <button
          onClick={manejarNuevoJuego}
          className="w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded transition-all text-sm sm:text-base"
        >
          Jugar otra misión
        </button>

      </div>

      {/* Audios de resultado */}
      <audio ref={audioWinRef} src="/gameWin.mp3" />
      <audio ref={audioLoseRef} src="/gameOver.mp3" />
    </div>
  );
}
