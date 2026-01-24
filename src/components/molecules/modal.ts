import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Modal/Dialog Component
 * Overlay dialog with backdrop, close button, and ESC key support
 */
@customElement('crt-modal')
export class Modal extends LitElement {
  static styles = css`
    :host {
      display: none;
    }

    :host([open]) {
      display: block;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: transparent;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fade-in 0.2s ease;
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal {
      background: transparent;
      border: 3px double var(--crt-primary);
      box-shadow: 
        0 0 20px color-mix(in srgb, var(--crt-primary) 30%, transparent),
        0 0 40px color-mix(in srgb, var(--crt-primary) 15%, transparent),
        var(--crt-component-glow-inset);
      max-width: 90vw;
      max-height: 90vh;
      min-width: 300px;
      overflow: hidden;
      animation: modal-in 0.3s ease;
    }

    @keyframes modal-in {
      from { 
        opacity: 0; 
        transform: scale(0.9);
      }
      to { 
        opacity: 1; 
        transform: scale(1);
      }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--crt-spacing-md) var(--crt-spacing-lg);
      border-bottom: 1px solid var(--crt-primary);
      background: transparent;
    }

    .modal-title {
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-lg);
      color: var(--crt-primary);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .close-btn {
      background: transparent;
      border: 1px solid var(--crt-primary);
      color: var(--crt-primary);
      width: 32px;
      height: 32px;
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-lg);
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      background: transparent;
      color: var(--crt-primary);
      box-shadow: var(--crt-component-glow);
    }

    .modal-body {
      padding: var(--crt-spacing-lg);
      overflow-y: auto;
      max-height: 60vh;
    }

    .modal-footer {
      padding: var(--crt-spacing-md) var(--crt-spacing-lg);
      border-top: 1px solid var(--crt-primary);
      display: flex;
      justify-content: flex-end;
      gap: var(--crt-spacing-md);
    }

    /* Size variants */
    :host([size="small"]) .modal {
      max-width: 400px;
    }

    :host([size="large"]) .modal {
      max-width: 800px;
      width: 90vw;
    }

    :host([size="fullscreen"]) .modal {
      max-width: none;
      width: 95vw;
      height: 95vh;
    }

    :host([size="fullscreen"]) .modal-body {
      max-height: none;
      height: calc(95vh - 120px);
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) title = 'Modal';
  @property({ type: String }) size: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      this.close();
    }
  };

  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  private _handleBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('backdrop')) {
      this.close();
    }
  }

  render() {
    return html`
      <div class="backdrop" @click="${this._handleBackdropClick}">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-header">
            <h2 class="modal-title" id="modal-title">${this.title}</h2>
            <button class="close-btn" @click="${this.close}" aria-label="Close">✕</button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-modal': Modal;
  }
}
