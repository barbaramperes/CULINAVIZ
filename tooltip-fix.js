// Solução simples para o problema de tooltip
document.addEventListener("DOMContentLoaded", function () {
    console.log("Tooltip Fix - Carregado");

    // Melhore o CSS para garantir visibilidade
    const style = document.createElement('style');
    style.textContent = `
        #tooltip-map.active, 
        #tooltip-map.tooltip.active,
        #tooltip-map[style*="opacity: 1"] {
            opacity: 1 !important;
            display: block !important;
            visibility: visible !important;
            transform: scale(1) !important;
            z-index: 10000 !important;
        }
    `;
    document.head.appendChild(style);

    // Adicione observadores de eventos globais
    document.addEventListener('mouseover', function (event) {
        // Verifique se o alvo é uma bolha de restaurante
        if (event.target.tagName === 'circle' && event.target.classList.contains('restaurant-bubble')) {
            // Um pequeno atraso para permitir que o D3 primeiro manipule o evento
            setTimeout(function () {
                const tooltip = document.getElementById('tooltip-map');
                if (tooltip && tooltip.innerHTML.trim() !== '' && tooltip.style.opacity !== '1') {
                    // Força o tooltip a ficar visível
                    tooltip.style.opacity = '1';
                    tooltip.style.display = 'block';
                    tooltip.style.visibility = 'visible';
                    tooltip.style.transform = 'scale(1)';
                    tooltip.classList.add('active');

                    // Posiciona corretamente (usando pageX/Y para scroll)
                    tooltip.style.left = (event.pageX + 15) + 'px';
                    tooltip.style.top = (event.pageY - 15) + 'px';

                    console.log("Tooltip restaurado via evento global");
                }
            }, 50);
        }
    });

    // Adicione listener de movimento do mouse
    document.addEventListener('mousemove', function (event) {
        if (event.target.tagName === 'circle' && event.target.classList.contains('restaurant-bubble')) {
            const tooltip = document.getElementById('tooltip-map');
            if (tooltip && (tooltip.classList.contains('active') || tooltip.style.opacity === '1')) {
                tooltip.style.left = (event.pageX + 15) + 'px';
                tooltip.style.top = (event.pageY - 15) + 'px';
            }
        }
    });

    // Verificar periodicamente o tooltip
    setInterval(function () {
        const tooltip = document.getElementById('tooltip-map');

        // Se o tooltip tem conteúdo mas não está visível, ative-o
        if (tooltip && tooltip.innerHTML.trim() !== '' &&
            (tooltip.style.opacity === '0' || tooltip.style.display === 'none')) {

            const visibleBubbles = document.querySelectorAll('circle.restaurant-bubble:hover');
            if (visibleBubbles.length > 0) {
                tooltip.style.opacity = '1';
                tooltip.style.display = 'block';
                tooltip.style.visibility = 'visible';
                tooltip.classList.add('active');
                console.log("Tooltip corrigido via intervalo");
            }
        }
    }, 500);

    // Método global para debug
    window.fixTooltip = function () {
        const tooltip = document.getElementById('tooltip-map');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.display = 'block';
            tooltip.style.visibility = 'visible';
            tooltip.style.transform = 'scale(1)';
            tooltip.classList.add('active');
            console.log("Tooltip forçado a exibir via fixTooltip()");
        }
    };
}); 