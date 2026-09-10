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
| `dashboard.html` | Dashboard: KPIs + My Deals | `1.0 Dashboard Manager-Consultant-Agent-Specialist` |
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
- **Filtros**: modal de Deals y modal de Job Applications, con *Reset* y *Apply Filter*.
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
| `VLT.badge / avatar / icon` | Átomos de UI |

---

## Design tokens

Extraídos del archivo de Figma con `get_variable_defs` y definidos en `assets/css/tokens.css`.

| Token | Valor | Uso |
|---|---|---|
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
6. **Pantallas que no repliqué** — las variantes de `1.1 View Filter` de la sección Deals
   (son estados del mismo modal de filtros, ya cubierto) y `2.1.1 No VA's List`.
