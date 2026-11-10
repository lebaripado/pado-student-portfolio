# Lebari Pado — Student Portfolio & Academic Planner

**COS 106: Introduction to Web Technologies · Practical Term Project · Miva Open University**

A responsive, multi-page portfolio and academic management website built with **plain HTML, CSS and JavaScript** (no frameworks).

- **Live site:** https://lebaripado.github.io/cos106-portfolio/
- **Repository:** https://github.com/lebaripado/cos106-portfolio

---

## The idea: "Blueprint + Marker"

I'm a product designer who has gone back to study engineering, so the site's design tells that story:

- **Blue** is the engineer's blueprint: a grid background, thin lines and monospace "spec" labels (e.g. `FIG. 01 — WELCOME`).
- **Orange** is the designer's marker: handwritten notes, highlights and every main action button.

The site started as a **paper wireframe** (shown on the Home page). It includes the app-style bottom navigation for phones and tablets that I sketched.

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Name, photo collage, welcome message, short bio, quick facts, video section, paper-to-code story |
| About | `about.html` | Education timeline, course table, career aspirations, technical skills, hobbies |
| Projects | `projects.html` | Three projects (GogHR, 10koffers, Christivity Interiors) built from a JavaScript array, with filter buttons |
| Academic Planner | `planner.html` | Add, complete, delete and filter tasks. Progress bar. Saved in the browser |
| Contact | `contact.html` | Form with name, email, phone and message, validated with JavaScript |

## Folder structure

```
cos106-portfolio/
├── index.html, about.html, projects.html, planner.html, contact.html
├── css/styles.css          ← the one external stylesheet
├── js/
│   ├── main.js             ← every page: footer year, active menu link, scroll reveal
│   ├── media.js            ← Home: video clip switcher
│   ├── projects.js         ← Projects: project data + cards + filters
│   ├── planner.js          ← Planner: task manager
│   └── contact.js          ← Contact: form validation
└── assets/
    ├── images/             ← photos (WebP), project covers (SVG), favicon
    ├── media/              ← video clips (MP4)
    └── fonts/              ← self-hosted fonts (WOFF2)
```

## Where each requirement is met

### Functional requirements
| Requirement | Where |
|---|---|
| Homepage: name, photo, welcome, navigation, bio | `index.html` hero section |
| About: education, aspirations, skills, hobbies | `about.html` (Fig. 06–09) |
| Projects: 3 projects, descriptions, images, links | `projects.html` + `js/projects.js` |
| Planner: add, complete, delete tasks with JS | `planner.html` + `js/planner.js` (`addTask`, `toggleTask`, `deleteTask`) |
| Contact form: name, email, phone, message | `contact.html` |
| Validation: no empty fields, valid email, digits-only phone | `js/contact.js` (`checkName`, `checkEmail`, `checkPhone`, `checkMessage`) |

### HTML
| Requirement | Where |
|---|---|
| Semantic elements | `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `footer` on every page |
| Forms | Contact form, Add-task form |
| Tables | Course table on `about.html` (`thead`, `tbody`, `th scope`, `caption`) |
| Images | Photos with descriptive `alt` text, project covers |
| Hyperlinks | Menus, project links, `mailto:`, `tel:`, LinkedIn |
| Lists | Menus (`ul`), education timeline (`ol`), skills, hobbies, project facts, quick facts (`dl`) |
| Multimedia | `<video>` on the Home page: 4 self-recorded clips (intro autoplays muted), switched with JavaScript |

### CSS
| Requirement | Where in `css/styles.css` |
|---|---|
| External stylesheet | One file, linked on all five pages |
| Responsive design | Mobile first, with breakpoints at 768px (tablet) and 1100px (desktop) — section 13 |
| Flexbox and Grid | Flexbox: header, buttons, tags. Grid: hero, tab bar, projects, planner, skills, hobbies |
| Navigation styling | Active-page pill, orange hover underline, app-style bottom tab bar on mobile |
| Animations and transitions | Scroll reveal, drawn underline, tick "pop", task slide-in, hover effects. Turned off for users who choose reduced motion |
| Consistent colour scheme | Colour tokens in `:root` (blue + orange) |
| Mobile-friendly | 48px touch targets, bottom navigation, no horizontal scrolling |

### JavaScript
| Requirement | Where |
|---|---|
| Event handling | `click`, `submit`, `change` and `blur` listeners in every JS file |
| DOM manipulation | `createElement`, `appendChild`, `classList`, `textContent` (planner, projects, media) |
| Form validation | `js/contact.js` with regular expressions |
| Dynamic content updates | Progress bar, task counter, project filter, clip switcher, success message |
| Arrays and functions | `tasks`, `projects` and `clips` arrays; small named functions throughout |
| Interactive task manager | `js/planner.js` (saves to `localStorage`) |

## Accessibility and quality
- Skip-to-content link, visible focus outlines, `aria-current` on the active page, `aria-live` error messages
- Colour contrast checked: small orange text uses a darker shade (`--orange-text`)
- Images compressed to WebP, lazy loading below the fold, fonts self-hosted

## Run it locally
Open the folder in VS Code and use the **Live Server** extension (right-click `index.html` → *Open with Live Server*). You can also double-click `index.html`, but a local server is closer to how GitHub Pages serves the site.

## Credits
Design, content and photos: Lebari Pado. Fonts: Bricolage Grotesque, Instrument Sans, JetBrains Mono and Caveat (SIL Open Font License, via Fontsource).
