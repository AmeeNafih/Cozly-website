# COZLY by Zoffaro IN (cozly.in) — Sofa Brand & Catalogue Website

> **"Crafted for every comfort."**

A complete, production-ready brand and catalogue website with an interactive 7-step sofa customizer, cart with WhatsApp order dispatch, and secure Admin Control Panel for **COZLY by Zoffaro IN**, an artisanal sofa manufacturer based in **Erattupetta, Kottayam District, Kerala, India**.

---

## 🛋️ Brand & Visual Identity

- **Brand Name:** **COZLY by Zoffaro IN**
- **Tagline:** *"Crafted for every comfort."*
- **Vector Logo Assets (`/public/brand/`):**
  - Primary / Light Background: `/brand/logo.svg` & `/brand/logo-black.svg` (solid black vector glyphs extracted directly from the official Illustrator Logofolio)
  - Dark Background / Footer & Admin Login: `/brand/logo-white.svg` & `/brand/logo-light.svg` (crisp white vector glyphs)
  - Standalone Sofa Icon: `/brand/sofa-icon.svg` & `/brand/sofa-icon-white.svg` (used as favicon, loading indicator, and subtle watermark)
- **Monochrome Editorial Palette:**
  - **Black (`#000000`):** Header, primary buttons, footer, dark sections
  - **Charcoal (`#1A1A1A`, `#333333`, `#4D4D4D`):** Body copy, dark cards, hover states
  - **White (`#FFFFFF`) & Light Grey (`#F5F5F5`):** Clean page backgrounds and alternating editorial sections
  - **Warm Kraft Brown (`#B8956A`):** Used sparingly for offer badges, small underlines, and subtle accents
  - **WhatsApp Green (`#25D366`):** Dedicated exclusively to WhatsApp enquiry & order action buttons
- **Typography:**
  - **Poppins Everywhere:** Bold for headings, Medium/Regular for body copy, with uppercase wide letter spacing for sub-mark labels (`BY ZOFFARO IN`).
- **Brand Value Strip:**
  - Featured on homepage and product pages with thin outline icons: **Comfort**, **Quality**, **Style**, and **Durability**.

---

## 🛋️ Key Features

- **Product Catalogue:** Faceted instant filtering by Type (Solid Teakwood / Premium Upholstered), Seating Capacity (1, 2, 3-Seater, L-Shape Sectional, Sofa-Cum-Bed, Recliner, Chaise), Price Slider, and Stock Status. All prices displayed in Indian Rupees (`₹42,500`) with optional offer strike-through.
- **Product Detail Pages:** Multi-photo gallery, dimensions diagram, craftsmanship specifications, fabric & wood finish swatches, live price recalculation, brand value strip, and sticky mobile order buttons.
- **7-Step Sofa Customizer (`/customize`):** Interactive configurator allowing customers to choose Silhouette → Dimensions → Frame Timber → Fabric → Color Swatch → Foam Firmness → Leg Style with live 3D/2D preview and price calculation.
- **Cart & WhatsApp Ordering:** No online payment gateway needed. Customers add sofas, enter delivery city/pincode, and click **"Place Order on WhatsApp"**. Generates a clean URL-encoded WhatsApp message sent directly to `+91 9846581241`.
- **Smart Delivery Verification:** Automatically detects if delivery is within Kerala, Tamil Nadu, or Karnataka (including Bangalore), and provides helpful advice for all-India orders.
- **Floating WhatsApp Widget:** Persistent on every page for direct customer inquiries.
- **Full Admin Portal (`/admin`):**
  - **Dashboard:** Catalogue metrics and recently edited models.
  - **Product Manager:** Add, edit, clone (1-click duplicate), hide/publish, and delete models.
  - **Quick Price Editor:** Spreadsheet-like table to adjust prices and offer discounts across all products at once.
  - **Media Management:** Multi-image gallery with cover image selector.
  - **Homepage Editor:** Modify hero carousel banners, headlines, and craftsmanship highlights.
  - **Settings:** Update WhatsApp ordering phone number, address, and delivery zones.
- **SEO & Performance:** JSON-LD Product Schema markup, OpenGraph cards, dynamic `sitemap.xml`, and `robots.txt`.
- **Localization Ready:** Centralized dictionary files (`/messages/en.json`, `/messages/ml.json`, etc.) ready for Malayalam, Tamil, Kannada, and Hindi.

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test Production
```bash
npm run build
npm start
```

---

## 🔐 Admin Panel Access

