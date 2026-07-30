# Elementor Container & Design System Mapping Guide
## Project: Techno-Solutions

This guide provides the direct configuration parameters, global styles, and section-by-section structural mappings required to recreate the high-fidelity React **Home** page layout in **WordPress using Elementor's Flexbox Containers**.

---

## 1. Global Site Settings (Elementor Design System)

Before building individual pages, configure these global tokens in **Elementor Site Settings** to preserve the exact brand identity and responsive scales.

### A. Global Colors
Go to **Site Settings > Global Colors** and register the following:

| System Color | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| **Primary (Dark Navy)** | `#0F2D63` | Hero, footers, dark backgrounds, high-contrast buttons |
| **Secondary (Gold Accent)** | `#E5AF2B` | Sparkle highlights, badges, icons, interactive hover states |
| **Text (Deep Charcoal)** | `#1B1B1B` | Primary headings, body copy on light backgrounds |
| **Secondary Text (Slate)** | `#5B6470` | Secondary descriptions, captions, list text |
| **Light Accent (Soft Blue)** | `#F8F9FC` | Section backgrounds, inner card containers |
| **Border & Divider** | `#ECECEC` | Fine keylines, card borders, subtle spacing markers |
| **Pure White** | `#FFFFFF` | Core backgrounds, card backgrounds, dark-mode body |

### B. Global Typography
Go to **Site Settings > Global Fonts** and pair these three specific Google Fonts:

1. **Primary Font Family (Sans-serif)**: `Inter`
   - **Body text**: `Inter`, Weight: `400` or `500`, Line-Height: `1.6`, Letter-Spacing: `0`
   - **UI Labels/Checklists**: `Inter`, Weight: `600` or `700`, Letter-Spacing: `0`
2. **Display Font Family (Serif)**: `Playfair Display`
   - **Primary Headings (H1, H2)**: `Playfair Display`, Weight: `700` or `800`, Line-Height: `1.2`, Letter-Spacing: `-0.02em`
3. **Accent Font Family (Monospace)**: `JetBrains Mono` (or `Fira Code` / System Mono)
   - **Status Lines, Badges & Micro-meta**: `JetBrains Mono`, Weight: `600`, Text-Transform: `Uppercase`, Letter-Spacing: `0.1em`

---

## 2. Global Layout & Spacing Rules

To replicate the visual rhythm and negative space:
* **Section Padding (Desktop)**: Top: `100px`, Bottom: `100px` (or `120px` for Hero/Contact).
* **Section Padding (Mobile)**: Top: `60px`, Bottom: `60px`.
* **Container Gap (Flexbox)**: Rows: `24px` / Columns: `24px` (inside grids).
* **Card Border Radius**: `24px` (styled with a fine line of `1px` solid `#ECECEC` and a very soft box shadow: `rgba(0, 0, 0, 0.02) 0px 4px 12px`).

---

## 3. Elementor Flexbox Container Mapping (Section by Section)

Here is how to reconstruct the structural React DOM into Elementor’s modern nested **Flexbox Containers**.

### Section 1: Cosmic Hero Banner (Dark Mode)
* **Structure**: Parent Flexbox Container set to **Full Width**.
  * **Layout (Direction)**: Row (Horizontal) on Desktop, Column (Vertical) on Mobile.
  * **Align Items**: Center. Justify Content: Space Between.
  * **Min Height**: `80vh` or `min-height: 700px`.
  * **Style Tab**: 
    * Background Type: Classic. Color: `#06183B`
    * Background Overlay: Classic. Color: `#0A224E` with opacity set to `0.85` overlaying a high-tech circuit or world map Unsplash texture.
  
