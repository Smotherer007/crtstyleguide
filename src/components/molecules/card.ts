import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('crt-card')
export class Card extends LitElement {
  static styles = css`
    :host {
      /* Make the card element act like a normal block-level container
         so external width/height styles can be applied responsively. */
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    .card {
      width: 100%;
      box-sizing: border-box;
      border: 3px double var(--crt-primary);
      padding: var(--crt-spacing-lg);
      background-color: var(--crt-bg-dark);
      box-shadow: var(--crt-glow-sm), var(--crt-glow-inset);
      transition: var(--crt-transition);
    }

    .card:hover {
      box-shadow: 
        0 0 15px color-mix(in srgb, var(--crt-primary) 40%, transparent),
        0 0 30px color-mix(in srgb, var(--crt-primary) 20%, transparent),
        var(--crt-glow-inset);
    }

    .card-header {
      border-bottom: 1px solid var(--crt-primary);
      padding-bottom: var(--crt-spacing-md);
      margin-bottom: var(--crt-spacing-md);
    }

    .card-content {
      padding: var(--crt-spacing-md) 0;
    }

    .card-footer {
      border-top: 1px solid var(--crt-primary);
      padding-top: var(--crt-spacing-md);
      margin-top: var(--crt-spacing-md);
    }
  `;

  render() {
    return html`
      <div class="card">
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-content">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-card': Card;
  }
}
