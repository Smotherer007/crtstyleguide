import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './icon';

@customElement('crt-button')
export class Button extends LitElement {
  // Definiere styles als static property
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      background-color: transparent;
      color: #33ff33;
      border: 2px solid #33ff33;
      box-sizing: border-box;
      height: 100%;
      padding: 16px 32px;
      font-family: 'VT323', 'Courier New', monospace;
      font-size: 1rem;
      letter-spacing: 2px;
      cursor: var(--crt-cursor-pointer);
      text-transform: uppercase;
      transition: all 0.3s ease;
      box-shadow: 0 0 5px rgba(51, 255, 51, 0.3);
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
      background-color: #33ff33;
      color: #0a0a0a;
      box-shadow: 
        0 0 10px rgba(51, 255, 51, 0.7), 
        0 0 20px rgba(51, 255, 51, 0.5),
        0 0 40px rgba(51, 255, 51, 0.3),
        inset 0 0 10px rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
      cursor: var(--crt-cursor-pointer-dark);
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
      color: var(--crt-success, #00ff00);
      border-color: var(--crt-success, #00ff00);
      box-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
    }

    :host([variant="success"]) button:hover:not(:disabled) {
      background-color: var(--crt-success, #00ff00);
      color: #0a0a0a;
      box-shadow: 
        0 0 10px rgba(0, 255, 0, 0.7), 
        0 0 20px rgba(0, 255, 0, 0.5),
        0 0 40px rgba(0, 255, 0, 0.3),
        inset 0 0 10px rgba(0, 0, 0, 0.2);
    }

    /* Warning variant */
    :host([variant="warning"]) button {
      color: var(--crt-warning, #ffcc00);
      border-color: var(--crt-warning, #ffcc00);
      box-shadow: 0 0 5px rgba(255, 204, 0, 0.3);
    }

    :host([variant="warning"]) button:hover:not(:disabled) {
      background-color: var(--crt-warning, #ffcc00);
      color: #0a0a0a;
      box-shadow: 
        0 0 10px rgba(255, 204, 0, 0.7), 
        0 0 20px rgba(255, 204, 0, 0.5),
        0 0 40px rgba(255, 204, 0, 0.3),
        inset 0 0 10px rgba(0, 0, 0, 0.2);
    }

    /* Error variant */
    :host([variant="error"]) button {
      color: var(--crt-danger, #ff3333);
      border-color: var(--crt-danger, #ff3333);
      box-shadow: 0 0 5px rgba(255, 51, 51, 0.3);
    }

    :host([variant="error"]) button:hover:not(:disabled) {
      background-color: var(--crt-danger, #ff3333);
      color: #0a0a0a;
      box-shadow: 
        0 0 10px rgba(255, 51, 51, 0.7), 
        0 0 20px rgba(255, 51, 51, 0.5),
        0 0 40px rgba(255, 51, 51, 0.3),
        inset 0 0 10px rgba(0, 0, 0, 0.2);
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
      color: #33ff33;
      box-shadow: none;
      transform: none;
      text-shadow: 0 0 10px rgba(51, 255, 51, 0.7);
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

  constructor() {
    super();
    console.log('Button constructor called');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('Button connected to DOM', this);
  }

  render() {
    console.log('Button render called');
    
    // Icon-only mode: nur das Icon anzeigen (von icon-left oder icon-right)
    if (this.iconOnly) {
      const iconName = this.iconLeft || this.iconRight;
      return html`
        <button type="${this.type}" ?disabled="${this.disabled}">
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
