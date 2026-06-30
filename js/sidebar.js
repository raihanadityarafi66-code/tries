// ══════════════════════════════════════════
//  SIDEBAR: toggle (mobile) + active link
// ══════════════════════════════════════════

const sidebar        = document.getElementById('sidebar');
const sidebarToggle  = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarLinks   = document.querySelectorAll('.sidebar-link[data-section]');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarToggle.classList.add('open');
  sidebarOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarToggle.classList.remove('open');
  sidebarOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when a link is tapped on mobile
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600) closeSidebar();
  });
});

// ── Active link on scroll ──
const sections = [
  { id: 'hero',             el: document.getElementById('hero') },
  { id: 'about',            el: document.getElementById('about') },
  { id: 'music',            el: document.getElementById('music') },
  { id: 'gaming',           el: document.getElementById('gaming') },
  { id: 'social',           el: document.getElementById('social') },
  { id: 'projects',         el: document.getElementById('projects') },
  { id: 'projects-web',     el: document.getElementById('projects-web') },
  { id: 'projects-design',  el: document.getElementById('projects-design') },
  { id: 'qr-generator',     el: document.getElementById('qr-generator') },
  { id: 'projects-other',   el: document.getElementById('projects-other') },
];

function updateActiveLink() {
  const scrollY = window.scrollY + 120;

  let current = sections[0].id;
  for (const sec of sections) {
    if (sec.el && sec.el.getBoundingClientRect().top + window.scrollY <= scrollY) {
      current = sec.id;
    }
  }

  sidebarLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
