import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import BotonVolver from "../components/BotonVolver";
import obtenerObjetosPorMision from "../store/objetosMagicos";
import Lottie from "lottie-react";
import magoAnimacion from "../assets/lotties/mago.json";
import { Typewriter } from "react-simple-typewriter";


export default function PrepararMochila() {
  const navigate = useNavigate();
  const { mochila, agregarObjeto, quitarObjeto, mision } = useGameStore();
  const audioBagRef = useRef(null);
  const objetos = obtenerObjetosPorMision(mision?.titulo || "");
  const [posiciones, setPosiciones] = useState([]);
  const [objetosCargados, setObjetosCargados] = useState([]);
  const [showPistasMobile, setShowPistasMobile] = useState(false);

  useEffect(() => {
  const cargarAnimaciones = async () => {
    const objetos = obtenerObjetosPorMision(mision?.titulo || "");

    const cargados = await Promise.all(
      objetos.map(async (obj) => {
        if (obj.lottie) {
          const animation = await obj.lottie();
          return {
            ...obj,
            animationData: animation.default,
          };
        } else {
          // Si no hay lottie, solo retorna el objeto con emoji
          return obj;
        }
      })
    );

    setObjetosCargados(cargados);
  };

  cargarAnimaciones();
}, [mision?.titulo]);


  const textoViñeta =
    "Recuerda elegir con sabiduría...\nSolo los objetos correctos completarán el hechizo. 🔮";
  const [textoVisible, setTextoVisible] = useState("");

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

  // Función para reproducir voz del mago
  const hablarConVozDeMago = async (texto) => {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/N2lVS1w4EtoT3dr4eOWO/stream",
      {
        method: "POST",
        headers: {
          "xi-api-key": "sk_a36f91e8025c2e5b189603af85d43f1d0bd4c27b548790ea", // recuerda ocultarla en producción
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

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  useEffect(() => {
    setTextoVisible(""); // limpia
    setTextoVisible(textoViñeta);
    //hablarConVozDeMago(textoViñeta);
  }, []);

return (
  <div
    className="relative min-h-screen bg-gradient-to-b from-[#F5F1FF] to-[#ECEAF9]  sm:px-6 py-10 overflow-hidden bg-no-repeat bg-cover bg-center"
    style={{ backgroundImage: "url('/fondo3.jpg')" }}
  >
    {/* Botón volver */}
    <div className="absolute top-2 left-4 z-20">
      <BotonVolver />
    </div>

    {/* Viñeta + Mago */}
    <div className="hidden lg:block absolute bottom-6 left-4 sm:left-6 w-48 sm:w-60 md:w-72">
      <div className="absolute -top-80 left-10 bg-[#f5ecdc] border-2 border-[#8B6A2F] rounded-br-3xl rounded-tl-3xl rounded-tr-xl rounded-bl-xl px-4 py-3 shadow-2xl text-sm text-gray-900 font-[Aleo] max-w-sm text-center z-20 before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-[#f5ecdc] before:border-l-2 before:border-b-2 before:border-[#8B6A2F] before:rotate-45">
        <div className="whitespace-pre-line leading-relaxed">
          <Typewriter
            key={textoVisible}
            words={[textoVisible]}
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
        className="scale-110 sm:scale-125 origin-bottom-left"
      />
    </div>

    {/* Contenido principal */}
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      {/* Sección izquierda */}
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4 drop-shadow-sm mt-6">
          Prepara tu mochila mágica 🧳
        </h2>

        <p className="text-center text-base sm:text-lg text-white mb-6 drop-shadow-sm">
          Misión: {mision?.titulo || "Sin misión"}
        </p>

        <div className="z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {objetosCargados.map((objeto, i) => {
            const estaSeleccionado = mochila.includes(objeto.nombre);
            return (
              <div
                key={i}
                onClick={() => toggleObjeto(objeto.nombre)}
                className={`p-3 sm:p-4 rounded-2xl shadow-md border text-center cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg ${
                  estaSeleccionado
                    ? "bg-green-200 border-green-500"
                    : "bg-white/90 border-gray-300"
                }`}
              >
                <div className="h-16 sm:h-20 flex items-center justify-center text-3xl sm:text-4xl">
                  <span>{objeto.emoji}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles móviles */}
        <div className="md:hidden text-center mt-8 space-y-4">
          <p className="text-white drop-shadow">
            Objetos seleccionados: <strong>{mochila.length}/5</strong>
          </p>
          <button
            onClick={continuar}
            disabled={mochila.length !== 5}
            className={`w-full max-w-xs mx-auto py-3 rounded-lg text-white font-bold transition-all duration-300 ${
              mochila.length === 5
                ? "bg-purple-600 hover:bg-purple-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {mochila.length === 5 ? "Continuar" : "Selecciona 5 objetos"}
          </button>
          <button
            onClick={() => setShowPistasMobile(true)}
            className="w-full max-w-xs mx-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all"
          >
            Ver pistas del hechizo 🔮
          </button>
        </div>

        {/* Controles en desktop */}
        <div className="hidden md:flex flex-col items-center mt-10 space-y-4">
          <p className="text-white drop-shadow text-lg">
            Objetos seleccionados: <strong>{mochila.length}/5</strong>
          </p>
          <button
            onClick={continuar}
            disabled={mochila.length !== 5}
            className={`px-8 py-3 rounded-lg text-white font-bold transition-all duration-300 ${
              mochila.length === 5
                ? "bg-purple-600 hover:bg-purple-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {mochila.length === 5 ? "Continuar" : "Selecciona 5 objetos"}
          </button>
        </div>
      </div>

      {/* Pistas en desktop */}
      <div className="absolute right-4  hidden md:block w-full max-w-xs bg-white/80 rounded-xl p-6 shadow-lg h-fit">
        <h3 className="text-xl font-bold text-purple-800 mb-4">
          Pistas del hechizo
        </h3>
        <ul className="list-disc pl-5 text-gray-800 space-y-2 font-medium text-sm">
          {objetos
            .filter((obj) => obj.correcto)
            .map((obj, index) => (
              <li key={index}>{obj.pista || obj.nombre}</li>
            ))}
        </ul>
      </div>
    </div>

    {/* Sonido */}
    <audio ref={audioBagRef} src="/openBags.mp3" />

    {/* Modal de pistas en mobile */}
    {showPistasMobile && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl relative text-gray-800 animate-scaleIn">
          <button
            onClick={() => setShowPistasMobile(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold text-purple-800 mb-4">
            Pistas del hechizo
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm font-medium">
            {objetos
              .filter((obj) => obj.correcto)
              .map((obj, index) => (
                <li key={index}>{obj.pista || obj.nombre}</li>
              ))}
          </ul>
        </div>
      </div>
    )}
  </div>
);

}
