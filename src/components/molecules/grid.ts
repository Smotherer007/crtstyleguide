import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-grid')
export class Grid extends LitElement {
  @property({ type: Number }) columns = 3;
  @property({ type: String }) gap = 'var(--crt-spacing-lg)';

  static styles = css`
    :host {
      display: block;
    }

    .grid {
      display: grid;
      gap: var(--grid-gap);
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
    }

    @media (max-width: 480px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <style>
        :host {
          --grid-gap: ${this.gap};
          --grid-columns: ${this.columns};
        }
      </style>
      <div class="grid">
        <slot></slot>
      </div>
    `;
  }
}
