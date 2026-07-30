/**
 * Shared Header and Footer components for Techno-Solutions.
 * Consolidates the HTML structure, styles, and scripts to avoid duplication.
 * Configures the Verdana font family globally with slightly increased sizes,
 * and sets up a sticky header and classic sticky footer.
 */

/**
 * Generates the header HTML.
 * @param {string} activeSlug - The identifier of the active page (e.g. 'home', 'about', 'services', 'blog', 'contact', or service IDs).
 * @param {boolean} isDarkTheme - Whether to render the dark transparent header (e.g. for the Homepage).
 * @returns {string} Compiled Header HTML.
 */
export function getHeaderHTML(activeSlug = '', isDarkTheme = false) {
  const normalizedSlug = activeSlug ? activeSlug.toLowerCase().trim() : '';

  // Class definitions based on the theme
  const themeClass = isDarkTheme ? 'ts-header-dark' : 'ts-header-light';

  // Navigation link active checks
  const isHomeActive = normalizedSlug === 'home' || normalizedSlug === '';
  const isAboutActive = normalizedSlug === 'about' || normalizedSlug === 'about us';
  const isServicesActive = normalizedSlug === 'services';
  const isBlogActive = normalizedSlug === 'blog';
  const isContactActive = normalizedSlug === 'contact' || normalizedSlug === 'contact us';

  // Check if any specific service subpage is active
  const activeServiceSlugs = [
    'digital-transformation',
    'business-automation',
    'artificial-intelligence',
    'blockchain-crypto',
    'smart-home',
    'solar-energy'
  ];
  const isServiceSubpageActive = activeServiceSlugs.includes(normalizedSlug);
  const servicesDropdownActive = isServicesActive || isServiceSubpageActive;

  return `
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

:root {
  --ts-primary: #0F2D63;
  --ts-secondary: #0A224E;
  --ts-accent: #E5AF2B;
  --ts-dark: #1B1B1B;
  --ts-slate: #5B6470;
  --ts-soft-blue: #F8F9FC;
  --ts-border: #ECECEC;
  --ts-white: #FFFFFF;
}

/* Ensure font family is Verdana across the entire page & slightly increase the sizes */
html, body {
  height: 100% !important;
  margin: 0 !important;
}

body, .ts-page-wrapper {
  font-family: 'Verdana', sans-serif !important;
  color: var(--ts-dark);
  background-color: var(--ts-white);
  line-height: 1.65 !important;
  font-size: 15.5px !important; /* Slightly increased for entire website */
  display: flex !important;
  flex-direction: column !important;
  min-height: 100vh !important;
}

/* Base header layout */
header.ts-header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  z-index: 99999 !important;
  padding: 18px 0 !important;
  font-family: 'Verdana', sans-serif !important;
  box-sizing: border-box !important;
  transition: all 0.3s ease !important;
}

header.ts-header * {
  box-sizing: border-box !important;
}

/* Light Theme Header */
header.ts-header.ts-header-light {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(236, 236, 236, 0.7) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
}

header.ts-header.ts-header-light.scrolled {
  background: rgba(255, 255, 255, 0.98) !important;
  padding: 12px 0 !important;
  border-bottom: 1px solid rgba(236, 236, 236, 0.9) !important;
}

/* Dark Theme Header */
header.ts-header.ts-header-dark {
  background: rgba(6, 24, 59, 0.75) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2) !important;
}

header.ts-header.ts-header-dark.scrolled {
  background: rgba(6, 24, 59, 0.92) !important;
  padding: 12px 0 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
}

.ts-header-container {
  max-width: 1320px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.ts-logo {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  text-decoration: none !important;
}

.ts-logo-box {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 12px !important;
  transition: transform 0.3s ease !important;
}

header.ts-header-light .ts-logo-box {
  background: var(--ts-soft-blue) !important;
  border: 1px solid var(--ts-border) !important;
}

header.ts-header-dark .ts-logo-box {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}

.ts-logo:hover .ts-logo-box {
  transform: scale(1.05) !important;
}

.ts-logo-text {
  font-family: 'Playfair Display', serif !important;
  font-weight: 700 !important;
  font-size: 18px !important;
  letter-spacing: -0.02em !important;
  text-transform: uppercase !important;
}

header.ts-header-light .ts-logo-text {
  color: var(--ts-primary) !important;
}

header.ts-header-dark .ts-logo-text {
  color: #FFFFFF;
}

.ts-nav {
  display: flex !important;
  align-items: center !important;
  gap: 32px !important;
}

.ts-nav-link {
  font-family: 'Verdana', sans-serif !important;
  font-weight: 600 !important;
  font-size: 14.5px !important; /* Increased slightly */
  text-decoration: none !important;
  padding: 4px 0 !important;
  position: relative !important;
  transition: color 0.2s ease !important;
}

header.ts-header-light .ts-nav-link {
  color: var(--ts-slate) !important;
}

header.ts-header-light .ts-nav-link:hover, 
header.ts-header-light .ts-nav-link.active {
  color: var(--ts-primary) !important;
}

header.ts-header-dark .ts-nav-link {
  color: rgba(255, 255, 255, 0.75) !important;
}

header.ts-header-dark .ts-nav-link:hover, 
header.ts-header-dark .ts-nav-link.active {
  color: #FFFFFF !important;
}

.ts-nav-link::after {
  content: '' !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  width: 0 !important;
  height: 2px !important;
  background: var(--ts-accent) !important;
  transition: width 0.3s ease !important;
}

.ts-nav-link:hover::after, .ts-nav-link.active::after {
  width: 100% !important;
}

/* Dropdown styling */
.ts-dropdown {
  position: relative !important;
}

.ts-dropdown-btn {
  background: none !important;
  border: none !important;
  font-family: 'Verdana', sans-serif !important;
  font-weight: 600 !important;
  font-size: 14.5px !important;
  cursor: pointer !important;
  padding: 4px 0 !important;
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
  transition: color 0.2s ease !important;
}

header.ts-header-light .ts-dropdown-btn {
  color: var(--ts-slate) !important;
}

header.ts-header-light .ts-dropdown-btn.active,
header.ts-header-light .ts-dropdown:hover .ts-dropdown-btn {
  color: var(--ts-primary) !important;
}

header.ts-header-dark .ts-dropdown-btn {
  color: rgba(255, 255, 255, 0.75) !important;
}

header.ts-header-dark .ts-dropdown-btn.active,
header.ts-header-dark .ts-dropdown:hover .ts-dropdown-btn {
  color: #FFFFFF !important;
}

.ts-chevron {
  transition: transform 0.3s ease !important;
}

.ts-dropdown:hover .ts-chevron {
  transform: rotate(180deg) !important;
}

.ts-dropdown-content {
  position: absolute !important;
  top: 100% !important;
  left: 50% !important;
  transform: translateX(-50%) translateY(10px) !important;
  border-radius: 16px !important;
  padding: 12px !important;
  width: 280px !important;
  opacity: 0 !important;
  visibility: hidden !important;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s !important;
  z-index: 100000 !important;
}

header.ts-header-light .ts-dropdown-content {
  background: var(--ts-white) !important;
  border: 1px solid var(--ts-border) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
}

header.ts-header-dark .ts-dropdown-content {
  background: #0A224E !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
}

.ts-dropdown:hover .ts-dropdown-content {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateX(-50%) translateY(5px) !important;
}

.ts-dropdown-item {
  display: block !important;
  padding: 10px 14px !important;
  font-family: 'Verdana', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  border-radius: 8px !important;
  transition: background 0.2s ease, color 0.2s ease !important;
  text-align: left !important;
}

header.ts-header-light .ts-dropdown-item {
  color: var(--ts-dark) !important;
}

header.ts-header-light .ts-dropdown-item:hover,
header.ts-header-light .ts-dropdown-item.active {
  background: var(--ts-soft-blue) !important;
  color: var(--ts-primary) !important;
}

header.ts-header-dark .ts-dropdown-item {
  color: rgba(255, 255, 255, 0.8) !important;
}

header.ts-header-dark .ts-dropdown-item:hover,
header.ts-header-dark .ts-dropdown-item.active {
  background: rgba(255, 255, 255, 0.05) !important;
  color: var(--ts-accent) !important;
}

.ts-cta {
  display: block !important;
}

.ts-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: var(--ts-accent) !important;
  color: #06183B !important;
  text-decoration: none !important;
  font-weight: 700 !important;
  font-size: 13.5px !important;
  padding: 11px 24px !important; /* Slightly larger padding */
  border-radius: 30px !important;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease !important;
  border: none !important;
  cursor: pointer !important;
}

.ts-btn:hover {
  background: #f3c043 !important;
  box-shadow: 0 4px 15px rgba(229, 175, 43, 0.35) !important;
}

.ts-btn:active {
  transform: scale(0.97) !important;
}

.ts-arrow {
  transition: transform 0.3s ease !important;
}

.ts-btn:hover .ts-arrow {
  transform: translate(3px) !important;
}

.ts-menu-toggle {
  display: none !important;
  background: none !important;
  border: none !important;
  cursor: pointer !important;
  padding: 6px !important;
  border-radius: 8px !important;
  transition: background 0.2s ease !important;
}

header.ts-header-light .ts-menu-toggle {
  color: var(--ts-primary) !important;
}

header.ts-header-light .ts-menu-toggle:hover {
  background: var(--ts-soft-blue) !important;
}

header.ts-header-dark .ts-menu-toggle {
  color: #FFFFFF !important;
}

header.ts-header-dark .ts-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.05) !important;
}

.ts-mobile-menu {
  display: none !important;
  padding: 20px !important;
  position: absolute !important;
  top: 100% !important;
  left: 0 !important;
  width: 100% !important;
  flex-direction: column !important;
  gap: 12px !important;
}

header.ts-header-light .ts-mobile-menu {
  background: var(--ts-white) !important;
  border-top: 1px solid var(--ts-border) !important;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
}

header.ts-header-dark .ts-mobile-menu {
  background: #0A224E;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
}

.ts-mobile-link {
  font-family: 'Verdana', sans-serif !important;
  font-weight: 600 !important;
  font-size: 15.5px !important;
  text-decoration: none !important;
  padding: 10px 0 !important;
  transition: color 0.2s ease !important;
}

header.ts-header-light .ts-mobile-link {
  color: var(--ts-dark) !important;
  border-bottom: 1px solid var(--ts-soft-blue) !important;
}

header.ts-header-light .ts-mobile-link:hover,
header.ts-header-light .ts-mobile-link.active {
  color: var(--ts-primary) !important;
}

header.ts-header-dark .ts-mobile-link {
  color: rgba(255, 255, 255, 0.8) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

header.ts-header-dark .ts-mobile-link:hover,
header.ts-header-dark .ts-mobile-link.active {
  color: #FFFFFF !important;
}

.ts-mobile-accordion {
  display: flex !important;
  flex-direction: column !important;
}

.ts-mobile-accordion-btn {
  width: 100% !important;
  background: none !important;
  border: none !important;
  text-align: left !important;
  font-family: 'Verdana', sans-serif !important;
  font-weight: 600 !important;
  font-size: 15.5px !important;
  padding: 10px 0 !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  cursor: pointer !important;
}

header.ts-header-light .ts-mobile-accordion-btn {
  color: var(--ts-dark) !important;
  border-bottom: 1px solid var(--ts-soft-blue) !important;
}

header.ts-header-dark .ts-mobile-accordion-btn {
  color: rgba(255, 255, 255, 0.8) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.ts-mobile-accordion-content {
  display: none !important;
  flex-direction: column !important;
  padding-left: 16px !important;
  gap: 8px !important;
  margin-top: 8px !important;
  margin-bottom: 8px !important;
}

.ts-mobile-sub-link {
  font-family: 'Verdana', sans-serif !important;
  font-weight: 500 !important;
  font-size: 13.5px !important;
  text-decoration: none !important;
  padding: 6px 0 !important;
}

header.ts-header-light .ts-mobile-sub-link {
  color: var(--ts-slate) !important;
}

header.ts-header-light .ts-mobile-sub-link:hover,
header.ts-header-light .ts-mobile-sub-link.active {
  color: var(--ts-primary) !important;
}

header.ts-header-dark .ts-mobile-sub-link {
  color: rgba(255, 255, 255, 0.6) !important;
}

header.ts-header-dark .ts-mobile-sub-link:hover,
header.ts-header-dark .ts-mobile-sub-link.active {
  color: var(--ts-accent) !important;
}

@media (max-width: 991px) {
  .ts-nav, .ts-cta {
    display: none !important;
  }
  
  .ts-menu-toggle {
    display: block !important;
  }
  
  .ts-mobile-menu.open {
    display: flex !important;
  }
}
</style>

<div class="ts-page-wrapper">
<header class="ts-header ${themeClass}">
  <div class="ts-header-container">
    <a href="/" class="ts-logo">
      <div class="ts-logo-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5AF2B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>
      </div>
      <span class="ts-logo-text">TECHNO-SOLUTIONS</span>
    </a>
    <nav class="ts-nav">
      <a href="/" class="ts-nav-link ${isHomeActive ? 'active' : ''}">Home</a>
      <a href="/about/" class="ts-nav-link ${isAboutActive ? 'active' : ''}">About</a>
      <div class="ts-dropdown">
        <button class="ts-dropdown-btn ${servicesDropdownActive ? 'active' : ''}">
          Services
          <svg class="ts-chevron" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="ts-dropdown-content">
          <a href="/digital-transformation-solutions/" class="ts-dropdown-item ${normalizedSlug === 'digital-transformation' ? 'active' : ''}">Digital Transformation</a>
          <a href="/business-automation-solutions/" class="ts-dropdown-item ${normalizedSlug === 'business-automation' ? 'active' : ''}">Business Automation</a>
          <a href="/artificial-intelligence-solutions/" class="ts-dropdown-item ${normalizedSlug === 'artificial-intelligence' ? 'active' : ''}">Artificial Intelligence</a>
          <a href="/blockchain-crypto-solutions/" class="ts-dropdown-item ${normalizedSlug === 'blockchain-crypto' ? 'active' : ''}">Blockchain & Crypto</a>
          <a href="/smart-home-installation-services/" class="ts-dropdown-item ${normalizedSlug === 'smart-home' ? 'active' : ''}">Smart Home Installation</a>
          <a href="/solar-panel-installation-services/" class="ts-dropdown-item ${normalizedSlug === 'solar-energy' ? 'active' : ''}">Solar Panel Installation</a>
        </div>
      </div>
      <a href="/blog/" class="ts-nav-link ${isBlogActive ? 'active' : ''}">Blog</a>
      <a href="/contact/" class="ts-nav-link ${isContactActive ? 'active' : ''}">Contact</a>
    </nav>
    <div class="ts-cta">
      <a href="/contact/" class="ts-btn">Book Consultation <svg class="ts-arrow" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
    </div>
    <button class="ts-menu-toggle" id="ts-menu-toggle">
      <svg class="ts-menu-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
  </div>
  <div class="ts-mobile-menu" id="ts-mobile-menu">
    <a href="/" class="ts-mobile-link ${isHomeActive ? 'active' : ''}">Home</a>
    <a href="/about/" class="ts-mobile-link ${isAboutActive ? 'active' : ''}">About</a>
    <div class="ts-mobile-accordion">
      <button class="ts-mobile-accordion-btn">
        Services
        <svg class="ts-chevron-mob" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      <div class="ts-mobile-accordion-content" id="ts-mobile-accordion-content" style="display: ${isServiceSubpageActive ? 'flex' : 'none'};">
        <a href="/digital-transformation-solutions/" class="ts-mobile-sub-link ${normalizedSlug === 'digital-transformation' ? 'active' : ''}">Digital Transformation</a>
        <a href="/business-automation-solutions/" class="ts-mobile-sub-link ${normalizedSlug === 'business-automation' ? 'active' : ''}">Business Automation</a>
        <a href="/artificial-intelligence-solutions/" class="ts-mobile-sub-link ${normalizedSlug === 'artificial-intelligence' ? 'active' : ''}">Artificial Intelligence</a>
        <a href="/blockchain-crypto-solutions/" class="ts-mobile-sub-link ${normalizedSlug === 'blockchain-crypto' ? 'active' : ''}">Blockchain & Crypto</a>
        <a href="/smart-home-installation-services/" class="ts-mobile-sub-link ${normalizedSlug === 'smart-home' ? 'active' : ''}">Smart Home Installation</a>
        <a href="/solar-panel-installation-services/" class="ts-mobile-sub-link ${normalizedSlug === 'solar-energy' ? 'active' : ''}">Solar Panel Installation</a>
      </div>
    </div>
    <a href="/blog/" class="ts-mobile-link ${isBlogActive ? 'active' : ''}">Blog</a>
    <a href="/contact/" class="ts-mobile-link ${isContactActive ? 'active' : ''}">Contact</a>
    <a href="/contact/" class="ts-btn" style="margin-top: 15px; text-align: center; justify-content: center;">Book Consultation</a>
  </div>
</header>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('ts-menu-toggle');
  const mobileMenu = document.getElementById('ts-mobile-menu');
  const accordionBtn = document.querySelector('.ts-mobile-accordion-btn');
  const accordionContent = document.getElementById('ts-mobile-accordion-content');
  const chevron = document.querySelector('.ts-chevron-mob');
  const header = document.querySelector('.ts-header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  });
  
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
    });
  }
  
  if (accordionBtn && accordionContent) {
    accordionBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (accordionContent.style.display === 'flex') {
        accordionContent.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        accordionContent.style.display = 'flex';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  }
  
  document.addEventListener('click', function() {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }
  });
});
</script>
<div style="height: 76px;"></div> <!-- Spacer to prevent sticky header from overlapping content -->
  `;
}

