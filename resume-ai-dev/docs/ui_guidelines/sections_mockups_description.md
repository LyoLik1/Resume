# Section Mockup Descriptions: resume-ai-dev

This document provides a detailed description of the design concept and UX for the key sections of the one-page resume. It is based on the [UI Kit & Style Guide](style_guide.md).

## 1. Hero Section

**Goal:** To instantly capture attention, introduce the candidate, and set a technological tone for the entire resume.

**Overall Composition (Desktop):**
*   **Background:** A semi-transparent Canvas animation of a "neural network" on a `#0A0A0A` background. The animation should be dynamic but not too intrusive, so as not to interfere with text readability. The lines and nodes of the network can have a slight glow with an accent color (`#00BFFF` or `#39FF14`).
*   **Content Placement:** Central or slightly offset to create an interesting composition.
*   **Main Text Block:**
    *   **Full Name (MYKYTA NIEZNAKOMOV):** Large font (H1, e.g., Roboto Mono, 48px), color `#FFFFFF`. A slight appearance animation (e.g., letter by letter or with a glitch effect on load) can be applied.
    *   **Position (Full-stack Developer / Automation & AI Systems Engineer):** Smaller font (H2, Roboto Mono, 28-32px), color `#E0E0E0` or accent `#00BFFF`. Placed under the full name. Can be split into two lines if too long.
    *   **Brief Intro/Slogan:** (from `resume_content.md`: "I am an experienced Full-Stack developer...") Font Inter, 16-18px, color `#E0E0E0`. Placed under the position with a small margin. The text should be concise.
*   **Interactive Elements (optional, as specified in `project_plan.md`):**
    *   **Buttons:** "Contact" (anchor to the "Contacts" section) and "Download PDF". Button style – Primary or Secondary/Outline from the style guide. Placed under the intro.
        *   "Contact" button: text "Contact Me", icon (e.g., a letter or a phone receiver).
        *   "Download PDF" button: text "Download CV", icon (e.g., a down arrow or a document).
*   **Visual Accents:**
    *   Thin geometric lines or elements that echo the neural network animation can be used to frame the text block or create visual interest. These elements can be animated (e.g., slow appearance, pulsation).

**Animations and Interactivity (Hero Section):**
*   **Name Animation:** As mentioned, the full name can appear with a "typing", glitch, or morphing effect from abstract symbols.
*   **Parallax:** A slight parallax effect for the text block relative to the background Canvas animation on mouse movement or scroll.
*   **Hover Effects on Buttons:** As described in the style guide (glow, inversion).
*   **"Scroll Invitation" Animation:** At the bottom of the section, there can be an animated down arrow icon or a text prompt "Scroll down" to encourage the user to continue viewing.

**Responsiveness (Mobile):**
*   **Background:** The Canvas animation is preserved but may be simplified for performance.
*   **Content Placement:** Vertical, centered.
*   **Font Sizes:** Reduced for better readability on small screens (Full Name ~32px, Position ~20-24px, Intro ~14px).
*   **Buttons:** Placed one below the other, taking up most of the screen width for ease of tapping.
*   The intro may be shortened or hidden under a "read more" link if it takes up too much space.

---
## 2. Contacts

**Goal:** To provide clear and easily accessible contact information, maintaining a technological and minimalist style.

**Overall Composition (Desktop):**
*   **Section Title:** "Contacts" or "Get in Touch" (H2, Roboto Mono, color `#FFFFFF`).
*   **Layout:** Can be a separate block with a `#141414` background or integrated into the main `#0A0A0A` background with visual dividers.
*   **Contact Presentation:** A list or grid of interactive elements. Each element includes:
    *   **Icon:** A linear SVG icon (style from the UI Kit, color `#00BFFF`).
    *   **Service/Contact Type Name:** (e.g., "Email", "LinkedIn", "GitHub"). Font Inter, 14-16px, color `#E0E0E0`.
    *   **Contact Details:** (e.g., "neznakomov@me.com", "linkedin.com/in/nikita-neznakomov"). Font Inter, 14-16px, color `#FFFFFF` or `#E0E0E0`. Should be clickable (for email – `mailto:`, for phone – `tel:`, for links – `target="_blank"`).
