import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../atoms/link';

@customElement('crt-footer')
export class Footer extends LitElement {
  @property({ type: String }) copyright = '';

  static styles = css`
    :host { display: block; }
    .footer {
      padding: var(--crt-spacing-md) var(--crt-spacing-lg);
      border-top: 2px solid var(--crt-primary);
      background: transparent;
      color: var(--crt-text-muted);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
    }
  `;

  render() {
    return html`
      <footer class="footer">
        <div><slot name="left">${this.copyright || '© 2026 CRT Style Guide'}</slot></div>
        <div><slot name="right">Made with ♥ · <crt-link href="https://github.com/" target="_blank">GitHub</crt-link></slot></div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-footer': Footer;
  }
}