- **Admin URL:** [http://localhost:3000/admin](http://localhost:3000/admin) (or `https://cozly.in/admin`)
- **Default Email:** `admin@cozly.in`
- **Default Password:** `cozly2026`
- **Theme:** High-contrast monochrome with white logo on black background.

*(When you connect Supabase Auth, you can use any email and password created in your Supabase project).*

---

## 🗄️ Setting Up Supabase (PostgreSQL, Auth & Storage)

The website works immediately out of the box using built-in persistent storage. To connect your remote Supabase cloud database:

### Step 1: Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a free project (select the India/Singapore region for lowest latency).
2. Go to **Project Settings** → **API**.
3. Copy:
   - **Project URL**
   - **anon / public key**
   - **service_role key** (keep secret)

### Step 2: Run the Database Schema
1. In your Supabase Dashboard, open the **SQL Editor** tab from the left sidebar.
2. Open the file `supabase/schema.sql` from this codebase.
3. Paste the entire content into the SQL Editor and click **Run**.
4. This creates all tables (`products`, `categories`, `site_settings`, `reviews`), indexes, and Row-Level Security (RLS) policies.

### Step 3: Configure Environment Variables
Create a file named `.env.local` in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://cozly.in
```

### Step 4: Create an Admin User in Supabase Auth
1. Go to **Authentication** → **Users** in your Supabase Dashboard.
2. Click **Add User** → **Create User**.
3. Enter your email (e.g. `owner@cozly.in`) and a secure password.
4. You can now use these credentials to log in at `/admin/login`.

---

## 🛠️ How to Manage the Website via Admin Panel

### 1. Adding a New Sofa
1. Go to **Admin** → **All Products** → **Add New Sofa** (or visit `/admin/products/new`).
2. Enter the Model Name (the URL slug will generate automatically).
3. Select Category (Wooden, Upholstered, Sectional, Sofa-Bed, Recliner).
4. Enter the Selling Price (₹) and optional Original Price (to show a strike-through discount).
5. Specify dimensions (Width, Depth, Height, Seating Height in cm).
6. Fill in materials (Teak wood frame, foam density, suspension).
7. Add photos by pasting the image URL or uploading. Click the star icon to set the Cover Photo.
8. Click **Save Product**. It will appear on the live store immediately!

### 2. Changing Prices in Bulk (Quick Price Editor)
1. Go to **Admin** → **Quick Price Editor** (`/admin/quick-price`).
2. You will see a spreadsheet table of all sofas.
3. Simply type the new price or offer price directly in the input box.
4. Click **Save All Changes**. All updated prices will reflect instantly on product cards and detail pages.

### 3. Changing the WhatsApp Ordering Number
1. Go to **Admin** → **Settings & WhatsApp** (`/admin/settings`).
2. Enter your new phone number in the **WhatsApp Order Number** field (e.g., `+91 9846581241`).
3. Click **Save Settings**.
4. Every "Add to Cart", "Place Order on WhatsApp", and "Enquire on WhatsApp" button across the whole site will immediately dispatch messages to this new number.

### 4. Editing Homepage Hero Banners
1. Go to **Admin** → **Homepage Editor** (`/admin/homepage`).
2. Edit slide headlines, subtitles, button links, or add new carousel slides.
3. Turn the top announcement bar on or off.
4. Click **Save All Changes**.

---

## 📲 How WhatsApp Ordering Works

1. Visitors browse the catalogue or build a custom sofa using the 7-step configurator.
2. Visitors add one or more sofas to their cart.
3. In the cart drawer or full cart page (`/cart`), the customer fills in:
   - Full Name
   - WhatsApp Number
   - Delivery City and 6-digit Pincode
   - Special notes (floor number, elevator access, custom cushion preference)
4. If their pincode is in Kerala, Tamil Nadu, or Karnataka, the app confirms direct factory delivery.
5. Clicking **"Place Order on WhatsApp"** automatically opens WhatsApp with a pre-written message:

```text
🛋️ *NEW ORDER FROM COZLY by Zoffaro IN*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS:*
• Name: Anandhu Krishnan
• Phone: 98465 12345
• Delivery City & Pincode: Ernakulam - 682016
• Region: Kerala (Direct Coverage Zone)

📦 *ORDERED ITEMS (1):*
1. *The Malabar Solid Teak 3-Seater*
   • Fabric: Belgian Linen (Warm Sand)
   • Wood Finish: Natural Matte Teak
   • Product Link: https://cozly.in/collection/malabar-solid-teak-3-seater
   • Quantity: 1 × ₹42,500 = ₹42,500

━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *ESTIMATED TOTAL:* *₹42,500*
✅ *(Delivery within Kerala coverage zone)*
━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from COZLY by Zoffaro IN (cozly.in) • Crafted for every comfort.
Handcrafted in Erattupetta, Kottayam
```

---

## 🚢 Deploying to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Visual rebranding: COZLY by Zoffaro IN"
   git remote add origin https://github.com/your-username/cozly-website.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://cozly.in`
5. Click **Deploy**. Your website will be live in 60 seconds with SSL and global CDN!

---

## 📍 Brand Information

- **Brand:** COZLY by Zoffaro IN (`cozly.in`)
- **Tagline:** Crafted for every comfort.
- **Atelier Location:** Main Road, Erattupetta, Kottayam District, Kerala 686122, India
- **WhatsApp / Phone:** `+91 9846581241`
- **Email:** `sales@cozly.in`
- **Delivery Coverage:** Kerala, Karnataka (incl. Bangalore), Tamil Nadu, and All-India on special request.
