/**
 * GoSalad — Interactive Client Script
 * Built for standard vanilla execution on static hosts (GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initStickyHeader();
  initMenuFilter();
  initScrollAnimations();
  initBackToTop();
  initActiveNavLinkHighlight();
});

/* ============================================================
   1. MENU DATA & FILTERING
============================================================ */
const MENU_ITEMS = [
  {
    id: 1,
    category: 'signature',
    name: 'Garden Harvest Bowl',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    category: 'signature',
    name: 'Mediterranean Crunch',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    category: 'signature',
    name: 'Citrus Avocado Toss',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: false,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    category: 'byo',
    name: 'Custom Greens Base',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: false,
    image: 'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 5,
    category: 'protein',
    name: 'Herb Grilled Chicken',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: true,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 6,
    category: 'protein',
    name: 'Seared Tofu & Edamame',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: false,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 7,
    category: 'toppings',
    name: 'Toasted Seeds & Nuts',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: false,
    image: 'https://images.unsplash.com/photo-1506802913710-40e2e66339c9?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 8,
    category: 'dressings',
    name: 'House Herb Vinaigrette',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: false,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 9,
    category: 'beverages',
    name: 'Cold Pressed Green Juice',
    description: '[DESCRIPTION]',
    price: '[PRICE]',
    popular: true,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80'
  }
];

function initMenuFilter() {
  const menuGrid = document.getElementById('menuGrid');
  const filterBtns = document.querySelectorAll('.menu-tab-btn');

  if (!menuGrid) return;

  function renderItems(filterCategory) {
    menuGrid.innerHTML = '';
    const filtered = filterCategory === 'all' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(item => item.category === filterCategory);

    filtered.forEach(item => {
      const card = document.createElement('article');
      card.className = 'menu-card fade-in-up appear';
      card.innerHTML = `
        <div class="menu-card-img-wrapper">
          ${item.popular ? '<span class="badge-popular">Popular</span>' : ''}
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy" width="300" height="180" />
        </div>
        <div class="menu-card-content">
          <div class="menu-card-header">
            <h3 class="menu-item-name">${item.name}</h3>
            <span class="menu-item-price">${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.description}</p>
          <a href="#order" class="btn btn-outline btn-block">Select</a>
        </div>
      `;
      menuGrid.appendChild(card);
    });
  }

  // Initial render
  renderItems('all');

  // Filter click event listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderItems(btn.dataset.category);
    });
  });
}

/* ============================================================
   2. MOBILE DRAWER NAVIGATION
============================================================ */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawer = document.getElementById('mobileNav');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburgerBtn || !drawer || !backdrop) return;

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openMenu);
  closeDrawerBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  // Auto close drawer when any navigation anchor is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ============================================================
   3. STICKY HEADER RESIZE ON SCROLL
============================================================ */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ============================================================
   4. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    elements.forEach(el => el.classList.add('appear'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   5. BACK TO TOP BUTTON
============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ============================================================
   6. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
============================================================ */
function initActiveNavLinkHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
