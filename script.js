// 10 Salad Types with Indian Rupee (INR) Pricing
const saladMenu = [
  {
    id: 1,
    name: "Tandoori Paneer Crunch",
    category: "veg",
    calories: "380 kcal",
    priceINR: 249,
    description: "Charred cottage cheese cubes, bell peppers, mint lemon vinaigrette, cucumber ribbons.",
    image: "images/bowl-paneer.svg"
  },
  {
    id: 2,
    name: "Classic Smoked Chicken",
    category: "protein",
    calories: "450 kcal",
    priceINR: 299,
    description: "Herb-grilled chicken breast, baby spinach, cranberries, roasted almonds, Dijon dressing.",
    image: "images/bowl-chicken.svg"
  },
  {
    id: 3,
    name: "Avocado Keto Goddess",
    category: "vegan",
    calories: "320 kcal",
    priceINR: 349,
    description: "Fresh Hass avocado, hemp seeds, shaved zucchini, walnuts with green herb dressing.",
    image: "images/bowl-avocado.svg"
  },
  {
    id: 4,
    name: "Sprouted Moong & Pomegranate",
    category: "veg",
    calories: "220 kcal",
    priceINR: 199,
    description: "Organic sprouted moong, sweet pomegranate pearls, chaat masala, lemon drizzle.",
    image: "images/bowl-sprout.svg"
  },
  {
    id: 5,
    name: "High-Protein Boiled Egg Cobb",
    category: "protein",
    calories: "410 kcal",
    priceINR: 269,
    description: "Farm eggs, turkey bacon crisps, cherry tomatoes, blue cheese crumble, crisp romaine.",
    image: "images/bowl-egg.svg"
  },
  {
    id: 6,
    name: "Crispy Sesame Tofu Bowl",
    category: "vegan",
    calories: "340 kcal",
    priceINR: 279,
    description: "Pan-tossed soy tofu, edamame beans, shredded carrots, purple cabbage, ginger miso.",
    image: "images/bowl-tofu.svg"
  },
  {
    id: 7,
    name: "Mediterranean Falafel Fiesta",
    category: "vegan",
    calories: "390 kcal",
    priceINR: 289,
    description: "Baked herb falafels, kalamata olives, hummus scoop, cherry tomatoes, tahini swirl.",
    image: "images/bowl-falafel.svg"
  },
  {
    id: 8,
    name: "Warm Quinoa & Roasted Veg",
    category: "veg",
    calories: "310 kcal",
    priceINR: 299,
    description: "Fluffy tri-color quinoa, charred zucchini, bell peppers, pumpkin seeds, balsamic reduction.",
    image: "images/bowl-quinoa.svg"
  },
  {
    id: 9,
    name: "Parmesan Caesar Delight",
    category: "veg",
    calories: "360 kcal",
    priceINR: 259,
    description: "Crispy romaine lettuce, garlic croutons, aged parmesan flakes, creamy Greek yogurt Caesar.",
    image: "images/bowl-caesar.svg"
  },
  {
    id: 10,
    name: "Berry Citrus Energy Bowl",
    category: "vegan",
    calories: "210 kcal",
    priceINR: 249,
    description: "Seasonal berries, orange segments, chia seeds, fresh mint, organic honey-lime glaze.",
    image: "images/bowl-fruit.svg"
  }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  renderSaladCards(saladMenu);
  initHeroCarousel();
  initMenuScroll();
  initFilters();
  initCartEvents();
  initForms();
});

// Render Menu Cards
function renderSaladCards(items) {
  const container = document.getElementById("menuGrid");
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "salad-card";
    card.innerHTML = `
      <div class="card-img-wrapper">
        <span class="cal-tag">${item.calories}</span>
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="card-footer">
          <span class="price">₹${item.priceINR}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">+ Add to Box</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 1. Hero Carousel Animation
function initHeroCarousel() {
  const track = document.getElementById("heroTrack");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  let currentIdx = 0;

  function updateSlide(idx) {
    track.style.transform = `translateX(-${idx * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIdx = (currentIdx + 1) % slides.length;
    updateSlide(currentIdx);
  });

  prevBtn.addEventListener("click", () => {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    updateSlide(currentIdx);
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    currentIdx = (currentIdx + 1) % slides.length;
    updateSlide(currentIdx);
  }, 5000);
}

// 2. Menu Horizontal Carousel Navigation
function initMenuScroll() {
  const viewport = document.getElementById("menuViewport");
  const prevBtn = document.getElementById("menuPrev");
  const nextBtn = document.getElementById("menuNext");

  nextBtn.addEventListener("click", () => {
    viewport.scrollBy({ left: 320, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    viewport.scrollBy({ left: -320, behavior: "smooth" });
  });
}

// 3. Category Filter
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-pill");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      if (filter === "all") {
        renderSaladCards(saladMenu);
      } else {
        const filtered = saladMenu.filter(item => item.category === filter);
        renderSaladCards(filtered);
      }
    });
  });
}

// 4. Cart Logic
function addToCart(id) {
  const item = saladMenu.find(s => s.id === id);
  if (item) {
    cart.push(item);
    updateCartUI();
    openCart();
  }
}

