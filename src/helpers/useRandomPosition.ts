import { useEffect, useState } from "react";

export function useRandomPosition(moviendo, intervalo = 3000) {
  const [pos, setPos] = useState({
    top: Math.random() * 80,
    left: Math.random() * 80,
  });

  useEffect(() => {
    if (!moviendo) return;

    const mover = () => {
      setPos({
        top: Math.random() * 80,
        left: Math.random() * 80,
      });
    };

    const intervalId = setInterval(mover, intervalo);
    return () => clearInterval(intervalId);
  }, [moviendo]);

  return pos;
}
