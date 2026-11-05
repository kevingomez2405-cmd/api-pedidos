// Comprobaciones antes de integrar un cambio.
// Uso: npm run revisar
// Revisa: 1) sintaxis  2) reglas del estándar  3) pruebas

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

// Reglas del estándar (CONTRIBUTING.md, sección 4) que se pueden revisar solas
const reglas = [
  { nombre: "No usar var", patron: /\bvar\s+\w+/ },
  { nombre: "No dejar debugger", patron: /\bdebugger\b/ },
  { nombre: "No imprimir la clave", patron: /console\.\w+\([^)]*claveApi/ },
];

// Busca todos los .js dentro de las carpetas indicadas
function buscarArchivos(carpeta) {
  let lista = [];
  for (const nombre of fs.readdirSync(carpeta)) {
    const ruta = path.join(carpeta, nombre);
    if (fs.statSync(ruta).isDirectory()) lista = lista.concat(buscarArchivos(ruta));
    else if (ruta.endsWith(".js")) lista.push(ruta);
  }
  return lista;
}

let errores = 0;
const archivos = ["src", "scripts", "test"].flatMap(buscarArchivos);

console.log("1) Revisando sintaxis y reglas...");
for (const archivo of archivos) {
  try {
    execSync(`node --check "${archivo}"`, { stdio: "pipe" });
  } catch {
    console.log(`❌ Error de sintaxis en ${archivo}`);
    errores++;
    continue;
  }
  // El propio revisor no se revisa a sí mismo (contiene los patrones)
  if (archivo.endsWith("revisar.js")) continue;
  const lineas = fs.readFileSync(archivo, "utf8").split("\n");
  lineas.forEach((linea, i) => {
    for (const regla of reglas) {
      if (regla.patron.test(linea)) {
        console.log(`❌ ${regla.nombre}: ${archivo}:${i + 1}`);
        errores++;
      }
    }
  });
}
if (errores === 0) console.log(`✅ ${archivos.length} archivos sin problemas`);

console.log("\n2) Corriendo pruebas...");
try {
  execSync("node --test", { stdio: "inherit" });
} catch {
  console.log("❌ Hay pruebas que fallan");
  errores++;
}

console.log(errores === 0 ? "\n🎉 Todo bien, se puede integrar" : "\n⛔ NO se puede integrar: corrige lo marcado");
process.exit(errores === 0 ? 0 : 1);
