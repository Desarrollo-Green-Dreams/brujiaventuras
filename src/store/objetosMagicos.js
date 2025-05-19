const objetosPorMision = {
  "Amarre de Amor": {
    correctos: [
      { emoji: "🕯️", nombre: "Velas rojas", correcto: true },
      { emoji: "🧬", nombre: "Cabello de la persona amada", correcto: true },
      { emoji: "🌹", nombre: "Perfume de rosas", correcto: true },
      { emoji: "🧿", nombre: "Piedra de cuarzo naranja", correcto: true },
      { emoji: "📖", nombre: "Libro de hechizos de amor", correcto: true },
    ],
  },
  "Lectura de Cartas": {
    correctos: [
      { emoji: "🃏", nombre: "Mazo de tarot", correcto: true },
      { emoji: "🧺", nombre: "Tapete ritual", correcto: true },
      { emoji: "🕯️", nombre: "Velas blanca", correcto: true },
      { emoji: "🧿", nombre: "Piedra de cuarzo naranja", correcto: true },
      { emoji: "🔮", nombre: "Esfera de cuarzo", correcto: true },
    ],
  },
  "Baño de Florecimiento": {
    correctos: [
      { emoji: "🌸", nombre: "Pétalos de rosa", correcto: true },
      { emoji: "🍯", nombre: "Miel", correcto: true },
      { emoji: "🌿", nombre: "Hierbas dulces", correcto: true },
      { emoji: "🍊", nombre: "Cáscara de naranja", correcto: true },
      { emoji: "💧", nombre: "Agua de florida", correcto: true },
    ],
  },
  "Lectura de Tabaco": {
    correctos: [
      { emoji: "🚬", nombre: "Tabaco negro", correcto: true },
      { emoji: "🔥", nombre: "Encendedor ritual", correcto: true },
      { emoji: "🪶", nombre: "Pluma de ave negra", correcto: true },
      { emoji: "🌬️", nombre: "Abanico de sahumo", correcto: true },
      { emoji: "🔍", nombre: "Lente para observar cenizas", correcto: true },
    ],
  },
  "Pago a la Tierra": {
    correctos: [
      { emoji: "🌽", nombre: "Granos de maíz", correcto: true },
      { emoji: "🍬", nombre: "Dulces andinos", correcto: true },
      { emoji: "🍃", nombre: "Hojas de coca", correcto: true },
      { emoji: "🥤", nombre: "Chicha ceremonial", correcto: true },
      { emoji: "🔥", nombre: "Brasero ancestral", correcto: true },
    ],
  },
  "Ritual de Limpieza": {
    correctos: [
      { emoji: "🌿", nombre: "Extracto de ruda", correcto: true },
      { emoji: "💜", nombre: "Lavanda seca", correcto: true },
      { emoji: "🕯️", nombre: "Vela negra", correcto: true },
      { emoji: "🌬️", nombre: "Abanico de sahumo", correcto: true },
      { emoji: "💧", nombre: "Agua de florida", correcto: true },
    ],
  },
};

const objetosIncorrectosGenerales = [
  { emoji: "🍕", nombre: "Rebanada de pizza", correcto: false },
  { emoji: "📱", nombre: "Teléfono sin batería", correcto: false },
  { emoji: "🐀", nombre: "Rata chismosa", correcto: false },
  { emoji: "🍟", nombre: "Papas fritas", correcto: false },
  { emoji: "🥤", nombre: "Soda", correcto: false },
];

function obtenerObjetosPorMision(nombreMision) {
  const grupo = objetosPorMision[nombreMision];
  if (!grupo) return [];
  const incorrectos = objetosIncorrectosGenerales.sort(() => 0.5 - Math.random()).slice(0, 5);
  return [...grupo.correctos, ...incorrectos].sort(() => 0.5 - Math.random());
}

export default obtenerObjetosPorMision;
