# Farabi Academy LMS - First Theme

> **This project is the foundational building block and the starting point for any theme on the Farabi Academy LMS platform.**
> You have the full power to get creative and design any shape, layout, or experience you can imagine. Show us your creativity, champion!

A modern, responsive, and fully bilingual (English/Arabic) theme built with **Twig templates**, **Tailwind CSS**, and **vanilla JavaScript**. It features RTL support out of the box, smooth animations, and a clean component-based architecture that makes customization a breeze.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [File Breakdown](#file-breakdown)
  - [Root Files](#root-files)
  - [Layouts](#layouts)
  - [Pages](#pages)
  - [Partials](#partials)
  - [Assets - CSS](#assets---css)
  - [Assets - JavaScript](#assets---javascript)
  - [Language Files](#language-files)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [License](#license)

---

## Features

- **Twig Templating** - Clean separation of layouts, pages, and reusable partials
- **Tailwind CSS** - Utility-first styling with custom color tokens (Pistachio & Navy)
- **Bilingual Support** - Full English and Arabic translations with automatic RTL/LTR switching
- **Responsive Design** - Mobile-first approach that looks great on all screen sizes
- **Dark Mode Ready** - CSS variables and theme structure prepared for dark mode
- **Component-Based JS** - Modular vanilla JavaScript (Slider, Counter, Accordion, Forms)
- **Smooth Animations** - Fade-in, scroll-triggered counters, and interactive UI elements
- **SEO Friendly** - Proper meta tags, semantic HTML, and accessible markup

---

## Project Structure

```
farabi-first-theam/
├── config.json              # Theme configuration (colors, fonts, site info, social links)
├── layouts/
│   └── base.html.twig       # Master layout - all pages extend this
├── pages/
│   ├── index.html.twig      # Homepage (Hero, Courses, Stats, Reviews, FAQ, Contact)
│   ├── courses.html.twig    # All courses listing page
│   ├── course-details.html.twig  # Single course detail page
│   └── cart.html.twig       # Shopping cart & checkout page
├── partials/
│   ├── header.html.twig     # Navigation bar (desktop + mobile)
│   ├── footer.html.twig     # Footer with links, social media & contact info
│   └── floating-buttons.html.twig  # Floating CTA & scroll-to-top buttons
├── assets/
│   ├── css/
│   │   ├── fonts.css         # Google Fonts (Quicksand + Nunito)
│   │   ├── theme.css         # CSS variables, color tokens & base styles
│   │   └── main.css          # Animations, slider, accordion, toast & RTL styles
│   └── js/
│       ├── utils.js          # Utility functions (scroll, toast, debounce, viewport)
│       ├── app.js            # Main app controller (i18n, theme, navigation, preferences)
│       ├── slider.js         # Reusable slider/carousel component
│       ├── counter.js        # Animated number counter for statistics
│       ├── accordion.js      # Expandable FAQ accordion component
│       └── form.js           # Contact form handling & validation
├── lang/
│   ├── en.json               # English translations
│   └── ar.json               # Arabic translations
└── .gitignore
```

---

## File Breakdown

### Root Files

| File | Description |
|------|-------------|
| `config.json` | Central configuration file for the entire theme. Defines theme metadata (name, version), color palette (Pistachio `#93c572`, Navy `#1e3a5f`), font families (Quicksand for headings, Nunito for body), site information (name, email, phone, address), social media links, supported languages, and page routing. |
| `.gitignore` | Excludes the `docs/` folder from version control. |

### Layouts

| File | Description |
|------|-------------|
| `layouts/base.html.twig` | The master layout that every page extends. Sets up the HTML document structure with dynamic locale/direction (`ltr`/`rtl`), loads Tailwind CSS via CDN, injects custom Tailwind color config from `config.json`, includes the header, main content area, footer, floating buttons, and core JS files. Provides Twig blocks (`title`, `meta_description`, `head_extra`, `content`, `scripts`, etc.) for child pages to override. |

### Pages

| File | Description |
|------|-------------|
| `pages/index.html.twig` | **Homepage** - The main landing page containing multiple sections: **Hero** (headline, subtitle, CTA buttons, quick stats, image slider), **Courses** (card slider with 6 courses using a Twig macro), **Statistics** (animated counters - students, views, courses, instructors, satisfaction), **Reviews** (student testimonials slider), **Why Choose Us** (6 feature cards in a grid), **Contact** (form with name, email, message), and **FAQ** (accordion with 6 Q&A items). |
| `pages/courses.html.twig` | **Courses Listing** - Displays all available courses in a grid/list format with filtering and sorting capabilities. |
| `pages/course-details.html.twig` | **Course Detail** - Shows a single course with full description, curriculum, instructor info, pricing, and enrollment options. |
| `pages/cart.html.twig` | **Shopping Cart** - Cart management with item listing, quantity controls, pricing summary, and checkout flow. |

### Partials

| File | Description |
|------|-------------|
| `partials/header.html.twig` | Fixed top navigation bar with: logo (gradient circle + brand name from config), desktop menu links (About, Courses, Stories, Contact), action buttons (Register, Login), language toggle (EN/AR), and a collapsible mobile menu. Supports active page highlighting and full RTL layout. |
| `partials/footer.html.twig` | Site footer with: logo + description, contact information (email, phone, address from config), quick navigation links, social media icons (Facebook, Instagram, Twitter, TikTok from config), and copyright bar. All text is translatable via `data-i18n` attributes. |
| `partials/floating-buttons.html.twig` | Two floating action buttons: a **"Enroll Now" CTA** that appears after scrolling 300px, and a **"Scroll to Top"** button that appears after 500px. Both use smooth show/hide animations. |

### Assets - CSS

| File | Description |
|------|-------------|
| `assets/css/fonts.css` | Imports Google Fonts - **Quicksand** (headings) and **Nunito** (body text) with multiple weights (300-800). Sets the default body and heading font families. |
| `assets/css/theme.css` | Defines CSS custom properties (`:root` and `.dark` variants) for the design system: colors (Pistachio, Navy), backgrounds, foregrounds, borders, and muted tones. Includes base reset styles (`box-sizing`, `margin`, `padding`) and utility classes for custom colors (`.bg-pistachio`, `.text-navy`, `.border-pistachio`, etc.). |
| `assets/css/main.css` | The primary stylesheet that imports `fonts.css` and `theme.css`. Contains: custom animations (`fade-in`, `fade-in-up`, `fade-in-down`), line-clamp utilities, slider styles (wrapper, slides, dots, responsive padding), accordion styles (trigger, content, icon rotation), toast notifications, full RTL/LTR directional utilities, mobile menu transitions, navigation scroll state, loading spinner, floating button visibility, and payment method styles. |

### Assets - JavaScript

| File | Description |
|------|-------------|
| `assets/js/utils.js` | Shared utility functions: `scrollToSection()` for smooth anchor scrolling with offset, `showToast()` for notification popups, `formatNumber()` for locale-aware number formatting, `debounce()` for performance optimization, and `isInViewport()` for scroll-triggered animations. |
| `assets/js/app.js` | The main application controller (`App` object). Handles: loading user preferences from `localStorage` (theme, language), fetching translation JSON files with a fallback system, applying theme (light/dark), applying language direction (LTR/RTL), updating all `data-i18n` text content and placeholders, initializing navigation scroll effects, theme toggle, language toggle (EN/AR), and floating CTA button visibility. |
| `assets/js/slider.js` | A reusable `Slider` class for carousel/slider functionality. Supports: configurable slides-per-view (responsive breakpoints), auto-play with pause on hover, navigation arrows, dot indicators, touch/swipe gestures, RTL direction awareness, and infinite loop mode. Used for the hero images, courses, and reviews sections. |
| `assets/js/counter.js` | A `Counter` class for animated number counting. Triggers when the element enters the viewport and smoothly counts from 0 to the target value over 2 seconds. Used in the statistics section to animate numbers like "50,000+", "2,500,000+", etc. |
| `assets/js/accordion.js` | An `Accordion` class for expandable/collapsible content sections. Manages open/close state, smooth height transitions, icon rotation, and ensures only one item is open at a time. Used in the FAQ section. |
| `assets/js/form.js` | Handles contact form submission with: submit event interception, loading state on the button (spinner animation), simulated async submission, success toast notification, and form reset. |

### Language Files

| File | Description |
|------|-------------|
| `lang/en.json` | Complete English translations for every text element on the site: navigation labels, hero section, course titles and descriptions, statistics labels, review section headers, "Why Choose Us" features, contact form labels, FAQ questions and answers, footer text, and floating CTA. |
| `lang/ar.json` | Complete Arabic translations mirroring `en.json`. All content is professionally translated to Arabic, enabling full RTL bilingual support with a single toggle. |

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd farabi-first-theam
   ```

2. **Understand the architecture:**
   - All pages extend `layouts/base.html.twig`
   - Shared components live in `partials/`
   - Styling uses Tailwind CSS (via CDN) + custom CSS in `assets/css/`
   - Interactivity is handled by modular JS files in `assets/js/`
   - All text is translatable via JSON files in `lang/`

3. **Customize the theme:**
   - Edit `config.json` to change colors, fonts, site info, and social links
   - Modify page templates in `pages/` to adjust content and sections
   - Update `lang/en.json` and `lang/ar.json` for text changes

---

## Customization Guide

### Changing Colors
Edit `config.json` to update the primary color palette:
```json
{
  "colors": {
    "pistachio": "#93c572",
    "pistachio_dark": "#7db157",
    "navy": "#1e3a5f",
    "navy_dark": "#152a45"
  }
}
```
Also update `assets/css/theme.css` CSS variables to match.

### Adding a New Page
1. Create a new file in `pages/`, e.g. `pages/about.html.twig`
2. Extend the base layout: `{% extends '../layouts/base.html.twig' %}`
3. Override the `content` block with your page sections
4. Add the page route to `config.json` under `pages`

### Adding a New Language
1. Create a new JSON file in `lang/`, e.g. `lang/fr.json`
2. Follow the same key structure as `en.json`
3. Update `config.json` to add the new language to `languages.supported`
4. Update the language toggle logic in `assets/js/app.js`

---

## License

This theme is part of the **Farabi Academy LMS** platform.
