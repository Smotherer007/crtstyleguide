import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Accordion Item Component
 */
@customElement('crt-accordion-item')
export class AccordionItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
    }

    .accordion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--crt-spacing-md) var(--crt-spacing-lg);
      background: var(--crt-bg-dark);
      border: 2px solid var(--crt-primary);
      border-bottom: none;
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
      color: var(--crt-primary);
    }

    :host(:first-child) .accordion-header {
      border-top: 2px solid var(--crt-primary);
    }

    :host(:last-child) .accordion-header,
    :host(:last-child) .accordion-content {
      border-bottom: 2px solid var(--crt-primary);
    }

    .accordion-header:hover {
      background: color-mix(in srgb, var(--crt-primary) 10%, transparent);
    }

    .accordion-header.open {
      background: color-mix(in srgb, var(--crt-primary) 5%, transparent);
      border-bottom: 1px solid var(--crt-primary);
    }

    .accordion-title {
      font-size: var(--crt-font-size-base);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0;
    }

    .accordion-icon {
      transition: transform 0.3s ease;
      font-size: var(--crt-font-size-sm);
    }

    .accordion-header.open .accordion-icon {
      transform: rotate(90deg);
    }

    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      background: var(--crt-bg-dark);
      border-left: 2px solid var(--crt-primary);
      border-right: 2px solid var(--crt-primary);
    }

    .accordion-content.open {
      max-height: 500px;
    }

    .accordion-body {
      padding: var(--crt-spacing-lg);
      color: var(--crt-text-secondary);
    }
  `;

  @property({ type: String }) header = '';
  @property({ type: Boolean, reflect: true }) open = false;

  toggle() {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { open: this.open },
      bubbles: true
    }));
  }

  render() {
    return html`
      <div 
        class="accordion-header ${this.open ? 'open' : ''}"
        @click="${this.toggle}"
        role="button"
        aria-expanded="${this.open}"
      >
        <h3 class="accordion-title">${this.header}</h3>
        <span class="accordion-icon">►</span>
      </div>
      <div class="accordion-content ${this.open ? 'open' : ''}">
        <div class="accordion-body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

/**
 * CRT Accordion Container Component
 */
@customElement('crt-accordion')
export class Accordion extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: Boolean }) multiple = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('toggle', this._handleToggle as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('toggle', this._handleToggle as EventListener);
  }

  private _handleToggle = (e: CustomEvent) => {
    if (!this.multiple && e.detail.open) {
      // Close all other items
      this.querySelectorAll('crt-accordion-item').forEach(item => {
        if (item !== e.target) {
          (item as AccordionItem).open = false;
        }
      });
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-accordion': Accordion;
    'crt-accordion-item': AccordionItem;
  }
}
