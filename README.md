# Casona Texao — Centro Cultural

SvelteKit frontend + Strapi CMS for the Casona Texao cultural center website.

## Quick Start

```bash
# Backend (Strapi) — from project root
npm run develop

# Frontend (SvelteKit) — from /frontend
cd frontend
npm run dev
```

## Strapi Dashboard — Content Guide

### Global Settings (Single Type)

Found at: **Content Manager → Global**

| Field | Where it appears | Recommended size |
|-------|-----------------|-----------------|
| `heroImage` | Landing page hero (fallback if no featured articles) | **1920×800 px** (21:9) |
| `nosotrosHeroImage` | Nosotros page hero | **1920×800 px** (21:9) |
| `contactoHeroImage` | Contacto page hero | **1920×800 px** (21:9) |
| `certificateImage` | RENTOCA certificate on landing page | **800×1100 px** (A4 portrait) |
| `puntoDeCulturaLink` | "Ver resolución oficial" link on landing | URL string |

### Article Fields (Collection Type)

Found at: **Content Manager → Article**

| Field | Where it appears | Recommended size |
|-------|-----------------|-----------------|
| `cover` | Blog listing cards, blog post hero, event cards | **1200×750 px** (16:10) |
| `featuredImage` | Featured carousel on landing (falls back to `cover` if empty) | **1920×820 px** (21:9) |
| `featured` | Toggle ON to show the article in the landing page carousel | Boolean (checkbox) |

> **Featured carousel cap**: Only **5 featured articles** are allowed at a time. If you mark a 6th article as featured, the oldest one is **automatically unfeatured** in Strapi — its `featured` checkbox will turn off.
| `gallery` | Photo gallery on the blog post detail page | **1200×1200 px** (1:1) or any |
| `eventDate` / `eventTime` | "Eventos del Mes" section, event badge on cards | Date / Time |

### Image Size Guidelines

| Context | Aspect Ratio | Minimum Size | Max File Size |
|---------|-------------|-------------|---------------|
| Hero images (all pages) | 21:9 | 1920 × 800 px | ~500 KB (JPG/WebP) |
| Featured carousel slides | 21:9 | 1920 × 820 px | ~500 KB |
| Blog cover / event cards | 16:10 | 1200 × 750 px | ~300 KB |
| Gallery photos | Any | 1200 × 1200 px | ~400 KB |
| RENTOCA certificate | A4 portrait | 800 × 1100 px | ~200 KB |

> **Tip**: Use WebP format for best quality/size ratio. JPG is also fine.

### Toggling Hidden Sections

The following sections are hidden by default. To show them, change `showTeam = false` to `true` in:
- `frontend/src/routes/+page.svelte` (landing page staff section)
- `frontend/src/routes/nosotros/+page.svelte` (nosotros staff section)

Aliados (partners) section is controlled by the `visible` prop on `<Aliados />` — pass `visible={true}` to show it.

## Deployment

```bash
# Build Strapi admin
npm run build

# Build SvelteKit frontend
cd frontend
npm run build
```

## ⚙️ Stack

- **Backend**: Strapi v5 (SQLite dev / PostgreSQL prod)
- **Frontend**: SvelteKit + TailwindCSS
- **Hosting**: Docker-ready (see `Dockerfile` and `docker-compose.yml`)
