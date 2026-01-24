import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface BreadcrumbItemData {
  label: string;
  href?: string;
}

/**
 * CRT Breadcrumb Component
 */
@customElement('crt-breadcrumb')
export class Breadcrumb extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--crt-spacing-xs);
      padding: var(--crt-spacing-sm) 0;
    }

    .item {
      display: flex;
      align-items: center;
    }

    a, .text {
      color: var(--crt-text-secondary);
      text-decoration: none;
      font-size: var(--crt-font-size-sm);
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: var(--crt-transition);
    }

    a {
      cursor: var(--crt-cursor-pointer);
    }

    a:hover {
      color: var(--crt-primary);
    }

    .active a,
    .active .text {
      color: var(--crt-primary);
    }

    .separator {
      color: var(--crt-text-muted);
      margin: 0 var(--crt-spacing-sm);
      font-size: var(--crt-font-size-sm);
    }
  `;

  @property({ type: Array }) items: BreadcrumbItemData[] = [];
  @property({ type: String }) separator = '>';

  render() {
    return html`
      <nav class="breadcrumb" aria-label="Breadcrumb">
        ${this.items.map((item, index) => html`
          <span class="item ${index === this.items.length - 1 ? 'active' : ''}">
            ${item.href && index !== this.items.length - 1
              ? html`<a href="${item.href}">${item.label}</a>`
              : html`<span class="text">${item.label}</span>`
            }
            ${index < this.items.length - 1 ? html`<span class="separator">${this.separator}</span>` : ''}
          </span>
        `)}
        <slot></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-breadcrumb': Breadcrumb;
  }
}
