import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Use existing atoms for consistent look & registration
import '../atoms/typography';
import '../atoms/search';
import '../atoms/button';

@customElement('crt-header')
export class Header extends LitElement {
  @property({ type: String }) title = '';

  static styles = css`
    :host { display: block; }
    .header-wrap {
      padding: var(--crt-spacing-lg) var(--crt-spacing-md);
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
