import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-spinner')
export class Spinner extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) message = 'LOADING...';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) fullscreen = false;

  static readonly styles = css`
    :host {
      --crt-spinner-size: 12px;
      display: none;
      align-items: center;
      justify-content: center;
      color: var(--crt-primary);
      font-family: var(--crt-font-family);
    }

    :host([open]) {
      display: inline-flex;
    }

    :host([open][fullscreen]) {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      background: color-mix(in srgb, var(--crt-bg-dark) 70%, transparent);
      display: flex;
    }

    :host([size='sm']) {
      --crt-spinner-size: 8px;
    }

    :host([size='lg']) {
      --crt-spinner-size: 16px;
    }

    .spinner {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: var(--crt-spacing-xs);
    }

    .blocks {
      display: inline-flex;
      gap: 6px;
      align-items: center;
      justify-content: center;
    }

    .block {
      width: var(--crt-spinner-size);
      height: var(--crt-spinner-size);
      border: 2px solid var(--crt-primary);
      background: transparent;
      animation: blink 1.1s steps(2, start) infinite;
    }

    .block:nth-child(2) { animation-delay: 0.15s; }
    .block:nth-child(3) { animation-delay: 0.3s; }

    .message {
      font-size: var(--crt-font-size-xs);
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--crt-text-primary);
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;

  render() {
    if (!this.open) return html``;
    return html`
      <div class="spinner" role="status" aria-live="polite">
        <div class="blocks" aria-hidden="true">
          <span class="block"></span>
          <span class="block"></span>
          <span class="block"></span>
        </div>
        ${this.message ? html`<div class="message">${this.message}</div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-spinner': Spinner;
  }
}
