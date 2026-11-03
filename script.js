(function () {
    "use strict";

    const body = document.body;
    const root = document.documentElement;
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeLabel = document.getElementById("theme-label");
    const modeStatusBadge = document.getElementById("mode-status-badge");

    const searchInput = document.getElementById("terminal-search");
    const clearSearchBtn = document.getElementById("clear-search");
    const cards = Array.from(document.querySelectorAll(".cyber-card"));
    const visibleCountEl = document.getElementById("visible-count");
    const totalCountEl = document.getElementById("total-count");
    const emptyStateEl = document.getElementById("empty-state");
    const emptyQueryEl = document.getElementById("empty-query");

    const THEMES = {
        edgerunner: {
            name: "EDGERUNNER MODE",
            chassis: "CHASSIS : SISTEM INFORMASI // CHATTAMA_A",
            vars: {
                "--bg-void": "#0d0d0d",
                "--bg-surface": "#121318",
                "--bg-card": "rgba(18, 20, 27, 0.88)",
                "--bg-terminal": "rgba(10, 12, 16, 0.94)",
                "--accent-primary": "#f3e600",
                "--accent-secondary": "#00f0ff",
                "--accent-danger": "#ff003c",
                "--accent-glow": "rgba(243, 230, 0, 0.55)",
                "--accent-glow-soft": "rgba(243, 230, 0, 0.16)",
                "--accent-border": "rgba(243, 230, 0, 0.45)",
                "--text-on-accent": "#0d0d0d"
            }
        },
        netrunner: {
            name: "NETRUNNER MODE",
            chassis: "CHASSIS : SISTEM INFORMASI // CHATTAMA_A",
            vars: {
                "--bg-void": "#080711",
                "--bg-surface": "#100d21",
                "--bg-card": "rgba(17, 13, 36, 0.88)",
                "--bg-terminal": "rgba(10, 8, 24, 0.95)",
                "--accent-primary": "#00f0ff",
                "--accent-secondary": "#ff003c",
                "--accent-danger": "#f3e600",
                "--accent-glow": "rgba(0, 240, 255, 0.6)",
                "--accent-glow-soft": "rgba(157, 0, 255, 0.24)",
                "--accent-border": "rgba(0, 240, 255, 0.48)",
                "--text-on-accent": "#080711"
            }
        }
    };

    let currentMode = "edgerunner";

    function applyTheme(modeKey) {
        const theme = THEMES[modeKey];
        if (!theme) return;

        currentMode = modeKey;
        const isNetrunner = modeKey === "netrunner";

        body.classList.toggle("netrunner-mode", isNetrunner);
        body.classList.toggle("edgerunner-mode", !isNetrunner);

        Object.keys(theme.vars).forEach(function (prop) {
            root.style.setProperty(prop, theme.vars[prop]);
        });

        if (themeLabel) themeLabel.textContent = theme.name;
        if (modeStatusBadge) modeStatusBadge.textContent = theme.chassis;
        if (themeToggleBtn) themeToggleBtn.setAttribute("aria-pressed", String(isNetrunner));
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            const nextMode = currentMode === "edgerunner" ? "netrunner" : "edgerunner";
            applyTheme(nextMode);
        });
    }

    function filterProjects() {
        const rawQuery = searchInput ? searchInput.value.trim() : "";
        const query = rawQuery.toLowerCase();
        let matchCount = 0;

        cards.forEach(function (card) {
            const textContent = card.textContent.toLowerCase();
            const keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
            const isMatch = !query || textContent.includes(query) || keywords.includes(query);

            if (isMatch) {
                card.style.display = "flex";
                matchCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (visibleCountEl) visibleCountEl.textContent = String(matchCount);
        if (clearSearchBtn) clearSearchBtn.hidden = query.length === 0;

        if (emptyStateEl) {
            if (matchCount === 0) {
                emptyStateEl.hidden = false;
                if (emptyQueryEl) emptyQueryEl.textContent = '"' + rawQuery + '"';
            } else {
                emptyStateEl.hidden = true;
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterProjects);

        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                searchInput.value = "";
                filterProjects();
            }
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", function () {
            if (searchInput) {
                searchInput.value = "";
                searchInput.focus();
            }
            filterProjects();
        });
    }

    if (totalCountEl) totalCountEl.textContent = String(cards.length);
    if (visibleCountEl) visibleCountEl.textContent = String(cards.length);
})();
