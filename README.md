# vl-playground

Repositorio personal de pruebas y experimentos.

## Contenido

| Carpeta | Qué es |
|---|---|
| [`recruitment-tracker/`](recruitment-tracker/) | Réplica en HTML/CSS/JS de las pantallas del Figma **Audit** — plataforma interna del equipo de Recruitment (deals, job posts, aplicantes y agreements) |
| [`Versions/`](Versions/) | Copias del proyecto por año y quarter |

## Versiones

Cada carpeta de `Versions/` es una copia completa e independiente del prototipo.
Se distinguen por el color primario, que también aparece como etiqueta en el sidebar
y en el `<title>` de cada página.

| Versión | Color primario | Hex |
|---|---|---|
| [`Versions/2026-Q1/`](Versions/2026-Q1/) | Verde | `#0e9f6e` |
| [`Versions/2026-Q3/`](Versions/2026-Q3/) | Azul | `#2563eb` |
| [`recruitment-tracker/`](recruitment-tracker/) | Morado (original de Figma) | `#635bff` |

El color vive en un único token, `--color-primary`, dentro de
`assets/css/tokens.css` de cada versión. Para crear un nuevo quarter:

```bash
cp -R recruitment-tracker Versions/2027-Q1
```

y edita el bloque `--color-primary*` de su `tokens.css`.

## Uso

```bash
git clone https://github.com/virialvill/vl-playground.git
cd vl-playground
```

Para ver cualquier versión:

```bash
python3 -m http.server 8777
```

Luego abre `http://localhost:8777/recruitment-tracker/`
o `http://localhost:8777/Versions/2026-Q1/`.

## Licencia

MIT — ver [LICENSE](LICENSE).
