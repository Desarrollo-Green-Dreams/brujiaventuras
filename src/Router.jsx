import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduccion from "./views/introduccion";
import Inicio from "./views/Inicio";
import SeleccionMision from "./views/SeleccionMision";
import PrepararMochila from "./views/PrepararMochila";
import Resultado from "./views/ResultadoMision";
import Creditos from "./views/Creditos";




export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} index />
                <Route path="/introduccion" element={<Introduccion />} />
                <Route path="/seleccion-mision" element={<SeleccionMision />} />
                <Route path="/preparar-mochila" element={<PrepararMochila />} />
                <Route path="/resultado-mision" element={<Resultado />} />
                <Route path="/creditos" element={<Creditos />} />
            </Routes>
        </BrowserRouter>
    );
}