/**
 * Generates the footer HTML.
 * @returns {string} Compiled Footer HTML.
 */
export function getFooterHTML() {
  return `
<style>
footer.ts-footer {
  background: #06183B !important;
  color: #ffffff !important;
  padding: 80px 0 40px 0 !important;
  font-family: 'Verdana', sans-serif !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  position: relative !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  margin-top: auto !important; /* Forces footer to the bottom in flexbox */
}

footer.ts-footer * {
  box-sizing: border-box !important;
}

.ts-footer-container {
  max-width: 1320px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
}

.ts-footer-grid {
  display: grid !important;
  grid-template-columns: repeat(12, 1fr) !important;
  gap: 48px !important;
  padding-bottom: 64px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.ts-footer-col-4 {
  grid-column: span 12 !important;
}

.ts-footer-col-2 {
  grid-column: span 6 !important;
}

.ts-footer-col-3 {
  grid-column: span 12 !important;
}

@media (min-width: 768px) {
  .ts-footer-col-4 { grid-column: span 6 !important; }
  .ts-footer-col-2 { grid-column: span 3; }
  .ts-footer-col-3 { grid-column: span 6 !important; }
}

@media (min-width: 992px) {
  .ts-footer-col-4 { grid-column: span 4 !important; }
  .ts-footer-col-2 { grid-column: span 2 !important; }
  .ts-footer-col-3 { grid-column: span 3 !important; }
}

.ts-footer-brand-link {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  text-decoration: none !important;
  margin-bottom: 24px !important;
}

.ts-footer-brand-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 12px !important;
  background: var(--ts-white) !important;
}

.ts-footer-brand-text {
  font-family: 'Playfair Display', serif !important;
  font-weight: 700 !important;
  font-size: 18px !important;
  color: var(--ts-white) !important;
  letter-spacing: -0.02em !important;
  text-transform: uppercase !important;
}

.ts-footer-desc {
  font-size: 13.5px !important; /* Slightly increased */
  line-height: 1.8 !important;
  color: rgba(255, 255, 255, 0.6) !important;
  margin-bottom: 24px !important;
}

.ts-footer-socials {
  display: flex !important;
  gap: 12px !important;
}

.ts-footer-social-link {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 36px !important;
  height: 36px !important;
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.7) !important;
  transition: all 0.3s ease !important;
  text-decoration: none !important;
}

.ts-footer-social-link:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: var(--ts-accent) !important;
  border-color: var(--ts-accent) !important;
}

.ts-footer-title {
  font-family: 'Playfair Display', serif !important;
  font-weight: 700 !important;
  font-size: 14.5px !important; /* Increased */
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  color: var(--ts-accent) !important;
  margin-bottom: 24px !important;
  margin-top: 0 !important;
}

.ts-footer-links {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}

.ts-footer-links a {
  font-size: 14px !important; /* Increased */
  color: rgba(255, 255, 255, 0.6) !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
}

.ts-footer-links a:hover {
  color: var(--ts-white) !important;
}

.ts-footer-contact-item {
  display: flex !important;
  gap: 12px !important;
  font-size: 14px !important; /* Increased */
  line-height: 1.6C !important;
  color: rgba(255, 255, 255, 0.6) !important;
  margin-bottom: 16px !important;
}

.ts-footer-contact-item svg {
  color: var(--ts-accent) !important;
  flex-shrink: 0 !important;
}

.ts-footer-contact-item a {
  color: rgba(255, 255, 255, 0.6) !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
}

.ts-footer-contact-item a:hover {
  color: var(--ts-white) !important;
}

.ts-footer-bottom {
  padding-top: 32px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  font-size: 12.5px !important; /* Increased */
  color: rgba(255, 255, 255, 0.4) !important;
}

.ts-footer-legal-links {
  display: flex !important;
  gap: 24px !important;
}

.ts-footer-legal-links a {
  color: rgba(255, 255, 255, 0.4) !important;
  text-decoration: none !important;
  transition: color 0.2s ease !important;
}

.ts-footer-legal-links a:hover {
  color: var(--ts-white) !important;
}

@media (max-width: 991px) {
  .ts-footer-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .ts-footer-col-4, .ts-footer-col-3, .ts-footer-col-2 {
    grid-column: span 1 !important;
  }
}

@media (max-width: 575px) {
  .ts-footer-grid {
    grid-template-columns: 1fr !important;
  }
  .ts-footer-bottom {
    flex-direction: column !important;
    gap: 16px !important;
    text-align: center !important;
  }
  .ts-footer-legal-links {
    flex-direction: column !important;
    gap: 12px !important;
    align-items: center !important;
  }
}
</style>

<footer class="ts-footer">
  <div class="ts-footer-container">
    <div class="ts-footer-grid">
      <div class="ts-footer-col-4">
        <a href="/" class="ts-footer-brand-link">
          <div class="ts-footer-brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F2D63" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>
          </div>
          <span class="ts-footer-brand-text">TECHNO-SOLUTIONS</span>
        </a>
        <p class="ts-footer-desc">
          An elite technology partner offering custom-engineered business automation, enterprise cloud systems, digital transformation, secure Web3 blockchain consensus, and high-conversion solar energy grids.
        </p>
        <div class="ts-footer-socials">
          <a href="https://linkedin.com" target="_blank" class="ts-footer-social-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="https://facebook.com" target="_blank" class="ts-footer-social-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          <a href="https://instagram.com" target="_blank" class="ts-footer-social-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
          <a href="https://youtube.com" target="_blank" class="ts-footer-social-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
        </div>
      </div>
      <div class="ts-footer-col-2">
        <h3 class="ts-footer-title">Quick Links</h3>
        <ul class="ts-footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about/">About Us</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>
      <div class="ts-footer-col-3">
        <h3 class="ts-footer-title">Our Services</h3>
        <ul class="ts-footer-links">
          <li><a href="/digital-transformation-solutions/">Digital Transformation</a></li>
          <li><a href="/business-automation-solutions/">Business Automation</a></li>
          <li><a href="/artificial-intelligence-solutions/">Artificial Intelligence</a></li>
          <li><a href="/blockchain-crypto-solutions/">Blockchain & Crypto</a></li>
          <li><a href="/smart-home-installation-services/">Smart Home Installation</a></li>
          <li><a href="/solar-panel-installation-services/">Solar Panel Installation</a></li>
        </ul>
      </div>
      <div class="ts-footer-col-3">
        <h3 class="ts-footer-title">Contact Desk</h3>
        <div style="font-size: 13.5px; font-weight: bold; color: rgba(255,255,255,0.9); margin-bottom: 12px; font-family:'Verdana',sans-serif;">Sanjeev Goel</div>
        <div class="ts-footer-contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>218 AGCR Enclave, Near Karkardoma Metro Station, Delhi 110092 | India</span>
        </div>
        <div class="ts-footer-contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <a href="tel:+919811841782">+91 9811841782</a>
        </div>
        <div class="ts-footer-contact-item">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <a href="mailto:info2sanjeev@gmail.com">info2sanjeev@gmail.com</a>
        </div>
      </div>
    </div>
    <div class="ts-footer-bottom">
      <p>© 2026 Techno-Solutions. All Rights Reserved.</p>
      <div class="ts-footer-legal-links">
        <a href="/contact/">SLA Assurance</a>
        <a href="/contact/">Privacy Shield</a>
        <a href="/contact/">Terms of Node Deployment</a>
      </div>
    </div>
  </div>
</footer>
</div> <!-- Close ts-page-wrapper -->
  `;
}
