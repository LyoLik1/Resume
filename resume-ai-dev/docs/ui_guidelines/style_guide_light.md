# UI Kit & Style Guide: resume-ai-dev (Light Theme Refined + Visual Depth Enhancements)

## 1. Overall Design Concept

**Goal:** To create a light, visually rich, clean interface with an emphasis on micro-dynamics, depth, and a soft tech-vibe, without losing seriousness.

**Keywords:** Simplicity, depth-effects, glassmorphism, Apple-style, minimalism with animation, UI-engineering.

**Inspiration:** Linear, Vercel, Apple.com (2024–2025), Read.cv, Superlist.

---

## 2. Color Palette (updated for depth-effects)

### **Background Colors:**

* `#F9FAFB` – main background (neutral)
* `#FFFFFF` – base blocks, texts
* `rgba(255, 255, 255, 0.6)` – "lens" cards with backdrop blur
* `#F3F4F6` – About, Education, Tech Stack sections
* `#1E293B` with transparency – background of Portfolio cards (see below)

### **Text:**

* `#111827` – headings
* `#334155` – main text
* `#64748B` – secondary

### **Accents:**

* `#3B82F6` – main accent (blue)
* `#2563EB` – hover
* `#E0E7FF` – highlights and badges

### **Borders and Shadows:**

* `#E2E8F0` – borders
* `rgba(0, 0, 0, 0.03)` – light card shadows

---

## 3. Typography

**No changes.** Typography remains in the Space Grotesk + Inter style, contrast is improved.

---

## 4. Iconography

**Added:** Icons can be placed on semi-transparent cards with backdrop blur and a light inner-glow on hover.

---

## 5. UI Components (cards, depth, background solutions)

### **Contact Cards:**

* Background: `rgba(255, 255, 255, 0.6)` with `backdrop-filter: blur(16px)`
* Border: `1px solid rgba(255, 255, 255, 0.3)`
* Hover: border `#3B82F6`, soft inner glow

### **Portfolio Cards:**

* Background: `rgba(30, 41, 59, 0.8)` + `backdrop-filter: blur(12px)`
* Text: `#F8FAFC`
* Hover: slight scaling, border glow `#3B82F6`

### **Education / Tech Stack Blocks:**

* Section Background: `rgba(255, 255, 255, 0.75)` + `backdrop-filter: blur(24px)` (glass effect like Apple Vision Pro)
* Cards inside: `#FFFFFF`, border `#E5E7EB`, 12px rounding
* Shadow: `0 2px 4px rgba(0,0,0,0.05)`

---

## 6. Animations and Interactivity

### **Canvas Animation (background):**

* Background: `linear-gradient(to bottom, #F9FAFB, #E0F2FE)`
* Canvas elements:

  * Lines: `rgba(203,213,225,0.3)`
  * Nodes: `rgba(59,130,246,0.25)`
  * Active points — `#3B82F6` with glow (on mousemove)
  * Layers: slight parallax + blurred noise (like Apple events background)

### **General Behavior:**

* Cards appear with `fade-in + translateY`
* Hover animations: scale(1.03), shadow + tint
* Badges appear with `scale-up`
* Scroll icon: microbounce

---

## 7. Responsiveness and Grid (clarified for gradients and transparency)

* Container: `max-width: 1280px`, padding: `clamp(16px, 5vw, 48px)`
* Columns: 12-col Grid (desktop), 6 (tablet), 2 (mobile)
* Cards on mobile: avoid blur, replace with flat-blocks

---

This UI Kit has been updated with **visual depth**, **glassmorphism effect**, and **contrast in the light theme**. Suitable for a modern tech-portfolio that combines **engineering and visual quality**.
