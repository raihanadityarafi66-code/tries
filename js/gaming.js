// ══════════════════════════════════════════
//  GAMING: scroll-reveal animation
// ══════════════════════════════════════════

const gamingImgs = document.querySelectorAll('.gaming-grid img');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

gamingImgs.forEach(img => observer.observe(img));


// ══════════════════════════════════════════
//  LIGHTBOX
// ══════════════════════════════════════════

const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn    = document.querySelector('.lightbox-close');

document.querySelectorAll('.gaming-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove('active');
  }
});
