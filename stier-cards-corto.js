<script>
document.addEventListener('DOMContentLoaded', function() {

    // FAQ
    var botonesFaq = document.querySelectorAll('.stier-faq-button');
    botonesFaq.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var itemActual = this.parentElement;
            var estaActivo = itemActual.classList.contains('active');
            document.querySelectorAll('.stier-faq-item').forEach(function(item) {
                item.classList.remove('active');
            });
            if (!estaActivo) {
                itemActual.classList.add('active');
            }
        });
    });

    // Ocultar badges con menos de 10% de descuento
    document.querySelectorAll('.js-product-table .product-item-discount').forEach(function(badge) {
        var pct = parseInt(badge.querySelector('.js-offer-percentage')?.textContent || '0');
        if (pct < 10) badge.style.display = 'none';
    });

});
</script>