* **Child Container A (Left-Side Text - Width: 55%)**:
  * **Direction**: Column (Vertical).
  * **Widgets inside**:
    1. **Heading Widget (Badge)**: 
       * Text: `✨ TECHNO-SOLUTIONS`
       * Tag: `div`. Color: `#E5AF2B`. Typography: `JetBrains Mono`, `12px`, uppercase.
    2. **Heading Widget (Title)**: 
       * Text: `Transform Your Business with Intelligent Digital Solutions`
       * Tag: `h1`. Color: `#FFFFFF`. Typography: `Playfair Display`, `52px`, bold.
    3. **Text Editor Widget (Subtext)**: 
       * Text: `At Techno-Solutions, we help businesses modernize, automate, and grow using cutting-edge technologies...`
       * Color: `#E2E8F0` (soft slate-blue), size: `16px`.
    4. **Button Widget**: 
       * Text: `Book a Free Consultation`
       * Link: `#contact`. Color: `#0F2D63`. Background Color: `#E5AF2B`. Border-radius: `12px`. Padding: `16px 32px`.

* **Child Container B (Right-Side Card Mockup - Width: 40%)**:
  * **Direction**: Column (Vertical). Alignment: Center.
  * **Style Tab**: Background: `#0F2D63`, Border Radius: `24px`, Border: `1px solid rgba(255,255,255,0.1)`, Padding: `40px`.
  * **Widgets inside**:
    1. **Icon Widget**: Icon: `fa-cpu`, Color: `#E5AF2B`, Size: `56px` (Pulse effect configured via CSS).
    2. **Heading Widget**: Text: `TECHNO-SOLUTIONS.`, Color: `#FFFFFF`, Typography: `Playfair Display`, `24px`.
    3. **Text Editor**: A simple layout specifying active node information or system SLA benchmarks.

---

### Section 2: About & Direct Executive Desk
* **Structure**: Parent Container set to **Boxed (1320px)**.
  * **Layout Direction**: Row (Desktop), Column (Mobile).
  * **Style**: Background Color: `#FFFFFF`. Padding: `100px 0`.

* **Child Container A (Left Text - Width: 60%)**:
  * **Direction**: Column (Vertical).
  * **Widgets inside**:
    1. **Heading Widget (Badge)**: Text: `ABOUT US`, Color: `#0F2D63`, Typography: `JetBrains Mono`, `12px`.
    2. **Heading Widget (H2)**: Text: `Your Trusted Technology Partner`, Color: `#1B1B1B`, Typography: `Playfair Display`, `38px`.
    3. **Text Editor**: Multi-paragraph narrative describing the consulting firm's operational target scales, enterprise strategies, and background.

* **Child Container B (Right Executive Card - Width: 35%)**:
  * **Direction**: Column (Vertical). Align Items: Center.
  * **Style Tab**: Background: `#F8F9FC` (Soft Blue), Border: `1px solid #ECECEC`, Border-Radius: `24px`, Padding: `32px`.
  * **Widgets inside**:
    1. **Image Widget**: Source: Portrait of Sanjeev Goel. Width: `120px`, Height: `120px` (Object-fit: cover, Border-radius: `100%`).
    2. **Heading Widget**: Text: `Sanjeev Goel`, Color: `#1B1B1B`, Typography: `Playfair Display`, `22px`.
    3. **Heading Widget (Role)**: Text: `FOUNDER & CHIEF CONSULTANT`, Color: `#E5AF2B`, Typography: `Inter`, `12px`, Bold.
    4. **Icon List Widget**:
       * Item 1: Icon: `map-marker`, Text: `218 AGCR Enclave, Delhi`
       * Item 2: Icon: `phone`, Text: `+91 9811841782`
       * Item 3: Icon: `envelope`, Text: `info2sanjeev@gmail.com`

---

### Section 3: Interactive Services Grid (6 Cards)
* **Structure**: Parent Container set to **Boxed (1320px)**.
  * **Style**: Background Color: `#F8F9FC` (Soft grey-blue backdrop). Padding: `100px 0`.
  * **Layout Direction**: Column (Vertical).

* **Header Container (Full Width)**:
  * Contains a centered Badge (`OUR SOLUTIONS`), a centered H2 Display Title (`Enterprise Solutions Tailored for Growth`), and centered description.

