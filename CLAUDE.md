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
- `templates/css/index.css`: All styling (responsive grid layouts, navbar, sections)
- `templates/figures/`: Images including protein_universe.jpg (hero background), colab-badge.svg, and portraits/
- No JavaScript files (only inline Google Analytics and busuanzi visitor counter)

## Development Workflow

### Making Content Changes
1. Edit `index.html` directly for content updates
2. Edit `templates/css/index.css` for styling changes
3. Test locally by opening index.html in a browser
4. Commit and push to main branch (auto-deploys via GitHub Pages)

### Common Tasks

**Adding a new model to Features section**:
Add a new `<div class="model">` block within the `<div id="models" class="container">` section around line 58-105. Include model name (h2), description (p), and links to Colab/Hub.

**Adding consortium members**:
Add new `<div class="member">` blocks to either Senior Authors (line 111-252) or Regular Authors (line 254-355) sections. Include name and institution.

**Updating contact information**:
Modify the #contact section (line 382-390).

**Adding FAQ entries**:
Add new h3 (question) and p (answer) elements within the #faqs section (line 392-484).

### Testing
Open `index.html` in a web browser to preview changes. No build step required. Verify:
- All anchor links navigate correctly
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
