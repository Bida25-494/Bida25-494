/* Click & Eat — Shared Stylesheet
   Color scheme: Orange (#FF6B00), Black (#111), White (#FFF)
*/

:root {
  --ce-orange: #ff6b00;
  --ce-orange-dark: #e05f00;
  --ce-orange-light: #ff8c33;
  --ce-black: #111111;
  --ce-gray: #2a2a2a;
  --ce-white: #ffffff;
  --ce-off-white: #f8f8f8;
  --ce-shadow: rgba(0, 0, 0, 0.15);
  --font-main: "Segoe UI", system-ui, -apple-system, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-main);
  color: var(--ce-black);
  background-color: var(--ce-off-white);
  line-height: 1.6;
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* ——— Logo (CSS text-based) ——— */
.ce-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
  line-height: 1;
}

.ce-logo__click {
  color: var(--ce-orange);
}

.ce-logo__amp {
  color: var(--ce-white);
  font-weight: 400;
}

.ce-logo__eat {
  color: var(--ce-white);
}

.navbar-dark .ce-logo__amp,
.navbar-dark .ce-logo__eat {
  color: var(--ce-white);
}

.navbar.scrolled .ce-logo__eat,
.navbar:not(.navbar-dark) .ce-logo__eat {
  color: var(--ce-black);
}

.navbar:not(.navbar-dark) .ce-logo__amp {
  color: var(--ce-orange);
}

