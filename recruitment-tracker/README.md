# Recruitment Tracker — prototipo en HTML/CSS/JS

Réplica en código de las pantallas del archivo de Figma
[**Audit**](https://www.figma.com/design/f9cCYZ5XuIFOE5sqKfLJsQ/Audit) (`f9cCYZ5XuIFOE5sqKfLJsQ`).

Plataforma interna para el equipo de **Recruitment**: analizar deals, revisar aplicantes por
cada job post y llevar la logística de cada proceso hasta la creación del agreement.

Sin frameworks, sin build, sin dependencias: HTML, CSS y JavaScript vanilla.

---

## Cómo verlo

Abre `index.html` directamente, o levanta un servidor local (recomendado, para que
`localStorage` funcione igual que en producción):

```bash
python3 -m http.server 8777
```

Luego entra a <http://localhost:8777>.

---

## Pantallas

| Archivo | Pantalla | Frame en Figma |
|---|---|---|
| `index.html` | Log in con Google | `1.0 Log in` |
| `dashboard.html` | Dashboard: KPIs + My Deals | `1.0 Dashboard Manager-Consultant-Agent-Specialist` (`1:11382`, `122:4973`) |
| `deals.html` | Listado completo de Deals + filtros | `Deals` (`330:22346`) / `1.1 View Filter` |
| `intake-forms.html` | Listado de Intake Forms | *(inferida — ver notas)* |
| `intake-form.html` | Wizard de Intake Form (5 pasos) | `New Intake` — `Call Details` … `Role Details` |
| `deal.html` | Detalle del deal, con 5 tabs | `Deal > Deal Details`, `Job Details`, `Job Application Table`, `Bulk Feature` |
| `job-post.html` | Crear / editar Job Post | `Create Job Post (Assessment Based)`, `Edit Job Post` |
| `candidate.html` | Perfil del VA, con 5 tabs | `Job Application`, `Assessment Data`, `Profile Details`, `Other Jobs`, `Notes` |
| `agreement.html` | Wizard de Agreement Creation (2 pasos) | `2.1 Select VA`, `2.2 Fill Agreement`, `2.3 Success` |

### Tabs de `deal.html`
`Deal Details` · `Intake Form` · `Job Details` · `Job Applications Table` · `Agreement Creation`

Se puede entrar directo a una tab con `?tab=`:
`deal.html?id=35395634262&tab=apps`
(valores: `details`, `intake`, `job`, `apps`, `agreement`).

### Tabs de `candidate.html`
`Job Application` · `Assessment Data` · `Profile Details` · `Other Jobs` · `Notes`
— también con `?tab=app|assess|profile|other|notes`.

---

## Estados y flujos implementados

- **Tablas**: búsqueda, orden por columna (clic en el encabezado), paginación y estado vacío.
- **Tabla de aplicaciones (31 columnas)**: scroll horizontal y vertical dentro del propio
  contenedor, encabezado fijo al hacer scroll vertical y columna de selección + *VA Name*
  congeladas al hacer scroll horizontal. El encabezado tiene una fila de grupo
  (*VA Degree Details* abarca *Degree 1* y *Degree 2*). Las celdas incluyen selects,
  fechas, checkboxes, badges, enlaces y notas largas; el CSV exporta las 31 columnas.
- **Filtros**: tres modales distintos, todos con *Reset* y *Apply Filter* —
  dashboard (4 campos), Deals (8 campos) y Job Applications (9 campos).
- **Tooltip** “View Deal” sobre el icono de acción de las tablas.
- **Selects**: el desplegable de un `<select>` nativo lo dibuja el sistema operativo y
  no admite CSS, así que se sustituye por un combobox propio (botón + listbox) que sí
  sigue el diseño. El `<select>` original permanece oculto en el DOM como fuente de la
  verdad —`value`, `form.elements`, evento `change`—, de modo que el resto del código
  no cambia. Accesible con teclado (flechas, Home/End, Enter, Esc).
- **Bulk feature**: selección múltiple de VAs, contador, *Clear Selection* y *Apply to Selected*.
- **Download CSV**: genera y descarga el CSV real de la tabla de aplicaciones.
- **Job post**: validación de campos obligatorios, diálogo de cancelación, diálogo de publicación.
  Al publicar, la tab *Job Details* pasa del estado vacío al estado publicado (se recuerda en
  `localStorage`) y habilita *Update Job Post* / *Close Job Post*.
- **Agreement creation**: stepper de 2 pasos, selección de VA, validación, diálogo de confirmación,
  botón en estado *loading* y pantalla de éxito.
  El estado de error (`2.3.1 Error Message`) se puede revisar con `agreement.html?fail=1`.
- **Intake Form**: wizard de 5 pasos (Call Details → Client Information → Lead Readiness →
  Company Overview → Role Details) con stepper, validación por paso, navegación Back/Continue,
  persistencia de respuestas entre pasos y diálogo final al enviar.
  Se puede entrar directo a un paso con `intake-form.html?step=lead`
  (valores: `call`, `client`, `lead`, `company`, `role`).
- **Notas**: agregar, buscar y eliminar.
- **Sidebar**: oculto por defecto y desplegable desde el menú del topbar, igual que en el diseño.
- **Toasts** para confirmar acciones.

Todo corre contra datos estáticos en `assets/js/data.js`. **No hay backend**: el login no
autentica nada y ninguna acción persiste más allá de la sesión del navegador.

---

## Estructura

```
recruitment-tracker/
├── index.html            Log in
├── dashboard.html        Dashboard
├── deals.html            Listado de deals
├── intake-forms.html     Listado de intake forms
├── intake-form.html      Wizard de intake form (5 pasos)
├── deal.html             Detalle del deal (5 tabs)
├── job-post.html         Formulario de job post
├── candidate.html        Perfil del VA (5 tabs)
├── agreement.html        Wizard de agreement
└── assets/
    ├── css/
    │   ├── tokens.css    Design tokens extraídos de Figma
    │   └── app.css       Componentes y layout
    └── js/
        ├── data.js       Datos de ejemplo
        └── app.js        Capa de UI: shell, tabs, modales, tablas, toasts
```

`assets/js/app.js` expone `window.VLT` con las piezas compartidas:

| Función | Para qué sirve |
|---|---|
| `VLT.init(navKey)` | Monta topbar + sidebar y engancha tabs y acordeones |
| `VLT.pageHeader(cfg)` | Cabecera blanca con título, breadcrumb, avatar y wordmark |
| `VLT.dataTable(cfg)` | Tabla con búsqueda, orden, paginación y selección |
| `VLT.modal(id)` | Control de un `<dialog>` |
| `VLT.toast(msg, tone)` | Notificación temporal |
| `VLT.enhanceSelects(root)` | Sustituye los `<select>` por un combobox estilable |
| `VLT.syncSelects(root)` | Re-sincroniza etiquetas tras cambiar `value` por código |
| `VLT.badge / avatar / icon` | Átomos de UI |

---

## Design tokens

Leídos de las variables que **consumen las pantallas**
(Figma `f9cCYZ5XuIFOE5sqKfLJsQ`, ya vinculadas a la librería publicada),
y definidos en `assets/css/tokens.css`. Cada bloque refleja una colección real.

### Semantic/Color

Cada color es un trío: relleno sólido, tinte de fondo y el texto que va encima.
El texto no siempre es el relleno — success, info y warning usan un tono más oscuro.

| Token | Relleno | Tinte | Texto sobre el tinte |
|---|---|---|---|
| primary   | `#635bff` | `#635bff40` | `#635bff` |
| secondary | `#16cdc7` | `#16cdc740` | `#16cdc7` |
| info      | `#46caeb` | `#46caeb40` | `#3cacc8` |
| success   | `#36c96c` | `#2ea95c40` | `#2ea95c` |
| warning   | `#f8c20a` | `#f8c20a40` | `#d3a509` |
| error     | `#ff6692` | `#ff669261` | `#ff6692` |

Superficies, bordes y texto:

| Token | Valor | Primitivo |
|---|---|---|
| `--surface-default` | `#ffffff` | neutral/white |
| `--surface-hover` | `#f6f7f9` | neutral/50 |
| `--surface-page` | `#f4f7fb` | neutral/100 |
| `--surface-header` | `#f3f3f4` | neutral/150 |
| `--surface-muted` | `#eff4fa` | neutral/200 |
| `--border-default` | `#e0e6eb` | neutral/300 |
| `--border-muted` | `#f3f3f4` | neutral/150 |
| `--color-text-heading` | `#1f2a3d` | neutral/900 |
| `--color-text-link` | `#2a3547` | neutral/800 |
| `--color-text-body` | `#98a4ae` | neutral/500 |
| `--color-text-disabled` | `#616c7a` | neutral/600 |
| `--color-dark-surface` | `#1a2537` | dark/surface |
| `--overlay-modal` | `#00000040` | — |

### Radius

| Token | Valor | Qué lo usa |
|---|---|---|
| `sm` | 6 | badges, checkboxes, chips, lista del select |
| `md` | 9 | botones, icon buttons, inputs, paginación, sidebar items |
| `tw` | 12 | cards, tablas, modales, acordeones |
| `bb` | 20 | search input |
| `lg` | 24 | avatares grandes e imágenes |
| `full` | 9999 | avatares circulares |

### Spacing

`xs 4 · sm 8 · md 12 · lg 16 · xl 20 · 2xl 24 · card 30 · 3xl 40`

### Tipografía · Manrope

Los estilos base del DS, cada uno con su interlineado:

| Estilo | Tamaño / interlineado | Peso |
|---|---|---|
| H1 … H6 | 36/40 · 30/36 · 24/32 · 20/28 · 18/28 · 16/24 | SemiBold |
| Body/Large | 15 / 22 | Regular |
| Body/Base · Label | 14 / 20 | Regular · SemiBold |
| Caption | 13 / 18 | Regular |
| Chip Text | 12 / 16 | SemiBold |

Más los estilos de aplicación que usan las pantallas, todos sobre la métrica de 16px:
**Table Text** y **Table Title** (celdas y encabezados de tabla), **Tab Text** y
**Breadcrumbs**.

### Pendiente de alinear

- **Sombras** — la librería define `sm · md · elevation1-4`; el código conserva
  tres sombras heredadas del archivo de pantallas.
- **Matriz de botones** — el DS es 6 colores × 4 tipos (Fill · Subtle · Outline ·
  Text) × 3 tamaños; el código tiene cinco variantes sueltas.
- **Colecciones legacy en Figma** — las pantallas todavía tienen vínculos a
  `Colors`, `Texts`, `Spacing` y `Border radius` junto a las colecciones nuevas.
  No afecta al código, pero conviene saberlo al comparar.

---|---|---|---|
| primary   | `#635bff` | `#635bff40` | `#635bff` |
| secondary | `#16cdc7` | `#16cdc740` | `#1cc3bd` |
| info      | `#46caeb` | `#46caeb40` | `#3cacc8` |
| success   | `#36c96c` | `#2ea95c40` | `#2ea95c` |
| warning   | `#f8c20a` | `#f8c20a40` | `#d3a509` |
| error     | `#ff6692` | `#ff669261` | `#ff6692` |

> El tinte de **success** deriva de `#2ea95c` y no de su relleno `#36c96c`.
> Es así en el DS; se replica igual para no desalinear los badges.

### Color · Neutrals

`white` · `50 #f6f7f9` · `100 #f4f7fb` · `200 #eff4fa` · `300 #e0e6eb` ·
`500 #98a4ae` · `800 #2a3547` · `900 #1f2a3d` · `navy 900 #0a2540`

Alias en uso: fondo de página = 100, encabezado de tabla = 50, campos
deshabilitados = 200, bordes = 300, texto secundario = 500, títulos = 900,
tooltip = navy 900.

### Tipografía · Manrope

Los diez estilos del DS, cada uno con su interlineado. El nombre de la clase
utilitaria es el nombre del estilo: `.h3` es “Heading/H3”, no “el tercer título”.

| Estilo | Tamaño / interlineado | Peso |
|---|---|---|
| H1 | 36 / 40 | SemiBold |
| H2 | 30 / 36 | SemiBold |
| H3 | 24 / 32 | SemiBold |
| H4 | 20 / 28 | SemiBold |
| H5 | 18 / 28 | SemiBold |
| H6 | 16 / 24 | SemiBold |
| Body/Large | 15 / 22 | Regular |
| Body/Base | 14 / 20 | Regular |
| Label | 14 / 20 | SemiBold |
| Caption | 13 / 18 | Regular |

### Pendiente de alinear

Estos siguen viniendo del archivo de pantallas “Audit” y **no** coinciden con el DS:

- **Radios** — el DS define `sm 6 · md 9 · tw 12 · bb 20 · lg 24`; el código usa `4 / 8 / 12 / 16`.
- **Sombras** — el DS define `sm · md · elevation1-4`; el código tiene tres sombras propias.
- **Botones** — el DS es una matriz de 6 colores × 4 tipos (Fill · Subtle · Outline · Text)
  × 3 tamaños; el código tiene cinco variantes sueltas.

---|---|---|
| `--color-primary` | `#635bff` | Botones, links, estado activo |
| `--color-dark` / `--color-text-heading` | `#1f2a3d` | Títulos y texto principal |
| `--color-text-body` | `#98a4ae` | Texto secundario y placeholders |
| `--border-default` | `#e0e6eb` | Bordes de inputs y tablas |
| `--surface-header` | `#f3f3f4` | Encabezado de tablas |
| `--surface-page` | `#f4f7fb` | Fondo de la aplicación |
| `--color-success` | `#2ea95c` | Badges positivos |
| `--color-error` | `#ff6692` | Badges negativos y acciones destructivas |
| `--shadow-md` | `0 2px 4px -1px #afb6c933` | Elevación de cards |

Tipografía **Manrope** (400/500/600/700) desde Google Fonts, con fallback al sistema.
Escala: 12 / 14 / 16 / 18 / 20 / 24 px. Radios: 4 / 8 / 12 / 16 px.

---

## Notas sobre la interpretación del diseño

Cosas que resolví con criterio propio porque el archivo de Figma no las define:

1. **Logo VirtualLatinos** — está aproximado con tipografía (`.wordmark`), no con el asset real.
   Si me pasas el SVG lo cambio.
2. **Tabs del deal** — en Figma conviven dos juegos distintos:
   `Deal Details · Intake Form · Job Details · Proposal VAs · Agreement creation` y
   `Deal Details · Job Details · Job Applications Table · Agreement Creation`.
   Unifiqué en cinco tabs; falta confirmar si *Proposal VAs* y *Job Applications Table*
   son la misma pantalla o dos distintas.
3. **Intake Forms** — el *wizard* sí está en el archivo (sección `New Intake`), y de ahí salió
   `intake-form.html`. Lo que sigue sin pantalla propia es el **listado** de intake forms;
   ese lo armé con los mismos componentes de Deals.
4. **Inconsistencias de copy en el diseño** que resolví por mi cuenta:
   - En `Call Details` hay dos campos seguidos etiquetados `Date of Call`; al segundo,
     que además lleva hora, lo nombré `Date & Time of Call`.
   - Varios inputs de texto tienen `you@example.com` como placeholder aunque no son correos
     (`Type of Call`, `Client Full Name`, `Tasks & Responsabilities`); les puse placeholders acordes.
   - En la tabla de Deals conviven `Job Not Posted` y `Not Job Posted` para el mismo estado;
     unifiqué en `Job Not Posted`.
5. **Responsive** — el archivo está a 1920 px. Agregué breakpoints en 1100 y 720 px
   con criterio propio; no hay diseño móvil que replicar.
6. **Dashboard SuperAdmin** — el frame `122:5631` muestra el dashboard con badge ámbar y
   sin tabla “My Deals”. Es otro tipo de usuario, así que queda **fuera de alcance por ahora**;
   se implementará junto con el resto del manejo de roles.
7. **Controles nativos pendientes** — los `<input type="date">` siguen mostrando el
   calendario del navegador. Es el mismo caso que los selects y se resuelve igual
   (componente propio); todavía no está hecho.
8. **Pantallas que no repliqué** — las variantes de `1.1 View Filter` de la sección Deals
   (son estados del mismo modal de filtros, ya cubierto) y `2.1.1 No VA's List`.
