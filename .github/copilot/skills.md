# Skills - APC Vision IA

## Información General
- **Nombre del Proyecto:** APC Vision IA
- **URL:** https://apcvisionai.site
- **Propósito:** Landing page de venta de soluciones de inteligencia artificial y visión por computadora para empresas. No ejecuta modelos en el navegador — es un sitio informativo y de captación de leads.
- **Tecnologías:** HTML, Tailwind CSS (CDN v4), Lucide icons, JavaScript vanilla

## Contexto del Proyecto
```
Sitio web informativo (landing page) que presenta y vende servicios de visión por computadora:
- Chatbots con IA para atención al cliente
- Visión artificial para control de calidad, seguridad y conteo
- Dashboards inteligentes con datos en tiempo real
- Automatización con machine learning
- Procesamiento de imágenes (OCR, clasificación)
No hay procesamiento de imágenes ni video en el lado del cliente. Todo funciona como página de captación con formulario que envía a n8n webhook.
```

## Funcionalidades Principales
1. **Chat Cristal** — Bot flotante scriptado en `/chat/cristal.js`. Árbol: cotizar/agendar/soporte/afirmaciones → form o WhatsApp directo. Oculta `.social-float` al abrir panel.
2. **Formulario de contacto** — Nombre, email, teléfono, mensaje + captcha. Envía POST a webhook n8n.
3. **Secciones de servicios** — Cards descriptivas de cada servicio de IA/visión con iconos Lucide.

## Información que debe conocer la IA
- **Bibliotecas usadas:** Tailwind CSS v4 (CDN), Lucide icons, Google Fonts (Inter + JetBrains Mono)
- **Modelos de IA:** No se ejecutan en el sitio. Los servicios se prestan via APIs/n8n/Groq (LLaMA 3.3) del lado del servidor.
- **Límites técnicos:** HTML plano — no React, no frameworks JS. Los cambios van directo a `index.html`.
- **Usuarios objetivo:** Empresas colombianas interesadas en implementar IA y visión artificial en sus procesos.
- **Contacto unificado:** Email `serviciosapcsoporte@gmail.com`, WA `wa.me/573337450634`, dirección `Cra. 52c #39b-22, Bogotá`.
- **Datos de contacto divididos** en la sección contacto del HTML: `email` y `telefono` como campos separados.

## Instrucciones para el Skill
La IA debe:
- Explicar que el sitio es una landing page informativa, no una demo técnica de visión por computadora.
- No cambiar los datos de contacto del ecosistema unificado.
- No eliminar ni modificar Cristal sin autorización explícita.
- Recordar que es HTML plano con Tailwind CDN.
- SEO keywords objetivo: inteligencia artificial Colombia, visión artificial, IA para empresas Colombia, automatización con IA, procesamiento imágenes IA.

## Documentación
- `index.html` — Página completa
- `chat/cristal.js` — Motor del chat flotante
