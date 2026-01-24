import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * CRT Toast/Notification Component
 * Temporary notification messages with auto-dismiss
 */
@customElement('crt-toast')
export class Toast extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      z-index: 10001;
      pointer-events: none;
    }

    :host([position="top-right"]) {
      top: var(--crt-spacing-lg);
      right: var(--crt-spacing-lg);
    }

    :host([position="top-left"]) {
      top: var(--crt-spacing-lg);
      left: var(--crt-spacing-lg);
    }

    :host([position="bottom-right"]) {
      bottom: var(--crt-spacing-lg);
      right: var(--crt-spacing-lg);
    }

    :host([position="bottom-left"]) {
      bottom: var(--crt-spacing-lg);
      left: var(--crt-spacing-lg);
    }

    :host([position="top-center"]) {
      top: var(--crt-spacing-lg);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom-center"]) {
      bottom: var(--crt-spacing-lg);
      left: 50%;
      transform: translateX(-50%);
    }

    .toast-container {
      display: flex;
      flex-direction: column;
      gap: var(--crt-spacing-sm);
    }

    .toast {
      background: transparent;
      border: 2px solid var(--crt-primary);
      padding: var(--crt-spacing-md) var(--crt-spacing-lg);
      font-family: var(--crt-font-family);
      color: var(--crt-primary);
      min-width: 250px;
      max-width: 400px;
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-md);
      animation: toast-in 0.3s ease;
      box-shadow: var(--crt-component-glow-sm);
    }

    .toast.removing {
      animation: toast-out 0.3s ease forwards;
    }

    @keyframes toast-in {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes toast-out {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }

    .toast-icon {
      font-size: var(--crt-font-size-lg);
      flex-shrink: 0;
    }

    .toast-content {
      flex: 1;
    }

    .toast-title {
      font-size: var(--crt-font-size-base);
      font-weight: normal;
      margin: 0 0 var(--crt-spacing-xs) 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .toast-message {
      font-size: var(--crt-font-size-sm);
      color: var(--crt-text-secondary);
      margin: 0;
    }

    .toast-close {
      background: transparent;
      border: none;
      color: inherit;
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-lg);
      cursor: var(--crt-cursor-pointer);
      padding: 0;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .toast-close:hover {
      opacity: 1;
    }

    /* Variants */
    .toast.success {
      border-color: var(--crt-success);
      color: var(--crt-success);
    }

    .toast.warning {
      border-color: var(--crt-warning);
      color: var(--crt-warning);
    }

    .toast.error {
      border-color: var(--crt-error);
      color: var(--crt-error);
    }

    .toast.info {
      border-color: var(--crt-info);
      color: var(--crt-info);
    }

    /* Progress bar for auto-dismiss */
    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background: currentColor;
      animation: progress linear forwards;
    }

    .toast {
      position: relative;
      overflow: hidden;
    }

    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }
  `;

  @property({ type: String, reflect: true }) position: 
    'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right';
  
  // Direct properties for simple usage
  @property({ type: String }) message = '';
  @property({ type: String }) title = '';
  @property({ type: String }) variant: 'default' | 'success' | 'warning' | 'error' | 'info' = 'default';
  @property({ type: Number }) duration = 4000;

  @state() private _toasts: Array<{
    id: number;
    title?: string;
    message: string;
    variant: 'default' | 'success' | 'warning' | 'error' | 'info';
    duration: number;
    removing?: boolean;
  }> = [];

  private _counter = 0;
  private _initialized = false;

  connectedCallback() {
    super.connectedCallback();
    // If message is set directly, show as single toast
    if (this.message && !this._initialized) {
      this._initialized = true;
      requestAnimationFrame(() => {
        this.show({
          title: this.title || undefined,
          message: this.message,
          variant: this.variant,
          duration: this.duration
        });
      });
    }
  }

  show(options: {
    title?: string;
    message: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    duration?: number;
  }) {
    const id = ++this._counter;
    const toast = {
      id,
      title: options.title,
      message: options.message,
      variant: options.variant || 'default',
      duration: options.duration ?? 4000,
    };

    this._toasts = [...this._toasts, toast];

    if (toast.duration > 0) {
      setTimeout(() => this._removeToast(id), toast.duration);
    }
  }

  private _removeToast(id: number) {
    this._toasts = this._toasts.map(t => 
      t.id === id ? { ...t, removing: true } : t
    );
    
    setTimeout(() => {
      this._toasts = this._toasts.filter(t => t.id !== id);
    }, 300);
  }

  private _getIcon(variant: string) {
    switch (variant) {
      case 'success': return '[✓]';
      case 'warning': return '[!]';
      case 'error': return '[✕]';
      case 'info': return '[i]';
      default: return '[•]';
    }
  }

  render() {
    return html`
      <div class="toast-container">
        ${this._toasts.map(toast => html`
          <div class="toast ${toast.variant} ${toast.removing ? 'removing' : ''}">
            <span class="toast-icon">${this._getIcon(toast.variant)}</span>
            <div class="toast-content">
              ${toast.title ? html`<h4 class="toast-title">${toast.title}</h4>` : ''}
              <p class="toast-message">${toast.message}</p>
            </div>
            <button class="toast-close" @click="${() => this._removeToast(toast.id)}">✕</button>
            ${toast.duration > 0 ? html`
              <div class="toast-progress" style="animation-duration: ${toast.duration}ms"></div>
            ` : ''}
          </div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-toast': Toast;
  }
}
