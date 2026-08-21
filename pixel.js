/**
 * META PIXEL — VITRINE BEAUTY PRO — V5
 *
 * IMPORTANTE:
 * - O site registra PageView e ViewContent.
 * - O clique no botão que leva à Cakto é registrado como evento PERSONALIZADO "CheckoutClick".
 * - NÃO registramos InitiateCheckout neste site.
 * - Como o Pixel já está instalado na Cakto, deixe a Cakto registrar InitiateCheckout e Purchase.
 *
 * INSTALAÇÃO:
 * 1) No Gerenciador de Eventos da Meta, copie o ID numérico do seu Pixel.
 * 2) Substitua COLE_SEU_PIXEL_ID_AQUI pelo seu ID, mantendo as aspas.
 * 3) Salve e publique o site novamente.
 *
 * Exemplo:
 * const META_PIXEL_ID = '123456789012345';
 */
(function () {
  const META_PIXEL_ID = 'COLE_SEU_PIXEL_ID_AQUI';

  // Não carrega o Pixel enquanto o ID não tiver sido configurado.
  if (!/^\d+$/.test(META_PIXEL_ID)) {
    console.info('[Meta Pixel] Configure o ID em pixel.js antes de publicar a campanha.');
    return;
  }

  // Código-base do Meta Pixel.
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');
  fbq('track', 'ViewContent', {
    content_name: 'Vitrine Beauty Pro',
    content_type: 'product',
    value: 37.00,
    currency: 'BRL'
  });

  // Mede intenção de ir ao checkout sem duplicar o InitiateCheckout da Cakto.
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-checkout]').forEach(function (button) {
      button.addEventListener('click', function () {
        fbq('trackCustom', 'CheckoutClick', {
          content_name: 'Vitrine Beauty Pro',
          content_type: 'product',
          value: 37.00,
          currency: 'BRL'
        });
      });
    });
  });
})();
