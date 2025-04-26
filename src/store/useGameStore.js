import { create } from "zustand";

const useGameStore = create((set) => ({


  // Estado inicial
  mision: null,
  mochila: [],
  nombreJugador: "",
  setNombreJugador: (nombre) => set({ nombreJugador: nombre }),


  // Acciones
  setMision: (mision) => set({ mision }),

  agregarObjeto: (objeto) =>
    set((state) => {
      if (state.mochila.length >= 5) return state; // máximo 5 objetos
      if (state.mochila.includes(objeto)) return state; // evitar duplicados
      return { mochila: [...state.mochila, objeto] };
    }),

  quitarObjeto: (objeto) =>
    set((state) => ({
      mochila: state.mochila.filter((item) => item !== objeto),
    })),

  reiniciarJuego: () => set({ mision: null, mochila: [] }),
}));

export default useGameStore;
