// Salad Menu Data
const menuItems = [
  {
    id: 1,
    name: "Mediterranean Crunch",
    category: "vegan",
    description: "Cucumbers, cherry tomatoes, kalamata olives, crisp chickpeas, lemon-herb tahini.",
    price: "$9.50"
  },
  {
    id: 2,
    name: "Grilled Chicken Harvest",
    category: "protein",
    description: "Roasted herb chicken breast, sweet potato, green apple slices, spiced almonds.",
    price: "$11.75"
  },
  {
    id: 3,
    name: "Keto Avocado Cobb",
    category: "keto",
    description: "Avocado, soft-boiled egg, smoked turkey bacon, blue cheese, ranch drizzle.",
    price: "$12.25"
  },
  {
    id: 4,
    name: "Sesame Tofu Bowl",
    category: "vegan",
    description: "Pan-seared sesame tofu, edamame, red cabbage, scallions, ginger soy vinaigrette.",
    price: "$10.50"
  },
  {
    id: 5,
    name: "Fiesta Steak Bowl",
    category: "protein",
    description: "Chili-rubbed flank steak, black beans, charred corn, cilantro lime vinaigrette.",
    price: "$13.50"
  },
  {
    id: 6,
    name: "Green Goddess Keto",
    category: "keto",
    description: "Baby spinach, roasted walnuts, shaved parmesan, hemp hearts, creamy herb dip.",
    price: "$10.00"
  }
];

// Initialize Menu Render
document.addEventListener("DOMContentLoaded", () => {
  renderMenu(menuItems);
  setupFilterListeners();
  setupNewsletter();
});

// Render cards dynamically
function renderMenu(items) {
  const menuGrid = document.getElementById("menuGrid");
  menuGrid.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-item";
    card.innerHTML = `
      <span class="badge" style="width: fit-content;">${item.category.toUpperCase()}</span>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="menu-item-bottom">
        <span class="price">${item.price}</span>
        <button class="add-btn" onclick="addToCart('${item.name}')">+ Add</button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

// Category filter logic
function setupFilterListeners() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      if (filter === "all") {
        renderMenu(menuItems);
      } else {
        const filtered = menuItems.filter(item => item.category === filter);
        renderMenu(filtered);
      }
    });
  });
}

// Simple Add to Cart simulation
function addToCart(itemName) {
  alert(`Added "${itemName}" to your bowl order!`);
}

function openOrderModal() {
  alert("Ordering online feature opens here!");
}

// Newsletter Handler
function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for joining Go Salad updates!");
      form.reset();
    });
  }
}
