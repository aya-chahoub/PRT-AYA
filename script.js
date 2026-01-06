/* Basic interactivity for portfolio: mobile nav, render projects, reveal on scroll */
document.addEventListener('DOMContentLoaded', () => {
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.style.display = expanded ? '' : 'flex';
    });
    // hide nav when a link is clicked (mobile)
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && window.innerWidth < 680) {
        navLinks.style.display = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // sample projects - replace with your own
  const projects = [
    {
      title: 'Todo App',
      desc: 'A small todo app with local persistence and responsive layout.',
      tech: ['JavaScript','HTML','CSS']
    },
    {
      title: 'Portfolio Site',
      desc: 'Personal portfolio built with responsive design and smooth animations.',
      tech: ['HTML','CSS','JS']
    },
    {
      title: 'API Explorer',
      desc: 'A tiny app to explore REST APIs, built with Node and Express.',
      tech: ['Node.js','Express']
    }
  ];

  const grid = document.getElementById('projects-grid');
  if (grid) renderProjects(grid, projects);

  // reveal animations on scroll
  const reveals = document.querySelectorAll('.section, .card, .skill-category');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => r.classList.add('reveal'));
  reveals.forEach(r => io.observe(r));

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    });
  });
});

function renderProjects(container, data){
  container.innerHTML = '';
  data.forEach(p => {
    const card = document.createElement('article'); card.className = 'card reveal';

    // thumbnail (use provided image or a placeholder from picsum)
    const thumb = document.createElement('div'); thumb.className = 'thumb';
    const img = document.createElement('img');
    const seed = encodeURIComponent(p.title || 'project');
    img.src = p.image || `https://picsum.photos/seed/${seed}/800/480`;
    img.alt = p.title || 'Project screenshot';
    thumb.appendChild(img);

    const body = document.createElement('div'); body.className = 'card-body';
    const meta = document.createElement('div'); meta.className = 'meta';
    const h3 = document.createElement('h3'); h3.textContent = p.title;
    meta.appendChild(h3);
    const desc = document.createElement('p'); desc.textContent = p.desc;
    const techWrap = document.createElement('div'); techWrap.className = 'tech';
    p.tech.forEach(t => {
      const span = document.createElement('span'); span.className = 'chip'; span.textContent = t; techWrap.appendChild(span);
    });

    body.appendChild(meta);
    body.appendChild(desc);
    body.appendChild(techWrap);

    card.appendChild(thumb);
    card.appendChild(body);
    container.appendChild(card);
  });
}
