// ============================================================
// Portafolio - Enzo La Torre
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initFooterYear();
  initNavbar();
  initTyping();
  initScrollSpy();
  initTechGrid();
  initProjectsGrid();
  initReveal();
});

// ---------- Año dinámico en el footer ----------
function initFooterYear() {
  const footerText = document.querySelector('.footer p');
  if (!footerText) return;
  const year = new Date().getFullYear();
  footerText.textContent = footerText.textContent.replace('© 2026', `© ${year}`);
}

// ---------- Menú móvil + navbar + progreso de scroll ----------
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const scrollProgress = document.getElementById('scrollProgress');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const onScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (navbar) navbar.classList.toggle('scrolled', scrollY > 20);
    if (scrollProgress) {
      scrollProgress.style.width = maxScroll > 0 ? `${(scrollY / maxScroll) * 100}%` : '0%';
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---------- Efecto máquina de escribir ----------
function initTyping() {
  const el = document.getElementById('typeWriter');
  if (!el) return;

  const roles = ['Estudiante de Big Data y Ciencia de Datos', 'Python · SQL · ETL', 'Data Engineering', 'Modelado de datos', 'TECSUP'];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const speed = 70;
  const delayAfterType = 1800;
  const delayAfterDelete = 350;

  function tick() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, delayAfterType);
        return;
      }
      setTimeout(tick, speed);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, delayAfterDelete);
        return;
      }
      setTimeout(tick, speed / 2);
    }
  }

  setTimeout(tick, 900);
}

// ---------- Scrollspy: resalta la sección activa ----------
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-link');

  if (!sections.length || !navItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ---------- Tecnologías ----------
// La sección muestra únicamente los tags utilizados en los proyectos de
// data/projects.js (sin repetir). Base fija vacía: nada se inventa.
const TECH_ICONS = {
  html: 'icon-html',
  css: 'icon-css',
  javascript: 'icon-js',
  js: 'icon-js',
  typescript: 'icon-typescript',
  ts: 'icon-typescript',
  vue: 'icon-vue',
  node: 'icon-node',
  express: 'icon-express',
  python: 'icon-python',
  pandas: 'icon-table',
  parquet: 'icon-table',
  altair: 'icon-chart',
  pytest: 'icon-code',
  etl: 'icon-code',
  dbt: 'icon-code',
  streamlit: 'icon-chart',
  'scikit-learn': 'icon-sklearn',
  'sklearn': 'icon-sklearn',
  xgboost: 'icon-xgboost',
  matplotlib: 'icon-matplotlib',
  seaborn: 'icon-seaborn',
  'imbalanced-learn': 'icon-imblearn',
  'imblearn': 'icon-imblearn',
  sql: 'icon-sql',
  'sql server': 'icon-sql',
  sqlserver: 'icon-sql',
  sqlalchemy: 'icon-sql',
  sqlite: 'icon-sql',
  'poo': 'icon-oop',
  oop: 'icon-oop',
  'ci/cd': 'icon-git',
  'control de versiones': 'icon-git',
};

const BASE_TECH = [
  { name: 'Python', icon: 'icon-python' },
  { name: 'SQL', icon: 'icon-sql' },
  { name: 'SQL Server', icon: 'icon-sql' },
  { name: 'Git & GitHub', icon: 'icon-git' },
];

function initTechGrid() {
  const grid = document.getElementById('techGrid');
  if (!grid) return;

  const seen = new Set(BASE_TECH.map((t) => t.name.toLowerCase()));
  const all = [...BASE_TECH];

  const data = window.PROJECTS_DATA;
  if (data && data.projects) {
    data.projects.forEach((p) => {
      (p.tags || []).forEach((tag) => {
        const key = tag.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        all.push({
          name: tag,
          icon: TECH_ICONS[key] || 'icon-code',
        });
      });
    });
  }

  grid.innerHTML = all
    .map(
      (t) => `
        <div class="tech-card">
          <span class="tech-icon" aria-hidden="true"><svg><use href="#${t.icon}"/></svg></span>
          <span class="tech-name">${t.name}</span>
        </div>
      `
    )
    .join('');
}

// ---------- Proyectos ----------
// Los proyectos se cargan desde data/projects.js (window.PROJECTS_DATA).
// Para agregar uno, edita ese archivo; no hace falta tocar este código.

function initProjectsGrid() {
  const grid = document.getElementById('projectsGrid');
  const data = window.PROJECTS_DATA;

  if (!grid || !data) return;

  if (!data.projects.length) {
    grid.innerHTML = `
      <div class="projects-empty">
        <p class="projects-empty__title">En construcción</p>
        <p class="projects-empty__sub">
          Publico cada proyecto como repositorio abierto, con su documentación y sus
          pruebas, para que cualquiera pueda reproducirlo. Mientras tanto puedes
          seguir mi avance en
          <a href="https://github.com/EnzoLaTorre" target="_blank" rel="noopener noreferrer">GitHub ↗</a>.
        </p>
      </div>`;
    return;
  }

  const fallback = 'linear-gradient(135deg, #38bdf8, #818cf8, #d946ef)';
  const styleThumb = (p) => {
    if (p.image) return `style="background-image: url('${p.image}'); background-size: cover"`;
    const grad = (data.gradients && data.gradients[p.gradient]) || fallback;
    return `style="background-image: ${grad}; background-size: 200% 200%"`;
  };

  grid.innerHTML = data.projects
    .map((p) => {
      const hasDemo = p.demoUrl && p.demoUrl !== '#';
      const hasNotebook = p.notebookUrl && p.notebookUrl !== '#';
      const overlayLinks = hasDemo || hasNotebook || p.repoUrl
        ? `
            <div class="project-overlay">
              ${hasDemo
                ? `<a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline overlay-btn">Demo ↗</a>`
                : ''}
              ${hasNotebook
                ? `<a href="${p.notebookUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline overlay-btn">Notebook ↗</a>`
                : ''}
              ${p.repoUrl
                ? `<a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary overlay-btn">Código ↗</a>`
                : ''}
            </div>
          `
        : '';
      // placeholder-thumb anima background-position (gradientShift). Con una
      // captura eso hace que la imagen derive de lado a lado, asi que la
      // clase solo se aplica cuando no hay imagen.
      const thumbClass = p.image ? 'project-thumb' : 'project-thumb placeholder-thumb';
      return `
        <article class="project-card">
          <div class="${thumbClass}" ${styleThumb(p)}>
            ${overlayLinks}
          </div>
          <div class="project-body">
            <h3>${p.title}</h3>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">
              ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
            </div>
            ${p.notebookUrl
              ? `<p class="project-notebook"><a href="${p.notebookUrl}" target="_blank" rel="noopener noreferrer">Ver notebook ↗</a></p>`
              : ''}
          </div>
        </article>
      `;
    })
    .join('');
}

// ---------- Animación de aparición al hacer scroll ----------
function initReveal() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.section > .container').forEach((inner, index) => {
    inner.classList.add('reveal');
    inner.style.transitionDelay = `${(index % 3) * 0.08}s`;
    revealObserver.observe(inner);
  });
}