* **Grid Container (Row Direction with Wrap Enabled)**:
  * **Gap between elements**: `24px` (both columns and rows).
  * **Columns setup**: Place **6 Child Containers** inside, each set to **Width: 31%** on Desktop, **48%** on Tablet, and **100%** on Mobile.

* **Sub-Container Structure (Individual Card Configuration)**:
  * **Style Tab**: Background: `#FFFFFF`, Border-Radius: `24px`, Border: `1px solid #ECECEC`, Padding: `32px`, Hover Shadow: Enabled.
  * **Widgets inside**:
    1. **Icon Box or Text Editor** (custom-styled code block):
       * High-contrast gold-colored icons (`server`, `settings`, `cpu`, `shield-check`, `home`, `sun`).
    2. **Heading Widget**: Title of the service (e.g., `Business Automation`), Tag: `h3`, Typography: `Playfair Display`, `20px`, Color: `#1B1B1B`.
    3. **Text Editor**: A descriptive list of features and key deliverables.
    4. **Button or Link Widget**: Read More styled with an arrow (`fa-arrow-right`), linking to the corresponding detail layouts.

---

### Section 4: The 6-Step Methodology Timeline
* **Structure**: Parent Container set to **Boxed (1320px)**. Background: `#FFFFFF`. Padding: `100px 0`.
* **Timeline Wrapper Container**:
  * **Layout Direction**: Row (Horizontal) with Wrap enabled on smaller viewports.
  * **Gap**: `20px`.
  * **Children containers (6 columns - Width: 15% each)**:
    * **Style**: Background: `#F8F9FC`, Border: `1px solid #ECECEC`, Border-Radius: `16px`, Padding: `24px`, Text-Align: Center.
    * **Widgets**:
      1. **Heading (Step Number)**: Text: `01` to `06`. Color: `#E5AF2B`. Typography: `Playfair Display`, `28px`, extra bold.
      2. **Heading (Step Title)**: Text: (e.g., `Consultation`, `Analysis`). Color: `#1B1B1B`, Typography: `Inter`, `14px`, Bold.

---

### Section 5: Secure Discovery Desk (Contact Form)
* **Structure**: Parent Container set to **Boxed (1320px)**.
  * **Style**: Background Color: `#0F2D63` (Dark Navy Blue). Border-Radius: `32px`. Padding: `80px 60px`.
  * **Layout Direction**: Row (Desktop), Column (Mobile). Align Items: Center.

* **Left Text Column (Width: 45%)**:
  * **Direction**: Column.
  * **Widgets**: Badge (`FREE CONSULTATION`), H2 Header (`Ready to Transform Your Business?`), custom address info text, and direct phone link highlights.

* **Right Form Column (Width: 50%)**:
  * **Style**: Background: `#FFFFFF` (pure white), Border-Radius: `24px`, Padding: `40px`.
  * **Widgets**:
    1. **Elementor Form Widget**:
       * Field 1: Name (Required, Text)
       * Field 2: Email (Required, Email)
       * Field 3: Phone (Tel)
       * Field 4: Select Service (Dropdown with the 6 core services)
       * Field 5: Detailed message (Textarea)
       * Submit Button: Background `#0F2D63`, Hover Background `#1A448C`, Text Color `#FFFFFF`.
    2. **Actions After Submit**: Set to **Email** to send leads to:
       * **`info2sanjeev@gmail.com`**

---

## 4. Reusing JSON Templates in Elementor
1. Download the pre-built `techno_solutions_elementor_homepage.json` file from the workspace.
2. In your WordPress Dashboard, navigate to **Templates > Saved Templates**.
3. Click the **Import Templates** button at the top, select the JSON file, and upload.
4. Open your Target page in Elementor, click the **Folder Icon (Add Template)**, go to the **My Templates** tab, find "Techno-Solutions Home Page", and click **Insert**.
5. All layout containers, styling hooks, text definitions, and routing configurations will parse directly into editable Elementor components.