*   **Layout Options:**
    1.  **Horizontal list with icons on the left:** Icon | Service Name: Contact Details.
    2.  **Grid of cards:** Each card represents one contact (icon + name + details). Card background `#1E1E1E`.
    3.  **Minimalist list:** Only icons and clickable contact details, with the service name appearing on hover.
*   **Interactivity:**
    *   **Hover Effects:**
        *   On the icon: color change, slight glow (accent color `#39FF14` or a brighter shade of `#00BFFF`).
        *   On the text link: underline or color change.
        *   On the entire contact area (if a card): a slight shadow or border color change.
    *   **Click:** Copy to clipboard for Email/Phone (with visual confirmation, e.g., "Copied!"). For links – opens the link.
*   **Visual Accents:** Thin divider lines (`#4A4A4A`) between contacts if needed for structure. Animated elements echoing the "neural network" theme can be used, such as lines "connecting" the contact icons.

**Responsiveness (Mobile):**
*   **Layout:** Contacts are arranged vertically in a list.
*   **Element Size:** Icons and text should be large enough for easy tapping.
*   **Composition:** Each contact takes up the full width or half width (if icon + text).
*   **Interactivity:** Preserved, with special attention to the convenience of copying and following links.

---
## 3. About / Key Focus Areas

**Goal:** To present detailed information about the candidate and their specialization in an attractive and structured format.

**Overall Composition (Desktop):**
*   **Section Title:** "About Me" (H2, Roboto Mono, color `#FFFFFF`).
*   **Subtitle (optional):** "Key Focus Areas (2023-2025)" (H3, Roboto Mono, color `#E0E0E0` or accent `#00BFFF`).
*   **Layout:** The section can have a `#141414` background for visual separation.
*   **"About Me" Text Block:**
    *   Text from `resume_content.md` ("About Me (Intro)" section).
    *   Font Inter, 16px, color `#E0E0E0`, line spacing 1.6-1.7.
    *   To highlight key phrases or achievements, Medium weight or the color `#FFFFFF` can be used.
    *   Can be divided into paragraphs for better readability.
*   **"Key Focus Areas" Block:**
    *   Presented as a list or a grid of cards.
    *   **List:**
        *   Each list item starts with a marker (e.g., styled as a "node" of the neural network or a simple geometric shape in an accent color).
        *   Item text: Font Inter, 14-16px, color `#E0E0E0`.
    *   **Grid of cards:**
        *   Each card represents one focus area.
        *   Card background: `#1E1E1E`.
        *   Card title (short name of the area): Font Roboto Mono, 16-18px, color `#FFFFFF` or `#00BFFF`.
        *   Description (if any, brief): Font Inter, 14px, color `#E0E0E0`.
        *   Icons symbolizing each area can be used.
*   **Visual Separation:** A thin divider (`#4A4A4A`) or a graphic element can be used between the "About Me" and "Key Focus Areas" blocks.
*   **Interactivity:**
    *   On hovering over "Key Focus Areas" list items or cards: slight background change, text or icon highlight, shadow appearance.
    *   Possibly, clicking on a focus area (if appropriate) could open a pop-up with more detailed information or links to related projects (if any).

**Animations and Interactivity (About Section):**
*   **Appearance Animation:** Text blocks and lists/cards can appear with a "fade in" or "slide in" effect on scroll.
*   Lines connecting the "Key Focus Areas" items (if a list with visual "nodes" is used) can be animated to "draw" themselves.

**Responsiveness (Mobile):**
*   **Layout:** All blocks are arranged vertically.
*   **"About Me" Text Block:** Font size is adapted (14px).
*   **"Key Focus Areas" Block:**
    *   If a list, it remains vertical.
    *   If a grid of cards, the cards are arranged one below the other (one or two per row, depending on screen size).
*   Margins and font sizes are adjusted for mobile devices.

---
## 4. Tech Stack

**Goal:** To clearly and attractively present the candidate's skills by category, possibly indicating proficiency level or highlighting key technologies.

