import { useNavigate } from "react-router-dom";

export default function BotonVolver({ texto = "←" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="w-[100px] absolute bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-800 transition-all duration-300 shadow-md"
    >
      {texto}
    </button>
  );
}
