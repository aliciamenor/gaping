# Remix of Gaping v3

Crea una web moderna y minimalista para documentar mi gap year llamada "GAPING - Gap Year en Movimiento".

## ESTRUCTURA DE NAVEGACIÓN:
- Home
- Projecto
- Go to market
- About me
- Contacto

## DISEÑO VISUAL:
- Estética moderna con gradientes vibrantes
- Paleta de colores:
  * Verde (#10b981) para "Impacto"
  * Naranja (#f59e0b) para "Nuevos Horizontes"
  * Morado (#8b5cf6) para "Growth"
  * Fondo gris claro (#f9fafb) con secciones en blanco
- Usar emojis grandes como iconografía principal
- Espacios generosos entre secciones
- Responsive (mobile-first)

## TIPOGRAFÍA:
- Fuente para texto: 'Inter' (weights: 400, 500, 600, 700)
  * Body text: Inter Regular (400)
  * Subtítulos: Inter Medium (500)
  * Énfasis: Inter SemiBold (600)
  
- Fuente para títulos: 'Space Grotesk' (weights: 500, 700)
  * H1: Space Grotesk Bold (700), 48-64px
  * H2: Space Grotesk Bold (700), 36-48px
  * H3: Space Grotesk Medium (500), 24-32px

Importar desde Google Fonts:
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');

Typography hierarchy: h1 (48-64px), h2 (36-48px), h3 (24-32px), body (16px)

## HEADER (sticky en todas las páginas):
- Logo "GAPING" a la izquierda (Space Grotesk Bold)
- Menú de navegación a la derecha: Home | About | Los 3 Ejes | Insignias | Experiencias | Contacto
- Hamburger menu en móvil
- Indicador visual de página activa (underline o color diferente)
- Fondo blanco con sombra sutil

## PÁGINA HOME:

### Hero Section:
- Título grande: "GAPING" (Space Grotesk Bold, 64px)
- Subtítulo: "Gap Year en Movimiento" (Inter Regular, 24px)
- Dos preguntas destacadas (Inter Medium, 20px):
  * "¿Quién soy yo sin mis etiquetas?"
  * "¿A qué dedicaría mi vida si no importara el dinero?"
- Breve descripción (Inter Regular, 18px): "Gaping surge como un proyecto de innovación personal de salir de la oficina (zona de confort) y ampliar mi visión del mundo a la vez que busco aportar a la sociedad."
- CTA: Botón "Explorar mi viaje" que hace scroll a la siguiente sección

### Sección: Los 3 Ejes
Título: "MIS 3 EJES" (Space Grotesk Bold, 48px)

Tres tarjetas grandes clicables en grid (responsive: 1 col en móvil, 3 cols en desktop):

1. IMPACTO 🎯
   - Emoji grande: 🎯
   - Título: "IMPACTO" (Space Grotesk Bold, 28px)
   - Descripción corta: "Generar cambio social real"
   - Background: gradient verde suave
   - Hover: elevación con shadow
   - Link a página de detalle

2. NUEVOS HORIZONTES 🌍
   - Emoji grande: 🌍
   - Título: "NUEVOS HORIZONTES" (Space Grotesk Bold, 28px)
   - Descripción corta: "Expandir límites culturales"
   - Background: gradient naranja suave
   - Hover: elevación con shadow
   - Link a página de detalle

3. GROWTH 📈
   - Emoji grande: 📈
   - Título: "GROWTH" (Space Grotesk Bold, 28px)
   - Descripción corta: "Crecer desde dentro"
   - Background: gradient morado suave
   - Hover: elevación con shadow
   - Link a página de detalle

### Sección: Insignias
- Título: "MIS INSIGNIAS" (Space Grotesk Bold, 48px)
- Subtítulo: "Cada insignia representa un aspecto trabajado durante mi gap year" (Inter Regular, 18px)

- Grid flexible con las siguientes insignias (emojis grandes 60px, clickeables, responsive):
  🎒 Vida mochilera
  ✈️ Billete de ida solo
  🏜️ Vivir en medio de la nada
  ☕ Cafés con gente
  🌱 Emprendimiento de impacto
  🔨 Construir
  🌊 Exponerme
  🤲 Ponerme al servicio
  👥 Aprender de liderazgo
  😔 Frustración y conectar
  🧘 Soledad
  🛤️ No hay camino correcto
  🚫 No compararse
  ⚡ Ir contracorriente

- Cada insignia en una tarjeta blanca con:
  * Emoji centrado
  * Nombre debajo (Inter Medium, 14px)
  * Hover: scale 1.1 + shadow
  * Click: navega a página de detalle de esa insignia

- Botón al final: "Ver todas las insignias" → link a página Insignias

### Sección: Experiencias Destacadas
- Título: "EXPERIENCIAS DESTACADAS" (Space Grotesk Bold, 48px)

Grid 2x2 (responsive: 1 col en móvil) con 4 tarjetas de experiencias:

1. Voluntariado Lituania 🏕️
   - Emoji grande: 🏕️
   - Título: "Voluntariado Lituania" (Space Grotesk Medium, 24px)
   - Subtítulo: "European Solidarity Corps" (Inter Regular, 14px)
   - Badge del eje: "🎯 Impacto" (fondo verde suave)
   - Insignias relacionadas: 🤲 🧘 🌊 🏜️ 😔 (pequeñas, 24px)
   - Hover: elevación
   - Click: navega a detalle

2. Ruta Inti 2024 🗺️
   - Emoji grande: 🗺️
   - Título: "Ruta Inti 2024"
   - Subtítulo: "Viaje de innovación"
   - Badge: "🌍 Nuevos Horizontes" (fondo naranja)
   - Insignias: ✈️ 🎒 ☕ 🌊 ⚡

3. Somostalita 💡
   - Emoji: 💡
   - Título: "Somostalita"
   - Subtítulo: "Estrategia de comunicación"
   - Badge: "🎯 Impacto" (verde)
   - Insignias: 🌱 🔨 ☕

4. Curso Liderazgo Social 🎓
   - Emoji: 🎓
   - Título: "Curso Liderazgo Social"
   - Subtítulo: "Universidad Francisco de Vitoria"
   - Badge: "📈 Growth" (morado)
   - Insignias: 👥 🌱 🛤️

- Botón: "Ver todas las experiencias" → link a página Experiencias

## PÁGINA ABOUT:
- Título principal: "¿QUIÉN SOY YO SIN MIS ETIQUETAS?" (Space Grotesk Bold, 48px)
- Foto personal circular centrada (placeholder de 200x200px con gradient)
- Introducción breve (Inter Regular, 18px, max-width 800px centrado)

### Timeline con tres columnas (responsive: stack en móvil):

**STUDY:**
- Título: "STUDY" (Space Grotesk Bold, 28px, color: #667eea)
- Items en tarjetas con bordes izquierdos gruesos azules:
  * Publicidad, PR + Marketing en ESIC
  * Erasmus+ en Vern University
  * Premio Excelencia + Cuadro de Honor ESIC
  * TFG colaboración Fundación Ecomar (U4Impact)

**WORK:**
- Título: "WORK" (Space Grotesk Bold, 28px, color: #667eea)
- Items:
  * Marketing en Revista IPMARK + Premios Best!N Food
  * PR + crisis en OmnicomPRGroup
  * Innovation Specialist en Mahou San Miguel
  * Seleccionada en BYG Professional Accelerator

**EXTRA:**
- Título: "EXTRA" (Space Grotesk Bold, 28px, color: #667eea)
- Items:
  * Voluntariado en UK (Misioneras Caridad)
  * Voluntariado en Francia (Lourdes)
  * Entrevista en Podcast Petarlo Laboralmente
  * Premios de pintura y Premio Accésit OEPM

### Sección de transición:
- Frase destacada (Space Grotesk Medium, 32px, color: #667eea, italic):
  "Y si me doy la oportunidad de explorar NUEVAS REALIDADES"
- CTA: Botón "Ver mi Gap Year" → link a Los 3 Ejes

## PÁGINA LOS 3 EJES:
- Título principal: "LOS 3 EJES DE MI GAP YEAR" (Space Grotesk Bold, 48px, centrado)

Tres secciones detalladas con espacio generoso entre ellas:

### EJE 1: IMPACTO 🎯
- Contenedor con fondo verde suave (#f0fdf4) y padding generoso
- Emoji grande: 🎯 (80px)
- Título: "IMPACTO" (Space Grotesk Bold, 40px)
- Objetivo (Inter Regular, 20px): "Entender cómo la innovación puede generar impacto social real, aplicando mi mentalidad de innovación y mis conocimientos de marketing a proyectos con propósito."

**Acciones realizadas:**
Título subsección: "Acciones" (Space Grotesk Medium, 24px)
Lista con bullets (Inter Regular, 18px):
- Voluntariado internacional con el European Solidarity Corps en Lituania
- Estrategia de comunicación y marketing para la ONG Somostalita
- Representación Ruta Inti en COMHiS (Salamanca Tech Summit)
- Proyecto del curso de Liderazgo Social "Ven y Verás"

**Aprendizajes clave:**
Título subsección: "Aprendizajes clave" (Space Grotesk Medium, 24px)
Caja con fondo blanco, padding, border-radius:
- Cambiar visión de voluntariado y buscar la horizontalidad en las relaciones
- Entender que generar impacto va más allá del tercer sector
- Mentalidad más abierta y empática
- Entender mejor el contexto social, cultural y geográfico en las relaciones interpersonales

### EJE 2: NUEVOS HORIZONTES 🌍
- Contenedor con fondo naranja suave (#fff7ed)
- Emoji: 🌍 (80px)
- Título: "NUEVOS HORIZONTES" (Space Grotesk Bold, 40px)
- Objetivo (Inter Regular, 20px): "Expandir mi mirada sobre el mundo, salir de mi zona de confort y observar cómo la innovación ocurre en contextos culturales, tecnológicos y sociales distintos."

**Acciones:**
- Participación en Ruta Inti 2024
- Backpacking
- Turismo de comunidades
- Camino de Santiago en Ven y Verás (100 personas de 26 países durante una semana)

**Aprendizajes:**
- Viajar con mochila me enseñó a desprenderme de lo material y que muy poco es esencial
- Adaptabilidad y resiliencia
- Sensibilidad social
- Comunicación intercultural, sin necesidad de tener un mismo idioma

### EJE 3: GROWTH 📈
- Contenedor con fondo morado suave (#faf5ff)
- Emoji: 📈 (80px)
- Título: "GROWTH" (Space Grotesk Bold, 40px)
- Objetivo (Inter Regular, 20px): "Potenciar mi crecimiento personal y profesional, cultivando autoconocimiento, liderazgo y visión estratégica para mi siguiente etapa como profesional de innovación."

**Acciones:**
- Formación en Transformación Digital (ESDEN) y liderazgo social
- Mentoring
- Seminarios de liderazgo (Lideremos, UIMP x Fundación Tatiana, Fundación Eduarda Justo)

**Aprendizajes:**
- Identificar mejor desde dónde tomo las decisiones
- Aceptar que no vas a estar 100% seguro de una decisión y que toda decisión tiene un precio (ganancia/renuncia)
- Ser paciente con uno mismo y la búsqueda de un propósito
- Aprendizaje constante

## PÁGINA INSIGNIAS:
- Título: "MIS INSIGNIAS" (Space Grotesk Bold, 48px)
- Intro (Inter Regular, 18px, max-width 800px): "Cada insignia representa un aspecto, vivencia o concepto que trabajé durante mi gap year. Algunas aparecieron en una sola experiencia intensa, otras fueron emergiendo poco a poco en diferentes momentos."

Organización por categorías con secciones visuales:

### 💼 INSIGNIAS DE ACCIÓN
- Título categoría: "💼 INSIGNIAS DE ACCIÓN" (Space Grotesk Bold, 32px)
- Fondo: verde muy suave
- Grid 2x2 (responsive):
  * 🎒 Vida mochilera
  * 🔨 Construir
  * 🌱 Emprendimiento de impacto
  * 🤲 Ponerme al servicio

### 🌍 INSIGNIAS DE MOVIMIENTO
- Título: "🌍 INSIGNIAS DE MOVIMIENTO" (Space Grotesk Bold, 32px)
- Fondo: naranja muy suave
- Grid:
  * ✈️ Billete de ida solo
  * 🏜️ Vivir en medio de la nada
  * 🌊 Exponerme
  * ⚡ Ir contracorriente

### 💭 INSIGNIAS DE CONEXIÓN
- Título: "💭 INSIGNIAS DE CONEXIÓN" (Space Grotesk Bold, 32px)
- Fondo: azul muy suave
- Grid:
  * ☕ Cafés con gente
  * 👥 Aprender de liderazgo

### 🧠 INSIGNIAS DE TRANSFORMACIÓN
- Título: "🧠 INSIGNIAS DE TRANSFORMACIÓN" (Space Grotesk Bold, 32px)
- Fondo: morado muy suave
- Grid:
  * 😔 Frustración y conectar conmigo
  * 🧘 Soledad
  * 🛤️ No hay camino correcto
  * 🚫 No compararse

Cada tarjeta de insignia muestra:
- Emoji grande (60px)
- Nombre (Space Grotesk Medium, 20px)
- Número de experiencias relacionadas (Inter Regular, 14px, color gris)
- Hover: elevación + scale
- Click: navega a página de detalle

### Página de detalle de insignia (modal o página separada):
Al hacer click en una insignia:
- Botón "← Volver a Insignias"
- Emoji muy grande centrado (120px)
- Nombre de la insignia (Space Grotesk Bold, 56px)
- Descripción del aprendizaje/concepto (Inter Regular, 20px, max-width 700px)
- Sección: "Experiencias relacionadas" (Space Grotesk Bold, 32px)
- Grid de tarjetas mini de experiencias que tienen esta insignia:
  * Emoji de la experiencia
  * Nombre de la experiencia
  * Subtítulo
  * Hover y click funcional
- Sección: "Insignias relacionadas" (otras que aparecen en experiencias similares)

## PÁGINA EXPERIENCIAS:
- Título: "MIS EXPERIENCIAS" (Space Grotesk Bold, 48px)
- Subtítulo (Inter Regular, 18px): "Cada experiencia de mi gap year me enseñó algo único. Aquí están todas las vivencias que me transformaron."

### Filtros:
Tabs o botones de filtro (Inter Medium, 16px):
- Todas
- 🎯 Impacto
- 🌍 Nuevos Horizontes
- 📈 Growth

### Secciones por eje (mostrables/ocultables según filtro):

**🎯 EXPERIENCIAS DE IMPACTO**
Título sección: "🎯 EXPERIENCIAS DE IMPACTO" (Space Grotesk Bold, 36px, color verde)

Lista de tarjetas horizontales (responsive: stack en móvil):
1. Voluntariado Lituania (European Solidarity Corps)
   - Emoji: 🏕️ (50px)
   - Título: "Voluntariado Lituania" (Space Grotesk Medium, 24px)
   - Subtítulo: "European Solidarity Corps" (Inter Regular, 14px)
   - Insignias inline: 🤲 🧘 🌊 🏜️ 😔 (30px cada uno)
   - Click: detalle

2. Somostalita
   - Emoji: 💡
   - Subtítulo: "Estrategia de comunicación y marketing"
   - Insignias: 🌱 🔨 ☕

3. Episodio podcast Menos30
   - Emoji: 🎙️
   - Insignias: 🌊 ⚡ 🛤️ 🚫

4. Representante Ruta Inti
   - Emoji: 🚶
   - Insignias: 🌊 👥 ☕

5. Congreso COMHiS (Salamanca Tech Summit)
   - Emoji: 🏛️
   - Insignias: 🌊 🌱 ☕

6. Proyecto "Ven y Verás" (Curso Liderazgo Social)
   - Emoji: 📚
   - Insignias: 🤲 👥 🔨

**🌍 EXPERIENCIAS DE NUEVOS HORIZONTES**
Título: "🌍 EXPERIENCIAS DE NUEVOS HORIZONTES" (Space Grotesk Bold, 36px, color naranja)

1. Ruta Inti 2024
   - Emoji: 🗺️
   - Subtítulo: "Viaje de innovación"
   - Insignias: ✈️ 🎒 ☕ 🌊 ⚡

2. Backpacking
   - Emoji: 🎒
   - Subtítulo: "Viaje mochilero"
   - Insignias: 🎒 🏜️ ✈️ 🧘 🚫

3. Camino de Santiago (Ven y Verás)
   - Emoji: 🚶
   - Subtítulo: "100 personas, 26 países"
   - Insignias: 🎒 👥 🤲 ☕ 😔

4. Turismo de comunidades
   - Emoji: 🌐
   - Insignias: 🤲 ☕ 🌊

**📈 EXPERIENCIAS DE GROWTH**
Título: "📈 EXPERIENCIAS DE GROWTH" (Space Grotesk Bold, 36px, color morado)

1. Curso Transformación Digital (ESDEN)
   - Emoji: 💻
   - Insignias: 🔨 👥 🛤️

2. Curso Liderazgo Social (UFV)
   - Emoji: 🎓
   - Insignias: 👥 🌱 🛤️

3. Mentoring
   - Emoji: 🤝
   - Insignias: 👥 😔 🚫

4. Findelider
   - Emoji: 🎯
   - Insignias: 👥 ☕ 🛤️

5. Cenas Nova C-Level
   - Emoji: 🍽️
   - Insignias: ☕ 👥 🌊

6. III Encuentro Liderazgo Cívico (Ética & IA)
   - Emoji: 📊
   - Insignias: 👥 ☕ 🌱

### Página de detalle de experiencia:
Al hacer click en una experiencia:
- Botón "← Volver a Experiencias"
- Emoji muy grande centrado (100px)
- Título (Space Grotesk Bold, 48px)
- Subtítulo (Inter Regular, 18px)
- Badge del eje principal con color correspondiente

**Sección: Insignias desbloqueadas**
- Título: "Insignias desbloqueadas" (Space Grotesk Bold, 28px)
- Grid de insignias con:
  * Emoji grande
  * Nombre
  * Click para ir a detalle de insignia

**Sección: ¿Qué hice?**
- Título: "¿Qué hice?" (Space Grotesk Bold, 28px)
- Texto descriptivo (Inter Regular, 18px, line-height 1.8)
- Placeholder: "Durante [tiempo] participé en [experiencia]. Esta vivencia me permitió [descripción]..."

**Sección: Lo que aprendí**
- Título: "Lo que aprendí" (Space Grotesk Bold, 28px)
- Por cada insignia desbloqueada:
  * Subtítulo con emoji + nombre insignia (Space Grotesk Medium, 20px)
  * Párrafo de aprendizaje específico (Inter Regular, 16px)

**Sección: Galería**
- Título: "Galería" (Space Grotesk Bold, 28px)
- Grid 3x2 de imágenes (placeholders con gradients)

**Sección: Otras experiencias relacionadas**
- Título: "Otras experiencias relacionadas" (Space Grotesk Bold, 28px)
- Texto: "Si esta experiencia te resonó, también te puede interesar:"
- Grid 1x3 de mini-tarjetas de experiencias que comparten insignias

## PÁGINA CONTACTO:
- Título principal centrado (Space Grotesk Bold, 48px):
  "There is a _______ of opportunities"
  (el _______ debe ser un espacio en blanco con underline)

- Subtítulo (Inter Regular, 18px): "¿Quieres conectar? Escríbeme"

### Formulario centrado (max-width 600px):
Campos con diseño limpio:
- **Nombre** (input con border suave, padding generoso, Inter Regular)
- **Email** (input tipo email)
- **Mensaje** (textarea con min-height 150px)
- **Botón "Enviar"** (background gradient, Space Grotesk Medium, hover effect)

### Redes sociales:
- Título: "O encuéntrame en:" (Inter Medium, 16px)
- Iconos de redes (placeholders):
  * LinkedIn
  * Instagram
  * Email
- Hover: scale + color change

## FOOTER (en todas las páginas):
- Background: gris oscuro (#1f2937)
- Color texto: blanco
- Padding generoso
- Centrado

Contenido:
- Logo/Título: "GAPING" (Space Grotesk Bold, 24px)
- Subtítulo: "Gap Year en Movimiento" (Inter Regular, 14px)
- Frase: "There is a _______ of opportunities" (Inter Regular, 16px, italic)
- Links rápidos a: Home | About | Los 3 Ejes | Insignias | Experiencias | Contacto
- Iconos de redes sociales
- Copyright: "© 2025 GAPING. Todos los derechos reservados." (Inter Regular, 12px, color gris claro)

## REQUISITOS TÉCNICOS:
- **Framework:** React con Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router (navegación entre páginas sin reload)
- **State Management:** React Context o useState (NO usar localStorage)
- **Icons:** Lucide React para iconos complementarios
- **Animaciones:** 
  * Framer Motion para transiciones suaves entre páginas
  * Scroll animations (fade-in, slide-up al hacer scroll)
  * Hover effects con transforms (scale, shadow)
- **Performance:**
  * Lazy loading de imágenes
  * Code splitting por rutas
  * Optimización de re-renders

## FUNCIONALIDADES INTERACTIVAS:

1. **Navegación bidireccional:**
   - Desde página de insignia → ver todas las experiencias que la tienen
   - Desde página de experiencia → ver todas las insignias desbloqueadas
   - Clicks funcionales en todas las insignias y experiencias

2. **Filtros en página Experiencias:**
   - Filtros funcionales que muestran/ocultan experiencias según eje
   - Animación suave al cambiar de filtro
   - Estado activo visible en el filtro seleccionado

3. **Modales/Páginas de detalle:**
   - Transición suave al abrir
   - Botón de volver siempre visible
   - Scroll al top al cambiar de página

4. **Efectos hover:**
   - Tarjetas: elevación con shadow
   - Insignias: scale 1.1
   - Botones: cambio de color + scale 1.05
   - Links: underline animado

5. **Responsive:**
   - Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
   - Grid adaptativos (1 col → 2 cols → 3 cols)
   - Hamburger menu funcional en móvil
   - Touch gestures para swipe (opcional)

6. **Loading states:**
   - Skeleton screens mientras carga contenido
   - Spinners para transiciones
   - Smooth page transitions

## ESTILO DE COMPONENTES:

### Tarjetas (Cards):
- Background: blanco (#ffffff)
- Border-radius: 16px
- Shadow: suave (shadow-md)
- Padding: 24-32px
- Hover: elevación (shadow-lg) + translateY(-4px)
- Transition: 0.3s ease

### Botones:
- **Primary:** 
  * Background: gradient (del color del eje correspondiente)
  * Texto: blanco
  * Padding: 12px 32px
  * Border-radius: 8px
  * Font: Space Grotesk Medium
  * Hover: scale 1.05 + shadow
  
- **Secondary:**
  * Background: transparente
  * Border: 2px solid
  * Hover: background fill + texto blanco

### Insignias badge:
- Tamaño: 80x80px (en grids)
- Background: blanco con shadow suave
- Border-radius: 12px
- Emoji centrado
- Nombre debajo (fuera del badge)
- Hover: scale 1.15 + shadow-lg
- Cursor: pointer

### Secciones:
- Padding vertical: 80-120px
- Max-width: 1200px centrado
- Spacing entre secciones: 60px

### Animaciones:
- Fade in al hacer scroll (threshold: 0.1)
- Stagger en grids (cada item con delay incremental)
- Smooth scroll entre secciones
- Page transitions con fade

## ACCESIBILIDAD:
- Contraste mínimo WCAG AA
- Alt text en todas las imágenes
- Aria labels en elementos interactivos
- Focus visible en navegación por teclado
- Semantic HTML (header, main, section, article, footer)

## CONTENIDO PLACEHOLDER:
- Imágenes: usar gradients de colores del eje correspondiente
- Textos largos: usar el contenido proporcionado, si falta completar con lorem ipsum coherente con el contexto
- Iconos sociales: usar placeholders de Lucide React

## ESTRUCTURA DE ARCHIVOS SUGERIDA:
```
src/
  components/
    Header.jsx
    Footer.jsx
    BadgeCard.jsx
    ExperienceCard.jsx
    Hero.jsx
    EjeCard.jsx
  pages/
    Home.jsx
    About.jsx
    Ejes.jsx
    Insignias.jsx
      BadgeDetail.jsx
    Experiencias.jsx
      ExperienceDetail.jsx
    Contacto.jsx
  App.jsx
  main.jsx
```

Genera el código completo de la aplicación web funcionando con todas estas especificaciones.
`

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83328750-2fc7-474d-b675-beeaaba8277e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
