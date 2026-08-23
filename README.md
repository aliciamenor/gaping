# GAPING · Portfolio de Producto de Alicia Menor Gómez

> "GAP + ING: el hueco en el CV convertido en movimiento."

No sé programar. Esta web la construí con Claude Code.

Yo decidía qué construir, cómo se veía y qué contaba cada sección. La IA escribía el código. Cada cambio lo revisé yo: encontré bugs reales (uno rompía cualquier link directo a la web en producción), decidí cuándo algo no estaba a la altura y había que rehacerlo.

## 🎯 Qué es GAPING

Mi gap year, diseñado como un proyecto de producto: un año fuera de la oficina, filtrado siempre por el mismo framework de decisión de tres preguntas.

- **Impacto**: ¿esta experiencia aporta algo a alguien más, no solo a mí?
- **Nuevos Horizontes**: ¿me obliga a salir de un contexto, idioma o entorno que ya domino?
- **Growth**: ¿al terminarla, voy a saber o poder hacer algo que antes no?

11 experiencias reales (voluntariado internacional, hackathons de producto, liderazgo social, comunicación...) filtradas por esas tres preguntas, documentadas con el mismo proceso que usaría para lanzar cualquier producto: discovery, validación, MVP, lanzamiento y medición de resultados.

## 🚀 El proyecto, página a página

- [`/proyecto`](https://gaping.vercel.app/proyecto): las 11 experiencias, organizadas en los 3 ejes.
- [`/go-to-market`](https://gaping.vercel.app/go-to-market): cómo diseñé, validé y lancé GAPING como si fuera un producto.
- [`/aboutme`](https://gaping.vercel.app/aboutme): bio y skills, cada una enlazada a la experiencia real que la demuestra.

## 🛠 Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** + [shadcn/ui](https://ui.shadcn.com/) para los primitivos de UI
- **Framer Motion** para transiciones de página y animaciones de scroll
- **React Router** para el enrutado (SPA, sin backend)
- Fuentes autoalojadas vía `@fontsource` (Inter, Space Grotesk)
- Desplegado en **Vercel**, con analítica vía `@vercel/analytics`

No hay backend ni base de datos: todo el contenido (experiencias, insignias, testimonios) vive en TypeScript tipado dentro de `src/data/`, que funciona como el "CMS" del proyecto.

## 💻 Desarrollo local

Requiere Node.js y npm.

```bash
npm install
npm run dev      # servidor de desarrollo en localhost:8080
```

Otros comandos:

```bash
npm run build      # build de producción a dist/
npm run build:dev  # build en modo development (útil para depurar el bundle)
npm run preview    # sirve el build de producción en local
npm run lint        # eslint
```

No hay suite de tests configurada.

## 📦 Estructura del proyecto

```
src/
  pages/          # una página por ruta (Home, Projects, GoToMarket, WhoIAm, Contacto, ...)
  components/     # componentes compartidos (Header, Footer, animaciones, transiciones)
  components/ui/  # primitivos generados por shadcn/ui
  data/           # el "CMS": experiences.ts y badges.ts
  hooks/          # hooks compartidos (meta tags por página, detección de hover real, ...)
  assets/         # imágenes, logos, iconos
```

### Rutas

| Ruta | Página |
|---|---|
| `/` | Home |
| `/proyecto` | Case study del gap year (las 11 experiencias, organizadas en 3 ejes) |
| `/go-to-market` | El proceso de producto: cómo se diseñó, validó y lanzó el proyecto |
| `/aboutme` | Bio, skills y trayectoria |
| `/contact` | Contacto |
| `/experiencias/:id`, `/insignias/:id` | Detalle de una experiencia o insignia concreta |

`Home` se carga de forma eager; el resto de páginas usan `React.lazy` para mantener rápido el LCP de la home.

### El modelo de contenido

`src/data/experiences.ts` y `src/data/badges.ts` son la fuente de verdad de todo el contenido. Cada experiencia pertenece a un eje (`impact` | `horizons` | `growth`) y referencia las insignias que desbloqueó; las insignias referencian de vuelta las experiencias donde aparecen. Esa relación bidireccional es lo que alimenta la navegación cruzada entre `/experiencias/:id` y `/insignias/:id`.

Para añadir una experiencia o insignia nueva: se edita el archivo de datos correspondiente y, si lleva imagen, se coloca en `src/assets/experiences/` y se importa arriba del archivo. No hace falta tocar ninguna otra capa.

## ☁️ Despliegue

Cada push a `main` en GitHub dispara un redeploy automático en Vercel. `vercel.json` define:
- Redirects permanentes de las rutas antiguas (`/projects`, `/who-i-am`) a las actuales
- El rewrite de SPA (`/(.*) → /index.html`) necesario para que cualquier ruta cargada directamente (no solo navegando desde la home) resuelva correctamente en el lado del cliente

## 🔗 Más

- [gaping.vercel.app](https://gaping.vercel.app)
- [LinkedIn](https://www.linkedin.com/in/aliciamenorgomez/)
