/* Calculadora de fuga APC VisionIA — heredada de APC360, envía a formsubmit */
(function () {
  "use strict";

  var WA = "https://wa.me/573337450634?text=Hola%2C%20quiero%20mi%20an%C3%A1lisis%20de%20fuga%20de%20APC%20VisionIA";

  var aiMessages = {
    gym: function (ads, ticket, visitors, total) {
      return "Con <strong>" + visitors.toLocaleString('es-CO') + " visitantes</strong> y <strong>" + ads.toLocaleString('es-CO') + " COP en pauta mensual</strong>, tu mayor fuga está en los <span class='cr-hl'>horarios muertos</span>: equipos sin uso que ocupan espacio y pauta activa cuando el local está vacío.<br><br>Detectamos en qué horas exactas tu inversión se convierte en desperdicio. Con visión computacional en tiempo real, el ahorro promedio es del <span class='cr-hl'>25% desde el primer mes</span>. Tu potencial: <strong style='color:#f59e0b'>" + Math.round(total).toLocaleString('es-CO') + " COP/mes</strong>.";
    },
    spa: function (ads, ticket, visitors, total) {
      return "La fuga de recepción es la más silenciosa. Con <strong>" + visitors.toLocaleString('es-CO') + " visitantes</strong> y ticket de <strong>" + ticket.toLocaleString('es-CO') + " COP</strong>, cada minuto de espera no detectada te cuesta clientes que ya están dentro.<br><br><span class='cr-hl'>1 de cada 5 clientes</span> que se va por espera no vuelve. Tu potencial de recuperación: <strong style='color:#f59e0b'>" + Math.round(total).toLocaleString('es-CO') + " COP/mes</strong>.";
    },
    retail: function (ads, ticket, visitors, total) {
      return "Con <strong>" + visitors.toLocaleString('es-CO') + " visitantes</strong> y ticket de <strong>" + ticket.toLocaleString('es-CO') + " COP</strong>, tu mayor pérdida es invisible: el cliente entró, no encontró el producto y se fue sin que nadie lo supiera.<br><br>Si pagas ads para traer clientes que se van por <span class='cr-hl'>stockout visual</span>, cada peso se multiplica como pérdida. Tu potencial: <strong style='color:#f59e0b'>" + Math.round(total).toLocaleString('es-CO') + " COP/mes</strong>.";
    },
    otro: function (ads, ticket, visitors, total) {
      return "Con <strong>" + visitors.toLocaleString('es-CO') + " visitantes</strong>, ticket de <strong>" + ticket.toLocaleString('es-CO') + " COP</strong> y <strong>" + ads.toLocaleString('es-CO') + " en pauta</strong>, identificamos tres fugas activas: desperdicio en ads, abandono por espera y ventas perdidas por exhibición.<br><br>El análisis de 48h precisa cuál es la más costosa en tu caso. Potencial estimado: <strong style='color:#f59e0b'>" + Math.round(total).toLocaleString('es-CO') + " COP/mes</strong>.";
    }
  };

  window.calcularFugaAPC = function () {
    var ads = parseFloat(document.getElementById('ads_spend').value) || 0;
    var ticket = parseFloat(document.getElementById('avg_ticket').value) || 0;
    var visitors = parseInt(document.getElementById('visitors').value) || 0;
    var sector = document.getElementById('calc_sector').value || 'otro';
    var ahorroPauta = ads * 0.25;
    var ventas = (visitors * 0.05 * ticket) + (visitors * 0.12 * ticket);
    var total = ahorroPauta + ventas;
    document.getElementById('result_total_display').textContent = '$' + Math.round(total).toLocaleString('es-CO');
    document.getElementById('res_ads').textContent = '$' + Math.round(ahorroPauta).toLocaleString('es-CO');
    document.getElementById('res_ventas').textContent = '$' + Math.round(ventas).toLocaleString('es-CO');
    document.getElementById('calcResult').classList.add('show');
    var aiMsg = document.getElementById('aiMessage');
    aiMsg.innerHTML = '<div class="cr-typing"><span></span><span></span><span></span></div>';
    setTimeout(function () {
      var fn = aiMessages[sector] || aiMessages['otro'];
      aiMsg.innerHTML = fn(ads, ticket, visitors, total);
    }, 1800);
  };

  window.submitCapture = function () {
    var email = document.getElementById('captureEmail').value.trim();
    if (!email || email.indexOf('@') < 0) { document.getElementById('captureEmail').focus(); return; }
    var form = document.createElement('form');
    form.action = 'https://formsubmit.co/serviciosapcsoporte@gmail.com';
    form.method = 'POST';
    form.style.display = 'none';
    var data = {
      '_subject': 'APC VisionIA — Lead Calculadora de Fuga',
      'email': email,
      'sector': document.getElementById('calc_sector').value || 'no especificado',
      'fuga_estimada': document.getElementById('result_total_display').textContent,
      'fuente': 'calculadora_fuga_apcvisionai'
    };
    Object.keys(data).forEach(function (k) {
      var i = document.createElement('input');
      i.type = 'hidden'; i.name = k; i.value = data[k];
      form.appendChild(i);
    });
    document.body.appendChild(form);
    form.submit();
    document.getElementById('captureEmail').style.display = 'none';
    var btn = document.querySelector('.ai-capture-row button'); if (btn) btn.style.display = 'none';
    document.getElementById('captureSuccess').classList.add('show');
  };
})();
