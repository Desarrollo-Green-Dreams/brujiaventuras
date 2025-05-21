import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../store/useGameStore";
import BotonVolver from "../components/BotonVolver";
import obtenerObjetosPorMision from "../store/objetosMagicos";
import Lottie from "lottie-react";
import magoAnimacion from "../assets/lotties/mago.json";
import { Typewriter } from "react-simple-typewriter";
import ObjetoDraggable from "../components/ObjetoDraggable";
import ZonaDropDisponible from "../components/ZonaDropDisponible";
import ZonaDropMochila from "../components/ZonaDropMochila";

export default function PrepararMochila() {
  const navigate = useNavigate();
  const {
    mochila,
    agregarObjeto,
    quitarObjeto,
    mision,
    reiniciarMisionActual,
  } = useGameStore();

  const audioBagRef = useRef(null);
  const [objetos, setObjetos] = useState([]);
  const [bolsaAnimada, setBolsaAnimada] = useState(false);

  const [showPistasMobile, setShowPistasMobile] = useState(false);

  const textoViñeta = `Recuerda elegir con sabiduría...\nSolo los objetos correctos completarán el hechizo. Arrastra los objetos hacia mi bolso magico 🔮`;
  const [textoVisible, setTextoVisible] = useState(textoViñeta);

  const hablarConVozDeMago = async (texto) => {
    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/N2lVS1w4EtoT3dr4eOWO/stream",
        {
          method: "POST",
          headers: {
            "xi-api-key": "sk_b4ac29b3adb41edc1265eaf8ac57d7425b39d84013b69ce8",
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

  useEffect(() => {
    if (mision?.titulo) {
      setObjetos(obtenerObjetosPorMision(mision.titulo));
    }
  }, [mision?.titulo]);

  const reproducirSonido = () => {
    if (audioBagRef.current) {
      audioBagRef.current.currentTime = 0;
      audioBagRef.current.play();
    }
  };

  const continuar = () => {
    const correctos = objetos
      .filter((obj) => obj.correcto)
      .map((o) => o.nombre);
    const esExito =
      mochila.length === 5 &&
      mochila.every((nombre) => correctos.includes(nombre));

    console.log("✔️ Validación local:", { mochila, correctos, esExito });
    if (esExito) {
      useGameStore.getState().completarMision();
    }

    navigate("/resultado-mision", { state: { esExito } });
  };

  useEffect(() => {
    setTextoVisible(textoViñeta);

    hablarConVozDeMago(textoViñeta); // 🔊 que hable al iniciar

    return () => reiniciarMisionActual();
  }, []);

  const disponibles = objetos.filter((obj) => !mochila.includes(obj.nombre));

  useEffect(() => {
    if (mision?.titulo) {
      const nuevosObjetos = obtenerObjetosPorMision(mision.titulo);
      setObjetos(nuevosObjetos);
      useGameStore.getState().setObjetosGenerados(nuevosObjetos); 
    }
  }, [mision?.titulo]);

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-[#F5F1FF] to-[#ECEAF9] px-4 sm:px-6 py-10 overflow-hidden bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/fondo3.jpg')" }}
    >
      {/* Botón volver */}
      <div className="absolute top-4 left-4 z-20">
        <BotonVolver />
      </div>

      {/* Viñeta + Mago */}
      <div className="hidden lg:block absolute bottom-6 left-4 w-60 md:w-72">
        <div className="absolute -top-80 left-10 bg-[#f5ecdc] border-2 border-[#8B6A2F] rounded-3xl px-4 py-3 shadow-2xl text-sm text-gray-900 font-[Aleo] max-w-sm text-center z-20 before:content-[''] before:absolute before:-bottom-3 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-[#f5ecdc] before:border-l-2 before:border-b-2 before:border-[#8B6A2F] before:rotate-45">
          <div className="whitespace-pre-line leading-relaxed">
            <Typewriter
              key={textoVisible}
              words={[textoVisible]}
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={500}
              cursor
              onTypeDone={() => setBolsaAnimada(true)}
            />
          </div>
        </div>
        <Lottie
          animationData={magoAnimacion}
          loop={true}
          className="scale-125 origin-bottom-left"
        />
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 mt-4 pb-40">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white drop-shadow-sm mb-2">
            Prepara tu mochila mágica 🧳
          </h2>
          <p className="text-white text-lg drop-shadow-sm">
            Misión:{" "}
            <span className="font-semibold">
              {mision?.titulo || "Sin misión"}
            </span>
          </p>
        </div>

        {/* Objetos disponibles */}
        <ZonaDropDisponible onDrop={(nombre) => quitarObjeto(nombre)}>
          {disponibles.map((obj) => (
            <ObjetoDraggable
              key={obj.nombre}
              objeto={obj}
              origen="disponibles"
            />
          ))}
        </ZonaDropDisponible>

        {/* Mochila */}
        <ZonaDropMochila
          animarBolsa={bolsaAnimada}
          onDrop={(nombre) => {
            if (!mochila.includes(nombre) && mochila.length < 5) {
              agregarObjeto(nombre);
              reproducirSonido();
            }
          }}
        >
          {mochila.map((nombre) => {
            const obj = objetos.find((o) => o.nombre === nombre);
            if (!obj) return null;
            return (
              <ObjetoDraggable key={obj.nombre} objeto={obj} origen="mochila" />
            );
          })}
        </ZonaDropMochila>

        {/* Controles */}
        <div className="text-center mt-6 space-y-4">
          <p className="text-white drop-shadow text-lg">
            Objetos seleccionados: <strong>{mochila.length}/5</strong>
          </p>

          <button
            onClick={continuar}
            disabled={mochila.length !== 5}
            className={`w-64 py-3 rounded-lg font-bold transition-all duration-300 ${
              mochila.length === 5
                ? "bg-purple-600 text-white hover:bg-purple-800"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {mochila.length === 5 ? "Continuar" : "Selecciona 5 objetos"}
          </button>

          <button
            onClick={() => setShowPistasMobile(true)}
            className="block md:hidden w-64 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold shadow-md transition-all"
          >
            Ver pistas del hechizo 🔮
          </button>
        </div>
      </div>

      {/* Pistas en desktop */}
      <div
        className="hidden md:block fixed top-10 right-10 w-80 rounded-xl p-6 shadow-xl bg-cover bg-center bg-no-repeat h-[400px]"
        style={{
          backgroundImage: "url('/pergamino.png')",
          backgroundSize: "100% 100%", // asegura que se adapte al div
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <h3 className="text-xl font-bold  mb-4 drop-shadow pt-16 text-white ml-14">
          Pistas del hechizo
        </h3>
        <ul className="list-disc pl-5  space-y-2 font-medium text-sm drop-shadow  ml-10 text-white">
          {[...objetos]
            .filter((obj) => obj.correcto)
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((obj, index) => (
              <li key={index}>{obj.pista || obj.nombre}</li>
            ))}
        </ul>
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
