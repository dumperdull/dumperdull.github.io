document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
     Elements
  ----------------------------- */
  const toggleBtn = document.getElementById("themeToggle");
  const searchInput = document.getElementById("searchInput");
  const gameLinks = document.querySelectorAll(".game-link");
  const logo = document.querySelector(".logo");
  const particleContainer = document.getElementById("particle-container");

  /* -----------------------------
     Theme Toggle
  ----------------------------- */
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  });

  /* -----------------------------
     Search Filter + Hidden Garden
  ----------------------------- */
  searchInput?.addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();
    gameLinks.forEach(link => {
      const isMatch = link.textContent.toLowerCase().includes(search);
      const isGarden = link.dataset.garden === "true";

      if (isGarden) {
        link.style.display = search.includes("garden") ? "" : "none";
      } else {
        link.style.display = isMatch ? "" : "none";
      }
    });

    // Liveweave-safe secret message
    if (search === "spring") {
      if (!document.getElementById("spring-msg")) {
        const msg = document.createElement("div");
        msg.id = "spring-msg";
        msg.textContent = "🌷 You found the Spring Secret!";
        Object.assign(msg.style, {
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 20px",
          background: "#e8f5e9",
          borderRadius: "12px",
          color: "#1f2d1f",
          fontWeight: "bold",
          animation: "fadeIn 1s"
        });
        document.body.appendChild(msg);
      }
    }
  });

  /* -----------------------------
     Particle Animation
  ----------------------------- */
  const numParticles = 60;
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particleContainer?.appendChild(particle);
  }

  /* -----------------------------
     Secret SPRING Mode (Keyboard)
  ----------------------------- */
  let typed = "";
  const secret = "spring";
  document.addEventListener("keydown", (e) => {
    typed += e.key.toLowerCase();
    typed = typed.slice(-secret.length);

    if (typed === secret) {
      document.body.classList.add("spring-mode");
      console.log("🌱 Spring Mode Activated");
    }
  });

  /* -----------------------------
     Wind Gusts (Ambient)
  ----------------------------- */
  setInterval(() => {
    document.body.classList.add("wind-gust");
    setTimeout(() => document.body.classList.remove("wind-gust"), 4000);
  }, 45000);

  /* -----------------------------
     Logo Click Easter Egg
  ----------------------------- */
  let logoClicks = 0;
  let logoTimer = null;
  if (logo) {
    logo.addEventListener("click", () => {
      logoClicks++;
      clearTimeout(logoTimer);
      logoTimer = setTimeout(() => (logoClicks = 0), 1200);
      if (logoClicks === 5) triggerLogoEgg();
    });
  }

  function triggerLogoEgg() {
    document.body.classList.add("spring-bloom");
    // Optional: add small flower particles for fun
    for (let i = 0; i < 20; i++) {
      const flower = document.createElement("div");
      flower.textContent = "🌼";
      flower.style.position = "fixed";
      flower.style.left = Math.random() * 100 + "vw";
      flower.style.top = "-20px";
      flower.style.fontSize = `${Math.random() * 20 + 16}px`;
      flower.style.pointerEvents = "none";
      flower.style.animation = "fall 3s linear forwards";
      document.body.appendChild(flower);
      setTimeout(() => flower.remove(), 3000);
    }

    setTimeout(() => document.body.classList.remove("spring-bloom"), 6000);
  }

});
