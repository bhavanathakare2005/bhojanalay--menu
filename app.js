const phoneNumber = "919307184905";

const pages = document.querySelectorAll(".page");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");
const whatsappButtons = document.querySelectorAll(".whatsapp-btn");

let currentPage = 0;
let touchStartX = 0;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle("active", i === index);
  });
  pageIndicator.textContent = `${index + 1} / ${pages.length}`;
}

function nextPage() {
  currentPage = (currentPage + 1) % pages.length;
  showPage(currentPage);
}

function prevPage() {
  currentPage = (currentPage - 1 + pages.length) % pages.length;
  showPage(currentPage);
}

function openWhatsAppOrder(item, price) {
  const message = `Namaste! I want to order: ${item} (₹${price}). Please confirm availability.`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function setupOrderButtons() {
  whatsappButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.dataset.item;
      const price = button.dataset.price;
      openWhatsAppOrder(item, price);
    });
  });
}

function setupSwipe() {
  const app = document.querySelector(".app");

  app.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  app.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) nextPage();
    else prevPage();
  }, { passive: true });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

prevBtn.addEventListener("click", prevPage);
nextBtn.addEventListener("click", nextPage);

setupOrderButtons();
setupSwipe();
registerServiceWorker();
showPage(currentPage);
