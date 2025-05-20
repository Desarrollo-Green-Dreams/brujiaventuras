import { useDrag } from "react-dnd";
import { useMemo } from "react";

export default function ObjetoDraggable({ objeto, origen, isDisabled = false }) {
  const dragItem = useMemo(() => ({ nombre: objeto.nombre, origen }), [
    objeto.nombre,
    origen,
  ]);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "objeto",
    item: dragItem,
    canDrag: !isDisabled,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [dragItem, isDisabled]);

  return (
    <div
      ref={!isDisabled ? dragRef : null}
      className={`h-16 w-16 p-1 border rounded-lg bg-white shadow-md flex items-center justify-center transition-all duration-200
        ${isDragging ? "opacity-40 scale-90" : ""}
        ${isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-grab hover:scale-105"}
      `}
    >
      <img
        src={objeto.imagen}
        alt={objeto.nombre}
        className="h-full w-full object-contain"
      />
    </div>
  );
}  