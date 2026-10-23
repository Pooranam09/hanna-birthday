const giftButton = document.querySelector("#gift-button");
const giftCaption = document.querySelector("#gift-caption");
const surpriseMessage = document.querySelector("#surprise-message");
const heartsLayer = document.querySelector("#hearts-layer");
const wishButton = document.querySelector("#wish-button");
const wishResult = document.querySelector("#wish-result");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");

giftButton.addEventListener("click", () => {
  const isOpen = giftButton.classList.toggle("opened");
  giftButton.setAttribute("aria-expanded", String(isOpen));
  surpriseMessage.hidden = !isOpen;
  giftCaption.textContent = isOpen ? "your surprise is open ♡" : "tap to open your gift ♡";
  if (isOpen) {
    burstHearts(18);
    setTimeout(() => surpriseMessage.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  }
});

function makeHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["♡", "♥", "ღ", "✧"][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 19}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  heartsLayer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}
function burstHearts(count = 10) {
  for (let i = 0; i < count; i++) setTimeout(makeHeart, i * 90);
}
setInterval(() => {
  if (document.visibilityState === "visible") makeHeart();
}, 950);

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    if (!img || img.style.display === "none" || !img.complete || img.naturalWidth === 0) {
      alert("Add a photo to the photos folder first! See the gallery tip below the pictures ♡");
      return;
    }
    lightboxImage.src = img.src;
    lightbox.hidden = false;
  });
});
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
}
document.querySelector("#lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

wishButton.addEventListener("click", () => {
  wishResult.textContent = "✨ Wish sent! May something wonderful find you this year. ♡";
  burstHearts(26);
  wishButton.textContent = "Birthday magic sent! ♡";
  wishButton.disabled = true;
});
