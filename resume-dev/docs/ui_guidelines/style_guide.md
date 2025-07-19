# UI Kit & Style Guide: resume-ai-dev

## 1. Overall Design Concept

**Goal:** To create a modern, minimalist, technological, and professional interface that reflects the candidate's skills and focus in Full-stack development, automation, and AI.

**Keywords:** Minimalism, technology, futurism (slight), cleanliness, professionalism, interactivity.

**Inspiration (Moodboard - text description):**
*   Dark interfaces with accent lighting (like in code editors or analytical system dashboards).
*   Geometric shapes, thin lines.
*   Subtle glow effects for interactive elements.
*   Animations that emphasize technology (e.g., SVG morphing, glitch effects on text on hover, parallax).
*   A style reminiscent of interfaces from science fiction films (e.g., interface elements in the films Oblivion, Tron: Legacy, Blade Runner 2049), but adapted for the web and readability.
*   The background Canvas animation of a "neural network" should be integrated organically, creating depth without distracting from the main content.

## 2. Color Palette

The main palette will be built on dark tones with bright accents.

*   **Main Background Colors:**
    *   `#0A0A0A` (Very dark, almost black – for the main page background with the Canvas animation)
    *   `#141414` (Dark gray – for the background of individual blocks/sections to create depth)
    *   `#1E1E1E` (Graphite – for cards or highlighted elements)
*   **Main Text Colors:**
    *   `#E0E0E0` (Light gray – for the main text, provides good readability on a dark background)
    *   `#FFFFFF` (White – for headings and key accents)
*   **Accent Colors:**
    *   `#00BFFF` (Deep Sky Blue) – technological, modern. Can be used for links, icons, indicators, active elements, animation elements.
    *   `#39FF14` (Neon Green) – as a secondary accent, for specific interactive elements or to highlight technological aspects (e.g., in the Tech Stack section). Use sparingly.
*   **Additional Colors (if necessary):**
    *   `#4A4A4A` (Medium gray – for dividers, inactive elements, secondary text)

**Usage Example:**
*   Page background: `#0A0A0A`
*   Section background: `#141414`
*   Section heading: `#FFFFFF`
*   Main text: `#E0E0E0`
*   Link: `#00BFFF` (on hover it can become brighter or change its shade to `#39FF14`)

## 3. Typography

It is necessary to choose modern, readable fonts that look good on a dark background and convey a technological character. It is recommended to use sans-serif fonts.

*   **Main Font for Headings:**
    *   **Roboto Mono** (or another monospaced font, e.g., **Source Code Pro**, **IBM Plex Mono**) – will emphasize technology, well suited for short headings and accents.
    *   Sizes: H1 (32-48px), H2 (24-36px), H3 (18-28px). Weight: Medium, Bold.
*   **Main Font for Body Text:**
    *   **Inter** (or **Roboto**, **Open Sans**) – modern, universal, with excellent readability.
    *   Size: 14-16px (for desktop), 12-14px (for mobile). Weight: Regular, Medium.
*   **Line Spacing:** 1.5 - 1.7 for the main text to improve readability.
*   **Kerning and Tracking:** Adjust for optimal visual perception, especially for headings.

## 4. Iconography

*   **Style:** Minimalist, linear (outline) icons. SVG icons can be used for better scalability and animation capabilities.
*   **Source:** FontAwesome, Material Icons, Feather Icons, or custom SVGs.
*   **Color:** Accent color (`#00BFFF` or `#FFFFFF` depending on the context). On hover, a color change or the addition of a glow effect is possible.
*   **Sizes:** Standardized sizes (e.g., 16px, 20px, 24px).

## 5. Main Components (Preliminary Thoughts)

*   **Buttons:**
    *   **Primary:** Filled with accent color (`#00BFFF`), text `#FFFFFF` or `#0A0A0A`. On hover – a slight glow or color inversion.
    *   **Secondary/Outline:** Transparent background, border with accent color (`#00BFFF`), text with accent color. On hover – filled with accent color, text becomes dark.
    *   Shape: Rectangular with slightly rounded corners (2-4px) or sharp corners for a stricter look.
*   **Cards (for projects, experience):**
    *   Background: `#1E1E1E`.
    *   Shadow: A light, almost imperceptible shadow or a glow along the contour with an accent color on hover.
    *   Borders: A thin border of `#4A4A4A` or an accent color.
*   **Dividers:** Thin lines of `#4A4A4A` or using a gradient to transparency.

## 6. Animations and Interactions (Concepts)

*   **GSAP Morph Geometry:** For background elements, possibly for transitions between sections or for accent graphic elements.
*   **Framer Motion:** For animating the appearance of elements on scroll, interactive responses to user actions (hover effects, clicks).
*   **Generative Parallax Backgrounds (OpenAI ad style):** The main Canvas animation of the "neural network" will serve these purposes. A slight parallax effect can be added for text blocks or cards relative to the background on scroll.
*   **Hover Effects:**
    *   Highlighting, color change, slight displacement or scaling for interactive elements (links, buttons, icons).
    *   Appearance of additional information or actions on cards.
*   **Loading Animation (Preloader):** There is already a concept, it should match the overall style.
*   **Text Animation:** Possibly a "typewriter" effect for the intro or headings, or a glitch effect on hover.

## 7. Responsiveness

*   The design must be fully responsive (mobile-first or desktop-first with subsequent adaptation).
*   Special attention should be paid to readability and ease of navigation on mobile devices.
*   Grids and margins should be flexible.

---

This document will be supplemented and refined as mockups and components are developed.