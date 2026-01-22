# CRT Style Guide

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-33ff33?style=flat-square&labelColor=0a0a0a" alt="Version">
  <img src="https://img.shields.io/badge/lit-3.1.0-33ff33?style=flat-square&labelColor=0a0a0a" alt="Lit">
  <img src="https://img.shields.io/badge/typescript-5.3-33ff33?style=flat-square&labelColor=0a0a0a" alt="TypeScript">
  <img src="https://img.shields.io/badge/license-Apache%202.0-33ff33?style=flat-square&labelColor=0a0a0a" alt="License">
</p>

<p align="center">
  <b>Eine moderne Web Component Library im Retro-CRT-Look</b><br>
  Basierend auf Lit, TypeScript und Vite
</p>

---

## ✨ Features

| Feature | Beschreibung |
|---------|-------------|
| 🖥️ **CRT-Ästhetik** | Retro-Look mit Neon-Glow-Effekten und Monospace-Fonts |
| ⚡ **Lit Web Components** | Moderne, performante und leichtgewichtige Komponenten |
| 🎨 **Design Tokens** | Konsistentes Theming über CSS Custom Properties |
| 📦 **NPM-Ready** | Als wiederverwendbares Paket veröffentlichbar |
| 🔒 **TypeScript** | Vollständige Typisierung für bessere DX |
| 📚 **Living Style Guide** | Interaktive Dokumentation aller Komponenten |
| ⚙️ **Vite** | Blitzschnelle Entwicklung und optimierte Builds |

---

## 📁 Projekt-Struktur

```
crtstyleguide/
├── src/
│   ├── components/
│   │   ├── atoms/           # Grundbausteine (Button, Input, Badge, etc.)
│   │   ├── molecules/       # Zusammengesetzte Komponenten (Card, Modal, Table)
│   │   └── organisms/       # Komplexe UI-Bereiche (MusicStation)
│   ├── styles/
│   │   ├── design-tokens.css  # CSS Custom Properties
│   │   └── index.css          # Globale Styles
│   ├── utils/               # Hilfsfunktionen
│   └── index.ts             # Library Entry Point
├── styleguide/              # Living Style Guide App
│   ├── index.html
│   ├── main.ts
│   ├── template.ts
│   └── style.css
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

Öffnet den Style Guide unter: **http://localhost:5173/styleguide/**

---

## 📜 Verfügbare Scripts

| Script | Beschreibung |
|--------|-------------|
| `npm run dev` | Startet den Entwicklungsserver |
| `npm run build` | Baut Style Guide + Library |
| `npm run build:lib` | Baut nur die Library für npm |
| `npm run preview` | Vorschau des Builds |
| `npm run type-check` | TypeScript-Prüfung ohne Build |
| `npm run lint` | ESLint Codeprüfung |

---

## 🧩 Komponenten-Übersicht

### Atoms (Grundbausteine)

| Komponente | Tag | Beschreibung |
|------------|-----|-------------|
| Button | `<crt-button>` | Interaktiver Button mit Glow-Effekt |
| Badge | `<crt-badge>` | Status-Labels und Tags |
| Input | `<crt-input>` | Textfelder und Textarea |
| Select | `<crt-select>` | Dropdown-Auswahl |
| Checkbox | `<crt-checkbox>` | Checkbox-Eingabe |
| Radio | `<crt-radio>` | Radio-Button |
| Toggle | `<crt-toggle>` | On/Off-Schalter |
| Slider | `<crt-slider>` | Wertebereich-Regler |
| Icon | `<crt-icon>` | Icon-Darstellung |
| Link | `<crt-link>` | Verlinkungen |
| Tabs | `<crt-tabs>` | Tab-Navigation |
| Tooltip | `<crt-tooltip>` | Hover-Hinweise |
| Progress | `<crt-progress>` | Fortschrittsanzeige |
| Spinner | `<crt-spinner>` | Ladeanimation |
| Avatar | `<crt-avatar>` | Benutzerbilder |
| Alert | `<crt-alert>` | Hinweismeldungen |
| Skeleton | `<crt-skeleton>` | Platzhalter beim Laden |
| Pagination | `<crt-pagination>` | Seitennavigation |
| Breadcrumb | `<crt-breadcrumb>` | Brotkrumen-Navigation |
| Calendar | `<crt-calendar>` | Datumsauswahl |
| FileUpload | `<crt-file-upload>` | Datei-Upload |

### Molecules (Zusammengesetzt)

| Komponente | Tag | Beschreibung |
|------------|-----|-------------|
| Card | `<crt-card>` | Inhalts-Container |
| Modal | `<crt-modal>` | Dialog-Fenster |
| Table | `<crt-table>` | Datentabellen |
| Grid | `<crt-grid>` | Layout-Raster |
| Accordion | `<crt-accordion>` | Aufklappbare Bereiche |
| Toast | `<crt-toast>` | Benachrichtigungen |
| CodeExample | `<crt-code-example>` | Code-Darstellung |
| MusicPlayer | `<crt-music-player>` | Audio-Player |
| Playlist | `<crt-playlist>` | Playlist-Ansicht |
| Visualizer | `<crt-visualizer>` | Audio-Visualisierung |

### Organisms (Komplex)

| Komponente | Tag | Beschreibung |
|------------|-----|-------------|
| MusicStation | `<crt-music-station>` | Vollständige Musik-App |

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
import '@patimweb/crtstyleguide/dist/lib/components.css';
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
import '@patimweb/crtstyleguide/dist/lib/components.css';

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
  <sub>Built with 💚 and lots of neon glow</sub>
</p>
