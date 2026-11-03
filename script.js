/**
 * ALBIANTOROHUB // CYBERPUNK: EDGERUNNERS INTERFACE CONTROLLER
 * Features:
 * 1. Real-time Terminal Breach Filter & ESC Clear
 * 2. Dynamic Theme Switcher (Edgerunner Mode [David] <-> Netrunner Mode [Lucy])
 * 3. 0.2s DOM Glitch Shake & Web Audio API Cyber Synth SFX on Hover/Click
 * 4. Real-time HUD Clock Telemetry
 */

(function () {
    "use strict";

    // DOM References
    const body = document.body;
    const root = document.documentElement;
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeLabel = document.getElementById("theme-label");
    const modeStatusBadge = document.getElementById("mode-status-badge");
    const audioToggleBtn = document.getElementById("audio-toggle");
    const audioIndicator = document.getElementById("audio-indicator");

    const searchInput = document.getElementById("terminal-search");
    const clearSearchBtn = document.getElementById("clear-search");
    const cards = Array.from(document.querySelectorAll(".cyber-card"));
    const visibleCountEl = document.getElementById("visible-count");
    const totalCountEl = document.getElementById("total-count");
    const emptyStateEl = document.getElementById("empty-state");
    const emptyQueryEl = document.getElementById("empty-query");
    const hudClockEl = document.getElementById("hud-clock");

    // Theme Palette Definitions for Dynamic CSS Variable Updates
    const THEMES = {
        edgerunner: {
            name: "EDGERUNNER MODE",
            chassis: "CHASSIS: SANDEVISTAN // DAVID_M",
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
            chassis: "PROTOCOL: DEEP_DIVE // LUCY_K",
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
    let sfxEnabled = true;
    let audioCtx = null;

    // -------------------------------------------------------------------------
    // 1. Web Audio API Synthesizer (Cyber Click & Hover Bleeps, Zero Assets)
    // -------------------------------------------------------------------------
    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume().catch(function () {});
        }
        return audioCtx;
    }

    function playCyberSound(type) {
        if (!sfxEnabled) return;
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === "hover") {
                osc.type = "triangle";
                osc.frequency.setValueAtTime(1320, now);
                osc.frequency.exponentialRampToValueAtTime(680, now + 0.045);
                gain.gain.setValueAtTime(0.035, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (type === "switch") {
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(1180, now + 0.11);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.12);
            } else if (type === "key") {
                osc.type = "square";
                osc.frequency.setValueAtTime(880, now);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
                osc.start(now);
                osc.stop(now + 0.03);
            }
        } catch (err) {
            // Ignore audio autoplay blocks until user interacts
        }
    }

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener("click", function () {
            sfxEnabled = !sfxEnabled;
            audioIndicator.textContent = sfxEnabled ? "SFX: ON" : "SFX: OFF";
            if (sfxEnabled) playCyberSound("switch");
        });
    }

    // -------------------------------------------------------------------------
    // 2. Dynamic Theme Switcher (Edgerunner Mode <-> Netrunner Mode)
    // -------------------------------------------------------------------------
    function applyTheme(modeKey) {
        const theme = THEMES[modeKey];
        if (!theme) return;

        currentMode = modeKey;
        const isNetrunner = modeKey === "netrunner";

        body.classList.toggle("netrunner-mode", isNetrunner);
        body.classList.toggle("edgerunner-mode", !isNetrunner);

        // Dynamically update CSS custom properties on :root
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
            playCyberSound("switch");
        });
    }

    // -------------------------------------------------------------------------
    // 3. Real-Time Hacking Terminal Search Filter
    // -------------------------------------------------------------------------
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
        searchInput.addEventListener("input", function () {
            playCyberSound("key");
            filterProjects();
        });

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
            playCyberSound("switch");
            filterProjects();
        });
    }

    // -------------------------------------------------------------------------
    // 4. 0.2s Card Hover Glitch Manipulation & Button Audio Feedback
    // -------------------------------------------------------------------------
    cards.forEach(function (card) {
        let glitchTimer = null;

        card.addEventListener("mouseenter", function () {
            playCyberSound("hover");
            card.classList.remove("card-glitching");
            // Force reflow so re-hovering re-triggers 0.2s animation cleanly
            void card.offsetWidth;
            card.classList.add("card-glitching");

            if (glitchTimer) clearTimeout(glitchTimer);
            glitchTimer = setTimeout(function () {
                card.classList.remove("card-glitching");
            }, 200);
        });
    });

    const buttons = document.querySelectorAll(".cyber-btn");
    buttons.forEach(function (btn) {
        btn.addEventListener("mouseenter", function () {
            playCyberSound("hover");
        });
        btn.addEventListener("click", function () {
            playCyberSound("switch");
        });
    });

    // -------------------------------------------------------------------------
    // 5. HUD Clock Telemetry
    // -------------------------------------------------------------------------
    function updateClock() {
        if (!hudClockEl) return;
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        hudClockEl.textContent = hh + ":" + mm + ":" + ss + " NC_STD";
    }

    if (totalCountEl) totalCountEl.textContent = String(cards.length);
    if (visibleCountEl) visibleCountEl.textContent = String(cards.length);

    updateClock();
    setInterval(updateClock, 1000);
})();
