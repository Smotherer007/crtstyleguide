import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './icon';

@customElement('crt-button')
export class Button extends LitElement {
  // Definiere styles als static property
  static readonly styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      line-height: 0;
    }

    button {
      background-color: transparent;
      color: var(--crt-primary);
      border: 2px solid var(--crt-primary);
      box-sizing: border-box;
      margin: 0;
      padding: 16px 32px;
      font-family: var(--crt-font-family);
      font-size: 1rem;
      line-height: 1;
      letter-spacing: 2px;
      cursor: var(--crt-cursor-pointer);
      text-transform: uppercase;
      transition: all 0.3s ease;
      box-shadow: none;
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      outline: none;
      user-select: none;
      border-radius: 0;
    }

    button:hover:not(:disabled) {
      background-color: transparent;
      color: var(--crt-primary);
      box-shadow: none;
      cursor: var(--crt-cursor-pointer);
    }

    button:active:not(:disabled) {
      transform: scale(0.98);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      border-style: dashed;
    }

    /* Success variant */
    :host([variant="success"]) button {
      color: var(--crt-success);
      border-color: var(--crt-success);
      box-shadow: none;
    }

    :host([variant="success"]) button:hover:not(:disabled) {
      background-color: transparent;
      color: var(--crt-success);
      box-shadow: none;
    }

    /* Warning variant */
    :host([variant="warning"]) button {
      color: var(--crt-warning);
      border-color: var(--crt-warning);
      box-shadow: none;
    }

    :host([variant="warning"]) button:hover:not(:disabled) {
      background-color: transparent;
      color: var(--crt-warning);
      box-shadow: none;
    }

    /* Error variant */
    :host([variant="error"]) button {
      color: var(--crt-error);
      border-color: var(--crt-error);
      box-shadow: none;
    }

    :host([variant="error"]) button:hover:not(:disabled) {
      background-color: transparent;
      color: var(--crt-error);
      box-shadow: none;
    }

    /* Link variant */
    :host([variant="link"]) button {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 8px 16px;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    :host([variant="link"]) button:hover:not(:disabled) {
      background: transparent;
      color: var(--crt-primary);
      box-shadow: none;
      transform: none;
      text-shadow: none;
    }

    /* Size variants */
    :host([size="small"]) button {
      padding: 8px 16px;
      font-size: 0.85rem;
    }

    :host([size="large"]) button {
      padding: 20px 40px;
      font-size: 1.2rem;
    }

    /* Icon only */
    :host([icon-only]) button {
      padding: 12px;
      aspect-ratio: 1;
      min-width: auto;
    }

    :host([icon-only][size="small"]) button {
      padding: 8px;
    }

    :host([icon-only][size="large"]) button {
      padding: 16px;
    }

    :host([icon-only]) button crt-icon {
      font-size: 1.2em;
    }

    /* Icon spacing */
    button crt-icon {
      flex-shrink: 0;
    }
  `;

  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ reflect: true }) variant: 'primary' | 'success' | 'warning' | 'error' | 'link' = 'primary';
  @property({ type: Boolean }) disabled = false;
  @property() type: 'button' | 'submit' | 'reset' = 'button';
  @property({ attribute: 'icon-only', type: Boolean }) iconOnly = false;
  @property({ attribute: 'icon-left' }) iconLeft: string = '';
  @property({ attribute: 'icon-right' }) iconRight: string = '';
  @property({ attribute: 'aria-label' }) ariaLabel = '';

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    
    // Icon-only mode: nur das Icon anzeigen (von icon-left oder icon-right)
    if (this.iconOnly) {
      const iconName = this.iconLeft || this.iconRight;
      return html`
        <button
          type="${this.type}"
          ?disabled="${this.disabled}"
          aria-label="${this.ariaLabel || iconName || 'Button'}"
        >
          ${iconName ? html`<crt-icon name="${iconName}"></crt-icon>` : html`<slot></slot>`}
        </button>
      `;
    }
    
    return html`
      <button type="${this.type}" ?disabled="${this.disabled}">
        ${this.iconLeft ? html`<crt-icon name="${this.iconLeft}"></crt-icon>` : ''}
        <slot></slot>
        ${this.iconRight ? html`<crt-icon name="${this.iconRight}"></crt-icon>` : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-button': Button;
  }
}
