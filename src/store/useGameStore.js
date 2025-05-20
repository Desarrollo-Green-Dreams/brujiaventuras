import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGameStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      mision: null,
      mochila: [],
      nombreJugador: "",
      progresoMisiones: 0,
      objetosGenerados: [],

      // Acciones
      setNombreJugador: (nombre) => set({ nombreJugador: nombre }),
      setMision: (mision) => set({ mision }),

      agregarObjeto: (objeto) => {
        const { mochila } = get();
        if (mochila.length >= 5 || mochila.includes(objeto)) return;
        set({ mochila: [...mochila, objeto] });
      },

      quitarObjeto: (objeto) => {
        const { mochila } = get();
        set({ mochila: mochila.filter((item) => item !== objeto) });
      },

      setObjetosGenerados: (lista) => set({ objetosGenerados: lista }),

      resetMochila: () => set({ mochila: [] }),

      reiniciarMisionActual: () =>
        set({
          mision: null,
          mochila: [],
          objetosGenerados: [],
        }),

      reiniciarJuegoCompleto: () =>
        set({
          mision: null,
          mochila: [],
          progresoMisiones: 0,
          nombreJugador: "",
          objetosGenerados: [],
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
        objetosGenerados: state.objetosGenerados,
      }),
    }
  )
);

export default useGameStore;
