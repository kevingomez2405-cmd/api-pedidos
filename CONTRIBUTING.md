# 🤝 Guía para trabajar en equipo

Reglas cortas para que el equipo no se pise el trabajo. Todo se puede comprobar.

## 1. Ramas

Trabajamos con **una rama principal (`main`) y ramas cortas** para cada tarea.

| Rama | Para qué | Ejemplo |
|------|----------|---------|
| `main` | Código estable. **Nadie sube directo aquí.** | `main` |
| `feature/<tarea>` | Una función nueva | `feature/eliminar-pedido` |
| `fix/<error>` | Arreglar un error | `fix/mensaje-404` |
| `docs/<tema>` | Solo documentación | `docs/readme-errores` |

Reglas: nombres en minúscula, con guiones, sin espacios. Una rama vive pocos días.

## 2. Commits

Formato: `tipo: qué hice` (en infinitivo o pasado, pero siempre igual en todo el equipo).

| Tipo | Cuándo |
|------|--------|
| `feat` | Función nueva |
| `fix` | Arreglo de un error |
| `docs` | Documentación |
| `test` | Pruebas |
| `chore` | Configuración o tareas varias |

✅ Bien: `feat: agregar ruta para eliminar pedidos`
❌ Mal: `cambios`, `arreglos varios`, `listo`

Un commit = **una sola idea** que se pueda explicar en una frase y revertir sola.

## 3. Condiciones para integrar (merge a `main`)

Un pull request se puede integrar solo si:

1. `npm run revisar` pasa (sintaxis, reglas de estilo y pruebas)
2. Tiene **al menos 1 revisión** de otra persona (nunca se aprueba su propio PR)
3. Los comentarios de la revisión están resueltos
4. No hay conflictos con `main` (si los hay, se resuelven y se **vuelven a probar**)
5. Si se cambia una ruta o validación, hay una prueba que lo cubra

> ❌ No se fusiona con pruebas fallidas.

## 4. Estándar de código

| # | Regla | Ejemplo bien ✅ | Ejemplo mal ❌ | ¿Cómo se comprueba? |
|---|-------|----------------|---------------|---------------------|
| 1 | Usar `const` o `let`, nunca `var` | `const puerto = 3000;` | `var puerto = 3000;` | `npm run revisar` |
| 2 | Nombres en español, claros y en `camelCase` | `crearApp`, `claveApi` | `x`, `crear_app` | Revisión en el PR |
| 3 | Comillas dobles y punto y coma | `"hola";` | `'hola'` | Revisión en el PR |
| 4 | Sin `debugger` en el código | (nada) | `debugger;` | `npm run revisar` |
| 5 | Nunca imprimir ni escribir secretos | `console.log("Listo")` | `console.log(claveApi)` | `npm run revisar` |
| 6 | Toda ruta que cambia datos pide la clave | `x-clave` revisado | POST/DELETE sin revisar | Prueba automática + revisión |
| 7 | Sangría de 2 espacios | ver `.editorconfig` | tabulaciones mezcladas | El editor (`.editorconfig`) |

## 5. Estructura del proyecto

```
src/       código de la API
scripts/   herramientas (verificar-entorno, salud, revisar)
test/      pruebas (un archivo por tema, terminan en .test.js)
.github/   plantillas de incidencias y pull request
```

## 6. Cómo se hace una revisión (review)

El revisor **no opina de gustos**. Revisa 4 cosas y deja evidencia:

1. **Intención:** ¿hace lo que dice el PR?
2. **Comportamiento:** lo ejecuté y funciona (pegar el comando y el resultado)
3. **Riesgo:** ¿puede dejar entrar a alguien sin permiso, borrar datos o filtrar un secreto?
4. **Pruebas:** ¿hay pruebas y pasan?

Formato del comentario: **Hallazgo → Evidencia → Impacto → Propuesta**

Ejemplo:
> **Hallazgo:** `DELETE /pedidos/1` funciona sin enviar la clave.
> **Evidencia:** `curl -X DELETE localhost:3000/pedidos/1` → `HTTP 200`
> **Impacto:** cualquiera puede borrar pedidos.
> **Propuesta:** validar `x-clave` como en el POST y agregar una prueba.

## 7. Conflictos

Pasan cuando dos ramas cambian las mismas líneas. Pasos:

1. Traer `main` a su rama: `git merge main`
2. Abrir el archivo y buscar `<<<<<<<`, `=======` y `>>>>>>>`
3. Dejar un resultado que **conserve la intención de las dos personas**
4. `git add` del archivo, `git commit`
5. Correr `npm run revisar` otra vez antes de subir
