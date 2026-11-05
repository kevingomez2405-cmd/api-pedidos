// Aquí están las rutas de la API. Usa solo módulos que ya trae Node.

const http = require("node:http");
const { pedidos } = require("./datos");

function responder(res, codigo, contenido) {
  res.writeHead(codigo, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(contenido));
}

function leerCuerpo(req) {
  return new Promise((resolve) => {
    let texto = "";
    req.on("data", (trozo) => (texto += trozo));
    req.on("end", () => {
      try {
        resolve(JSON.parse(texto));
      } catch {
        resolve(null);
      }
    });
  });
}

function crearApp(claveApi) {
  return http.createServer(async (req, res) => {
    const { method: metodo, url } = req;

    // 1. Revisar que el servicio está vivo
    if (metodo === "GET" && url === "/salud") {
      return responder(res, 200, { estado: "ok" });
    }

    // 2. Ver todos los pedidos
    if (metodo === "GET" && url === "/pedidos") {
      return responder(res, 200, pedidos);
    }

    // 3. Ver un pedido por su id
    if (metodo === "GET" && url.startsWith("/pedidos/")) {
      const id = Number(url.split("/")[2]);
      const pedido = pedidos.find((p) => p.id === id);
      if (!pedido) return responder(res, 404, { error: "Pedido no encontrado" });
      return responder(res, 200, pedido);
    }

    // 4. Crear un pedido (necesita la clave secreta)
    if (metodo === "POST" && url === "/pedidos") {
      if (req.headers["x-clave"] !== claveApi) {
        return responder(res, 401, { error: "Clave incorrecta" });
      }
      const datos = await leerCuerpo(req);
      if (!datos || !datos.cliente || !datos.producto || !datos.cantidad) {
        return responder(res, 400, { error: "Faltan cliente, producto o cantidad" });
      }
      const nuevo = {
        id: pedidos.length + 1,
        cliente: datos.cliente,
        producto: datos.producto,
        cantidad: datos.cantidad,
      };
      pedidos.push(nuevo);
      return responder(res, 201, nuevo);
    }

    responder(res, 404, { error: "Ruta no encontrada" });
  });
}

module.exports = { crearApp };
