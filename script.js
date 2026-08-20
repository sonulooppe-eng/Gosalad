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
