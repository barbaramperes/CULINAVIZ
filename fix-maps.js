// This script fixes tooltip behavior for restaurant maps
document.addEventListener("DOMContentLoaded", function () {
    console.log("Fix-maps script loaded");

    // Get the tooltip element
    const tooltipMap = document.getElementById("tooltip-map");

    // Force opacity to 0 initially
    if (tooltipMap) {
        tooltipMap.style.opacity = "0";
        tooltipMap.style.display = "none";
    }

    // Check every 500ms if new restaurant bubbles were added and attach tooltip handlers
    setInterval(function () {
        const bubbles = document.querySelectorAll("circle.restaurant-bubble");

        if (bubbles.length > 0) {
            console.log("Found " + bubbles.length + " restaurant bubbles");

            // Loop through bubbles and ensure they have tooltip events
            bubbles.forEach(bubble => {
                if (!bubble.dataset.tooltipInitialized) {
                    // This bubble hasn't had tooltip events added yet
                    bubble.dataset.tooltipInitialized = "true";

                    // Get data from the bubble's __data__ property (where D3 stores data)
                    const d = bubble.__data__;
                    if (d) {
                        // Get cuisine color
                        const bubbleColor = bubble.getAttribute("fill") || "#999";

                        // Add mouseover event
                        bubble.addEventListener("mouseover", function (event) {
                            if (tooltipMap) {
                                // Build tooltip content with color indicator
                                tooltipMap.innerHTML = `
                                    <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 6px; margin-bottom: 6px;">
                                        <strong style="font-size: 14px; color: #fff;">${d.restaurant}</strong>
                                    </div>
                                    <div style="display: flex; flex-direction: column; align-items: center;">
                                        <div style="margin-bottom: 4px; display: flex; align-items: center;">
                                            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${bubbleColor}; margin-right: 6px;"></span>
                                            <span style="font-size: 12px; color: #fff;">${d.cuisine || d.broadCuisine || "Unknown cuisine"}</span>
                                        </div>
                                        <span style="font-size: 11px; color: rgba(255,255,255,0.7);">Rank: #${d.rank} (${d.year})</span>
                                        <span style="font-size: 11px; color: rgba(255,255,255,0.7);">${d.location}, ${d.country}</span>
                                    </div>
                                `;

                                // Force display with inline styles
                                tooltipMap.setAttribute("style",
                                    "opacity: 1 !important; " +
                                    "transform: scale(1) !important; " +
                                    "display: block !important; " +
                                    "visibility: visible !important; " +
                                    "left: " + (event.pageX + 15) + "px !important; " +
                                    "top: " + (event.pageY - 15) + "px !important; " +
                                    "z-index: 9999 !important; " +
                                    "background-color: rgba(40, 40, 40, 0.9) !important; " +
                                    "color: white !important; " +
                                    "border-radius: 6px !important; " +
                                    "position: fixed !important; " +
                                    "padding: 10px 15px !important; " +
                                    "pointer-events: none !important;"
                                );

                                // Also add the active class
                                tooltipMap.classList.add("active");

                                console.log("Tooltip shown for:", d.restaurant);
                            }
                        });

                        // Add mousemove event
                        bubble.addEventListener("mousemove", function (event) {
                            if (tooltipMap && tooltipMap.classList.contains("active")) {
                                tooltipMap.style.left = (event.pageX + 15) + "px";
                                tooltipMap.style.top = (event.pageY - 15) + "px";
                            }
                        });

                        // Add mouseout event
                        bubble.addEventListener("mouseout", function () {
                            if (tooltipMap) {
                                tooltipMap.setAttribute("style",
                                    "opacity: 0 !important; " +
                                    "transform: scale(0.95) !important; " +
                                    "display: none !important; " +
                                    "visibility: hidden !important;"
                                );
                                tooltipMap.classList.remove("active");
                                console.log("Tooltip hidden");
                            }
                        });
                    }
                }
            });
        }
    }, 500);
}); 