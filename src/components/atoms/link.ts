import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-link')
export class Link extends LitElement {
  @property({ type: String }) href = '#';
  @property({ type: String }) target = '';
  @property({ type: Boolean }) iconLeft = false;
  @property({ type: Boolean }) iconRight = false;
  @property({ type: String }) icon = '';

  static styles = css`
    :host {
      --crt-link-color: var(--crt-primary);
    }

    a {
      color: var(--crt-link-color);
      text-decoration: underline;
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
      font-family: var(--crt-font-family);
      font-size: inherit;
      display: inline-flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
    }

    a:hover {
      color: var(--crt-primary-light);
      text-shadow: 0 0 10px var(--crt-primary);
    }

    a:active {
      color: var(--crt-primary-dark);
    }
  `;

  render() {
    return html`
      <a href="${this.href}" ${this.target ? `target="${this.target}"` : ''}>
        ${this.iconLeft ? html`<crt-icon name="${this.icon}"></crt-icon>` : ''}
        <slot></slot>
        ${this.iconRight ? html`<crt-icon name="${this.icon}"></crt-icon>` : ''}
      </a>
    `;
  }
}
