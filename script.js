const chapterBar = document.querySelector(".chapter-bar");
const chapterLabel = document.querySelector(".chapter-label");
const contactLink = document.querySelector(".contact-body a");

const chapterObserver = new IntersectionObserver(
  ([entry]) => {
    const contactIsVisible = entry.isIntersecting;
    chapterLabel.textContent = contactIsVisible ? "contact" : "services";
    chapterBar.classList.toggle("is-contact", contactIsVisible);
  },
  { threshold: 0.2 }
);

chapterObserver.observe(contactLink);

const brand = document.querySelector(".brand-transition");
const intro = document.querySelector("#intro");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let brandFrame;

function updateBrand() {
  brandFrame = null;

  const headerHeight = document.querySelector(".site-header").offsetHeight;
  const introTop = intro.getBoundingClientRect().top + window.scrollY;
  const transitionStart = introTop - headerHeight;
  const transitionLength = Math.min(150, Math.max(90, window.innerHeight * 0.12));
  const rawProgress = Math.min(1, Math.max(0, (window.scrollY - transitionStart) / transitionLength));
  const progress = reduceMotion.matches
    ? Number(rawProgress >= 0.5)
    : rawProgress * rawProgress * (3 - 2 * rawProgress);

  brand.style.setProperty("--brand-text-opacity", (1 - progress).toFixed(3));
  brand.style.setProperty("--brand-text-scale", (1 - progress * 0.12).toFixed(3));
  brand.style.setProperty("--brand-text-shift", `${(-progress * 3).toFixed(2)}px`);
  brand.style.setProperty("--brand-text-blur", `${(progress * 1.4).toFixed(2)}px`);
  brand.style.setProperty("--brand-mark-opacity", progress.toFixed(3));
  brand.style.setProperty("--brand-mark-scale", (0.78 + progress * 0.22).toFixed(3));
}

function requestBrandUpdate() {
  if (!brandFrame) brandFrame = requestAnimationFrame(updateBrand);
}

window.addEventListener("scroll", requestBrandUpdate, { passive: true });
window.addEventListener("resize", requestBrandUpdate);
reduceMotion.addEventListener("change", requestBrandUpdate);
requestBrandUpdate();
