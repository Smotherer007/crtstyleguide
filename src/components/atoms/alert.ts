import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Alert/Banner Component
 */
@customElement('crt-alert')
export class Alert extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
    }

    .alert {
      display: flex;
      align-items: flex-start;
      gap: var(--crt-spacing-md);
      padding: var(--crt-spacing-md);
      border: 3px double var(--crt-primary);
      background: transparent;
      position: relative;
    }

    /* Variants */
    :host([variant="success"]) .alert {
      border-color: var(--crt-success);
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
    }

    :host([variant="success"]) .alert-icon,
    :host([variant="success"]) .alert-title {
      color: var(--crt-success);
      text-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
    }

    :host([variant="warning"]) .alert {
      border-color: var(--crt-warning);
      box-shadow: 0 0 10px rgba(255, 255, 0, 0.3);
    }

    :host([variant="warning"]) .alert-icon,
    :host([variant="warning"]) .alert-title {
      color: var(--crt-warning);
      text-shadow: 0 0 10px rgba(255, 255, 0, 0.7);
    }

    :host([variant="error"]) .alert {
      border-color: var(--crt-error);
      box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
    }

    :host([variant="error"]) .alert-icon,
    :host([variant="error"]) .alert-title {
      color: var(--crt-error);
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
    }

    :host([variant="info"]) .alert {
      border-color: var(--crt-info);
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
    }

    :host([variant="info"]) .alert-icon,
    :host([variant="info"]) .alert-title {
      color: var(--crt-info);
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
    }

    .alert-icon {
      flex-shrink: 0;
      font-size: 1.2em;
      color: var(--crt-primary);
    }

    .alert-content {
      flex: 1;
      min-width: 0;
    }

    .alert-title {
      font-weight: bold;
      margin-bottom: var(--crt-spacing-xs);
      color: var(--crt-primary);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .alert-message {
      color: var(--crt-text-primary);
      line-height: 1.5;
    }

    .alert-close {
      flex-shrink: 0;
      background: none;
      border: none;
      color: var(--crt-text-muted);
      cursor: var(--crt-cursor-pointer);
      padding: 0;
      font-family: inherit;
      font-size: 1.2em;
      transition: var(--crt-transition);
    }

    .alert-close:hover {
      color: var(--crt-primary);
    }

    .alert-actions {
      margin-top: var(--crt-spacing-md);
      display: flex;
      gap: var(--crt-spacing-sm);
    }

    /* Filled variant */
    :host([filled]) .alert {
      background: transparent;
    }

    :host([filled][variant="success"]) .alert {
      background: transparent;
    }

    :host([filled][variant="warning"]) .alert {
      background: transparent;
    }

    :host([filled][variant="error"]) .alert {
      background: transparent;
    }

    :host([filled][variant="info"]) .alert {
      background: transparent;
    }

    /* Outlined variant */
    :host([outlined]) .alert {
      border-width: 2px;
      border-style: solid;
    }

    /* Animation for entering */
    :host([animated]) .alert {
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Banner mode - full width, no border-radius */
    :host([banner]) {
      display: block;
      width: 100%;
    }

    :host([banner]) .alert {
      border-left: none;
      border-right: none;
      border-top: none;
    }
  `;

  @property({ type: String, reflect: true }) variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @property({ type: String }) title = '';
  @property({ type: Boolean, reflect: true }) closable = false;
  @property({ type: Boolean, reflect: true }) filled = false;
  @property({ type: Boolean, reflect: true }) outlined = false;
  @property({ type: Boolean, reflect: true }) banner = false;
  @property({ type: Boolean, reflect: true }) animated = false;
  @property({ type: String }) icon = '';

  private _getDefaultIcon(): string {
    const icons: Record<string, string> = {
      info: '[i]',
      success: '[OK]',
      warning: '[!]',
      error: '[X]'
    };
    return icons[this.variant] || '[i]';
  }

  private _handleClose() {
    this.dispatchEvent(new CustomEvent('close'));
    this.remove();
  }

  render() {
    return html`
      <div class="alert" role="alert">
        <span class="alert-icon">${this.icon || this._getDefaultIcon()}</span>
        <div class="alert-content">
          ${this.title ? html`<div class="alert-title">${this.title}</div>` : ''}
          <div class="alert-message">
            <slot></slot>
          </div>
          <div class="alert-actions">
            <slot name="actions"></slot>
          </div>
        </div>
        ${this.closable ? html`
          <button class="alert-close" @click="${this._handleClose}">[X]</button>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-alert': Alert;
  }
}