**Overall Composition (Desktop):**
*   **Section Title:** "Tech Stack" (H2, Roboto Mono, color `#FFFFFF`).
*   **Layout:** The section can have a `#141414` background.
*   **Structure:** Skills are grouped by category (Back-End, Front-End, CMS, Automation & AI, IoT, DevOps, Tools, Other – according to `resume_content.md`).
*   **Presentation of Categories and Skills:**
    1.  **List with subcategories:**
        *   Category name (H3, Roboto Mono, color `#00BFFF` or `#E0E0E0`).
        *   Below it, a list of technologies. Each technology can be represented by:
            *   Text (Font Inter, 14-16px, color `#E0E0E0`).
            *   Text + technology icon (if a quality icon in a consistent style is available). Icons can be monochrome (`#E0E0E0`) or use their original color (if it doesn't disrupt the overall style).
            *   **Proficiency indicators (optional):**
                *   **Graphical:** Simple bars/dots (e.g., 3 out of 5). The active part's color is an accent color `#00BFFF` or `#39FF14`.
                *   **Textual:** Brief descriptions (e.g., "Advanced", "Proficient", "Basic"). Use with caution to avoid clutter.
                *   **Highlighting key technologies:** The most important technologies can be highlighted with a larger font, color, or a special icon.
    2.  **Grid of cards by category:**
        *   Each category is a separate card (background `#1E1E1E`).
        *   Inside the card – category title and a list/cloud of technology tags.
    3.  **Interactive "Tag Cloud":**
        *   All technologies are presented in a cloud. The font size of a tag can depend on proficiency level or importance.
        *   On hovering over a tag – highlight, possibly a brief description or category.
        *   Categories can be filters for the cloud.
*   **Visual Accents:**
    *   Using technology icons (e.g., from Devicon). It's important that they are styled to match the overall concept (e.g., monochrome or with an accent color overlay).
    *   Thin dividers between categories or technologies.
    *   Background graphic elements that echo the "neural network" theme or abstract technological patterns.

**Animations and Interactivity (Tech Stack Section):**
*   **Hover Effects:**
    *   On technology name/icon: highlight, color change, slight enlargement.
    *   If proficiency indicators are used, they can animate to "fill up" on hover.
    *   Hovering over a category can highlight all related technologies.
*   **Appearance Animation:** Stack elements (categories, technologies) can appear sequentially or in groups with fade-in, slide-in effects.
*   **Filtering (if there are many technologies):** Ability to filter technologies by category or proficiency level (if specified).

**Responsiveness (Mobile):**
*   **Layout:** Categories and technologies are displayed vertically.
*   **List with subcategories:** The most suitable option for mobile. Each category expands to show a list of technologies.
*   **Icons:** Can be reduced in size or hidden if they take up too much space.
*   **Proficiency indicators:** If used, they should be compact.
*   **Tag cloud:** Can be simplified to a vertical list or replaced with an accordion by category.
*   Fonts and margins are adapted.

---
## 5. Work History

**Goal:** To clearly and legibly present the chronology of work experience, focusing on key responsibilities and achievements.

**Overall Composition (Desktop):**
*   **Section Title:** "Work History" (H2, Roboto Mono, color `#FFFFFF`).
*   **Layout:** The section can have a `#141414` background.
*   **Experience Presentation:** A chronological list (reverse order, from the latest job to the first). Each list item represents one job.
    *   **Vertical Timeline:**
        *   A vertical line runs down the left or center (color `#4A4A4A` or accent `#00BFFF`).
        *   Each job is marked on this line with a dot/node (can be styled as a neural network element).
        *   A block with job information extends from the dot.
    *   **Experience Cards:**
        *   Each job is a separate card (background `#1E1E1E`). The cards are arranged sequentially.
*   **Content for each job:**
    *   **Position:** (H3, Roboto Mono, 18-20px, color `#FFFFFF` or `#00BFFF`).
    *   **Company Name:** (Font Inter, 16px, color `#E0E0E0`). Can be a link to the company's website if relevant.
    *   **Dates of Employment:** (Font Inter, 14px, color `#A0A0A0` or `#E0E0E0`). E.g., "(2022 – Present)".
    *   **Key Responsibilities and Achievements:**
        *   Presented as a bulleted list.
        *   Markers: styled (as in the "About" section) or standard.
        *   Text: Font Inter, 14-16px, color `#E0E0E0`.
        *   Keywords or technologies within the description can be highlighted with color (`#00BFFF`) or weight.
*   **Visual Accents:**
    *   Icons next to the company name (if a suitable logo is available) or next to the dates (e.g., a calendar icon).
    *   Thin dividers between information blocks within a single job entry (e.g., between the title and the list of responsibilities).

**Animations and Interactivity (Work History Section):**
*   **Appearance Animation:** Timeline elements or experience cards can appear sequentially on scroll. The timeline can "draw" itself.
*   **Hover Effects:**
    *   On hovering over a card/experience block: a slight shadow, border color change, or highlighting of the dot on the timeline.
    *   Links (company name) are highlighted.
*   **Expand/Collapse (optional):** If the list of responsibilities is long, it can be initially shown partially, with a "More" button for full display.

**Responsiveness (Mobile):**
*   **Timeline:** Simplified. The line can run down the left, with information blocks taking up the remaining width.
*   **Experience Cards:** Arranged strictly vertically, one below the other.
*   **Font Sizes and Margins:** Adapted for mobile devices.
*   **Readability:** Special attention is paid to the clear separation of information (position, company, dates, responsibilities).
*   Long lists of responsibilities can be collapsed by default.

---
## 6. Portfolio/Projects

**Goal:** To effectively present completed projects and personal developments, providing links and brief descriptions.

**Overall Composition (Desktop):**
*   **Section Title:** "Portfolio" or "Projects / Portfolio" (H2, Roboto Mono, color `#FFFFFF`).
*   **Layout:** The section can have a `#141414` background.
*   **Project Presentation:**
    1.  **Grid of project cards:**
        *   The most preferred option for visual presentation.
        *   Each card (background `#1E1E1E`) represents one project.
        *   **Card Content:**
            *   **Preview/Image (optional):** If there is a screenshot or project logo. Can be styled (e.g., monochrome with an accent color overlay on hover). If no images, an abstract tech pattern or icon can be used.
            *   **Project Name:** (H3, Roboto Mono, 18-20px, color `#FFFFFF` or `#00BFFF`).
            *   **Brief Project Description:** (Font Inter, 14px, color `#E0E0E0`). 1-2 sentences.
            *   **Technologies (optional):** Small tags or icons of the technologies used.
            *   **Link to Project:** "View" / "Visit Site" button (Primary or Secondary/Outline style) or an external link icon.
        *   The grid can have 2-3 columns.
    2.  **List of projects:**
        *   A more minimalist option. Each project is a row or a block.
        *   **List Item Content:** Project name (clickable), brief description, link.
        *   A small icon or preview can be added on the left.
*   **"Projects & Labs" Section (from `resume_content.md`):**
    *   Can be presented similarly to the main portfolio projects (cards or list) or as a separate subsection with a text description and emphasis on the technologies used (n8n, Gemini, etc.).
    *   For DIY projects, icons symbolizing IoT, AI, automation can be used.
*   **Visual Accents:**
    *   A consistent style for all cards.
    *   Using icons to denote the project type (website, AI system, IoT device).

**Animations and Interactivity (Portfolio/Projects Section):**
*   **Appearance Animation:** Project cards can appear with a scaling, fading, or cascading effect.
*   **Hover Effects on Cards:**
    *   Slight scaling (scale).
    *   Appearance of a shadow or glow along the border (accent color).
    *   If there is a preview, it can zoom in slightly or have a color filter applied.
    *   Appearance of additional buttons/links (e.g., a link to a GitHub repository, if available).
*   **Filtering/Sorting (if there are many projects):** Ability to filter projects by type or technology.

**Responsiveness (Mobile):**
*   **Grid of cards:** Transforms into a single column. Cards are arranged one below the other.
*   **Element Size:** Images, text, buttons are adapted for convenient viewing and interaction.
*   **Description:** Can be shortened or hidden under a spoiler if the card becomes too long.
*   Horizontal scrolling for a gallery of cards (if there are many and vertical compactness is desired) – use with caution to avoid worsening UX.

---

The description of the key sections is complete. These text mockups and concepts can serve as a basis for creating visual mockups in Figma and for further development.