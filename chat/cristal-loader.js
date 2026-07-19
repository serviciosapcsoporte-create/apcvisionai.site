/* Loader de Cristal para apcvisionai.site — define config y carga el motor */
(function () {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "chat/cristal.css";
  document.head.appendChild(link);

  window.CRISTAL_CONFIG = {
    site: "apcvisionai",
    brand: "APC VisionIA",
    waUrl: "https://wa.me/573337450634",
    formUrl: "https://formsubmit.co/serviciosapcsoporte@gmail.com",
    policyUrl: "https://serviciosapc.site/documentos/Politica_Tratamiento_Datos_serviciosapc.pdf",
    pains: [
      { label: "Cámaras / CCTV", step: "pain_camaras" },
      { label: "Flujo de clientes", step: "pain_flujo" },
      { label: "Página web / SEO", step: "pain_web" },
      { label: "Bot WhatsApp", step: "pain_ia" },
      { label: "Datos / dashboard", step: "pain_datos" },
      { label: "Otro", step: "pain_otro" },
    ],
    servicesByPain: {
      camaras: "<strong>Analítica de Video con IA + CCTV inteligente:</strong> detección de personas, alertas y revisión remota desde tu celular. Desde Bogotá.",
      flujo: "<strong>Conteo de personas + Mapas de calor:</strong> ves dónde se pierden clientes y abres caja antes de que se vayan. 98% de precisión.",
      web: "<strong>Páginas web + SEO local:</strong> para que te encuentren en Bogotá cuando buscan tu servicio.",
      ia: "<strong>Bots de WhatsApp con IA:</strong> atención 24/7, agenda y pedidos automáticos.",
      datos: "<strong>Dashboard analítico:</strong> KPIs en tiempo real de tráfico, ventas y eficiencia.",
      otro: "Reviso tu caso y te digo si lo resolvemos con visión computacional o automatización.",
    },
    fallbackService: "Reviso tu caso y te propongo la mejor solución con visión computacional o automatización.",
  };

  var s = document.createElement("script");
  s.src = "chat/cristal.js";
  document.body.appendChild(s);
})();
