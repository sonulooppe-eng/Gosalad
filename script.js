// Salad Items Dataset
const popularBowls = [
  {
    id: 1,
    name: "Chicken Harvest",
    description: "Greens, walnuts, cranberries, roasted chicken, signature vinaigrette",
    price: "$14.99",
    buttonText: "VIEW MENU",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Vegan Power",
    description: "Kale, roasted veggies, avocado, sunflower seeds, herb tahini dressing",
    price: "$14.99",
    buttonText: "ADD TO CART",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Spicy Salmon",
    description: "Mixed greens, salmon, charred corn, jalapeños, lime, creamy sauce",
    price: "$14.99",
    buttonText: "ADD TO CART",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  }
];

let cart = [];

// Initialize DOM
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});

// Render the 3 cards matching the layout
function renderCards() {
  const grid = document.getElementById("bowlsGrid");
  grid.innerHTML = "";

  popularBowls.forEach((item) => {
    const card = document.createElement("div");
    card.className = "bowl-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="bowl-img" />
      <div class="bowl-details">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="card-footer">
          <span class="price">${item.price}</span>
          <button class="card-btn" onclick="handleCardAction(${item.id})">${item.buttonText}</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function handleCardAction(id) {
  const selected = popularBowls.find(item => item.id === id);
  if (selected) {
    cart.push(selected);
    document.getElementById("cartCount").textContent = cart.length;
    alert(`Added ${selected.name} to your order.`);
  }
}

function openCartModal() {
  if (cart.length === 0) {
    alert("Your cart is currently empty. Choose a fresh bowl to get started!");
  } else {
    const list = cart.map(i => `${i.name} (${i.price})`).join("\n");
    alert(`Your Cart:\n\n${list}\n\nTotal Items: ${cart.length}`);
  }
}

function openCheckout() {
  alert("Redirecting to Go Salad Instant Checkout!");
}
