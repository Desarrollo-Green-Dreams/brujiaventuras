import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import BotonVolver from "../components/BotonVolver";
import obtenerObjetosPorMision from "../store/objetosMagicos";
import Lottie from "lottie-react";
import magoAnimacion from "../../public/mago.json";
import { Typewriter } from "react-simple-typewriter";

export default function PrepararMochila() {
  const navigate = useNavigate();
  const { mochila, agregarObjeto, quitarObjeto, mision } = useGameStore();
  const audioBagRef = useRef(null);
  const objetos = obtenerObjetosPorMision(mision?.titulo || "");

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
          "xi-api-key": "sk_fb4da3df7f2023d4a4d9e65f499ec6658660a3ede659f996", // recuerda ocultarla en producción
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
    hablarConVozDeMago(textoViñeta);
  }, []);

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
        <div className="absolute -top-80 left-10 bg-[#f5ecdc] border-2 border-[#8B6A2F] rounded-br-3xl rounded-tl-3xl rounded-tr-xl rounded-bl-xl px-6 py-4 shadow-2xl text-sm text-gray-900 font-[Aleo] max-w-sm text-center z-20 before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-[#f5ecdc] before:border-l-2 before:border-b-2 before:border-[#8B6A2F] before:rotate-45">
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
          className="scale-125 sm:scale-150 origin-bottom-left"
        />
      </div>

      {/* Título */}
      <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-sm">
        Prepara tu mochila mágica 🧳
      </h2>

      <p className="text-center text-lg text-white mb-6 drop-shadow-sm">
        Misión: {mision?.titulo || "Sin misión"}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {objetos.map((objeto, i) => (
          <div
            key={i}
            onClick={() => toggleObjeto(objeto.nombre)}
            className={`p-4 rounded-xl border shadow text-center cursor-pointer transition-transform hover:scale-105 ${
              mochila.includes(objeto.nombre)
                ? "bg-green-200 border-green-500"
                : "bg-white"
            }`}
          >
            <div className="text-4xl">{objeto.emoji}</div>
            <p className="mt-2 font-medium">{objeto.nombre}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="mb-4 text-white drop-shadow">
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

      <audio ref={audioBagRef} src="/openBags.mp3" />
    </div>
  );
}
