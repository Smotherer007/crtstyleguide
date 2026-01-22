import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Progress Bar Component
 */
@customElement('crt-progress')
export class Progress extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
    }

    .progress-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--crt-spacing-xs);
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .progress-label {
      color: var(--crt-text-primary);
      font-size: var(--crt-font-size-sm);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .progress-value {
      color: var(--crt-primary);
      font-size: var(--crt-font-size-sm);
    }

    .progress-track {
      height: 20px;
      background: var(--crt-bg-dark);
      border: 2px solid var(--crt-primary);
      box-shadow: var(--crt-glow-inset);
      position: relative;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: var(--crt-primary);
      transition: width 0.3s ease;
      position: relative;
      box-shadow: var(--crt-glow-sm);
    }

    /* Animated striped effect */
    :host([animated]) .progress-bar {
      background: repeating-linear-gradient(
        -45deg,
        var(--crt-primary),
        var(--crt-primary) 10px,
        color-mix(in srgb, var(--crt-primary) 70%, var(--crt-bg-dark)) 10px,
        color-mix(in srgb, var(--crt-primary) 70%, var(--crt-bg-dark)) 20px
      );
      background-size: 200% 100%;
      animation: progress-stripes 1s linear infinite;
    }

    @keyframes progress-stripes {
      from { background-position: 0 0; }
      to { background-position: 40px 0; }
    }

    /* Indeterminate state */
    :host([indeterminate]) .progress-bar {
      width: 30% !important;
      animation: indeterminate 1.5s ease-in-out infinite;
    }

    @keyframes indeterminate {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
    }

    /* Size variants */
    :host([size="small"]) .progress-track {
      height: 10px;
    }

    :host([size="large"]) .progress-track {
      height: 30px;
    }

    /* Variant colors */
    :host([variant="success"]) .progress-bar {
      background: var(--crt-success);
      box-shadow: 0 0 10px color-mix(in srgb, var(--crt-success) 50%, transparent);
    }

    :host([variant="success"]) .progress-track {
      border-color: var(--crt-success);
    }

    :host([variant="warning"]) .progress-bar {
      background: var(--crt-warning);
      box-shadow: 0 0 10px color-mix(in srgb, var(--crt-warning) 50%, transparent);
    }

    :host([variant="warning"]) .progress-track {
      border-color: var(--crt-warning);
    }

    :host([variant="error"]) .progress-bar {
      background: var(--crt-error);
      box-shadow: 0 0 10px color-mix(in srgb, var(--crt-error) 50%, transparent);
    }

    :host([variant="error"]) .progress-track {
      border-color: var(--crt-error);
    }

    /* Segmented style */
    :host([segmented]) .progress-bar {
      background: repeating-linear-gradient(
        90deg,
        var(--crt-primary),
        var(--crt-primary) 8px,
        var(--crt-bg-dark) 8px,
        var(--crt-bg-dark) 10px
      );
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) animated = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) segmented = false;
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'error' = 'default';
  @property({ type: Boolean }) showValue = true;

  private _getPercentage(): number {
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  render() {
    const percentage = this._getPercentage();
    
    return html`
      <div class="progress-wrapper">
        ${this.label || this.showValue ? html`
          <div class="progress-header">
            ${this.label ? html`<span class="progress-label">${this.label}</span>` : ''}
            ${this.showValue && !this.indeterminate ? html`
              <span class="progress-value">${Math.round(percentage)}%</span>
            ` : ''}
          </div>
        ` : ''}
        <div class="progress-track" role="progressbar" aria-valuenow="${this.value}" aria-valuemax="${this.max}">
          <div class="progress-bar" style="width: ${this.indeterminate ? '30' : percentage}%"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-progress': Progress;
  }
}
