import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import obtenerObjetosPorMision from "../store/objetosMagicos";
import Lottie from "lottie-react";
import magoAnimacion from "../../public/mago.json";
import { Typewriter } from "react-simple-typewriter";

export default function Resultado() {
  const navigate = useNavigate();
  const { mochila, mision, reiniciarJuego } = useGameStore();
  const nombreJugador = useGameStore((state) => state.nombreJugador);
  const audioWinRef = useRef(null);
  const audioLoseRef = useRef(null);

  
  const misiones = [
    {
     
      titulo: "Amarre de Amor",
      descripcion: "Necesito reunir las velas rojas, el cabello de la persona amada y el perfume de rosas para completar el amarre.",
      respuestaMago: "El amor de esa mujer no se me escapará.",
    },
    {
      
      titulo: "Lectura de Cartas",
      descripcion: "Debo encontrar el mazo de tarot ancestral y concentrarme para revelar el destino oculto en las cartas.",
      respuestaMago: "Las cartas nunca mienten, solo hay que saber escucharlas.",
    },
    {
    
      titulo: "Baño de Florecimiento",
      descripcion: "Recolecta flores de manzanilla, pétalos de rosa y esencia de canela para purificar el alma y atraer la buena fortuna.",
      respuestaMago: "Con cada pétalo, renace mi espíritu.",
    },
    {
   
      titulo: "Lectura de Tabaco",
      descripcion: "Enciendo el tabaco sagrado y observo el humo para interpretar los mensajes de los espíritus ancestrales.",
      respuestaMago: "El humo revela lo que el corazón calla.",
    },
    {
     
      titulo: "Pago a la Tierra",
      descripcion: "Ofrezco hojas de coca, chicha y dulces a la Pachamama para agradecer y pedir su bendición.",
      respuestaMago: "La tierra escucha cuando se le habla con respeto.",
    },
    {
   
      titulo: "Ritual de Limpieza",
      descripcion: "Necesito preparar una mezcla de hierbas amargas y realizar el ritual para eliminar las energías negativas.",
      respuestaMago: "Con cada gota, se disuelven las sombras que me rodean.",
    },
  ];

  const objetos = obtenerObjetosPorMision(mision?.titulo || "");
  const misionCompleta = misiones.find((m) => m.titulo === mision?.titulo);

  const esExito =
    mochila.length === 5 &&
    mochila.every((nombre) => {
      const objetoEncontrado = objetos.find((obj) => obj.nombre === nombre);
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
    navigate("/introduccion");
  };


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
              words={[
                esExito
                  ? misionCompleta?.respuestaMago || "¡Bien hecho, aprendiz!"
                  : "El calcetín se volvió un duende... y no uno simpático. 🧦😆",
              ]}
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
            ? `¡Misión cumplida ${nombreJugador || "Aprendiz"}! 🎉`
            : `¡Ups, algo salió mal ${nombreJugador || "Aprendiz"}! 😥`}
        </h2>

        <div className="text-lg text-gray-700 space-y-4">
          {esExito ? (
            <>
              <p>
                ¡Felicitaciones! Has completado la misión{" "}
                {mision?.titulo} con éxito.
              </p>
              <p>¡El Brujito está muy orgulloso de ti! 🧙‍♂️✨</p>
            </>
          ) : (
            <>
              <p>
                Parece que algo salió mal con los objetos. ¡El Brujito tendrá que improvisar!
              </p>
              <p>
                A veces hasta un error puede traer magia inesperada. ¡Inténtalo otra vez!
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
