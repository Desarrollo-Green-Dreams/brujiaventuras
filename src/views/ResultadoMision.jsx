import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import magoAnimacion from "../assets/lotties/mago.json";
import { Typewriter } from "react-simple-typewriter";

export default function Resultado() {
  const location = useLocation();
  const navigate = useNavigate();
  const esExito = location.state?.esExito;

  const audioWinRef = useRef(null);
  const audioLoseRef = useRef(null);

  const nombreJugador = "Aprendiz"; // Si no quieres depender del store, puedes dejarlo fijo

  // Mensajes por defecto
  const mensajeExito = "¡Bien hecho, aprendiz!";
  const mensajeFracaso = "El calcetín se volvió un duende... y no uno simpático.";

  useEffect(() => {
    if (esExito === true && audioWinRef.current) {
      audioWinRef.current.play();
    } else if (esExito === false && audioLoseRef.current) {
      audioLoseRef.current.play();
    }
  }, [esExito]);

  const manejarNuevoJuego = () => {
    navigate("/introduccion");
  };

  // Protección si alguien entra directamente sin pasar por navigate()
  if (esExito === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl bg-black">
        Esta pantalla solo es accesible después de preparar tu mochila. 🧙‍♂️
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-[#F5F1FF] to-[#ECEAF9] px-6 py-10 overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/fondo3.jpg')" }}
    >
      {/* Mago con viñeta */}
      <div className="absolute bottom-6 left-6 w-56 sm:w-64 md:w-72">
        <div className="absolute -top-80 left-10 bg-[#f5ecdc] border-2 border-[#8B6A2F] rounded-br-3xl rounded-tl-3xl rounded-tr-xl rounded-bl-xl px-6 py-4 shadow-2xl text-sm text-gray-900 font-[Aleo] max-w-sm text-center z-20 before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-[#f5ecdc] before:border-l-2 before:border-b-2 before:border-[#8B6A2F] before:rotate-45">
          <div className="whitespace-pre-line leading-relaxed">
            <Typewriter
              key={esExito ? "exito" : "fracaso"}
              words={[esExito ? mensajeExito : mensajeFracaso]}
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={500}
              cursor
            />
          </div>
        </div>
        <Lottie
          animationData={magoAnimacion}
          loop={true}
          className="scale-125 sm:scale-150 origin-bottom-left"
        />
      </div>

      {/* Contenido central */}
      <div className="relative z-10 bg-white bg-opacity-80 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 rounded-xl text-center max-w-sm sm:max-w-md md:max-w-lg w-full mx-auto shadow-lg space-y-6 mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800">
          {esExito
            ? `¡Misión cumplida ${nombreJugador}! 🎉`
            : `¡Ups, algo salió mal ${nombreJugador}!`}
        </h2>

        <div className="text-lg text-gray-700 space-y-4">
          {esExito ? (
            <>
              <p>¡Felicitaciones! Has completado la misión con éxito.</p>
              <p>¡El Brujito está muy orgulloso de ti! 🧙‍♂️✨</p>
            </>
          ) : (
            <>
              <p>
                Parece que algo salió mal con los objetos. ¡El Brujito tendrá
                que improvisar!
              </p>
              <p>
                A veces hasta un error puede traer magia inesperada. ¡Inténtalo
                otra vez!
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

      {/* Audios */}
      <audio ref={audioWinRef} src="/gameWin.mp3" />
      <audio ref={audioLoseRef} src="/gameOver.mp3" />
    </div>
  );
}
