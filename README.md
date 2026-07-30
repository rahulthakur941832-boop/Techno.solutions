# Techno-Solutions Website Package

This package contains the complete source code and static HTML build for the **Techno-Solutions** website.

---

## 📂 Package Directory Structure

- **`dist/`** — **Static HTML/CSS/JS (Ready for hosting)**
  - `index.html` — The main entry point. Opens locally or can be uploaded directly to any hosting provider (GitHub Pages, Netlify, Vercel, S3, etc.).
  - `assets/` — CSS and JS bundles.
- **`src/`** — **React / TypeScript Source Code**
  - `pages/` — Individual pages: Home, About, Services, Blog, Contact, etc.
  - `components/` — Reusable React UI components (Header, Footer, etc.).
  - `data.ts` — Comprehensive high-quality service data, blog posts, and contact information.
- **`package.json`** — Node.js dependencies and run scripts.
- **`vite.config.ts`** — Vite build configuration (configured with relative asset paths for absolute portability).

---

## ⚡ How to Run the Website

### Option A: Static HTML (Zero Configuration)
If you want to view the website instantly, host it, or inspect the compiled code:
1. Navigate to the **`dist/`** folder.
2. Open **`index.html`** in any web browser.
3. *Note: Since assets are set to relative paths, it works perfectly directly from your local file system (`file://` protocol).*

---

### Option B: Local React Development Server
If you want to edit the React components, run a hot-reloading development server, or build customized versions:

#### Prerequisites
- Install [Node.js](https://nodejs.org/) (version 18+ recommended) on your machine.

#### Step 1: Install Dependencies
Open your terminal inside the root directory and run:
```bash
npm install
```

#### Step 2: Start the Development Server
Run the local dev command:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) in your browser.

#### Step 3: Build for Production
To generate a clean production build of your modified code:
```bash
npm run build
```
The newly updated static files will be saved in the `dist/` directory.

---

## 🛠 Features Included
- **Modern Responsive Design**: Perfect typography using Playfair Display & Inter, built with Tailwind CSS.
- **Interactive Routing**: Fast page transitions powered by React Router.
- **Complete Pages**:
  - **Home**: Banner, Service Categories, Testimonials, Core Strengths, and Call to Action.
  - **About**: Company values, founder overview (Sanjeev Goel), mission, and credentials.
  - **Services**: Detailed pages for digital transformation, business automation, AI solutions, blockchain, smart home, and solar installations.
  - **Blog**: Informative tech insights, guidelines, and articles.
  - **Contact**: Interactive booking and consultation form, integrated contact details.
