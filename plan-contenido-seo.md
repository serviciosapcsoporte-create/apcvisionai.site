# Plan de Contenido SEO - APC VisionIA v3

## Priorizado por volumen de búsqueda y competencia
### Septiembre 2026 — basado en Keywords (jul 2025 - jun 2026) + **estado real del sitio verificado el 25-sep-2026**

---

## Cambios de v3 (vs v2, sept 2026)

1. **El home ya no es una SPA React.** Es una landing HTML estática (`index.html`, 60 KB) servida por Vite/Cloudflare Pages. Todo lo que v2 describía como "home SPA" aplica a la **home estática**.
2. **Se cerró el hueco comercial del clúster B**: nueva landing **`/sistema-conteo-de-personas.html`** con intención transaccional (precio, instalación, cotización). Antes esa intención caía en el home (marca) y en un artículo informativo → no había dónde convertir.
3. **Deprecado el ángulo de "cctv/vigilancia como seguridad"** (sigue vigente, v2 #1): nunca "empresa de seguridad / protección / robos" como gancho. Se usa **visión computacional / conteo con YOLO** sobre las cámaras que el negocio **ya tiene**.
4. **El sitio tiene 32 URLs en el sitemap** (34 HTML en `public/`; `movil.html` y `arqueo-de-caja.html` están `noindex` y fuera del sitemap).
5. **15 artículos** (los 2 de "análisis de flujo" ya no existen y se eliminaron del sitemap).

---

## Correcciones SEO estructurales aplicadas (25-sep-2026)

Todo verificado en producción tras el deploy `7db1de3`:

| # | Hallazgo | Impacto | Fix |
|---|----------|---------|-----|
| 1 | **6 artículos del clúster B canonicalizaban a `/`** (clonados de `Apc-Visionia.html`: mismo `<title>`, `og:url`, `hreflang` y canonical a la home) | **Crítico** — Google los trataba como duplicados de la home y podía descartarlos del índice | Canonical propio + `<title>`/`description`/`og:*` únicos por artículo |
| 2 | `npm run build` fallaba en CI por literales `<30 min` (parse5: *invalid-first-character-of-tag-name*) | **Crítico** — deploy congelado desde el 24-sep; el sitio servía el build del 15-sep | `&lt;30 min` / `&lt;10%` en HTML |
| 3 | `og:image` apuntaba a `/assets/img/…` (esa carpeta **no se despliega**) | Alto — tarjetas sociales rotas | Rutas a `/imagenes/…` (sí desplegadas) |
| 4 | Navbar: `onerror` con doble `src` dejaba un fallback muerto | Medio | Un solo fallback `./imagenes/logo.webp` |
| 5 | Sitemap con 2 URLs 404 (`articulos/5-formas-analisis-flujo`, `como-implementar-analisis-flujo`) | Medio | Eliminadas |
| 6 | `arqueo.html` en sitemap siendo `noindex` + meta-refresh a `/` | Medio — señal contradictoria | Fuera del sitemap |
| 7 | `public/Apc-Visionia.html` con canonical a `/` | Alto — página pillar descartada como duplicada | Canonical propio |
| 8 | `movil.html` sin canonical/robots (casi duplicado del home) y `arqueo-de-caja.html` en `index` siendo redirect | Medio | `noindex,follow` + canonical |
| 9 | 8 posts `/social/` **sin canonical ni robots** | Medio | Canonical propio + `index, follow` |
| 10 | 9 `<title>` >62 chars (se truncan en SERP), incl. `cctv-vision-ia` (84) y `zonas-muertas` (84) | Bajo-medio | Acortados conservando la keyword al inicio |
| 11 | URLs con `ñ` sin percent-encoding en el sitemap | Bajo | `due%C3%B1os`, `due%C3%B1o-operativo` |
| 12 | `Apc-Visionia.html` tenía sección FAQ **sin** `FAQPage` schema | Bajo | + `FAQPage` + `BreadcrumbList` |
| 13 | `llms.txt` con 10 URLs del sitemap sin listar | Bajo | Completado (0 faltantes) |

**Estándar de metadatos acordado en v3** (aplicar a toda página nueva):
- `<title>` 45–62 caracteres, keyword al inicio, sufijo `| APC`.
- `description` 120–155 caracteres.
- `<link rel="canonical">` **siempre propio** (salvo `noindex`).
- `og:url` y `hreflang` = canonical propio.
- Un solo `H1`, con espacios reales alrededor de los `<br>` (el texto plano de Google los necesita).
- JSON-LD: `Service`/`LocalBusiness` + `FAQPage` si hay FAQ + `BreadcrumbList`.

---

## 🥇 PRIORIDAD 1 — Keywords ALTO volumen + BAJA competencia

| Keyword | Búsquedas/mes | Competencia | Estado | Cobertura |
|---------|:------------:|:----------:|:------:|:------------------:|
| **arqueo de caja** | 5,000 | **Baja** | ✅ Cubierto | Home, FAQ, 7 artículos, `arqueo-dueños.html` |
| **visión computacional / conteo YOLO** (sustituye a "cctv") | 5.000 (proxy reorientado) | **Baja** | ✅ Cubierto | **`sistema-conteo-de-personas.html` (nueva, hub transaccional)** + `cctv-vision-ia.html` + `conteo-aforo-gym-yolo.html` + `zonas-muertas-maquinas-zombie-gym.html` + `Apc-Visionia.html` + 6 artículos |
| ~~vigilancia~~ | ~~5.000~~ | — | ❌ **DEPRECADO** | No usar como gancho |

## 🥈 PRIORIDAD 2 — Keywords MEDIO volumen + BAJA competencia

| Keyword | Búsquedas/mes | Competencia | Estado | Acción |
|---------|:------------:|:----------:|:------:|:------:|
| **arqueo** | 500 | Baja | ✅ Cubierto | Meta en todas las páginas |
| **arqueo de caja que es** | 500 | Baja | ✅ Cubierto | `articulos/arqueo-de-caja-que-es.html` |
| **arqueo de caja excel** | 500 | Baja | ✅ Cubierto | `articulos/arqueo-de-caja-excel.html` |
| **arqueo de caja menor** | 500 | Baja (+900%) | ✅ Cubierto | `articulos/arqueo-de-caja-menor.html` |
| **cuadre de caja / cuadre de caja diario** | 500 | Baja | ✅ Cubierto | Artículos |
| **cierre de caja** | 500 | Baja | ✅ Cubierto | Artículos + meta |
| **plantilla excel arqueo** | 400 | Baja | ✅ Cubierto | `plantilla-excel-arqueo-caja.html` |
| **sistema pos colombia** | 500 | Media | ✅ Cubierto | `sistema-pos-para-negocio.html` + 2 artículos |
| **conteo de personas / aforo** | 50 | Baja | ✅ **Reforzado** | Landing transaccional nueva + hub + 6 artículos |

## 🥉 PRIORIDAD 3 — LONG TAIL

Cubierto: cuadre de caja excel (50), cierre de caja excel (50), arqueo diario, **arqueo contable** (50), arqueo de efectivo, conteo de dinero, cierre de caja diario excel, excel cierre de caja, aforo gym, conteo de personas, sensor de conteo, mapa de calor negocio, zonas muertas, máquinas zombie.

---

## 🗺 MAPA DE CONTENIDO REAL — 3 CLÚSTERES (25-sep-2026)

### Clúster A: Arqueo Inteligente (16 piezas)
- **Páginas del sistema:** `/` (home), `arqueo-dueños.html`, `plantilla-excel-arqueo-caja.html`
- **Artículos (7):** arqueo-de-caja-que-es, arqueo-de-caja-menor, cuadre-de-caja-diario-excel, cuadres-de-caja-excel-ia, arqueo-de-caja-excel, ia-para-excel-arqueo, arqueo-contable
- **Posts redes (7):** admin-financiera post-1…4, dueño-operativo post-1, post-2, post-4
- **Redirects `noindex`:** `arqueo.html`, `arqueo-de-caja.html` → `/` (fuera del sitemap)

### Clúster B: Visión IA / Conteo con YOLO (13 piezas) ← **reforzado en v3**
- **Hub transaccional (nuevo):** `/sistema-conteo-de-personas.html` — precio 290k/mes, instalación 48h, sin comprar cámaras. Canonical propio, 3 JSON-LD (Service/FAQPage/Breadcrumb), FAQ comercial, calculadora ROI, formulario WhatsApp.
- **Páginas del sistema:** `/` (home), `Apc-Visionia.html` (mapa de calor + aforo), `cctv-vision-ia.html`
- **Landings verticales:** `conteo-aforo-gym-yolo.html`, `zonas-muertas-maquinas-zombie-gym.html`
- **Artículos (6):** conteo-de-personas-que-es-yolo, mapa-de-calor-negocio-zonas-muertas, yolov8-sistema-conteo-camaras-existentes, control-aforo-vivo-negocios-bogota, conteo-heatmap-subir-ticket-retail, sensor-vs-camara-yolo-costos-2026
- **Post redes (1):** dueño-operativo post-3 (Mini PC vs cámaras)

**Arquitectura de enlaces del clúster B:**
```
/  (home, H1 transaccional gym+retail)
├── sistema-conteo-de-personas.html  ← card Servicios #1 + footer
│   ├── Apc-Visionia · conteo-aforo-gym · zonas-muertas · cctv-vision-ia
│   ├── 6 artículos ("Aprende más")
│   └── sensor-vs-camara (sección "Soluciones")
├── Apc-Visionia.html  ← card Servicios #2
└── conteo-aforo-gym-yolo.html  ← card Servicios #3
```

### Clúster C: Sistema POS (3 piezas)
- `sistema-pos-para-negocio.html` + `sistema-pos-para-restaurantes` + `costo-sistema-pos-colombia`

### Fuera de indexación
- `movil.html` (`noindex,follow`, canonical a `/`) — casi duplicado del home.

---

## 📋 PRÓXIMOS PASOS (v3)

1. **Monitorizar posiciones** del hub nuevo: "sistema de conteo de personas", "conteo de personas", "contador de personas", "aforo de personas". Objetivo: que `/sistema-conteo-de-personas.html` gane la intención transaccional y el home no canibalice.
2. **Google Search Console**: enviar sitemap (32 URLs) y revisar informe de cobertura a los 7–14 días; comprobar que los 6 artículos antes "canonicalizados a /" reaparecen.
3. **`inventario-articulos-seo.xlsx` está desactualizado** (27 filas, sigue listando los 2 artículos de análisis de flujo ya eliminados y no tiene los 15 artículos actuales). Regenerar.
4. **GBP (ficha Google Business)**: reforzar con "sistema de conteo de personas" + "visión computacional".
5. **Ideas futuras de contenido** (long-tail sin cubrir): arqueo para clínicas/consultorios, conteo de personas para restaurantes (hueco vertical del clúster B), cierre de caja excel enriquecido.
6. **No publicar sin aprobación explícita de Alejandro.**

---

*Datos: Google Keyword Planner, jul 2025 - jun 2026, COP, Bogotá/Colombia.*
*v3 = estado real del sitio verificado el 25-sep-2026: home estática, 32 URLs en sitemap, 15 artículos, hub transaccional nuevo, 13 correcciones SEO estructurales aplicadas y verificadas en producción.*
