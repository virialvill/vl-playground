/* ==========================================================================
   Recruitment Tracker — capa de UI compartida
   Vanilla JS, sin dependencias. Expone window.VLT.
   ========================================================================== */

window.VLT = (function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Utilidades
     ---------------------------------------------------------------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Escapa texto para interpolarlo con seguridad dentro de innerHTML. */
  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);
  }

  /** Crea un elemento a partir de una cadena HTML. */
  function el(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }

  /** Lee un parámetro de la query string. */
  function param(name, fallback = null) {
    return new URLSearchParams(location.search).get(name) ?? fallback;
  }

  /** "2025-04-28" -> "Apr 28, 2025" */
  function formatDate(iso) {
    if (!iso) return "—";
    const [y, m, d] = iso.split("-").map(Number);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[m - 1]} ${d}, ${y}`;
  }

  /* ------------------------------------------------------------------------
     Iconos (subconjunto de Lucide, dibujados inline)
     ---------------------------------------------------------------------- */
  const ICON_PATHS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21V12h6v9"/>',
    deals: '<path d="M4 3h11l5 5v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v6h6"/><path d="m9 13 3 3 3-3"/>',
    forms: '<path d="M5 3h11l4 4v14H5z"/><path d="M15 3v5h5"/><path d="M9 12h7M9 16h7"/>',
    "file-check": '<path d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M14 2v6h6"/><path d="m9 14 2 2 4-4"/>',
    "file-x": '<path d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M14 2v6h6"/><path d="m10 13 4 4M14 13l-4 4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    sort: '<path d="M8 4v16m0 0-3-3m3 3 3-3"/><path d="M16 20V4m0 0-3 3m3-3 3 3"/>',
    eye: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.5"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronLeft: '<path d="m14 6-6 6 6 6"/>',
    chevronRight: '<path d="m10 6 6 6-6 6"/>',
    chevronsLeft: '<path d="m11 6-6 6 6 6"/><path d="m18 6-6 6 6 6"/>',
    chevronsRight: '<path d="m6 6 6 6-6 6"/><path d="m13 6 6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 4v11m0 0 4-4m-4 4-4-4"/><path d="M4 19h16"/>',
    pencil: '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="m14 6 4 4"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V5h6v2"/><path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M16 5a3.5 3.5 0 0 1 0 7"/><path d="M18 20a6 6 0 0 0-2-4.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    at: '<circle cx="12" cy="12" r="4"/><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1"/>',
    pin: '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    dollar: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
    building: '<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 10h4a1 1 0 0 1 1 1v10"/><path d="M8 8h3M8 12h3M8 16h3"/>',
    dots: '<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  };

  /** Devuelve el markup SVG de un icono. */
  function icon(name, size = 18) {
    const path = ICON_PATHS[name];
    if (!path) return "";
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
      stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  /* ------------------------------------------------------------------------
     Piezas reutilizables
     ---------------------------------------------------------------------- */
  const wordmark = () =>
    `<div class="wordmark" aria-label="VirtualLatinos">
       <span class="wordmark__light">virtual</span><span class="wordmark__dark">Latinos</span>
     </div>`;

  const badge = (text, tone = "neutral", withIcon = false) =>
    `<span class="badge badge--${tone}">${withIcon ? icon("check", 12) : ""}${esc(text)}</span>`;

  const avatar = (initials, modifier = "") =>
    `<span class="avatar ${modifier}">${esc(initials)}</span>`;

  /* ------------------------------------------------------------------------
     Shell: topbar + sidebar
     ---------------------------------------------------------------------- */
  const NAV = [
    { key: "dashboard",  label: "Dashboard",    href: "dashboard.html",    icon: "home" },
    { key: "deals",      label: "Deals",        href: "deals.html",        icon: "deals" },
    { key: "intake",     label: "Intake Forms", href: "intake-forms.html", icon: "forms" },
  ];

  function shell(activeKey) {
    const user = window.VLTData.currentUser;

    const scrim = el('<div class="scrim" data-open="false"></div>');
    const sidebar = el(`
      <aside class="sidebar" data-open="false" aria-label="Navegación principal">
        <div class="sidebar__brand">
          <span class="sidebar__brand-mark">RT</span>
          <span>Recruitment Tracker</span>
        </div>
        <nav class="sidebar__nav">
          ${NAV.map((item) => `
            <a class="nav-item" href="${item.href}"
               ${item.key === activeKey ? 'aria-current="page"' : ""}>
              ${icon(item.icon)}<span>${item.label}</span>
            </a>`).join("")}
        </nav>
        <div class="sidebar__footer">
          <div class="user-card">
            ${avatar(user.initials)}
            <div>
              <div class="user-card__name">${esc(user.account)}</div>
              <div class="user-card__mail">${esc(user.email)}</div>
            </div>
          </div>
        </div>
      </aside>`);

    const topbar = el(`
      <header class="topbar">
        <button class="topbar__menu" type="button" aria-label="Abrir menú"
                aria-expanded="false">${icon("menu", 22)}</button>
        <button class="account-button" type="button">
          <span>${esc(user.account)}</span>${icon("chevronDown", 16)}
        </button>
      </header>`);

    document.body.prepend(topbar);
    document.body.prepend(sidebar);
    document.body.prepend(scrim);
    document.body.append(el('<div class="toast-region" role="status" aria-live="polite"></div>'));

    const toggle = $(".topbar__menu", topbar);
    const setOpen = (open) => {
      sidebar.dataset.open = String(open);
      scrim.dataset.open = String(open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", () => setOpen(sidebar.dataset.open !== "true"));
    scrim.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar.dataset.open === "true") setOpen(false);
    });

    $(".account-button", topbar).addEventListener("click", () => {
      toast(`Sesión activa: ${user.account}`);
    });
  }

  /**
   * Cabecera blanca de página con título, breadcrumb y wordmark.
   * @param {object} cfg
   * @param {string}  cfg.title
   * @param {string} [cfg.subtitle]
   * @param {Array}  [cfg.breadcrumb]  [{label, href?}]
   * @param {string} [cfg.avatarText]  iniciales; si se pasa, el avatar va a la izquierda
   * @param {object} [cfg.badge]       {text, tone}
   */
  function pageHeader({ title, subtitle, breadcrumb, avatarText, badge: pill }) {
    const crumbs = (breadcrumb || [])
      .map((c) => (c.href ? `<a href="${c.href}">${esc(c.label)}</a>` : `<span>${esc(c.label)}</span>`))
      .join('<span>/</span>');
    return `
      <header class="card page-header">
        <div style="display:flex;align-items:center;gap:16px;min-width:0">
          ${avatarText ? avatar(avatarText, "avatar--lg") : ""}
          <div class="stack-s">
            <h1 class="page-header__title">${esc(title)}</h1>
            ${pill ? `<span>${badge(pill.text, pill.tone || "primary", true)}</span>` : ""}
            ${subtitle ? `<p class="page-header__subtitle">${esc(subtitle)}</p>` : ""}
            ${crumbs ? `<nav class="breadcrumb">${crumbs}</nav>` : ""}
          </div>
        </div>
        ${wordmark()}
      </header>`;
  }

  /* ------------------------------------------------------------------------
     Tabs
     ---------------------------------------------------------------------- */
  function tabs(root = document) {
    $$("[data-tabs]", root).forEach((group) => {
      const buttons = $$('[role="tab"]', group);
      const select = (id) => {
        buttons.forEach((b) => {
          const on = b.dataset.tab === id;
          b.setAttribute("aria-selected", String(on));
          const panel = document.getElementById(b.dataset.tab);
          if (panel) panel.hidden = !on;
        });
      };
      buttons.forEach((b) => b.addEventListener("click", () => select(b.dataset.tab)));
      const initial = buttons.find((b) => b.getAttribute("aria-selected") === "true") || buttons[0];
      if (initial) select(initial.dataset.tab);
    });
  }

  /* ------------------------------------------------------------------------
     Acordeones
     ---------------------------------------------------------------------- */
  function accordions(root = document) {
    $$(".accordion__head", root).forEach((head) => {
      head.addEventListener("click", () => {
        const open = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", String(!open));
        const body = head.nextElementSibling;
        if (body) body.hidden = open;
      });
    });
  }

  /* ------------------------------------------------------------------------
     Modales (basados en <dialog>)
     ---------------------------------------------------------------------- */
  function modal(id) {
    const dlg = document.getElementById(id);
    if (!dlg) return { open() {}, close() {} };
    if (!dlg.dataset.wired) {
      dlg.dataset.wired = "1";
      $$("[data-close]", dlg).forEach((b) => b.addEventListener("click", () => dlg.close()));
      dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    }
    return { open: () => dlg.showModal(), close: () => dlg.close(), element: dlg };
  }

  /* ------------------------------------------------------------------------
     Toasts
     ---------------------------------------------------------------------- */
  function toast(message, tone = "info", ms = 3200) {
    const region = $(".toast-region");
    if (!region) return;
    const node = el(`<div class="toast toast--${tone}">
      ${tone === "success" ? icon("check", 18) : ""}<span>${esc(message)}</span>
    </div>`);
    region.append(node);
    setTimeout(() => node.remove(), ms);
  }

  /* ------------------------------------------------------------------------
     Tabla de datos: búsqueda, orden, paginación y selección
     ---------------------------------------------------------------------- */
  /**
   * @param {object} cfg
   * @param {HTMLElement} cfg.mount        contenedor donde se dibuja
   * @param {Array}       cfg.rows         datos
   * @param {Array}       cfg.columns      [{key,label,sortable,render,align}]
   * @param {number}     [cfg.pageSize=10]
   * @param {Function}   [cfg.searchFn]    (row, term) => boolean
   * @param {boolean}    [cfg.selectable]  añade checkboxes
   * @param {Function}   [cfg.onSelection] (selectedRows) => void
   * @param {string}     [cfg.emptyText]
   */
  function dataTable(cfg) {
    const state = {
      page: 1,
      pageSize: cfg.pageSize || 10,
      term: "",
      sortKey: null,
      sortDir: 1,
      selected: new Set(),
    };

    const filtered = () => {
      let rows = cfg.rows.slice();
      if (state.term && cfg.searchFn) {
        rows = rows.filter((r) => cfg.searchFn(r, state.term.toLowerCase()));
      }
      if (state.sortKey) {
        const col = cfg.columns.find((c) => c.key === state.sortKey);
        rows.sort((a, b) => {
          const av = col.sortValue ? col.sortValue(a) : a[state.sortKey];
          const bv = col.sortValue ? col.sortValue(b) : b[state.sortKey];
          if (av === bv) return 0;
          return (av > bv ? 1 : -1) * state.sortDir;
        });
      }
      return rows;
    };

    function render() {
      const rows = filtered();
      const pages = Math.max(1, Math.ceil(rows.length / state.pageSize));
      state.page = Math.min(state.page, pages);
      const start = (state.page - 1) * state.pageSize;
      const pageRows = rows.slice(start, start + state.pageSize);

      const head = `
        <tr>
          ${cfg.selectable ? '<th class="cell-check"><input type="checkbox" data-select-all aria-label="Seleccionar todo"></th>' : ""}
          ${cfg.columns.map((c) => `
            <th ${c.sortable ? `data-sortable data-key="${c.key}"` : ""}
                ${c.align === "right" ? 'style="text-align:right"' : ""}>
              ${esc(c.label)}
              ${state.sortKey === c.key ? `<span class="sort-mark">${state.sortDir === 1 ? "▲" : "▼"}</span>` : ""}
            </th>`).join("")}
        </tr>`;

      const body = pageRows.length
        ? pageRows.map((r, i) => `
            <tr data-row="${start + i}">
              ${cfg.selectable ? `<td class="cell-check"><input type="checkbox" data-select="${esc(r.id)}"
                   ${state.selected.has(r.id) ? "checked" : ""} aria-label="Seleccionar fila"></td>` : ""}
              ${cfg.columns.map((c) => `
                <td ${c.align === "right" ? 'class="cell-actions"' : ""}>${c.render ? c.render(r) : esc(r[c.key] ?? "")}</td>
              `).join("")}
            </tr>`).join("")
        : `<tr><td colspan="${cfg.columns.length + (cfg.selectable ? 1 : 0)}">
             <div class="table-empty">${esc(cfg.emptyText || "No hay resultados para esta búsqueda.")}</div>
           </td></tr>`;

      const pageButtons = [];
      const push = (n) => pageButtons.push(
        `<button type="button" data-page="${n}" ${n === state.page ? 'aria-current="true"' : ""}>${n}</button>`);
      if (pages <= 7) { for (let n = 1; n <= pages; n++) push(n); }
      else {
        for (let n = 1; n <= 5; n++) push(n);
        pageButtons.push("<span>…</span>");
        push(pages);
      }

      cfg.mount.innerHTML = `
        <div class="table-wrap">
          <table class="table">
            <thead>${head}</thead>
            <tbody>${body}</tbody>
          </table>
        </div>
        <div class="table-footer">
          <span>Showing ${rows.length ? start + 1 : 0}–${Math.min(start + state.pageSize, rows.length)} of ${rows.length}</span>
          <div class="pagination">
            <button type="button" data-nav="first" ${state.page === 1 ? "disabled" : ""} aria-label="Primera página">${icon("chevronsLeft", 14)}</button>
            <button type="button" data-nav="prev"  ${state.page === 1 ? "disabled" : ""} aria-label="Anterior">${icon("chevronLeft", 14)}</button>
            ${pageButtons.join("")}
            <button type="button" data-nav="next"  ${state.page === pages ? "disabled" : ""} aria-label="Siguiente">${icon("chevronRight", 14)}</button>
            <button type="button" data-nav="last"  ${state.page === pages ? "disabled" : ""} aria-label="Última página">${icon("chevronsRight", 14)}</button>
          </div>
        </div>`;

      // --- eventos de la vista recién dibujada ---
      $$("th[data-sortable]", cfg.mount).forEach((th) => {
        th.addEventListener("click", () => {
          const key = th.dataset.key;
          state.sortDir = state.sortKey === key ? -state.sortDir : 1;
          state.sortKey = key;
          render();
        });
      });

      $$("[data-page]", cfg.mount).forEach((b) =>
        b.addEventListener("click", () => { state.page = Number(b.dataset.page); render(); }));

      $$("[data-nav]", cfg.mount).forEach((b) =>
        b.addEventListener("click", () => {
          const map = { first: 1, prev: state.page - 1, next: state.page + 1, last: pages };
          state.page = Math.min(Math.max(1, map[b.dataset.nav]), pages);
          render();
        }));

      if (cfg.selectable) {
        const all = $("[data-select-all]", cfg.mount);
        if (all) {
          all.checked = pageRows.length > 0 && pageRows.every((r) => state.selected.has(r.id));
          all.addEventListener("change", () => {
            pageRows.forEach((r) => all.checked ? state.selected.add(r.id) : state.selected.delete(r.id));
            emitSelection(); render();
          });
        }
        $$("[data-select]", cfg.mount).forEach((box) => {
          box.addEventListener("change", () => {
            box.checked ? state.selected.add(box.dataset.select) : state.selected.delete(box.dataset.select);
            emitSelection(); render();
          });
        });
      }
    }

    function emitSelection() {
      if (cfg.onSelection) {
        cfg.onSelection(cfg.rows.filter((r) => state.selected.has(r.id)));
      }
    }

    render();

    return {
      search(term) { state.term = term; state.page = 1; render(); },
      setRows(rows) { cfg.rows = rows; state.page = 1; render(); },
      clearSelection() { state.selected.clear(); emitSelection(); render(); },
      selection() { return cfg.rows.filter((r) => state.selected.has(r.id)); },
      refresh: render,
    };
  }

  /* ------------------------------------------------------------------------
     Arranque común
     ---------------------------------------------------------------------- */
  function init(activeKey) {
    shell(activeKey);
    tabs();
    accordions();
  }

  return {
    $, $$, esc, el, param, formatDate, icon, badge, avatar, wordmark,
    shell, pageHeader, tabs, accordions, modal, toast, dataTable, init,
  };
})();
