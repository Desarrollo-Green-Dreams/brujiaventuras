import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGameStore = create(
  persist(
    (set) => ({
      // Estado inicial
      mision: null,
      mochila: [],
      nombreJugador: "",
      progresoMisiones: 0,

      // Acciones
      setNombreJugador: (nombre) => set({ nombreJugador: nombre }),
      setMision: (mision) => set({ mision }),

      agregarObjeto: (objeto) =>
        set((state) => {
          if (state.mochila.length >= 5) return state;
          if (state.mochila.includes(objeto)) return state;
          return { mochila: [...state.mochila, objeto] };
        }),

      quitarObjeto: (objeto) =>
        set((state) => ({
          mochila: state.mochila.filter((item) => item !== objeto),
        })),

      // ✅ reinicia solo la misión actual y mochila
      reiniciarMisionActual: () =>
        set({
          mision: null,
          mochila: [],
        }),

      // ✅ solo si quieres borrar todo el progreso
      reiniciarJuegoCompleto: () =>
        set({
          mision: null,
          mochila: [],
          progresoMisiones: 0,
          nombreJugador: "",
        }),

      completarMision: () =>
        set((state) => ({
          progresoMisiones: state.progresoMisiones + 1,
        })),
    }),
    {
      name: "game-storage",
      partialize: (state) => ({
        mision: state.mision,
        mochila: state.mochila,
        nombreJugador: state.nombreJugador,
        progresoMisiones: state.progresoMisiones,
      }),
    }
  )
);

export default useGameStore;
