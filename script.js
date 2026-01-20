document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     ELEMENTS
  ============================= */
  const toggleBtn = document.getElementById("themeToggle");
  const searchInput = document.getElementById("searchInput");
  const gameLinks = document.querySelectorAll(".game-link");
  const logo = document.querySelector(".logo");
  const particleContainer = document.getElementById("particle-container");

  /* =============================
     THEME TOGGLE
  ============================= */
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleBtn.textContent =
      document.body.classList.contains("light") ? "☀️" : "🌙";
  });

  /* =============================
     SEARCH FILTER
  ============================= */
  searchInput?.addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();

    gameLinks.forEach(link => {
      link.style.display =
        link.textContent.toLowerCase().includes(search) ? "" : "none";
    });

    // small visible Easter egg
    if (search === "spring") showToast("🌱 Spring is in the air");
    if (search === "easter") showToast("🥚 Keep looking…");
  });

  /* =============================
     PARTICLES
  ============================= */
  const numParticles = 60;
  for (let i = 0; i < numParticles; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.top = Math.random() * 100 + "vh";
    p.style.width = p.style.height = Math.random() * 4 + 2 + "px";
    p.style.animationDuration = Math.random() * 15 + 10 + "s";
    p.style.animationDelay = Math.random() * 15 + "s";
    particleContainer.appendChild(p);
  }

  /* =============================
     EASTER EGG #1 — TYPE "SPRING"
  ============================= */
  let typed = "";
  const secretWord = "spring";

  document.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;

    typed += e.key.toLowerCase();
    typed = typed.slice(-secretWord.length);

    if (typed === secretWord) {
      document.body.classList.add("spring-mode");
      showToast("🌸 Spring mode unlocked");
    }
  });

  /* =============================
     EASTER EGG #2 — LOGO CLICKS
  ============================= */
  let logoClicks = 0;
  let logoReset;

  logo?.addEventListener("click", () => {
    logoClicks++;
    clearTimeout(logoReset);
    logoReset = setTimeout(() => logoClicks = 0, 1200);

    if (logoClicks === 5) {
      bloom();
      showToast("🌼 Bloom!");
      logoClicks = 0;
    }
  });

  function bloom() {
    document.body.classList.add("spring-bloom");

    for (let i = 0; i < 15; i++) {
      const flower = document.createElement("div");
      flower.textContent = "🌼";
      flower.style.position = "fixed";
      flower.style.left = Math.random() * 100 + "vw";
      flower.style.top = "-30px";
      flower.style.fontSize = Math.random() * 20 + 16 + "px";
      flower.style.pointerEvents = "none";
      flower.style.animation = "fall 3s linear forwards";
      document.body.appendChild(flower);
      setTimeout(() => flower.remove(), 3000);
    }

    setTimeout(() => {
      document.body.classList.remove("spring-bloom");
    }, 5000);
  }

  /* =============================
     EASTER EGG #3 — WIND GUST
  ============================= */
  setInterval(() => {
    document.body.classList.add("wind-gust");
    setTimeout(() => document.body.classList.remove("wind-gust"), 3500);
  }, 45000);

  /* =============================
     HARD EASTER EGG (GIVEAWAY)
     HOLD SHIFT + CLICK LOGO 7x
  ============================= */
  let secretClicks = 0;

  logo?.addEventListener("click", (e) => {
    if (!e.shiftKey) return;

    secretClicks++;
    if (secretClicks === 7) {
document.getElementById("giveaway-code").style.display = "flex";
      document.body.classList.add("spring-mode");
      secretClicks = 0;
    }

    setTimeout(() => secretClicks = 0, 2000);
  });

  /* =============================
     TOAST HELPER (LIVEWEAVE SAFE)
  ============================= */
  function showToast(text) {
    if (document.getElementById("toast")) return;

    const toast = document.createElement("div");
    toast.id = "toast";
    toast.textContent = text;

    Object.assign(toast.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#e8f5e9",
      color: "#1f2d1f",
      padding: "10px 18px",
      borderRadius: "12px",
      fontWeight: "600",
      zIndex: "9999",
      animation: "fadeIn 0.5s"
    });

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

});
