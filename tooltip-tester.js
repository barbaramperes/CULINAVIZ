// Script para testar o funcionamento do tooltip
document.addEventListener("DOMContentLoaded", function () {
    console.log("Tooltip tester loaded");

    // Função para verificar o estado do tooltip após um curto período
    setTimeout(function () {
        const tooltipMap = document.getElementById("tooltip-map");

        if (!tooltipMap) {
            console.error("ERRO: Elemento tooltip-map não encontrado na página!");
            alert("ERRO: Elemento tooltip-map não encontrado. Verifique o console.");
            return;
        }

        console.log("Tooltip element found:", tooltipMap);
        console.log("Tooltip CSS classes:", tooltipMap.className);
        console.log("Tooltip current styles:", {
            position: tooltipMap.style.position,
            zIndex: tooltipMap.style.zIndex,
            backgroundColor: tooltipMap.style.backgroundColor,
            display: tooltipMap.style.display,
            visibility: tooltipMap.style.visibility,
            opacity: tooltipMap.style.opacity
        });

        // Verificar bolhas de restaurante
        const bubbles = document.querySelectorAll("circle.restaurant-bubble");
        console.log("Restaurant bubbles found:", bubbles.length);

        if (bubbles.length === 0) {
            console.warn("Nenhuma bolha de restaurante encontrada. O mapa pode não estar carregado ainda.");
        } else {
            // Verificar se as bolhas têm os dados esperados
            let hasData = false;
            bubbles.forEach((bubble, index) => {
                if (index < 3) { // Verificar apenas as primeiras 3 para não sobrecarregar o log
                    const data = bubble.__data__;
                    console.log(`Bubble ${index} data:`, data);
                    if (data) hasData = true;
                }
            });

            if (!hasData) {
                console.error("ERRO: As bolhas de restaurante não têm dados (__data__).");
                alert("ERRO: Bolhas sem dados. Verifique o console.");
            }
        }

        // Simular um hover na primeira bolha para testar o tooltip
        if (bubbles.length > 0) {
            console.log("Simulando evento mouseover na primeira bolha...");

            // Criar e disparar um evento mouseover
            const mouseEvent = new MouseEvent("mouseover", {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: 100,
                clientY: 100,
                pageX: 100,
                pageY: 100
            });

            bubbles[0].dispatchEvent(mouseEvent);

            // Verificar se o tooltip ficou visível
            setTimeout(() => {
                console.log("Tooltip após mouseover:", {
                    display: tooltipMap.style.display,
                    visibility: tooltipMap.style.visibility,
                    opacity: tooltipMap.style.opacity,
                    isActive: tooltipMap.classList.contains("active")
                });

                if (tooltipMap.style.opacity !== "1" && !tooltipMap.classList.contains("active")) {
                    console.error("ERRO: Tooltip não apareceu após simular hover na bolha.");
                    alert("ERRO: Tooltip não está aparecendo no hover. Verifique o console.");
                } else {
                    console.log("SUCESSO: Tooltip está funcionando corretamente!");
                }
            }, 500);
        }
    }, 2000); // Aguardar 2 segundos para o mapa carregar
}); 