// Revisa que el equipo tenga lo necesario ANTES de arrancar.
// Uso: npm run verificar

const fs = require("node:fs");

let todoBien = true;

function revisar(nombre, ok, ayuda) {
  console.log(`${ok ? "✅" : "❌"} ${nombre}`);
  if (!ok) {
    console.log(`   → ${ayuda}`);
    todoBien = false;
  }
}

const [mayor, menor] = process.versions.node.split(".").map(Number);
revisar(
  `Node.js ${process.versions.node} (se necesita 20.6 o superior)`,
  mayor > 20 || (mayor === 20 && menor >= 6),
  "Instala Node 22 desde https://nodejs.org o con: nvm install 22"
);

revisar(
  "Existe el archivo .env",
  fs.existsSync(".env"),
  "Crea el archivo con: cp .env.example .env"
);

revisar(
  "Existe package-lock.json",
  fs.existsSync("package-lock.json"),
  "Falta el archivo de bloqueo de versiones"
);

console.log(todoBien ? "\nEntorno listo 🎉" : "\nCorrige lo marcado con ❌");
process.exit(todoBien ? 0 : 1);
