// Punto de entrada: arranca el servidor.

const { puerto, claveApi } = require("./config");
const { crearApp } = require("./app");

crearApp(claveApi).listen(puerto, () => {
  console.log(`API de pedidos lista en http://localhost:${puerto}`);
});
