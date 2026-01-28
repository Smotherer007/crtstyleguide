import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Toggle/Switch Component
 */
@customElement('crt-toggle')
export class Toggle extends LitElement {
  static styles = css`
    :host {
      --toggle-width: 54px;
      --toggle-height: 26px;
      --thumb-size: 16px;
      --thumb-gap: 4px;
      --label-size: 10px;
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
      width: var(--toggle-width);
      height: var(--toggle-height);
      background: transparent;
      border: 2px solid var(--crt-primary);
      position: relative;
      transition: var(--crt-transition);
    }

    .toggle-thumb {
      position: absolute;
      top: calc((var(--toggle-height) - var(--thumb-size)) / 2);
      left: var(--thumb-gap);
      width: var(--thumb-size);
      height: var(--thumb-size);
      background: var(--crt-text-muted);
      transition: all 0.2s ease;
    }

    input:checked + .toggle-track {
      background: transparent;
    }

    input:checked + .toggle-track .toggle-thumb {
      left: calc(100% - var(--thumb-size) - var(--thumb-gap));
      background: var(--crt-primary);
    }

    :host(:hover:not([disabled])) .toggle-track {
      box-shadow: none;
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
      font-size: var(--label-size);
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
      --toggle-width: 38px;
      --toggle-height: 20px;
      --thumb-size: 12px;
      --thumb-gap: 3px;
      --label-size: 9px;
    }

    :host([size="large"]) .toggle-track {
      --toggle-width: 66px;
      --toggle-height: 32px;
      --thumb-size: 22px;
      --thumb-gap: 5px;
      --label-size: 11px;
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
