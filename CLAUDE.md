# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site blog called "L'atelier Boulet" - a French-Canadian blog about recipes, technology, BBQ, and creative projects. The site uses the PaperMod theme and is deployed to GitHub Pages.

## Key Architecture

- **Static Site Generator**: Hugo v0.125.7+ (extended version required)
- **Theme**: PaperMod (as git submodule in `themes/PaperMod/`)
- **Content Language**: French Canadian (`fr-ca`)
- **Deployment**: GitHub Pages via GitHub Actions
- **Domain**: https://atelier.cboulet.info/
- **Development**: Docker-based local development

## Common Commands

### Local Development
```bash
# Run development server locally
hugo server -D --bind 0.0.0.0

# Using Docker
docker-compose up

# Build for production
hugo --minify
```

### Content Management
- Blog posts go in `content/posts/` as Markdown files
- Use frontmatter with `title`, `date`, and `tags`
- Main page content in `content/_index.md`

## Site Configuration

- Main config: `config.toml`
- Uses Home-Info mode with custom welcome message
- Menu structure defined in config with "Accueil" and "Recettes" sections
- Features enabled: reading time, post navigation, code copy buttons

## Deployment

- Automatic deployment via GitHub Actions on push to `main` branch
- Workflow uses Hugo v0.128.0 in GitHub Actions
- Builds with `--minify` flag for production
- Uses git submodules for theme (checkout with `submodules: recursive`)

## Content Structure

Posts should include:
- French titles and content
- Date in YYYY-MM-DD format
- Relevant tags (e.g., "veau", "crème", "champignons" for recipes)
- Simple ingredient lists and numbered preparation steps for recipes