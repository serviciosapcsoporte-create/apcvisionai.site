/* Loader de Cristal para apcvisionai.site — define config y carga el motor */
(function () {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "chat/cristal.css";
  document.head.appendChild(link);

  var isArqueo = window.location.pathname.indexOf('arqueo') !== -1;

  window.CRISTAL_CONFIG = {
    site: "apcvisionai",
    brand: isArqueo ? "APC Arqueo" : "APC VisionIA",
    waUrl: "https://wa.me/573337450634",
    formUrl: "https://formsubmit.co/serviciosapcsoporte@gmail.com",
    policyUrl: "https://serviciosapc.site/documentos/Politica_Tratamiento_Datos_serviciosapc.pdf",
    pains: isArqueo ? [
      { label: "Arqueo de caja", step: "pain_arqueo" },
      { label: "Transcripción de audio", step: "pain_transcripcion" },
      { label: "Grabación de video", step: "pain_video" },
      { label: "Reportes Excel", step: "pain_reportes" },
      { label: "Checkpoint de red", step: "pain_red" },
      { label: "Otro", step: "pain_otro" },
    ] : [
      { label: "Cámaras / CCTV", step: "pain_camaras" },
      { label: "Flujo de clientes", step: "pain_flujo" },
      { label: "Página web / SEO", step: "pain_web" },
      { label: "Bot WhatsApp", step: "pain_ia" },
      { label: "Datos / dashboard", step: "pain_datos" },
      { label: "Otro", step: "pain_otro" },
    ],
    servicesByPain: isArqueo ? {
      arqueo: "<strong>Arqueo Inteligente:</strong> mini PC configurada + checkpoint. Comparación automática POS vs físico. Excel al final del día.",
      transcripcion: "<strong>Transcripción de audio:</strong> cada conversación del punto de venta queda transcrita, indexada y searchable.",
      video: "<strong>Grabación de video y audio:</strong> copia completa del mostrador. Archivos guardados con copia de seguridad.",
      reportes: "<strong>Reportes Excel automáticos:</strong> comparación del arqueo al final del día. Por correo, WhatsApp o Telegram.",
      red: "<strong>Checkpoint de red:</strong> firewall y protección para tu computador y red. Seguridad integral.",
      otro: "Reviso tu caso y te propongo la mejor solución de arqueo inteligente para tu negocio.",
    } : {
      camaras: "<strong>Analítica de Video con IA + CCTV inteligente:</strong> detección de personas, alertas y revisión remota desde tu celular. Desde Bogotá.",
      flujo: "<strong>Conteo de personas + Mapas de calor:</strong> ves dónde se pierden clientes y abres caja antes de que se vayan. 98% de precisión.",
      web: "<strong>Páginas web + SEO local:</strong> para que te encuentren en Bogotá cuando buscan tu servicio.",
      ia: "<strong>Bots de WhatsApp con IA:</strong> atención 24/7, agenda y pedidos automáticos.",
      datos: "<strong>Dashboard analítico:</strong> KPIs en tiempo real de tráfico, ventas y eficiencia.",
      otro: "Reviso tu caso y te digo si lo resolvemos con visión computacional o automatización.",
    },
    fallbackService: isArqueo
      ? "Reviso tu caso y te propongo la mejor solución de arqueo inteligente para tu negocio."
      : "Reviso tu caso y te propongo la mejor solución con visión computacional o automatización.",
  };

  var s = document.createElement("script");
  s.src = "chat/cristal.js";
  document.body.appendChild(s);
})();
