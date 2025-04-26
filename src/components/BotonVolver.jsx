// components/BotonVolver.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BotonVolver({ texto = "← Volver" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-800 transition-all duration-300 shadow-md"
    >
      {texto}
    </button>
  );
}
