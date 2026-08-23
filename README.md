# GAPING

No sé programar. Esta web la construí con Claude Code.

Yo decidía qué construir, cómo se veía y qué contaba cada sección. La IA escribía el código. Cada cambio lo revisé yo: encontré bugs reales (uno rompía cualquier link directo a la web en producción), decidí cuándo algo no estaba a la altura y había que rehacerlo.

Es el mismo case study que documenta la propia web: [gaping.vercel.app](https://gaping.vercel.app) cuenta cómo diseñé mi gap year como un proyecto de producto, con discovery, validación, MVP y medición de resultados. Este repo es la otra mitad de esa historia.

## Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** + [shadcn/ui](https://ui.shadcn.com/) para los primitivos de UI
- **Framer Motion** para transiciones de página y animaciones de scroll
- **React Router** para el enrutado (SPA, sin backend)
- Fuentes autoalojadas vía `@fontsource` (Inter, Space Grotesk)
- Desplegado en **Vercel**, con analítica vía `@vercel/analytics`

No hay backend ni base de datos: todo el contenido (experiencias, insignias, testimonios) vive en TypeScript tipado dentro de `src/data/`, que funciona como el "CMS" del proyecto.

## Empezar

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

## Estructura del proyecto

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

## Despliegue

Cada push a `main` en GitHub dispara un redeploy automático en Vercel. `vercel.json` define:
- Redirects permanentes de las rutas antiguas (`/projects`, `/who-i-am`) a las actuales
- El rewrite de SPA (`/(.*) → /index.html`) necesario para que cualquier ruta cargada directamente (no solo navegando desde la home) resuelva correctamente en el lado del cliente
