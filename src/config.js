// Lee la configuración desde las variables de entorno (archivo .env).
// Así el código no guarda ningún secreto.

const puerto = Number(process.env.PUERTO || 3000);
const claveApi = process.env.CLAVE_API;

if (!claveApi) {
  console.error("Falta la variable CLAVE_API.");
  console.error("Solución: copia .env.example como .env y ponle un valor.");
  process.exit(1);
}

module.exports = { puerto, claveApi };
