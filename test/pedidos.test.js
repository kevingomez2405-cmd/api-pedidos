// Pruebas básicas. Se ejecutan con: npm test

const test = require("node:test");
const assert = require("node:assert");
const { crearApp } = require("../src/app");

const CLAVE = "clave-de-prueba";
let servidor;
let base;

test.before(async () => {
  servidor = crearApp(CLAVE);
  await new Promise((ok) => servidor.listen(0, ok)); // puerto libre al azar
  base = `http://localhost:${servidor.address().port}`;
});

test.after(() => servidor.close());

test("GET /salud responde ok", async () => {
  const r = await fetch(`${base}/salud`);
  assert.strictEqual(r.status, 200);
  assert.deepStrictEqual(await r.json(), { estado: "ok" });
});

test("GET /pedidos devuelve la lista", async () => {
  const r = await fetch(`${base}/pedidos`);
  const lista = await r.json();
  assert.ok(lista.length >= 3);
});

test("POST sin clave es rechazado", async () => {
  const r = await fetch(`${base}/pedidos`, { method: "POST", body: "{}" });
  assert.strictEqual(r.status, 401);
});

test("POST con clave crea el pedido", async () => {
  const r = await fetch(`${base}/pedidos`, {
    method: "POST",
    headers: { "x-clave": CLAVE },
    body: JSON.stringify({ cliente: "Prueba", producto: "Té", cantidad: 1 }),
  });
  assert.strictEqual(r.status, 201);
});
