# 🧾 API de Pedidos

API pequeña hecha en **Node.js** para la Evidencia 3 (Entorno reproducible).
Guarda pedidos de una cafetería con **datos ficticios** en memoria.

## Qué necesitas instalado

| Herramienta | Versión | Cómo revisar |
|-------------|---------|--------------|
| Node.js     | 20.6 o superior (probado con 22) | `node -v` |
| npm         | viene con Node | `npm -v` |

Este proyecto **no usa librerías externas**, así que no hay que descargar nada con `npm install`.
Aun así el archivo `package-lock.json` queda incluido para fijar las versiones.

## Pasos para ejecutarlo (desde cero)

```bash
# 1. Entra a la carpeta del proyecto
cd api-pedidos

# 2. Crea tu archivo de configuración
cp .env.example .env
#    (en Windows: copy .env.example .env)
#    Abre .env y cambia CLAVE_API por una clave tuya

# 3. Revisa que todo esté bien
npm run verificar

# 4. Arranca la API
npm start
```

Debe salir: `API de pedidos lista en http://localhost:3000`

## Comprobar que funciona

En otra terminal:

```bash
npm run salud      # health check: debe decir "La API responde"
npm test           # pruebas: deben pasar las 4
```

## Rutas

| Método | Ruta | Qué hace |
|--------|------|----------|
| GET  | `/salud`       | Dice si la API está viva |
| GET  | `/pedidos`     | Lista todos los pedidos |
| GET  | `/pedidos/1`   | Muestra un pedido |
| POST | `/pedidos`     | Crea un pedido (necesita el header `x-clave`) |

Ejemplo para crear un pedido:

```bash
curl -X POST http://localhost:3000/pedidos \
  -H "x-clave: LA_CLAVE_QUE_PUSISTE_EN_.env" \
  -d '{"cliente":"Ana","producto":"Café","cantidad":2}'
```

## 🔐 Secretos

- La clave vive solo en `.env`, y `.env` está en `.gitignore` (no se sube).
- `.env.example` solo trae nombres y valores falsos.
- Si pierdes la clave, simplemente inventa otra en tu `.env`.

## Errores comunes

| Mensaje | Qué pasa | Solución |
|---------|----------|----------|
| `node: .env: not found` | No existe el archivo `.env` | `cp .env.example .env` |
| `Falta la variable CLAVE_API` | El `.env` no tiene la clave | Agrega `CLAVE_API=algo` |
| `EADDRINUSE` | El puerto 3000 está ocupado | Cambia `PUERTO` en `.env` |
| `--env-file is not a valid option` | Node muy viejo | Instala Node 20.6+ (`nvm install 22`) |
| `❌ La API no responde` | No has arrancado la API | Ejecuta `npm start` en otra terminal |

## Estructura

```
api-pedidos/
├── src/            código de la API
├── scripts/        verificar-entorno.js y salud.js
├── test/           pruebas
├── .env.example    configuración de ejemplo
├── .gitignore      lo que no se sube
├── .nvmrc          versión de Node recomendada
├── package.json
└── package-lock.json
```
