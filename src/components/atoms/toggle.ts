import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Toggle/Switch Component
 */
@customElement('crt-toggle')
export class Toggle extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
      font-family: var(--crt-font-family);
      cursor: var(--crt-cursor-pointer);
    }

    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([disabled]) .toggle-track {
      border-style: dashed;
    }

    .toggle-wrapper {
      position: relative;
      display: inline-block;
    }

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-track {
      width: 50px;
      height: 26px;
      background: var(--crt-bg-dark);
      border: 2px solid var(--crt-primary);
      position: relative;
      transition: var(--crt-transition);
      box-shadow: var(--crt-glow-inset);
    }

    .toggle-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      background: var(--crt-text-muted);
      transition: all 0.2s ease;
    }

    input:checked + .toggle-track {
      background: color-mix(in srgb, var(--crt-primary) 20%, transparent);
    }

    input:checked + .toggle-track .toggle-thumb {
      left: 27px;
      background: var(--crt-primary);
      box-shadow: var(--crt-glow);
    }

    :host(:hover:not([disabled])) .toggle-track {
      box-shadow: var(--crt-glow-inset), var(--crt-glow-sm);
    }

    .toggle-labels {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 6px;
      font-size: 10px;
      color: var(--crt-text-muted);
      pointer-events: none;
    }

    input:checked + .toggle-track .on-label {
      color: var(--crt-primary);
    }

    input:not(:checked) + .toggle-track .off-label {
      color: var(--crt-primary);
    }

    .label {
      color: var(--crt-text-primary);
      user-select: none;
    }

    /* Size variants */
    :host([size="small"]) .toggle-track {
      width: 36px;
      height: 20px;
    }

    :host([size="small"]) .toggle-thumb {
      width: 12px;
      height: 12px;
    }

    :host([size="small"]) input:checked + .toggle-track .toggle-thumb {
      left: 19px;
    }

    :host([size="large"]) .toggle-track {
      width: 64px;
      height: 32px;
    }

    :host([size="large"]) .toggle-thumb {
      width: 22px;
      height: 22px;
      top: 3px;
    }

    :host([size="large"]) input:checked + .toggle-track .toggle-thumb {
      left: 35px;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: String }) onLabel = '1';
  @property({ type: String }) offLabel = '0';
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked }
    }));
  }

  render() {
    return html`
      <label class="toggle-wrapper">
        <input 
          type="checkbox" 
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this._handleChange}"
        />
        <div class="toggle-track">
          <div class="toggle-thumb"></div>
          <div class="toggle-labels">
            <span class="on-label">${this.onLabel}</span>
            <span class="off-label">${this.offLabel}</span>
          </div>
        </div>
      </label>
      ${this.label ? html`<span class="label">${this.label}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-toggle': Toggle;
  }
}
