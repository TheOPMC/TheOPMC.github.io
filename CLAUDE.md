# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official website for the Open Protein Modeling Consortium (OPMC), a collaborative initiative for protein research community. The site is a static GitHub Pages website showcasing OPMC's mission, featured protein language models, consortium members, and community information.

**Repository**: TheOPMC.github.io (GitHub Pages site)
**Tech Stack**: Static HTML/CSS website with no build process
**Primary File**: index.html (single-page application with anchor navigation)

## Architecture

### Single-Page Structure
The entire website is contained in `index.html` with section-based navigation using anchor links (#home, #about, #features, #members, #joinus, #contact, #faqs). Each section is a `<div>` with class "section" and corresponding ID.

### Key Sections
- **Home**: Hero section with background image
- **About**: OPMC mission and goals
- **Features**: Links to SaprotHub and model cards (SaProt, ProTrek, ProtT5, METL, SeProt, ESM3, ESMC)
- **Members**: Two-tier membership (Senior Authors and Regular Authors) displayed in grid layout
- **Join Us**: Membership requirements and contribution guidelines
- **Contact**: Contact information for consortium leadership
- **FAQs**: Detailed Q&A about OPMC, SaprotHub, and collaboration

### Static Assets
- `templates/css/index.css`: All styling using CSS variables (design tokens), responsive grid layouts, navbar, sections
- `templates/figures/`: Images including protein_universe.jpg (hero background), colab-badge.svg, and portraits/
- `js/scripts.js`: Interactive features including smooth scrolling, navbar scroll behavior, FAQ accordion, member search/pagination, and mobile menu toggle
- Inline scripts: Google Analytics (G-HQCSQ1GWFE) and busuanzi visitor counter

## Development Workflow

### Making Content Changes
1. Edit `index.html` directly for content updates
2. Edit `templates/css/index.css` for styling changes
3. Edit `js/scripts.js` for interactive behavior changes
4. Test locally by opening index.html in a browser
5. Commit and push to main branch (auto-deploys via GitHub Pages)

### Common Tasks

**Adding a new model to Features section**:
Add a new `<div class="model">` block within the `<div id="models" class="container">` section. Include model name (h2), description (p), and links to Colab/Hub. Search for existing model blocks to match the structure.

**Adding consortium members**:
Add new `<div class="member">` blocks to either Senior Authors or Regular Authors sections. Include `<span class="name">` and `<span class="school">` elements. The JavaScript will automatically handle pagination and search functionality.

**Updating contact information**:
Modify the #contact section.

**Adding FAQ entries**:
Add new `<div class="faq-item">` blocks within the #faqs section. Include `<div class="faq-question">` (h3) and `<div class="faq-answer">` (p) elements. The JavaScript accordion will automatically handle the new entries.

**Modifying interactive features**:
Edit `js/scripts.js` to change behavior for smooth scrolling, navbar highlighting, FAQ accordion, member search/pagination, or mobile menu.

### Testing
Open `index.html` in a web browser to preview changes. No build step required. Verify:
- All anchor links navigate correctly with smooth scrolling
- Navbar highlights the active section on scroll
- FAQ accordion expands/collapses properly
- Member search and pagination work correctly
- Mobile menu toggle functions on small screens
- Responsive layout works on different screen sizes
- External links (Colab notebooks, HuggingFace hubs) are valid

### Deployment
Changes pushed to the main branch automatically deploy via GitHub Pages. The site is served from the repository root.

## Important Notes

- This is a static site with no backend, build process, or dependencies
- All external resources (badges, analytics) are loaded via CDN
- The site uses Google Analytics (tracking ID: G-HQCSQ1GWFE)
- Background image path in CSS uses absolute path: `/templates/figures/protein_universe.jpg`
- Member portraits are commented out in HTML but structure remains for future use
- Interactive features (FAQ accordion, member pagination, search) are handled by `js/scripts.js`
- Member pagination displays 8 members per page (2 rows × 4 columns)
- CSS uses design tokens (CSS variables) defined in `:root` for consistent theming
