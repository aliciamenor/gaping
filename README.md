# GAPING · Portfolio de Alicia Menor Gómez

> La historia de cómo pasé de innovación en FMCG a construir producto digital con IA.

Un año fuera de la oficina, diseñado como proyecto de desarrollo profesional: **Discovery · Priorización · Iteración** — el mismo proceso que usaría para construir cualquier producto.

## 🎯 Qué es GAPING

Un año fuera de la oficina (el GAP) para explorar, aportar y aprender experimentando en distintos contextos, y así convertir experiencias en nuevas skills. No había roadmap perfecto, ni respuestas cerradas. Solo un framework para tomar decisiones y un objetivo: prepararme mejor para el mercado laboral y el futuro del producto digital.

Tres ejes para tomar decisiones:

- **Impacto**: ¿aporta algo a alguien más, no solo a mí?
- **Nuevos Horizontes**: ¿me saca de un contexto, idioma o entorno que ya domino?
- **Growth**: ¿al terminarla, sé o puedo hacer algo que antes no?

Documentadas con el mismo proceso que usaría para lanzar cualquier producto: discovery, validación, MVP, lanzamiento y medición de resultados.

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
- Desplegado en **Vercel**, con analítica vía `@vercel/analytics` y [PostHog](https://posthog.com/)

Sin backend ni base de datos: todo el contenido vive en TypeScript tipado dentro de `src/data/`, que funciona como el "CMS" del proyecto.

## 💻 Desarrollo local

```bash
npm install
npm run dev      # localhost:8080
npm run build    # build de producción
npm run lint     # eslint
```

No hay suite de tests configurada.

## 📦 Estructura del proyecto

```
src/
  pages/          # una página por ruta (Home, Projects, GoToMarket, WhoIAm, Contacto, ...)
  components/     # componentes compartidos (Header, Footer, animaciones, transiciones)
  components/ui/  # primitivos generados por shadcn/ui
  data/           # el "CMS": experiences.ts, badges.ts y datos tipados afines
  hooks/          # hooks compartidos (meta tags por página, detección de hover real, ...)
  lib/            # utilidades compartidas (tracking de eventos de PostHog)
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

### El modelo de contenido

`src/data/experiences.ts` y `src/data/badges.ts` son la fuente de verdad de todo el contenido. Cada experiencia pertenece a un eje y referencia las insignias que desbloqueó, y viceversa — esa relación bidireccional alimenta la navegación cruzada entre `/experiencias/:id` y `/insignias/:id`.

## ☁️ Despliegue

Cada push a `main` dispara un redeploy automático en Vercel. `vercel.json` gestiona los redirects de rutas antiguas y el rewrite de SPA necesario para que cualquier ruta cargue directamente sin dar 404.

## 🔗 Más

- [gaping.vercel.app](https://gaping.vercel.app)
- [LinkedIn](https://www.linkedin.com/in/aliciamenorgomez/)
