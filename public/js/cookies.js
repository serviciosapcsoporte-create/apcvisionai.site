/* Aviso de cookies APC VisionIA
   Inyecta el banner de consentimiento y guarda la eleccion en la cookie
   first-party 'apc_consent' (180 dias). Si el visitante acepta, se habilita
   la medicion de Google Analytics (GA4) con Consent Mode v2. */
(function () {
  'use strict';

  var KEY = 'apc_consent';
  var DAYS = 180;
  var POLICY = '/politicas-de-cookies.html';

  function readConsent() {
    var m = document.cookie.match(/(?:^|;\s*)apc_consent=([^;]*)/);
    return m ? decodeURIComponent(m[1]) : '';
  }

  function writeConsent(value) {
    var cookie = KEY + '=' + encodeURIComponent(value) +
      ';path=/;max-age=' + (DAYS * 86400) + ';SameSite=Lax';
    if (location.protocol === 'https:') cookie += ';Secure';
    document.cookie = cookie;
  }

  function grantAnalytics() {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
  }

  function hide(banner) {
    if (!banner) return;
    banner.setAttribute('hidden', 'hidden');
    if (banner.parentNode) banner.parentNode.removeChild(banner);
  }

  function buildStyles() {
    if (document.getElementById('apc-cookies-style')) return;
    var css = '' +
      '#apc-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:80;' +
      'display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;' +
      'padding:16px 20px;background:#0A0F1E;border-top:1px solid rgba(212,255,50,.22);' +
      'box-shadow:0 -8px 40px rgba(0,0,0,.5);font-size:14px;line-height:1.55;color:#CBD5E1;}' +
      '#apc-cookie-banner p{margin:0;max-width:70ch;}' +
      '#apc-cookie-banner a{color:#D4FF32;text-decoration:underline;text-underline-offset:3px;}' +
      '#apc-cookie-banner a:hover{color:#e2ff6b;}' +
      '#apc-cookie-banner .apc-actions{display:flex;gap:10px;flex-wrap:wrap;}' +
      '#apc-cookie-banner button{cursor:pointer;font:inherit;font-weight:700;font-size:14px;' +
      'border-radius:999px;padding:11px 24px;min-height:44px;border:1px solid transparent;' +
      'transition:background .15s ease,border-color .15s ease;}' +
      '#apc-cookie-banner button:focus-visible{outline:2px solid #D4FF32;outline-offset:2px;}' +
      '#apc-cookie-banner .apc-accept{background:#D4FF32;color:#07110A;}' +
      '#apc-cookie-banner .apc-accept:hover{background:#e2ff6b;}' +
      '#apc-cookie-banner .apc-reject{background:transparent;color:#E2E8F0;border-color:rgba(255,255,255,.28);}' +
      '#apc-cookie-banner .apc-reject:hover{border-color:rgba(255,255,255,.55);}' +
      '@media (max-width:640px){#apc-cookie-banner{flex-direction:column;align-items:flex-start;' +
      'gap:12px;padding:14px 16px;font-size:13.5px;}' +
      '#apc-cookie-banner .apc-actions{width:100%;}' +
      '#apc-cookie-banner button{flex:1 1 auto;}}';
    var style = document.createElement('style');
    style.id = 'apc-cookies-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function show() {
    if (document.getElementById('apc-cookie-banner')) return;
    buildStyles();

    var banner = document.createElement('div');
    banner.id = 'apc-cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');

    var text = document.createElement('p');
    text.appendChild(document.createTextNode(
      'Usamos cookies propias y de Google Analytics para medir el trafico de este sitio. ' +
      'Puedes aceptarlas o rechazarlas: la pagina funciona igual en ambos casos. '
    ));
    var link = document.createElement('a');
    link.href = POLICY;
    link.textContent = 'Ver la política de cookies';
    text.appendChild(link);
    text.appendChild(document.createTextNode('.'));
    banner.appendChild(text);

    var actions = document.createElement('div');
    actions.className = 'apc-actions';

    var accept = document.createElement('button');
    accept.type = 'button';
    accept.className = 'apc-accept';
    accept.textContent = 'Aceptar cookies';

    var reject = document.createElement('button');
    reject.type = 'button';
    reject.className = 'apc-reject';
    reject.textContent = 'Rechazar';

    actions.appendChild(accept);
    actions.appendChild(reject);
    banner.appendChild(actions);

    function decide(value) {
      writeConsent(value);
      if (value === 'accepted') grantAnalytics();
      hide(banner);
    }
    accept.addEventListener('click', function () { decide('accepted'); });
    reject.addEventListener('click', function () { decide('rejected'); });

    document.body.appendChild(banner);
  }

  function init() {
    var consent = readConsent();
    if (consent === 'accepted') {
      grantAnalytics();
      return;
    }
    if (consent === 'rejected') return;
    show();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.apcCookieBanner = { show: show, read: readConsent };
})();
