document.addEventListener("DOMContentLoaded", () => {
  // 🌙 Dark Mode Toggle
  const toggleBtn = document.getElementById("themeToggle");
  const searchInput = document.getElementById("searchInput");
  const gameLinks = document.querySelectorAll(".game-link");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggleBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  });

  // 🔍 Search Filter
  searchInput.addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();
    gameLinks.forEach(link => {
      link.style.display = link.textContent.toLowerCase().includes(search) ? "" : "none";
    });
  });

  // 🌟 Particle Animation
  const particleContainer = document.getElementById("particle-container");
  const numParticles = 60; // Number of floating dots

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particleContainer.appendChild(particle);
  }

  // 💰 Buy Tokens Modal
const buyBtn = document.getElementById("buyTokensBtn");
const modal = document.getElementById("buyModal");
const closeModal = document.getElementById("closeModal");

buyBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

});
