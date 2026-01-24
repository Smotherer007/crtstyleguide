import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-badge')
export class Badge extends LitElement {
  static styles = css`
    :host {
      --badge-bg: transparent;
      --badge-color: var(--crt-primary);
      --badge-border: var(--crt-border);
    }

    .badge {
      display: inline-block;
      background-color: var(--badge-bg);
      color: var(--badge-color);
      border: var(--badge-border);
      padding: var(--crt-spacing-xs) var(--crt-spacing-md);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      letter-spacing: 1px;
      text-transform: uppercase;
      box-shadow: var(--crt-component-glow-sm);
      white-space: nowrap;
    }

    :host([variant='success']) {
      --badge-color: var(--crt-success);
      --badge-border: 1px solid var(--crt-success);
    }

    :host([variant='warning']) {
      --badge-color: var(--crt-warning);
      --badge-border: 1px solid var(--crt-warning);
    }

    :host([variant='error']) {
      --badge-color: var(--crt-error);
      --badge-border: 1px solid var(--crt-error);
    }

    :host([variant='info']) {
      --badge-color: var(--crt-info);
      --badge-border: 1px solid var(--crt-info);
    }
  `;

  @property() variant: 'primary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  render() {
    return html`<span class="badge"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-badge': Badge;
  }
}
