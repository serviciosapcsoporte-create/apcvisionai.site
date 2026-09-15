/* Calculadora de Arqueo APC — estima ahorro en tiempo y dinero */
(function () {
  "use strict";

  var WA = "https://wa.me/573337450634?text=Hola%2C%20quiero%20mi%20an%C3%A1lisis%20de%20arqueo%20inteligente%20APC";

  window.calcularArqueoAPC = function () {
    var efectivo = parseFloat(document.getElementById('efectivo_diario').value) || 0;
    var empleados = parseInt(document.getElementById('empleados').value) || 1;
    var horas = parseFloat(document.getElementById('horas_arqueo').value) || 0;
    var costoHora = parseFloat(document.getElementById('costo_hora').value) || 8000;

    var diasMes = 30;
    var horasMes = horas * diasMes;
    var ahorroHoras = horasMes * 0.9;
    var costoPersonal = horasMes * costoHora * Math.min(empleados, 3);
    var ahorroCosto = costoPersonal * 0.9;
    var total = ahorroCosto;

    document.getElementById('result_total_display').textContent = '$' + Math.round(total).toLocaleString('es-CO');
    document.getElementById('res_tiempo').textContent = Math.round(ahorroHoras) + 'h';
    document.getElementById('res_costo').textContent = '$' + Math.round(ahorroCosto).toLocaleString('es-CO');
    document.getElementById('calcResult').classList.add('show');

    var aiMsg = document.getElementById('aiMessage');
    aiMsg.innerHTML = '<div class="cr-typing"><span></span><span></span><span></span></div>';

    setTimeout(function () {
      var msg = 'Con <strong>' + horas + ' horas diarias</strong> de arqueo manual y <strong>' + empleados + ' empleado(s)</strong> en caja, tu sistema actual te cuesta <span class="cr-hl">' + Math.round(costoPersonal).toLocaleString('es-CO') + ' COP/mes</span> en tiempo de personal.<br><br>' +
        'Nuestro sistema de <strong>arqueo inteligente</strong> reduce esto a <strong>5 minutos</strong>: la mini PC graba audio, transcribe, graba video y genera el Excel automáticamente al final del día.<br><br>' +
        'Tu ahorro potencial: <strong style="color:#f59e0b">' + Math.round(total).toLocaleString('es-CO') + ' COP/mes</strong> + <span class="cr-hl">' + Math.round(ahorroHoras) + ' horas de personal liberadas</span> al mes.';

      if (efectivo > 0) {
        var riesgo = efectivo * 0.03 * diasMes;
        msg += '<br><br>Con <strong>' + efectivo.toLocaleString('es-CO') + ' COP diarios</strong> en efectivo, el 3% de discrepancy representa <span class="cr-hl">' + Math.round(riesgo).toLocaleString('es-CO') + ' COP/mes</span> en pérdidas potenciales que tu POS no detecta.';
      }

      aiMsg.innerHTML = msg;
    }, 1800);
  };

  window.submitCaptureArqueo = function () {
    var email = document.getElementById('captureEmail').value.trim();
    if (!email || email.indexOf('@') < 0) { document.getElementById('captureEmail').focus(); return; }

    var form = document.createElement('form');
    form.action = 'https://formsubmit.co/serviciosapcsoporte@gmail.com';
    form.method = 'POST';
    form.style.display = 'none';

    var data = {
      '_subject': 'APC Arqueo Inteligente — Lead Calculadora',
      'email': email,
      'efectivo_diario': document.getElementById('efectivo_diario').value || 'no especificado',
      'empleados': document.getElementById('empleados').value || 'no especificado',
      'horas_arqueo': document.getElementById('horas_arqueo').value || 'no especificado',
      'ahorro_estimado': document.getElementById('result_total_display').textContent,
      'fuente': 'calculadora_arqueo_apcvisionai'
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