function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartDrawerCount = document.getElementById("cartDrawerCount");
  const cartList = document.getElementById("cartItemsList");
  const totalPrice = document.getElementById("cartTotalPrice");

  cartCount.textContent = cart.length;
  cartDrawerCount.textContent = cart.length;

  if (cart.length === 0) {
    cartList.innerHTML = `<div class="empty-cart-msg">Your bowl box is empty. Add a refreshing salad!</div>`;
    totalPrice.textContent = `₹0`;
    return;
  }

  let total = 0;
  cartList.innerHTML = cart.map((item, index) => {
    total += item.priceINR;
    return `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <span>₹${item.priceINR}</span>
        </div>
        <button style="background:none;border:none;color:#c92a2a;cursor:pointer;" onclick="removeFromCart(${index})">✕</button>
      </div>
    `;
  }).join("");

  totalPrice.textContent = `₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function initCartEvents() {
  const trigger = document.getElementById("cartTrigger");
  const overlay = document.getElementById("cartOverlay");
  const closeBtn = document.getElementById("closeCartBtn");

  trigger.addEventListener("click", openCart);
  overlay.addEventListener("click", closeCart);
  closeBtn.addEventListener("click", closeCart);
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

function proceedCheckout() {
  if (cart.length === 0) {
    alert("Please add at least one salad to your box!");
    return;
  }
  const sum = cart.reduce((acc, curr) => acc + curr.priceINR, 0);
  alert(`Proceeding to checkout with ${cart.length} items.\nTotal Payable: ₹${sum} INR`);
}

// 5. Contact & Newsletter Form Handlers
function initForms() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value;
      alert(`Thank you ${name}! Your inquiry has been sent to our kitchen team. We will get back in 2 hours.`);
      contactForm.reset();
    });
  }

  const newsletter = document.getElementById("newsletterForm");
  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Welcome to GoSalad perks! Check your inbox for ₹100 discount coupon.");
      newsletter.reset();
    });
  }
}
/* ============================================================
   POV Interactive Salad Section Styles
============================================================ */
.pov-experience-section {
  position: relative;
  height: 260vh; /* Extended height drives the smooth scroll progression */
  background: radial-gradient(circle at center, #1b2024 0%, #0d1114 100%);
  color: #fff;
}

.pov-sticky-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pov-ambient-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(82, 183, 136, 0.12) 0%, rgba(0,0,0,0) 70%);
  filter: blur(40px);
  pointer-events: none;
}

.pov-captions {
  position: absolute;
  top: 15%;
  width: 100%;
  text-align: center;
  z-index: 10;
  pointer-events: none;
}

.pov-caption {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #d8f3dc;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
}

.pov-caption.active {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.pov-stage {
  position: relative;
  width: 520px;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ceramic Bowl Design */
.pov-bowl {
  position: relative;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #2a2c30, #121316 70%);
  box-shadow: 
    inset 0 10px 25px rgba(0,0,0,0.8),
    inset 0 -5px 15px rgba(255,255,255,0.05),
    0 30px 60px rgba(0, 0, 0, 0.6);
  border: 10px solid #1c1e22;
  will-change: transform;
}

.bowl-interior {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

/* Avocado / Green Puree spread at top */
.dressing-spread {
  position: absolute;
  top: 10%;
  left: 18%;
  width: 250px;
  height: 180px;
  background: radial-gradient(ellipse at center, #708d42 0%, #4f6829 80%);
  border-radius: 50% 60% 40% 50% / 40% 50% 60% 50%;
  filter: blur(1px);
  opacity: 0.95;
}

/* Radish / Daikon Slaw bottom left */
.slaw-nest {
  position: absolute;
  bottom: 8%;
  left: 10%;
  width: 200px;
  height: 180px;
  background: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.85),
    rgba(255,255,255,0.85) 3px,
    rgba(235,245,235,0.2) 3px,
    rgba(235,245,235,0.2) 7px
  );
  border-radius: 40% 60% 70% 30%;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));
}

/* Sliced seared protein */
.protein-slices {
  position: absolute;
  top: 25%;
  left: 30%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transform: rotate(-15deg);
}

.slice {
  width: 130px;
  height: 24px;
  background: linear-gradient(90deg, #d07161 0%, #ba4e3d 40%, #e58775 80%, #d07161 100%);
  border-radius: 12px;
  border-left: 3px solid #8e2b1b;
  border-right: 3px solid #8e2b1b;
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
}

/* Fresh Microgreens garnish */
.microgreens {
  position: absolute;
  bottom: 22%;
  right: 22%;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, #2d6a4f 0%, #1b4332 75%);
  border-radius: 60% 40% 50% 50%;
  box-shadow: inset 0 0 15px rgba(0,0,0,0.4);
}

/* Parallax Garnish Embellishments */
.garnish {
  position: absolute;
  font-size: 1.8rem;
  pointer-events: none;
  transition: transform 0.1s linear;
}
.g1 { top: 30%; right: 25%; }
.g2 { bottom: 35%; left: 35%; }
.g3 { top: 18%; left: 45%; font-size: 1.2rem; }

/* Chopsticks POV */
.pov-hand-utensil {
  position: absolute;
  bottom: -60px;
  right: -80px;
  width: 320px;
  height: 320px;
  pointer-events: none;
  transform-origin: bottom right;
  z-index: 5;
  will-change: transform;
}

.chopstick {
  position: absolute;
  background: linear-gradient(to top left, #e0cbab 0%, #bca380 90%, #6e5538 100%);
  border-radius: 4px;
  box-shadow: -15px 25px 25px rgba(0, 0, 0, 0.45);
}

.stick-left {
  width: 10px;
  height: 320px;
  transform: rotate(-44deg);
  top: 10px;
  right: 110px;
}

.stick-right {
  width: 9px;
  height: 330px;
  transform: rotate(-38deg);
  top: 15px;
  right: 90px;
}

.chopstick-food {
  position: absolute;
  top: 25px;
  right: 175px;
  font-size: 2rem;
  transform: scale(0.6);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* Mobile responsive handling */
@media (max-width: 768px) {
  .pov-stage {
    transform: scale(0.75);
  }
  .pov-caption {
    font-size: 1.3rem;
  }
}
