# 🎨 Portfolio Template

> A modern, fully customizable portfolio website built with Angular 22. Perfect for creatives, designers, developers, and anyone who wants to showcase their work professionally.

[![Angular](https://img.shields.io/badge/Angular-22-red?logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- 🎯 **100% Configurable via JSON** - No code changes needed to customize your portfolio
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Customizable Theme** - Define your accent colors in JSON
- 🖼️ **Multiple Media Types** - Images, videos (YouTube, Vimeo, PeerTube), and local files
- 🏷️ **Tag-based Filtering** - Organize your work with custom tags
- 💡 **Lightbox Gallery** - Beautiful full-screen image viewer
- 🚀 **Fast & Optimized** - Built with modern Angular and optimized for performance
- 🐳 **Docker Ready** - Includes Docker setup with Nginx
- 🔒 **Security Headers** - Pre-configured security headers for production
- 🤖 **AI Crawler Protection** - robots.txt configured to protect your work
- ♿ **Accessible** - Built with accessibility in mind

## 🎭 Perfect For

- 🎨 **Illustrators & Artists**
- 🎬 **Animators & Video Creators**
- 📸 **Photographers**
- 🎮 **Game Designers**
- 💻 **Developers**
- 🏗️ **Architects**
- 🎵 **Musicians & Sound Designers**
- ✍️ **Writers & Editors**

## 📸 Demo

| Home | Gallery | Project Detail |
|------|---------|----------------|
| Hero image with featured work | Grid view with category filter | Full project with images & videos |

## 🚀 Quick Start

### Prerequisites

- Node.js 22.22.3+ or 24+
- npm 11.19.0+

### Installation

```bash
# Clone the repository
git clone https://github.com/rudahee/json-portfolio-template.git
cd json-portfolio-template

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:4200` to see your portfolio!

## 📝 Configuration

All content is managed through JSON files in `public/assets/data/`:

### 1. `categories.json` - Define Your Categories

```json
{
  "categories": {
    "photography": {
      "path": "photography",
      "label": "Photography",
      "ratio": "3 / 2"
    },
    "video": {
      "path": "video",
      "label": "Video",
      "ratio": "16 / 9"
    }
  },
  "order": ["photography", "video"]
}
```

**Parameters:**
- `path`: URL segment (e.g., `/photography`)
- `label`: Display name in navigation
- `ratio`: Thumbnail aspect ratio (CSS aspect-ratio)
- `order`: Category order in menus and homepage

### 2. `site.json` - Your Personal Info

```json
{
  "name": "Your Name",
  "role": "Creative Professional",
  "intro": "Brief introduction about your work",
  "email": "hello@example.com",
  "theme": {
    "accent": "#3f63d8",
    "accentDark": "#8ea6ff"
  },
  "about": {
    "bio": ["Paragraph 1", "Paragraph 2"],
    "tools": ["Tool 1", "Tool 2"],
    "experience": [...]
  },
  "socials": [...]
}
```

### 3. `works.json` - Your Projects

```json
{
  "works": [
    {
      "slug": "project-name",
      "category": "photography",
      "title": "Project Title",
      "year": 2026,
      "cover": "path/to/thumbnail.webp",
      "summary": "Brief description",
      "tags": ["personal", "featured"],
      "featured": true,
      "media": [
        {
          "type": "image",
          "src": "path/to/image.webp",
          "alt": "Description",
          "w": 2000,
          "h": 1500
        },
        {
          "type": "video",
          "provider": "youtube",
          "id": "VIDEO_ID"
        }
      ]
    }
  ]
}
```

## 🖼️ Adding Media

### Images

1. Place images in `public/assets/media/`
2. Use WebP or JPG format
3. Recommended sizes:
   - Thumbnails: ~1000px
   - Full images: ~2000-2400px
   - Keep files under 500KB

### Videos

**YouTube:**
```json
{ "type": "video", "provider": "youtube", "id": "VIDEO_ID" }
```

**Vimeo:**
```json
{ "type": "video", "provider": "vimeo", "id": "VIDEO_ID" }
```

**Local Files:**
```json
{
  "type": "video",
  "provider": "file",
  "src": "videos/demo.mp4",
  "poster": "videos/demo-poster.webp"
}
```

## 🎨 Customization

### Colors

Edit `theme` in `site.json`:
```json
{
  "theme": {
    "accent": "#your-color",
    "accentDark": "#your-dark-color"
  }
}
```

### Typography & Design Tokens

Edit `src/styles/_tokens.scss` for advanced customization:
- Font families
- Color palette
- Spacing
- Border radius

### Categories

You can have any number of categories! Just update `categories.json` and `works.json` to match.

**Examples:**

**For Photographers:**
```json
{
  "categories": {
    "portraits": { "path": "portraits", "label": "Portraits", "ratio": "3 / 4" },
    "landscape": { "path": "landscape", "label": "Landscape", "ratio": "3 / 2" },
    "street": { "path": "street", "label": "Street", "ratio": "1 / 1" }
  }
}
```

**For Developers:**
```json
{
  "categories": {
    "web": { "path": "web", "label": "Web Apps", "ratio": "16 / 9" },
    "mobile": { "path": "mobile", "label": "Mobile Apps", "ratio": "9 / 16" },
    "opensource": { "path": "opensource", "label": "Open Source", "ratio": "1 / 1" }
  }
}
```

## 🌐 Remote Content (Optional)

You can serve content from a separate repository (like GitHub) to update your portfolio without redeploying:

1. Create a repository with `data/` and `media/` folders
2. Update `src/app/core/config/api.config.ts`:

```typescript
const REMOTE_BASE = 'https://raw.githubusercontent.com/username/portfolio-content/main';
```

3. Push content updates to that repository - changes appear instantly!

The app will fall back to local content if the remote is unavailable.

## 🐳 Deployment

### Docker with Nginx

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your domain
nano .env

# Build and deploy
docker compose up -d --build
```

### Static Hosting (Netlify, Vercel, etc.)

```bash
# Build for production
npm run build

# Deploy the dist/portfolio-web/browser folder
```

### GitHub Pages

A ready-to-use workflow lives at `.github/workflows/deploy.yml`. It builds the app and
publishes it with GitHub's official Pages actions on every push to `main`.

1. Push this repository to GitHub.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The workflow figures out the right `--base-href` automatically — `/repo-name/` for
project sites, or `/` if the repo is named `username.github.io`. It also generates a
`404.html` fallback so client-side routes keep working on direct links and page
refreshes, since GitHub Pages has no server-side rewrites.

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured work |
| `/:category` | Category gallery with filtering |
| `/:category/:slug` | Individual project page |
| `/sobre-mi` or `/about` | About page |
| `/contacto` or `/contact` | Contact page |

## 🛠️ Development

```bash
# Development server
npm start

# Build for production
npm run build

# Watch mode (auto-rebuild)
npm run watch
```

## 🗂️ Project Structure

```
portfolio-web/
├── public/
│   └── assets/
│       ├── data/           # JSON configuration files
│       │   ├── site.json
│       │   ├── works.json
│       │   └── categories.json
│       └── media/          # Your images and videos
├── src/
│   ├── app/
│   │   ├── core/           # Services, models, config
│   │   ├── pages/          # Page components
│   │   └── shared/         # Reusable components
│   └── styles/             # Global styles
├── deploy/                 # Docker & Nginx config
└── docker-compose.yml
```

## 🎯 SEO & Social Sharing

Update meta tags in `src/index.html`:

```html
<meta name="description" content="Your description">
<meta property="og:title" content="Your Name | Portfolio">
<meta property="og:description" content="Your description">
<meta property="og:image" content="/assets/og-image.jpg">
```

Add a 1200×630px image at `public/assets/og-image.jpg` for social media previews.

## 🤖 AI Crawler Protection

The included `robots.txt` requests AI crawlers not to scrape your images. This is a request, not a technical block.

## 🔒 Security

Production deployment includes:
- Security headers (CSP, X-Frame-Options, etc.)
- HTTPS via Traefik (in Docker setup)
- No sensitive data in JSON files

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

MIT License - feel free to use this for your personal or commercial portfolio!

## 🌟 Acknowledgments

- Built with [Angular](https://angular.dev)
- Font: [Recursive](https://www.recursive.design/)
- Inspired by modern portfolio designs

---

**Made with ❤️ for creatives by creatives**

If you use this template, I'd love to see your portfolio! Feel free to share it or give this repo a ⭐

## 💬 Support

- 🐛 Issues: [GitHub Issues](https://github.com/rudahee/json-portfolio-template/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/rudahee/json-portfolio-template/discussions)
