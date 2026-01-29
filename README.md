# CRT Style Guide

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.25-33ff33?style=flat-square&labelColor=0a0a0a" alt="Version">
  <img src="https://img.shields.io/badge/lit-3.1.0-33ff33?style=flat-square&labelColor=0a0a0a" alt="Lit">
  <img src="https://img.shields.io/badge/typescript-5.3-33ff33?style=flat-square&labelColor=0a0a0a" alt="TypeScript">
  <img src="https://img.shields.io/badge/license-Apache%202.0-33ff33?style=flat-square&labelColor=0a0a0a" alt="License">
  <a href="https://smotherer007.github.io/crtstyleguide/"><img src="https://img.shields.io/badge/demo-live-33ff33?style=flat-square&labelColor=0a0a0a" alt="Live Demo"></a>
</p>

<p align="center">
  <b>A modern Web Component Library with retro CRT aesthetic</b><br>
  Built with Lit, TypeScript and Vite<br><br>
  <a href="https://smotherer007.github.io/crtstyleguide/">🖥️ View Live Demo</a>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖥️ **CRT Aesthetic** | Retro look with neon glow effects and monospace fonts |
| ⚡ **Lit Web Components** | Modern, performant and lightweight components |
| 🎨 **Design Tokens** | Consistent theming via CSS Custom Properties |
| 📦 **NPM-Ready** | Publishable as reusable package |
| 🔒 **TypeScript** | Full typing for better DX |
| 📚 **Living Style Guide** | Interactive documentation of all components |
| ⚙️ **Vite** | Lightning-fast development and optimized builds |
| 🎨 **Multiple CRT Colors** | Green, Amber, and Blue phosphor variants |
| ✨ **Authentic Effects** | Scanlines, flicker, chromatic aberration |

---

## 📁 Project Structure

```
crtstyleguide/
├── src/
│   ├── components/
│   │   ├── atoms/           # Basic building blocks (Button, Input, Badge, etc.)
│   │   ├── molecules/       # Composite components (Card, Modal, Table)
│   │   └── organisms/       # Complex UI areas (MusicStation)
│   ├── styles/
│   │   ├── design-tokens.css  # CSS Custom Properties
│   │   └── index.css          # Global Styles
│   ├── utils/               # Helper functions
│   └── index.ts             # Library Entry Point
├── styleguide/              # Living Style Guide App
│   ├── index.html
│   ├── main.ts
│   ├── template.ts
│   └── style.css
├── public/
│   └── fonts/               # IBM Plex Mono font files
├── vite.config.ts           # Dev & Style Guide Build
├── vite.lib.config.ts       # Library Build
└── tsconfig.json
```

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens the Style Guide at: **http://localhost:5175/styleguide/**

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build Style Guide + Library |
| `npm run build:lib` | Build only library for npm |
| `npm run preview` | Preview production build |
| `npm run type-check` | TypeScript check without build |
| `npm run lint` | ESLint code check |

---

## 🧩 Component Overview

### Atoms (Basic Building Blocks)

| Component | Tag | Description |
|------------|-----|-------------|
| Button | `<crt-button>` | Interactive button |
| Badge | `<crt-badge>` | Status labels and tags |
| Heading | `<crt-heading>` | Typography headings |
| Text | `<crt-text>` | Body text |
| Tabs | `<crt-tabs>` | Tab navigation |
| Input | `<crt-input>` | Text fields |
| Textarea | `<crt-textarea>` | Multiline input |
| Icon | `<crt-icon>` | Icon rendering |
| Link | `<crt-link>` | Links |
| FileUpload | `<crt-file-upload>` | File upload |
| Calendar | `<crt-calendar>` | Date picker |
| Select | `<crt-select>` | Dropdown selection |
| Search | `<crt-search>` | Search input |
| Checkbox | `<crt-checkbox>` | Checkbox input |
| Radio | `<crt-radio>` | Radio button |
| RadioGroup | `<crt-radio-group>` | Radio group |
| Progress | `<crt-progress>` | Progress bar |
| Tooltip | `<crt-tooltip>` | Hover hints |
| Breadcrumb | `<crt-breadcrumb>` | Breadcrumb navigation |
| Pagination | `<crt-pagination>` | Pagination |
| Slider | `<crt-slider>` | Range slider |
| Toggle | `<crt-toggle>` | On/Off switch |
| Avatar | `<crt-avatar>` | User avatar |
| AvatarGroup | `<crt-avatar-group>` | Grouped avatars |
| Skeleton | `<crt-skeleton>` | Loading placeholder |
| SkeletonText | `<crt-skeleton-text>` | Text placeholder |
| SkeletonCard | `<crt-skeleton-card>` | Card placeholder |
| Alert | `<crt-alert>` | Alert banners |
| Spinner | `<crt-spinner>` | Loading spinner |

### Molecules (Zusammengesetzt)

