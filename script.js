:root {
  --primary-green: #608038;
  --dark-green: #233d28;
  --cta-orange: #df8a4b;
  --card-bg: #ffffff;
  --page-bg: #f8faf8;
  --badge-bg: #e6eee0;
  --text-dark: #1b261b;
  --text-muted: #5e6b5e;
  --radius-lg: 24px;
  --radius-md: 14px;
  --shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

body {
  background-color: #eaece8;
  color: var(--text-dark);
  display: flex;
  justify-content: center;
  padding: 20px;
}

/* Framed Tablet/Desktop Viewport container */
.site-wrapper {
  background-color: var(--page-bg);
  width: 100%;
  max-width: 1240px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  position: relative;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 3rem;
  background: #ffffff;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--dark-green);
}

.logo-icon {
  width: 28px;
  height: 28px;
}

.nav-links {
  display: flex;
  gap: 2.2rem;
}

.nav-links a {
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-dark);
  letter-spacing: 0.5px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.btn {
  border: none;
  font-weight: 700;
  cursor: pointer;
  border-radius: 50px;
  transition: transform 0.2s, background-color 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-order {
  background-color: var(--primary-green);
  color: #fff;
  padding: 10px 22px;
  font-size: 0.85rem;
}

.btn-hero {
  background-color: var(--primary-green);
  color: #fff;
  padding: 10px 24px;
  font-size: 0.85rem;
  width: fit-content;
}

.btn-view-cart {
  background-color: var(--cta-orange);
  color: #fff;
  padding: 9px 20px;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

.cart-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: var(--cta-orange);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  border-radius: 50%;
  width: 17px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 380px;
  background: url('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
  display: flex;
  align-items: center;
  padding: 0 4rem;
}

/* Semi-transparent angled overlay matching the mock design */
.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(105deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.8) 75%, transparent 100%);
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 360px;
}

.hero-content h1 {
  font-size: 2.2rem;
  line-height: 1.15;
  font-weight: 800;
  color: var(--dark-green);
  margin-bottom: 0.75rem;
}

.hero-content p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 1.4rem;
}

/* Slider Controls */
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--dark-green);
  cursor: pointer;
  z-index: 3;
  transition: background 0.2s;
}

.slider-btn:hover {
  background: #ffffff;
}

.prev-btn { left: 20px; }
.next-btn { right: 20px; }

/* Main Section */
.main-content {
  padding: 2rem 3.5rem 3.5rem;
}

.section-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title-bar h2 {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--dark-green);
}

.content-layout {
  display: flex;
  gap: 1.5rem;
}

/* Vertical Sidebar Features */
.features-sidebar {
  width: 64px;
  background-color: var(--badge-bg);
  border-radius: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
  gap: 1.8rem;
  flex-shrink: 0;
}

.feature-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.feature-badge .f-icon {
  font-size: 1.2rem;
}

.feature-badge span:last-child {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--primary-green);
}

/* Bowls Grid */
.bowls-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  flex-grow: 1;
}

.bowl-card {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}

.bowl-img {
  width: 100%;
  height: 175px;
  object-fit: cover;
}

.bowl-details {
  padding: 1.2rem 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.bowl-details h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--dark-green);
  margin-bottom: 0.35rem;
}

.bowl-details p {
  color: var(--text-muted);
  font-size: 0.8rem;
  line-height: 1.35;
  margin-bottom: 1.2rem;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: 800;
  font-size: 1rem;
  color: var(--text-dark);
}

.card-btn {
  background-color: var(--primary-green);
  color: #fff;
  padding: 7px 16px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.card-btn:hover {
  opacity: 0.9;
}

@media (max-width: 960px) {
  .bowls-grid {
    grid-template-columns: 1fr;
  }
  .hero-section::before {
    width: 100%;
    clip-path: none;
    background: rgba(255, 255, 255, 0.9);
  }
}
