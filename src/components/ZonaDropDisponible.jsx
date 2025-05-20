import { useDrop } from "react-dnd";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function ZonaDropDisponible({ children, onDrop }) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "objeto",
      drop: (item) => {
        if (item.origen === "mochila") {
          onDrop(item.nombre);
        }
      },
      canDrop: (item) => item.origen === "mochila",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const estadoActivo = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={`relative transition-all duration-300 min-h-[180px] w-full max-w-4xl px-6 py-8 rounded-3xl border-2 border-dashed
        flex flex-wrap justify-center items-center gap-4
        ${
          estadoActivo
            ? "bg-gradient-to-r from-red-50 to-pink-100 border-red-400 shadow-2xl scale-[1.02]"
            : "bg-white/60 border-gray-300 backdrop-blur-md shadow-sm"
        }
      `}
    >

      {/* Texto decorativo flotante */}
      {!children?.length && (
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-red-600 text-sm font-medium tracking-wide">
          Suelta aquí para devolver un objeto ✨
        </div>
      )}

      {/* Icono central decorativo */}
      {estadoActivo && (
        <div className="absolute -top-5 -right-5 animate-ping">
          <SparklesIcon className="h-6 w-6 text-pink-400" />
        </div>
      )}

      {children}
    </div>
  );
}
