import velaRoja from "../assets/svgs/velaRoja.gif";
import abanico from "../assets/svgs/abanico-de-mano.gif";
import cabello from "../assets/svgs/avatar.gif";
import bolaDeCristal from "../assets/svgs/bola-de-cristal.gif";
import cigarro from "../assets/svgs/cigarro.gif";
import cuentoDeHadas from "../assets/svgs/cuento-de-hadas.gif";
import diamante from "../assets/svgs/diamante.gif";
import encendedor from "../assets/svgs/encendedor.gif";
import hierba from "../assets/svgs/hierba.gif";
import investigacion from "../assets/svgs/investigacion.gif";
import lavanda from "../assets/svgs/lavanda.gif";
import maiz from "../assets/svgs/maiz.gif";
import miel from "../assets/svgs/miel.gif";
import naranjaChina from "../assets/svgs/naranja-china.gif";
import papasFritas from "../assets/svgs/papas-fritas.gif";
import perfume from "../assets/svgs/perfume.gif";
import pizza from "../assets/svgs/pizza.gif";
import pluma from "../assets/svgs/pluma.gif";
import pocion from "../assets/svgs/pocion.gif";
import rata from "../assets/svgs/rata.gif";
import rosa from "../assets/svgs/rosa.gif";
import soda from "../assets/svgs/soda.gif";
import tapete from "../assets/svgs/tapete.png";
import tarot from "../assets/svgs/tarot.gif";
import telefono from "../assets/svgs/telefono.gif";
import vela from "../assets/svgs/vela.gif";
import dulces from "../assets/svgs/dulce.gif";
import cerveza from "../assets/svgs/cerveza.gif";

const objetosPorMision = {
  "Amarre de Amor": {
    correctos: [
      { imagen: velaRoja, nombre: "Velas rojas", correcto: true },
      { imagen: cabello, nombre: "Cabello de la persona amada", correcto: true },
      { imagen: perfume, nombre: "Perfume de rosas", correcto: true },
      { imagen: diamante, nombre: "Diamante naranja", correcto: true },
      { imagen: cuentoDeHadas, nombre: "Libro de hechizos de amor", correcto: true },
    ],
  },
  "Lectura de Cartas": {
    correctos: [
      { imagen: tarot, nombre: "Mazo de tarot", correcto: true },
      { imagen: tapete, nombre: "Tapete ritual", correcto: true },
      { imagen: vela, nombre: "Velas blancas", correcto: true },
      { imagen: diamante, nombre: "Diamante naranja", correcto: true },
      { imagen: bolaDeCristal, nombre: "Esfera de cuarzo", correcto: true },
    ],
  },
  "Baño de Florecimiento": {
    correctos: [
      { imagen: rosa, nombre: "Rosa Roja", correcto: true },
      { imagen: miel, nombre: "Miel", correcto: true },
      { imagen: hierba, nombre: "Hierbas dulces", correcto: true },
      { imagen: naranjaChina, nombre: "Cáscara de naranja", correcto: true },
      { imagen: pocion, nombre: "Agua de florida", correcto: true },
    ],
  },
  "Lectura de Tabaco": {
    correctos: [
      { imagen: cigarro, nombre: "Tabaco negro", correcto: true },
      { imagen: encendedor, nombre: "Encendedor ritual", correcto: true },
      { imagen: pluma, nombre: "Pluma de ave negra", correcto: true },
      { imagen: abanico, nombre: "Abanico de sahumo", correcto: true },
      { imagen: investigacion, nombre: "Lente para observar cenizas", correcto: true },
    ],
  },
  "Pago a la Tierra": {
    correctos: [
      { imagen: maiz, nombre: "Granos de maíz", correcto: true },
      { imagen: dulces, nombre: "Dulces andinos", correcto: true },
      { imagen: pocion, nombre: "Agua de florida", correcto: true },
      { imagen: cerveza, nombre: "Chicha ceremonial", correcto: true },
      { imagen: encendedor, nombre: "Brasero ancestral", correcto: true },
    ],
  },
  "Ritual de Limpieza": {
    correctos: [
      { imagen: pocion, nombre: "Extracto de ruda", correcto: true },
      { imagen: lavanda, nombre: "Lavanda seca", correcto: true },
      { imagen: vela, nombre: "Vela blanca", correcto: true },
      { imagen: abanico, nombre: "Abanico de sahumo", correcto: true },
      { imagen: hierba, nombre: "Hojas de coca", correcto: true },
    ],
  },
};

const objetosIncorrectosGenerales = [
  { imagen: pizza, nombre: "Rebanada de pizza", correcto: false },
  { imagen: telefono, nombre: "Teléfono sin batería", correcto: false },
  { imagen: rata, nombre: "Rata chismosa", correcto: false },
  { imagen: papasFritas, nombre: "Papas fritas", correcto: false },
  { imagen: soda, nombre: "Soda", correcto: false },
];

function obtenerObjetosPorMision(nombreMision) {
  const grupo = objetosPorMision[nombreMision];
  if (!grupo) return [];
  const incorrectos = objetosIncorrectosGenerales.sort(() => 0.5 - Math.random()).slice(0, 5);
  return [...grupo.correctos, ...incorrectos].sort(() => 0.5 - Math.random());
}

export default obtenerObjetosPorMision;