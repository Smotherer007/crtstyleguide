import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Use existing atoms for consistent look & registration
import '../atoms/typography';
import '../atoms/search';
import '../atoms/button';
import '../atoms/tooltip';

@customElement('crt-header')
export class Header extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: Boolean }) screenActive = false;
  @property({ type: String }) currentColor: 'green' | 'amber' | 'blue' = 'green';

  private toggleScreenWithColor(color: 'green' | 'amber' | 'blue') {
    this.currentColor = color;
    this.screenActive = true;
    this.changeColor(color);
    this.dispatchEvent(new CustomEvent('screen-toggle', { 
      detail: { active: true, color },
      bubbles: true,
      composed: true
    }));
  }

  private disableScreen() {
    this.screenActive = false;
    this.dispatchEvent(new CustomEvent('screen-toggle', { 
      detail: { active: false },
      bubbles: true,
      composed: true
    }));
  }

  private changeColor(color: 'green' | 'amber' | 'blue') {
    const colors = {
      green: { primary: '#8aff8a', light: '#b4ffb4', dark: '#33ff33', textPrimary: '#8aff8a', textSecondary: 'rgba(138, 255, 138, 0.7)', textMuted: 'rgba(138, 255, 138, 0.5)' },
      amber: { primary: '#ffd700', light: '#ffe680', dark: '#ffb000', textPrimary: '#ffd700', textSecondary: 'rgba(255, 215, 0, 0.7)', textMuted: 'rgba(255, 215, 0, 0.5)' },
      blue: { primary: '#66ffff', light: '#99ffff', dark: '#00cccc', textPrimary: '#66ffff', textSecondary: 'rgba(102, 255, 255, 0.7)', textMuted: 'rgba(102, 255, 255, 0.5)' }
    };

    const c = colors[color];
    document.documentElement.style.setProperty('--crt-primary', c.primary);
    document.documentElement.style.setProperty('--crt-primary-light', c.light);
    document.documentElement.style.setProperty('--crt-primary-dark', c.dark);
    document.documentElement.style.setProperty('--crt-text-primary', c.textPrimary);
    document.documentElement.style.setProperty('--crt-text-secondary', c.textSecondary);
    document.documentElement.style.setProperty('--crt-text-muted', c.textMuted);
    document.documentElement.style.setProperty('--crt-border-color', c.primary);
    
    // Update glow effects
    const glowSm = `0 0 5px ${c.textSecondary}`;
    const glow = `0 0 10px ${c.textSecondary}`;
    const glowLg = `0 0 20px ${c.textSecondary}`;
    const glowInset = `inset 0 0 10px ${c.textMuted}`;
    document.documentElement.style.setProperty('--crt-glow-sm', glowSm);
    document.documentElement.style.setProperty('--crt-glow', glow);
    document.documentElement.style.setProperty('--crt-glow-lg', glowLg);
    document.documentElement.style.setProperty('--crt-glow-inset', glowInset);

    // Update cursor colors
    const cursorColor = c.primary.replace('#', '%23');
    const cursorDefault = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="8" height="16" fill="${cursorColor}"/></svg>'), auto`;
    const cursorPointer = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><rect width="12" height="12" fill="${cursorColor}"/></svg>') 6 6, pointer`;
    const cursorText = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 16 24"><rect x="2" y="0" width="12" height="2" fill="${cursorColor}"/><rect x="7" y="2" width="2" height="20" fill="${cursorColor}"/><rect x="2" y="22" width="12" height="2" fill="${cursorColor}"/></svg>') 8 12, text`;
    document.documentElement.style.setProperty('--crt-cursor-default', cursorDefault);
    document.documentElement.style.setProperty('--crt-cursor-pointer', cursorPointer);
    document.documentElement.style.setProperty('--crt-cursor-text', cursorText);

    // Update all crt-screen components
    const screens = document.querySelectorAll('crt-screen');
    screens.forEach((screen: any) => {
      screen.color = color;
    });

    // Dispatch color change event for global screen
    this.dispatchEvent(new CustomEvent('color-change', { 
      detail: { color },
      bubbles: true,
      composed: true
    }));
  }

  static styles = css`
    :host { display: block; }
    .header-wrap {
      background: transparent;
      border-bottom: 2px solid var(--crt-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .title {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* Make nested atoms adopt spacing */
    .title ::slotted(crt-heading) { margin: 0; }
    .title ::slotted(crt-text) { margin: 0; }

    .actions { display: flex; align-items: center; gap: 12px; }

    .color-switcher {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .color-switcher.hidden {
      display: none;
    }

    .crt-switcher {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .color-btn {
      width: 20px;
      height: 20px;
      border: 2px solid var(--crt-primary);
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
      padding: 0;
      outline: none;
    }

    .color-btn.green { background: #8aff8a; }
    .color-btn.amber { background: #ffd700; }
    .color-btn.blue { background: #66ffff; }

    .color-btn:hover {
      box-shadow: var(--crt-glow-sm);
      transform: scale(1.1);
    }

    .color-btn.active {
      box-shadow: 0 0 8px currentColor;
      transform: scale(1.15);
    }

    @media (max-width: 720px) {
      .header-wrap { flex-direction: column; align-items: stretch; }
      .actions { justify-content: flex-end; width: 100%; }
    }
  `;

  render() {
    return html`
      <header class="header-wrap" role="banner">
        <div style="display:flex;align-items:center;gap:12px;min-width:0;">
          <slot name="brand">
            <div style="display:flex;flex-direction:column;gap:2px;min-width:0;">
              <crt-heading level="4">${this.title || 'CRT LIVING STYLE GUIDE'}</crt-heading>
              <crt-text muted style="font-size:var(--crt-font-size-xs);">Component Library · Lit Web Components</crt-text>
            </div>
          </slot>
        </div>

        <div class="actions">
          <!-- CRT Screen Buttons with Colors -->
          <div class="crt-switcher">
            <crt-tooltip text="${this.screenActive && this.currentColor === 'green' ? 'Disable CRT' : 'Green CRT Screen'}" position="bottom">
              <button 
                class="color-btn green ${this.screenActive && this.currentColor === 'green' ? 'active' : ''}" 
                @click="${() => this.screenActive && this.currentColor === 'green' ? this.disableScreen() : this.toggleScreenWithColor('green')}" 
                aria-label="Green CRT Screen">
              </button>
            </crt-tooltip>
            <crt-tooltip text="${this.screenActive && this.currentColor === 'amber' ? 'Disable CRT' : 'Amber CRT Screen'}" position="bottom">
              <button 
                class="color-btn amber ${this.screenActive && this.currentColor === 'amber' ? 'active' : ''}" 
                @click="${() => this.screenActive && this.currentColor === 'amber' ? this.disableScreen() : this.toggleScreenWithColor('amber')}" 
                aria-label="Amber CRT Screen">
              </button>
            </crt-tooltip>
            <crt-tooltip text="${this.screenActive && this.currentColor === 'blue' ? 'Disable CRT' : 'Blue CRT Screen'}" position="bottom">
              <button 
                class="color-btn blue ${this.screenActive && this.currentColor === 'blue' ? 'active' : ''}" 
                @click="${() => this.screenActive && this.currentColor === 'blue' ? this.disableScreen() : this.toggleScreenWithColor('blue')}" 
                aria-label="Blue CRT Screen">
              </button>
            </crt-tooltip>
          </div>

          <!-- Color Switcher (hidden when CRT active) -->
          <div class="color-switcher ${this.screenActive ? 'hidden' : ''}">
            <crt-tooltip text="Green Phosphor" position="bottom">
              <button class="color-btn green" @click="${() => this.changeColor('green')}" aria-label="Green Phosphor"></button>
            </crt-tooltip>
            <crt-tooltip text="Amber Phosphor" position="bottom">
              <button class="color-btn amber" @click="${() => this.changeColor('amber')}" aria-label="Amber Phosphor"></button>
            </crt-tooltip>
            <crt-tooltip text="Blue Phosphor" position="bottom">
              <button class="color-btn blue" @click="${() => this.changeColor('blue')}" aria-label="Blue Phosphor"></button>
            </crt-tooltip>
          </div>
          <slot name="actions">
            <!-- default action: search -->
            <crt-search placeholder="Search styleguide..." style="width:220px;"></crt-search>
          </slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-header': Header;
  }
}
