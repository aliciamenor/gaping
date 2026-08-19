# Optimización mobile (UX/UI)

Objetivo: eliminar el texto cortado y overflow horizontal en móvil, manteniendo la identidad visual (teal #42767f, tipografías, animaciones). Cambios sólo de presentación — sin tocar datos ni lógica.

## Diagnóstico (a partir del código actual)

1. **Home – Logo GAPING**: la palabra susurrada ("NUEVOS HORIZONTES") se posiciona absoluta con `whitespace-nowrap` bajo la letra N. En pantallas ≤400px se sale por la derecha y provoca scroll horizontal.
2. **Home – Hero**: el H1 usa `tracking-[4px]` y `text-[56px]` en móvil; con 6 letras cabe justo y crea tensión visual.
3. **Who I Am – Timeline**: el contenedor usa `pl-[112px]` con marcadores en `left-[-112px]` (88px logo). En 390px sólo quedan ~250px para el texto → títulos y descripciones se aprietan y algunas palabras largas se recortan visualmente.
4. **Who I Am – Propuesta de valor**: foto 260×340 + padding lateral 16px = 292px, quedan sólo ~98px de margen, la tarjeta roza el borde.
5. **Go To Market – Header**: H1 fijo `text-[64px]` (sin variante sm/md). "GO TO MARKET" con tracking por defecto ocupa >360px en 390 con padding.
6. **Go To Market – Timeline pasos**: número gigante `text-[80px]` en columna fija `w-[100px]` + `gap-8` + contenido → el título del paso `text-[36px]` desborda y se corta.
7. **Go To Market – Cuerpo**: tipografías de 20-22px en párrafos móviles son excesivas (regla de identidad ≥18px se respeta con 18px).
8. **Projects – Header / Filtros / Chips**: mismos patrones (H1 sin variante móvil, chips que se apilan mal).
9. **Global**: falta `overflow-x-hidden` de seguridad en `main` para evitar scroll lateral heredado del logo animado.

## Cambios por archivo

### `src/components/GapingLogo.tsx`
- Envolver el "word slot" con `max-w-[100vw] overflow-hidden` y clamp de fontSize (`clamp(11px, 3.2vw, 14px)`) para que la palabra nunca se salga del viewport.
- Reducir `letter-spacing` en móvil (`0.14em` <640px).
- Añadir `text-align:center` con `left:0;right:0` alternativo si `metrics.center + halfWord > containerWidth`, para clamp del transform en los extremos (evita que "NUEVOS HORIZONTES" bajo la N se salga).

### `src/pages/Home.tsx`
- H1: `text-[44px] sm:text-[72px] md:text-[110px] lg:text-[140px]`, `tracking-[2px] sm:tracking-[4px] md:tracking-[6px]`.
- Sección hero: `overflow-hidden` ya está; añadir `px-5 sm:px-4` para más aire lateral en móvil.
- Cards: `p-8 sm:p-10`, títulos `text-[24px] sm:text-[28px]`.

### `src/pages/WhoIAm.tsx`
- Timeline responsive: en móvil pasar a layout sin overhang negativo — `pl-[64px] sm:pl-[112px]`, marcador `w-[52px] h-[52px] sm:w-[88px] sm:h-[88px]` en `left-[-64px] sm:left-[-112px]`, línea vertical en `left-[22px] sm:left-[42px]`. Logo interior `w-10 sm:w-16`.
- Títulos de item `text-[18px] sm:text-[22px]`, descripciones `text-[15px] sm:text-base`, `break-words`.
- Propuesta de valor: foto móvil `w-[220px] h-[290px]`, título `text-[24px] sm:text-[36px]`, párrafo `text-base sm:text-[22px]`.
- Sección hero H1: añadir `tracking-tight` en móvil.
- Cards "Experiencia adicional": añadir `min-w-0` a items para permitir `break-words`.

### `src/pages/GoToMarket.tsx`
- H1: `text-[36px] sm:text-[48px] md:text-[64px]`, `tracking-tight sm:tracking-normal`, `leading-[1.05]`.
- Intro y párrafos: `text-base sm:text-[20px]` / `text-lg sm:text-[22px]`.
- Pasos timeline: columna numeración `w-[52px] sm:w-[100px] md:w-[140px]`, número `text-[44px] sm:text-[64px] md:text-[80px]`, `gap-4 sm:gap-8 md:gap-12`, línea vertical en `left-[26px] sm:left-[50px] md:left-[70px]`.
- Títulos de paso `text-[22px] sm:text-[28px] md:text-[36px]`, `leading-tight`.
- Cards internas: `p-5 sm:p-8`.

### `src/pages/Projects.tsx`
- H1 (revisar y aplicar mismo patrón `text-[36px] sm:text-[48px] md:text-[64px]`).
- Filtros: `flex-wrap gap-2`, chips `text-sm px-3 py-1.5`.
- Acordeón/columnas eje: `p-5 sm:p-8`, títulos `text-xl sm:text-2xl md:text-3xl`.

### `src/pages/Contacto.tsx`
- Auditar tipografías y aplicar mismo criterio (título hero + lista) para consistencia.

### `src/index.css` (global de seguridad)
- Añadir:
  ```css
  html, body { overflow-x: hidden; }
  main { overflow-x: clip; }
  ```
- Regla utilitaria para títulos: `.h-hero { text-wrap: balance; }` aplicada a los H1.

## Principios de diseño aplicados

- **Escala tipográfica responsive**: ratio ~1.4 entre breakpoints móvil→desktop; mínimo cuerpo 15px, máximo hero móvil 44px.
- **Padding lateral consistente**: 20px móvil / 16px desktop en secciones.
- **Sin overhang negativo en móvil**: los marcadores del timeline se ajustan al ancho real.
- **`min-w-0` + `break-words`** en items flex/grid para prevenir cortes de texto largo.
- **Balance visual**: `text-wrap: balance` en H1 para evitar viudas.

## Verificación

Tras implementar, capturaré screenshots del preview en 390×779 (viewport actual del usuario) de Home, Who I Am, Go To Market, Projects y Contact con Playwright headless para confirmar cero overflow y jerarquía correcta.
