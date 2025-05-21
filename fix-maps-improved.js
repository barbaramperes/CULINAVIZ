// Solução final para o problema de tooltip em mapas D3
document.addEventListener("DOMContentLoaded", function () {
    console.log("🍳 Culinaviz - Fix Tooltips Script Loading");

    // Configuração do elemento tooltip
    function setupTooltip() {
        let tooltipMap = document.getElementById("tooltip-map");

        if (!tooltipMap) {
            console.log("tooltip-map não encontrado, criando elemento...");
            tooltipMap = document.createElement("div");
            tooltipMap.id = "tooltip-map";
            tooltipMap.className = "tooltip";
            document.body.appendChild(tooltipMap);
        }

        // Aplicar estilos diretamente
        const styles = {
            position: "fixed",
            zIndex: "10000",
            backgroundColor: "rgba(40, 40, 40, 0.9)",
            color: "white",
            padding: "12px 15px",
            borderRadius: "6px",
            pointerEvents: "none",
            opacity: "0",
            display: "none",
            visibility: "hidden",
            transform: "scale(0.95)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            boxShadow: "0 3px 14px rgba(0,0,0,0.25)",
            maxWidth: "220px",
            fontSize: "12px",
            lineHeight: "1.4",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)"
        };

        Object.assign(tooltipMap.style, styles);

        return tooltipMap;
    }

    // Criar elemento tooltip
    const tooltipElement = setupTooltip();

    // -------------------------------------------------------------------------
    // Abordagem 1: Substituir completamente os manipuladores de eventos do D3
    // -------------------------------------------------------------------------
    function applyD3OverrideMethod() {
        if (!window.d3) {
            console.log("D3 não encontrado, aguardando...");
            return false;
        }

        console.log("Aplicando método de substituição de handlers D3");

        // Backup do método original de seleção para restaurantes
        const originalSelectAll = d3.selection.prototype.selectAll;

        // Substitui o método selectAll
        d3.selection.prototype.selectAll = function (selector) {
            const result = originalSelectAll.apply(this, arguments);

            // Se estamos selecionando bolhas de restaurante
            if (selector === "circle.restaurant-bubble") {
                // Monitora quando os dados são vinculados
                const originalData = result.data;
                result.data = function () {
                    const dataResult = originalData.apply(this, arguments);

                    // Monitora quando os círculos são criados (método enter)
                    const originalEnter = dataResult.enter;
                    dataResult.enter = function () {
                        const enterResult = originalEnter.apply(this, arguments);

                        // Monitora quando eventos são adicionados
                        const originalOn = enterResult.on;
                        enterResult.on = function (typenames, value) {
                            // Se não estamos tentando adicionar mouseover
                            if (typenames !== "mouseover") {
                                return originalOn.apply(this, arguments);
                            }

                            // Substituir o manipulador mouseover por nosso manipulador aprimorado
                            return originalOn.call(this, typenames, function (event, d) {
                                // Primeiro, chama o handler original
                                value.call(this, event, d);

                                // Em seguida, garante que o tooltip esteja visível
                                const tooltip = document.getElementById("tooltip-map");
                                if (tooltip) {
                                    tooltip.style.opacity = "1";
                                    tooltip.style.display = "block";
                                    tooltip.style.visibility = "visible";
                                    tooltip.style.transform = "scale(1)";
                                    tooltip.classList.add("active");

                                    // Posiciona corretamente
                                    tooltip.style.left = (event.clientX + 15) + "px";
                                    tooltip.style.top = (event.clientY - 15) + "px";

                                    console.log("Tooltip aprimorado exibido para:", d.restaurant);
                                }
                            });
                        };

                        return enterResult;
                    };

                    return dataResult;
                };
            }

            return result;
        };

        return true;
    }

    // -------------------------------------------------------------------------
    // Abordagem 2: Usar MutationObserver para observar quando os tooltips são atualizados
    // -------------------------------------------------------------------------
    function applyMutationObserverMethod() {
        const tooltipMap = document.getElementById("tooltip-map");
        if (!tooltipMap) return false;

        console.log("Aplicando método de observação de mutações");

        // Criar um observador que monitora mudanças no innerHTML do tooltip
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes') {
                    // Se a mutação for nos atributos e o tooltip estiver sendo mostrado
                    if (mutation.attributeName === 'style') {
                        // Verifica se o tooltip está visível mas sem a classe active
                        if (tooltipMap.style.opacity === "1" && !tooltipMap.classList.contains('active')) {
                            tooltipMap.classList.add('active');
                            console.log("Tooltip corrigido via MutationObserver");
                        }
                    }
                }
            });
        });

        // Configuração para observar mudanças nos atributos style
        observer.observe(tooltipMap, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        return true;
    }

    // -------------------------------------------------------------------------
    // Abordagem 3: Injetar nosso próprio manipulador após os handlers padrão do D3
    // -------------------------------------------------------------------------
    function applyGlobalEventListenerMethod() {
        console.log("Aplicando método de escuta global de eventos");

        // Adicionar event listener global para capturar todos os eventos mouseover
        document.addEventListener('mouseover', function (event) {
            // Verificar se o alvo é uma bolha de restaurante
            if (event.target.tagName === 'circle' && event.target.classList.contains('restaurant-bubble')) {
                // Aguardar um curto período para permitir que o D3 processe o evento primeiro
                setTimeout(function () {
                    const tooltip = document.getElementById('tooltip-map');
                    if (tooltip && tooltip.innerHTML.trim() !== '' && tooltip.style.opacity !== '1') {
                        // Forçar o tooltip a ficar visível
                        tooltip.style.opacity = '1';
                        tooltip.style.display = 'block';
                        tooltip.style.visibility = 'visible';
                        tooltip.style.transform = 'scale(1)';
                        tooltip.classList.add('active');

                        // Posicionar corretamente
                        tooltip.style.left = (event.clientX + 15) + 'px';
                        tooltip.style.top = (event.clientY - 15) + 'px';

                        console.log("Tooltip restaurado via evento global");
                    }
                }, 50); // Pequeno atraso para permitir que o D3 processe primeiro
            }
        });

        // Semelhante para o mousemove
        document.addEventListener('mousemove', function (event) {
            if (event.target.tagName === 'circle' && event.target.classList.contains('restaurant-bubble')) {
                const tooltip = document.getElementById('tooltip-map');
                if (tooltip && tooltip.classList.contains('active')) {
                    tooltip.style.left = (event.clientX + 15) + 'px';
                    tooltip.style.top = (event.clientY - 15) + 'px';
                }
            }
        });

        return true;
    }

    // -------------------------------------------------------------------------
    // Abordagem 4: Sobrescrever diretamente os métodos de manipulação de tooltip do D3
    // -------------------------------------------------------------------------
    function patchExistingTooltipMethods() {
        // Verificar se as funções que mostram/escondem o tooltip podem ser encontradas
        const scriptTags = document.querySelectorAll('script');
        let tooltipHandlingFound = false;

        for (let i = 0; i < scriptTags.length; i++) {
            const scriptContent = scriptTags[i].textContent || '';

            // Procurar por padrões comuns de manipulação de tooltip
            if (scriptContent.includes('tooltipEl.style.opacity = "1"') ||
                scriptContent.includes('tooltip.style.opacity = "1"') ||
                scriptContent.includes('tooltipMap.style.opacity = "1"')) {

                tooltipHandlingFound = true;
                console.log("Manipulação de tooltip detectada no script #" + i);
                break;
            }
        }

        if (!tooltipHandlingFound) {
            console.log("Nenhuma manipulação de tooltip detectada nos scripts");
            return false;
        }

        // Sobrescrever o método style do d3
        if (window.d3 && d3.selection && d3.selection.prototype.style) {
            const originalStyleMethod = d3.selection.prototype.style;

            d3.selection.prototype.style = function (name, value) {
                // Chamar o método original
                const result = originalStyleMethod.apply(this, arguments);

                // Se estamos operando em um elemento com id tooltip-map
                if (this.nodes().some(node => node.id === 'tooltip-map')) {
                    if (name === 'opacity') {
                        // Se estamos tornando o tooltip visível
                        if (value === '1') {
                            const tooltipEl = document.getElementById('tooltip-map');
                            if (tooltipEl) {
                                // Garantir que o tooltip esteja completamente visível
                                tooltipEl.style.display = 'block';
                                tooltipEl.style.visibility = 'visible';
                                tooltipEl.style.transform = 'scale(1)';
                                tooltipEl.classList.add('active');

                                console.log("Estilo de tooltip corrigido via patch D3");
                            }
                        }
                    }
                }

                return result;
            };

            console.log("Método style do D3 sobrescrito");
            return true;
        }

        return false;
    }

    // Atrasar a aplicação dos métodos para garantir que o D3 e os elementos estejam carregados
    setTimeout(function () {
        // Tentar cada método, um de cada vez
        let success = applyD3OverrideMethod();

        if (!success) {
            success = patchExistingTooltipMethods();
        }

        if (!success) {
            success = applyMutationObserverMethod();
        }

        if (!success) {
            success = applyGlobalEventListenerMethod();
        }

        // Se nenhum método funcionou, adotamos uma abordagem de força bruta
        if (!success) {
            console.log("Usando método de último recurso (força bruta)");

            // Adicionar CSS para garantir que o tooltip seja exibido
            const style = document.createElement('style');
            style.textContent = `
                #tooltip-map.active, 
                #tooltip-map.tooltip.active,
                #tooltip-map[style*="opacity: 1"] {
                    opacity: 1 !important;
                    display: block !important;
                    visibility: visible !important;
                    transform: scale(1) !important;
                }
            `;
            document.head.appendChild(style);

            // Checar periodicamente se o tooltip está visível mas sem a classe active
            setInterval(function () {
                const tooltip = document.getElementById('tooltip-map');
                if (tooltip && tooltip.style.opacity === '1' && !tooltip.classList.contains('active')) {
                    tooltip.classList.add('active');
                }
            }, 100);
        }

        // Adicionar método de debug global
        window.debugTooltip = function () {
            const tooltip = document.getElementById('tooltip-map');
            console.log("Status do tooltip:", {
                elemento: tooltip,
                classes: tooltip ? tooltip.className : null,
                estilos: tooltip ? window.getComputedStyle(tooltip) : null,
                visibilidade: tooltip ? window.getComputedStyle(tooltip).visibility : null,
                opacidade: tooltip ? window.getComputedStyle(tooltip).opacity : null,
                exibição: tooltip ? window.getComputedStyle(tooltip).display : null
            });

            // Tentar forçar a exibição
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.display = 'block';
                tooltip.style.visibility = 'visible';
                tooltip.style.transform = 'scale(1)';
                tooltip.classList.add('active');
                console.log("Tooltip forçado a exibir via debug");
            }
        };
    }, 500);

    console.log("🍳 Culinaviz - Fix Tooltips Script Loaded");
}); 