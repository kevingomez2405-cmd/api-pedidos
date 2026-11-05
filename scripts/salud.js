// Pregunta a la API si está viva (health check).
// Uso: npm run salud   (con la API corriendo en otra terminal)

const puerto = process.env.PUERTO || 3000;

fetch(`http://localhost:${puerto}/salud`)
  .then((r) => r.json())
  .then((datos) => {
    console.log("✅ La API responde:", datos);
  })
  .catch(() => {
    console.log("❌ La API no responde. ¿Ejecutaste 'npm start' en otra terminal?");
    process.exit(1);
  });
