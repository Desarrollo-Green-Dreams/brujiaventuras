import { useDrop } from "react-dnd";
import { useState } from "react";
import bolsa from "../assets/svgs/bolsa.png";

export default function ZonaDropMochila({ children, onDrop, animarBolsa }) {
  const [mostrarContenido, setMostrarContenido] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "objeto",
      drop: (item) => {
        if (item.origen === "disponibles") {
          onDrop(item.nombre);
        }
      },
      canDrop: (item) => item.origen === "disponibles",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const scaleClass =
    animarBolsa || isOver
      ? "scale-110 shadow-xl"
      : "scale-100";

  return (
    <div className="absolute bottom-12 left-[250px] flex flex-col items-center justify-center transition-transform duration-300 ease-in-out">
      {/* Bolsa visual */}
      <div
        className={`relative w-[220px] h-[220px] bg-cover bg-center transform ${scaleClass} transition-transform duration-300`}
        ref={drop}
        style={{
          backgroundImage: `url(${bolsa})`,
        }}
      >
        {/* ✨ Partículas mágicas */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-32 pointer-events-none z-10 overflow-visible">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-70 animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Botón mostrar/ocultar */}
        <button
          onClick={() => setMostrarContenido(!mostrarContenido)}
          className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-purple-600 text-white hover:bg-purple-800 z-20"
        >
          {mostrarContenido ? "Ocultar" : "Ver"}
        </button>
      </div>

      {/* Contenido */}
      {mostrarContenido && (
        <div className="mt-4 bg-white/90 rounded-xl shadow-inner p-4 flex gap-3 flex-wrap justify-center w-full max-w-xs min-h-[100px]">
          {children}
        </div>
      )}
    </div>
  );
}

