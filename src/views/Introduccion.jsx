import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import useGameStore from "../store/useGameStore";
import BotonVolver from "../components/BotonVolver";
import Lottie from "lottie-react";
import magoAnimacion from "../assets/lotties/mago.json";
import escoba from "../assets/lotties/escoba.json";
import hand from "../assets/lotties/hand.json";
import planta from "../assets/lotties/planta.json";
import moon from "../assets/lotties/moon.json";
import libro from "../assets/lotties/libro.json";
import acido from "../assets/lotties/acido.json";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function InicioYSeleccionMision() {
  const progresoMisiones = useGameStore((state) => state.progresoMisiones);
  const completarMision = useGameStore((state) => state.completarMision);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const setMision = useGameStore((state) => state.setMision);
  const nombreJugador = useGameStore((state) => state.nombreJugador);
  const [textoVisible, setTextoVisible] = useState("");
  const audioStartRef = useRef(null);
  const [misionSeleccionada, setMisionSeleccionada] = useState(null);
  const [textoViñeta, setTextoViñeta] = useState(
    `Hola, ${
      nombreJugador || "viajero"
    }... Veo que serás mi aprendiz.\nNecesito que me ayudes a completar unos hechizos que quedaron inconclusos... 🧙‍♂️✨`
  );

  const misiones = [
    {
      animacion: escoba, // Puedes reemplazar esta animación según tu diseño
      titulo: "Amarre de Amor",
      descripcion:
        "Necesito reunir las velas rojas, el cabello de la persona amada y el perfume de rosas para completar el amarre.",
      respuestaMago: "El amor de esa mujer no se me escapará.",
    },
    {
      animacion: hand,
      titulo: "Lectura de Cartas",
      descripcion:
        "Debo encontrar el mazo de tarot ancestral y concentrarme para revelar el destino oculto en las cartas.",
      respuestaMago:
        "Las cartas nunca mienten, solo hay que saber escucharlas.",
    },
    {
      animacion: planta,
      titulo: "Baño de Florecimiento",
      descripcion:
        "Recolecta flores de manzanilla, pétalos de rosa y esencia de canela para purificar el alma y atraer la buena fortuna.",
      respuestaMago: "Con cada pétalo, renace mi espíritu.",
    },
    {
      animacion: moon,
      titulo: "Lectura de Tabaco",
      descripcion:
        "Enciendo el tabaco sagrado y observo el humo para interpretar los mensajes de los espíritus ancestrales.",
      respuestaMago: "El humo revela lo que el corazón calla.",
    },
    {
      animacion: libro,
      titulo: "Pago a la Tierra",
      descripcion:
        "Ofrezco hojas de coca, chicha y dulces a la Pachamama para agradecer y pedir su bendición.",
      respuestaMago: "La tierra escucha cuando se le habla con respeto.",
    },
    {
      animacion: acido,
      titulo: "Ritual de Limpieza",
      descripcion:
        "Necesito preparar una mezcla de hierbas amargas y realizar el ritual para eliminar las energías negativas.",
      respuestaMago: "Con cada gota, se disuelven las sombras que me rodean.",
    },
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const mostrarTextoConTyping = (texto) => {
    return new Promise((resolve) => {
      setTextoVisible(""); // reinicia
      let index = 0;

      const intervalo = setInterval(() => {
        setTextoVisible((prev) => prev + texto[index]);
        index++;

        if (index >= texto.length) {
          clearInterval(intervalo);
          resolve();
        }
      }, 50); // velocidad: 50ms por letra
    });
  };

  const hablarConVozDeMago = async (texto) => {
    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/N2lVS1w4EtoT3dr4eOWO/stream",
        {
          method: "POST",
          headers: {
            "xi-api-key": "sk_a36f91e8025c2e5b189603af85d43f1d0bd4c27b548790ea",
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text: texto,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.4,
              similarity_boost: 0.8,
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Error en API ElevenLabs");

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      return new Promise((resolve) => {
        audio.onended = resolve;
        audio.play().catch((e) => {
          console.warn("No se pudo reproducir audio:", e);
          resolve();
        });
      });
    } catch (error) {
      console.warn("Fallo la voz del mago:", error);
      return Promise.resolve(); // asegura que nunca se rompa
    }
  };

  const hasSpokenRef = useRef(false); // evita repetir en modo dev

  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    hablarConVozDeMago(textoViñeta);
  }, []);

  const seleccionarMision = async (mision, index) => {
    if (index > progresoMisiones) return; // bloqueo por orden

    if (audioStartRef.current) {
      audioStartRef.current.play();
    }

    setMision(mision);
    setTextoVisible("");
    const texto = mision.respuestaMago;

    try {
      await Promise.all([
        hablarConVozDeMago(texto),
        mostrarTextoConTyping(texto),
      ]);
    } catch (error) {
      console.error("Error al reproducir voz del mago:", error);
      // Si falla la voz, aún mostramos el texto como fallback rápido
      await mostrarTextoConTyping(texto);
    }

    navigate("/preparar-mochila");
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-[#F5F1FF] to-[#ECEAF9] px-6 py-10 overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/fondo3.jpg')" }}
    >
      {/* Botón volver */}
      <div className="absolute top-4 left-4 z-20">
        <BotonVolver />
      </div>

      {/* Viñeta + Mago */}
      <div className="absolute bottom-6 left-6 w-56 sm:w-64 md:w-72">
        {/* Viñeta del mago */}
        <div className="absolute -top-80 left-10 bg-[#f5ecdc] border-2 border-[#8B6A2F] rounded-br-3xl rounded-tl-3xl rounded-tr-xl rounded-bl-xl px-6 py-4 shadow-2xl text-sm text-gray-900 font-[Aleo] max-w-sm text-center z-20 before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-[#f5ecdc] before:border-l-2 before:border-b-2 before:border-[#8B6A2F] before:rotate-45">
          <div className="whitespace-pre-line leading-relaxed">
            <Typewriter
              key={textoViñeta} // fuerza reinicio cuando cambia el texto
              words={[textoViñeta]}
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

      {/* boton animado */}
      <button
        onClick={toggleModal}
        className="fixed  top-[58%] left-[47%]  lg:top-[62%] lg:left-[43%] -translate-x-1/2 -translate-y-1/2 z-50 bg-[#4A09A7] hover:bg-[#3a077f] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all group"
      >
        {/* Efecto ping */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#B1B63A] opacity-75 animate-ping"></span>

        {/* Ícono visible */}
        <SparklesIcon className="h-6 w-6 relative z-10 text-white" />
      </button>

      {/* Título */}
      <h2 className="text-3xl font-bold text-center text-white mb-12 drop-shadow-sm mt-10 lg:mt-0">
        Elige el hechizo a completar✨
      </h2>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fadeIn">
          <div
            className="p-20 bg-transparent max-w-6xl w-full max-h-[100vh] relative shadow-2xl animate-scaleIn font-[Aleo] text-[#3a2e1f]"
            style={{
              backgroundImage: "url('/papel.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Botón cerrar */}
            <button
              onClick={toggleModal}
              className="absolute top-14 right-4 text-[#ffffff] hover:text-black text-2xl font-bold"
            >
              x
            </button>

            {/* Misiones */}
            <div className="grid grid-cols-3 gap-x-24 gap-y-4 md:gap-6 md:px-6 place-items-center">
              {misiones.map((mision, index) => {
                const bloqueada = index > progresoMisiones;

                return (
                  <div
                    key={index}
                    onClick={() =>
                      !bloqueada && seleccionarMision(mision, index)
                    }
                    className={`w-[90px] md:w-auto shadow-md p-2 md:p-4 rounded-xl text-center transition-transform duration-300 cursor-pointer flex flex-col justify-between ${
                      bloqueada
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:scale-105 hover:shadow-xl"
                    }`}
                  >
                    <div className="relative">
                      <Lottie
                        animationData={mision.animacion}
                        loop={true}
                        className="h-12 md:h-20 mx-auto"
                      />
                      {bloqueada && (
                        <LockClosedIcon className="h-5 w-5 text-gray-700 absolute top-0 right-0" />
                      )}
                    </div>
                    <h3 className="text-[11px] leading-tight font-semibold text-[#4A09A7] mb-0 md:text-base md:mb-1">
                      {mision.titulo}
                    </h3>
                    <p className="hidden md:block text-xs md:text-base text-gray-700">
                      {mision.descripcion}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Audio */}
      <audio ref={audioStartRef} src="/gameStart.mp3" />
    </div>
  );
}
