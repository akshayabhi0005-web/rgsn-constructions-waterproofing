# R.G.S.N Constructions & Waterproofing

🚀 **Live Deployed Website**: **[https://dist-self-rho-74.vercel.app](https://dist-self-rho-74.vercel.app)**

A premium, production-ready website for **R.G.S.N Constructions & Waterproofing** (Estd. 2018), built utilizing React, Vite, and Tailwind CSS. The website features a dark navy and construction orange luxury aesthetic, rich smooth scroll animations, count-up stats, an interactive before/after waterproofing comparison, mobile responsiveness, and a fully functional database backend.

---

## 🛠️ Tech Stack & Features

- **Frontend Core**: React 19 (Hooks, Contexts, State Navigation)
- **Scaffolding Tool**: Vite 8 (Hot Module Replacement, fast asset loading)
- **Styling Utilities**: Tailwind CSS v3 (Custom HSL brand palette, glassmorphism, responsive utilities)
- **Animations Framework**: Framer Motion v12 (Scroll reveal animations, count-up numbers, fade-in, scale taps)
- **Icon Assets**: Lucide React
- **Database Client Manager**: Hybrid local Client supporting direct PHP connections or `localStorage` fallbacks.
- **SEO & Performance**: 
  - Prefetched Google Fonts (Poppins)
  - Google LocalBusiness JSON-LD Schema markup in `index.html`
  - High fidelity compressed AI-generated JPG assets

---

## 📂 Project Structure

```text
Civil.Engineer/
├── .node-portable/       # Local self-contained Node.js v22 environment (if run locally)
├── php-backend/          # XAMPP Apache PHP + MySQL scripts
│   ├── db.php            # PDO Database connector
│   ├── schema.sql        # Database tables initialization script
│   ├── contact.php       # POST API to save contact inquiries
│   ├── projects.php      # GET lists & POST project upload APIs
│   └── gallery.php       # GET photos & POST before-after upload APIs
├── dist/                 # Compiled production-ready build output
├── public/               # Static icons and symbols
├── src/
│   ├── assets/           # High-quality structural & waterproofing JPEG images
│   ├── components/       # Reusable UI components
│   │   ├── BeforeAfterSlider.jsx  # Interactive dragging image comparison
│   │   ├── FloatingActions.jsx    # WhatsApp, Direct Call, and Back-to-Top triggers
│   │   ├── Footer.jsx             # Grid-based details footer (with hidden Admin trigger)
│   │   ├── Lightbox.jsx           # Screen-takeover masonry image viewer
│   │   ├── Loader.jsx             # SVG animated startup spinner
│   │   └── Navbar.jsx             # Sticky navigation, Hamburger, and Theme Toggle
│   ├── context/
│   │   └── ThemeContext.jsx       # Light / Dark mode toggling states
│   ├── pages/            # View pages
│   │   ├── About.jsx              # Timeline, Engineer Naveen bio, Mission statements
│   │   ├── Contact.jsx            # Form validations, Call shortcuts, Maps mockup
│   │   ├── FAQs.jsx               # Expanding chevron accordions
│   │   ├── Gallery.jsx            # Waterproofing sliders and masonry pictures
│   │   ├── Home.jsx               # Hero parallax, count-ups, why choose us
│   │   ├── Projects.jsx           # Categorised filterable duplex & plaza showcases
│   │   ├── Services.jsx           # Grid of 15 expandable method description cards
│   │   ├── Testimonials.jsx       # Colored initials avatar feedback cards
│   │   └── Admin.jsx              # Admin login dashboard (submissions, project uploads)
│   ├── utils/
│   │   └── db.js                  # Dynamic environment database utility
│   ├── App.jsx           # State page router, Loader controller, Page transitions
│   ├── index.css         # Global scrollbar customisations, typography imports
│   └── main.jsx          # React app mount & Context provider
├── index.html            # Main markup page containing Schema SEO script
├── tailwind.config.js    # Custom brand color overrides, keyframes, and font mapping
├── package.json          # Node scripts and dependency registers
└── README.md             # Project documentation (This file)
```

---

## 🔒 Accessing the Admin Console

The Admin Console is secure and hidden. 
1. Scroll down to the **Footer** of the website.
2. Click directly on **"Designed by Naveen G (Civil Engineer)"** in the bottom-right corner.
3. This will launch the Admin Login.
4. Enter the default administrator credentials:
   - **Username**: `admin`
   - **Password**: `rgsn2018`
5. Here, you can view customer submissions, add new projects, and upload image files.

---

## 🔌 XAMPP Backend & MySQL Database Deployment

If you want to host the website on a local **XAMPP Server** with a live database to let your client add projects and view queries locally:

### Step 1: Copy Project files to htdocs
1. Create a folder named `rgsn` inside XAMPP's `htdocs` directory (typically `C:\xampp\htdocs\rgsn\`).
2. Copy the contents of the **`dist/`** folder (after running `npm run build`) and paste them directly into `C:\xampp\htdocs\rgsn\`.
3. Copy the **`php-backend/`** folder and paste it directly into `C:\xampp\htdocs\rgsn\php-backend\`.

### Step 2: Set up Apache & MySQL
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache** and **MySQL**.

### Step 3: Initialize the MySQL Database
1. Open your browser and navigate to **[http://localhost/phpmyadmin/](http://localhost/phpmyadmin/)**.
2. Click the **Databases** tab at the top.
3. In the "Create database" field, enter **`rgsn_db`** and click **Create**.
4. Select the newly created `rgsn_db` database on the left sidebar.
5. Go to the **Import** tab at the top.
6. Click **Choose File** and select the **`schema.sql`** file (located inside `C:\xampp\htdocs\rgsn\php-backend\schema.sql`).
7. Scroll down and click **Import** (or **Go**).
*This creates the inquiries, projects, and gallery tables and pre-seeds them with projects!*

### Step 4: Preview the Live Site
Navigate to the following address in Google Chrome:
👉 **[http://localhost/rgsn/](http://localhost/rgsn/)**

*Any projects uploaded through the Admin panel will now write to MySQL, save uploaded images in the `/php-backend/uploads/` directory on your hard drive, and load dynamically across the site!*

---

## 🚀 How to Run Node/Vite (Development Mode)

If you are running the project locally in Vite development mode, prepend the local portable Node path in Windows PowerShell:

1. **Prepend local Node.js to your terminal session PATH**:
   ```powershell
   $env:Path = 'c:\Users\Akshay N\Desktop\Civil.Engineer\.node-portable;' + $env:Path
   ```
2. **Start the local development server**:
   ```powershell
   npm run dev
   ```
3. **Open your browser and navigate to**:
   [http://localhost:5173](http://localhost:5173)

---

## ⚡ Deployment to Vercel (Cloud Hosting)

If you deploy this project to Vercel, the website will build statically. The database manager will automatically fall back to **browser LocalStorage** so that the Admin Panel, project inserts, and quote requests work seamlessly on the cloud without setting up external MySQL instances.

1. Install Vercel CLI (downloads on-the-fly):
   ```powershell
   $env:Path = 'c:\Users\Akshay N\Desktop\Civil.Engineer\.node-portable;' + $env:Path
   npx vercel ./dist --prod
   ```
2. Follow the prompts to authenticate, and the website will immediately go live on a public URL!