/* ——— Navbar ——— */
.ce-navbar {
  background-color: var(--ce-black) !important;
  box-shadow: 0 2px 12px var(--ce-shadow);
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.ce-navbar .nav-link {
  color: var(--ce-white) !important;
  font-weight: 600;
  padding: 0.5rem 0.85rem !important;
  border-radius: 0.35rem;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.ce-navbar .nav-link:hover,
.ce-navbar .nav-link.active {
  background-color: var(--ce-orange);
  color: var(--ce-black) !important;
}

.ce-cart-badge {
  background-color: var(--ce-orange) !important;
  color: var(--ce-black) !important;
  font-weight: 700;
}

/* ——— Buttons & hover animations ——— */
.btn-ce-primary {
  background-color: var(--ce-orange);
  border: 2px solid var(--ce-orange);
  color: var(--ce-black);
  font-weight: 700;
  padding: 0.65rem 1.5rem;
  border-radius: 2rem;
  transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.btn-ce-primary:hover,
.btn-ce-primary:focus {
  background-color: var(--ce-orange-dark);
  border-color: var(--ce-orange-dark);
  color: var(--ce-white);
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 8px 20px rgba(255, 107, 0, 0.45);
}

.btn-ce-outline {
  background-color: transparent;
  border: 2px solid var(--ce-white);
  color: var(--ce-white);
  font-weight: 700;
  padding: 0.65rem 1.5rem;
  border-radius: 2rem;
  transition: transform 0.2s ease, background-color 0.25s ease, color 0.25s ease;
}

.btn-ce-outline:hover,
.btn-ce-outline:focus {
  background-color: var(--ce-white);
  color: var(--ce-black);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(255, 255, 255, 0.25);
}

.btn-ce-dark {
  background-color: var(--ce-black);
  border: 2px solid var(--ce-black);
  color: var(--ce-white);
  font-weight: 700;
  border-radius: 2rem;
  transition: transform 0.2s ease, background-color 0.25s ease, border-color 0.25s ease;
}

.btn-ce-dark:hover,
.btn-ce-dark:focus {
  background-color: var(--ce-orange);
  border-color: var(--ce-orange);
  color: var(--ce-black);
  transform: scale(1.05);
}

.btn-add-cart {
  width: 100%;
}

/* ——— Hero ——— */
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: var(--ce-white);
}

.hero-video-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-video-wrap video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(17, 17, 17, 0.88) 0%,
    rgba(255, 107, 0, 0.55) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 4rem 0;
}

.hero-motto {
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.hero-motto span {
  color: var(--ce-orange);
}

.hero-tagline {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  opacity: 0.95;
  max-width: 32rem;
}

/* ——— Sections ——— */
.section-title {
  font-weight: 800;
  color: var(--ce-black);
  margin-bottom: 0.5rem;
}

.section-title::after {
  content: "";
  display: block;
  width: 4rem;
  height: 4px;
  background-color: var(--ce-orange);
  margin-top: 0.5rem;
  border-radius: 2px;
}

.section-subtitle {
  color: #555;
  margin-bottom: 2rem;
}

/* ——— Featured meals ——— */
.featured-card {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 16px var(--ce-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.featured-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px var(--ce-shadow);
}

.featured-card .card-img-top {
  height: 180px;
  object-fit: cover;
}

.featured-card .badge {
  background-color: var(--ce-orange);
  color: var(--ce-black);
}

/* ——— Menu grid ——— */
.menu-category-title {
  font-weight: 800;
  color: var(--ce-black);
  border-left: 5px solid var(--ce-orange);
  padding-left: 0.75rem;
  margin: 2.5rem 0 1.25rem;
}

.menu-item-card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 3px 12px var(--ce-shadow);
  height: 100%;
  transition: transform 0.25s ease;
}

.menu-item-card:hover {
  transform: translateY(-4px);
}

.menu-item-card img {
  border-radius: 1rem 1rem 0 0;
  object-fit: cover;
  height: 160px;
  width: 100%;
}

.menu-price {
  color: var(--ce-orange);
  font-weight: 800;
  font-size: 1.15rem;
}

/* ——— Deals ——— */
.deal-banner {
  background: linear-gradient(90deg, var(--ce-black), var(--ce-gray));
  color: var(--ce-white);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.deal-banner .display-6 {
  color: var(--ce-orange);
  font-weight: 800;
}

.deal-card {
  border: 2px solid transparent;
  border-radius: 1rem;
  transition: border-color 0.25s ease, transform 0.25s ease;
  height: 100%;
}

.deal-card:hover {
  border-color: var(--ce-orange);
  transform: scale(1.02);
}

.deal-card .card-header {
  background-color: var(--ce-orange);
  color: var(--ce-black);
  font-weight: 800;
  border: none;
}

/* ——— About ——— */
.about-video-section {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 24px var(--ce-shadow);
}

.about-video-section video {
  width: 100%;
  display: block;
  max-height: 360px;
  object-fit: cover;
}

.hours-list li {
  padding: 0.35rem 0;
  border-bottom: 1px dashed #ddd;
}

.hours-list li:last-child {
  border-bottom: none;
}

/* ——— Feedback form ——— */
.feedback-form-card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 6px 24px var(--ce-shadow);
}

.feedback-form-card .form-label {
  font-weight: 600;
}

.feedback-form-card .form-control:focus,
.feedback-form-card .form-select:focus {
  border-color: var(--ce-orange);
  box-shadow: 0 0 0 0.2rem rgba(255, 107, 0, 0.25);
}

.form-success-alert {
  display: none;
}

.form-success-alert.show {
  display: block;
}

/* ——— Footer ——— */
.ce-footer {
  background-color: var(--ce-black);
  color: var(--ce-white);
  padding: 2.5rem 0 1.5rem;
  margin-top: 3rem;
}

.ce-footer a {
  color: var(--ce-orange-light);
  text-decoration: none;
  transition: color 0.2s ease;
}

.ce-footer a:hover {
  color: var(--ce-orange);
}

.ce-footer .footer-motto {
  font-style: italic;
  color: var(--ce-orange);
  font-weight: 600;
}

/* ——— Page headers (inner pages) ——— */
.page-hero {
  background: linear-gradient(135deg, var(--ce-black) 0%, var(--ce-gray) 60%, var(--ce-orange) 150%);
  color: var(--ce-white);
  padding: 3rem 0;
  margin-bottom: 2rem;
}

.page-hero h1 {
  font-weight: 800;
  margin-bottom: 0.5rem;
}

/* ——— Cart toast ——— */
.cart-toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1rem;
  z-index: 1080;
}

/* ——— Utilities ——— */
.text-ce-orange {
  color: var(--ce-orange) !important;
}

.bg-ce-orange {
  background-color: var(--ce-orange) !important;
}

@media (max-width: 575.98px) {
  .hero-section {
    min-height: 75vh;
  }

  .hero-content {
    padding: 2.5rem 0;
  }
}
