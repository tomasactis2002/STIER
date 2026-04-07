<script>
document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. BADGE % OFF
     Mover el badge dentro del contenedor de
     imagen y ocultar si descuento < 10%
  ───────────────────────────────────────── */
  document.querySelectorAll('.js-product-table .product-item').forEach(function (item) {
    var badge    = item.querySelector('.product-item-discount');
    var imgWrap  = item.querySelector('.product-item-image-container');

    if (!badge || !imgWrap) return;

    var pct = parseInt(badge.querySelector('.js-offer-percentage')?.textContent || '0');

    if (pct < 10) {
      badge.style.display = 'none';
    } else {
      // Mover badge dentro de la imagen para que quede encima
      imgWrap.appendChild(badge);
    }
  });

  /* ─────────────────────────────────────────
     2. STRIP ROJO "Con transferencia · Ahorrás $X"
     Inyectar en la zona de imagen de cada card
  ───────────────────────────────────────── */
  document.querySelectorAll('.js-product-table .product-item').forEach(function (item) {
    var imgWrap       = item.querySelector('.product-item-image-container');
    var transferEl    = item.querySelector('.js-payment-discount-price-product');
    var listaEl       = item.querySelector('.js-price-display');

    if (!imgWrap || !transferEl) return;

    function parsePrice(el) {
      if (!el) return 0;
      // Soporta formatos: $30.392,00 / $30392.00
      var txt = el.textContent.replace(/\s/g, '');
      // Formato argentino: punto como separador de miles, coma como decimal
      txt = txt.replace(/[^0-9.,]/g, '');
      if (txt.indexOf(',') > txt.indexOf('.')) {
        // 30.392,00 → quitar puntos, reemplazar coma por punto
        txt = txt.replace(/\./g, '').replace(',', '.');
      }
      return parseFloat(txt) || 0;
    }

    var pTransfer = parsePrice(transferEl);
    var pLista    = parsePrice(listaEl);
    var diff      = Math.round(pLista - pTransfer);

    if (diff <= 0) return;

    var ahorro = diff.toLocaleString('es-AR', { minimumFractionDigits: 2 });

    var strip = document.createElement('div');
    strip.className = 'stier-img-strip';
    strip.innerHTML =
      '<span class="stier-strip-label">Con transferencia</span>' +
      '<span class="stier-strip-saving">Ahorrás $' + ahorro + '</span>';

    imgWrap.appendChild(strip);
  });

  /* ─────────────────────────────────────────
     3. FAQ (código original conservado)
  ───────────────────────────────────────── */
  var botonesFaq = document.querySelectorAll('.stier-faq-button');
  botonesFaq.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var itemActual  = this.parentElement;
      var estaActivo  = itemActual.classList.contains('active');
      document.querySelectorAll('.stier-faq-item').forEach(function (item) {
        item.classList.remove('active');
      });
      if (!estaActivo) {
        itemActual.classList.add('active');
      }
    });
  });

});
</script>