| Komponente | Tag | Beschreibung |
|------------|-----|-------------|
| Card | `<crt-card>` | Content container |
| Modal | `<crt-modal>` | Dialog modal |
| Table | `<crt-table>` | Data tables |
| Grid | `<crt-grid>` | Layout grid |
| Accordion | `<crt-accordion>` | Collapsible sections |
| AccordionItem | `<crt-accordion-item>` | Accordion item |
| Toast | `<crt-toast>` | Notifications |
| CodeExample | `<crt-code-example>` | Code preview |
| MusicPlayer | `<crt-music-player>` | Audio player |
| Playlist | `<crt-playlist>` | Playlist view |
| Visualizer | `<crt-visualizer>` | Audio visualization |
| Terminal | `<crt-terminal>` | Terminal simulator |
| Navbar | `<crt-navbar>` | Navigation bar |
| Header | `<crt-header>` | Header |
| Footer | `<crt-footer>` | Footer |
| Menu | `<crt-menu>` | Context menu |
| CRTScreen | `<crt-screen>` | CRT screen container (wraps content) |
| CRTOverlay | `<crt-overlay>` | CRT visual overlay (non-blocking) |

### Organisms (Komplex)

| Komponente | Tag | Beschreibung |
|------------|-----|-------------|
| MusicStation | `<crt-music-station>` | Full music station |

---

## 🎵 Music Player Tracks (Lyrics)

Lyrics werden direkt im Track-Objekt übergeben:

```html
<crt-music-player
  .tracks=${[
    {
      title: 'VERROSTETE TERMINALS',
      artist: 'PATIMWEP',
      url: 'patimwep - Verrostete Terminals.mp3',
      lyrics: '[INTRO]\nSTATIC IN THE WIRES\nNEON HISS AND SOFT DESIRES\n\n[HOOK]\nVERROSTETE TERMINALS\nSIGNAL LOST, RETURNING CALLS',
    },
  ]}
></crt-music-player>
```

---

## 🎨 Design Tokens

Die Library verwendet CSS Custom Properties für konsistentes Theming:

```css
:root {
  /* Primärfarben */
  --crt-primary: #33ff33;
  --crt-primary-light: #44ff44;
  --crt-primary-dark: #22cc22;
  
  /* Hintergründe */
  --crt-bg-dark: #0a0a0a;
  --crt-bg-darker: #000000;
  --crt-bg-light: #1a1a1a;
  
  /* Status-Farben */
  --crt-success: #00ff00;
  --crt-warning: #ffff00;
  --crt-error: #ff0000;
  --crt-info: #00ffff;
  
  /* Glow-Effekte */
  --crt-glow-sm: 0 0 5px rgba(51, 255, 51, 0.3);
  --crt-glow: 0 0 10px rgba(51, 255, 51, 0.5);
  --crt-glow-lg: 0 0 20px rgba(51, 255, 51, 0.7);
  
  /* Typografie */
  --crt-font-family: 'VT323', 'Courier New', monospace;
}
```

---

## 🔧 Eigene Komponenten erstellen

### 1. Komponente anlegen

```typescript
// src/components/atoms/my-component.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-my-component')
export class MyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--crt-text-primary);
      font-family: var(--crt-font-family);
    }
    
    .container {
      padding: var(--crt-spacing-md);
      border: var(--crt-border);
      box-shadow: var(--crt-glow);
    }
  `;

  @property({ type: String }) label = 'Hello CRT';

  render() {
    return html`
      <div class="container">
        ${this.label}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-my-component': MyComponent;
  }
}
```

### 2. Exportieren

```typescript
// src/components/atoms/index.ts
export { MyComponent } from './my-component';
```

### 3. Im Style Guide dokumentieren

Füge die Komponente in `styleguide/components-register.ts` hinzu.

---

## 📦 Als NPM-Paket veröffentlichen

### Build erstellen

```bash
npm run build:lib
```

### Paket veröffentlichen

```bash
npm publish
```

### In anderen Projekten nutzen

**Installation:**

```bash
npm install @patimweb/crtstyleguide
```

**JavaScript/TypeScript einbinden:**

```typescript
// Alle Komponenten importieren (registriert automatisch die Custom Elements)
import '@patimweb/crtstyleguide';

// Oder einzelne Komponenten
import { Button, Card, Modal } from '@patimweb/crtstyleguide';
```

**CSS einbinden:**

```typescript
// In deiner Haupt-JS/TS-Datei
import '@patimweb/crtstyleguide/styles';
// oder
import '@patimweb/crtstyleguide/styles.css';
```

Oder direkt im HTML:

```html
<link rel="stylesheet" href="node_modules/@patimweb/crtstyleguide/dist/lib/components.css">
```

**Komponenten verwenden:**

```html
<crt-button variant="primary">Click me</crt-button>
<crt-button variant="secondary" size="small">Small Button</crt-button>

<crt-card>
  <h2 slot="header">Titel</h2>
  <p>Inhalt der Karte</p>
</crt-card>

<crt-input label="Username" placeholder="Enter username"></crt-input>

<crt-alert variant="success">Erfolgreich gespeichert!</crt-alert>
```

**Mit Framework (z.B. React):**

```tsx
import '@patimweb/crtstyleguide';
import '@patimweb/crtstyleguide/styles';

function App() {
  return (
    <div>
      <crt-button onClick={() => alert('Clicked!')}>
        CRT Button
      </crt-button>
    </div>
  );
}
```

---

## 🛠️ Technologie-Stack

- **[Lit](https://lit.dev/)** - Web Components Library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Build Tool & Dev Server
- **[ESLint](https://eslint.org/)** - Code Linting

---

## 📄 Lizenz

Apache License 2.0 - siehe [LICENSE](LICENSE) für Details.

---

<p align="center">
  <sub>Built with 💚 and lots of neon glow</sub><br>
  <sub>© 2026 Patrick Weppelmann</sub>
</p>
