import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Slider/Range Component
 */
@customElement('crt-slider')
export class Slider extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--crt-spacing-sm);
    }

    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .slider-label {
      color: var(--crt-text-primary);
      font-size: var(--crt-font-size-sm);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .slider-value {
      color: var(--crt-primary);
      font-size: var(--crt-font-size-base);
      min-width: 50px;
      text-align: right;
    }

    .slider-track {
      position: relative;
      height: 24px;
      display: flex;
      align-items: center;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 8px;
      background: var(--crt-bg-dark);
      border: 2px solid var(--crt-primary);
      cursor: var(--crt-cursor-pointer);
      position: relative;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: var(--crt-primary);
      border: 2px solid var(--crt-bg-dark);
      cursor: var(--crt-cursor-pointer);
      box-shadow: var(--crt-glow);
      transition: var(--crt-transition);
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
      box-shadow: var(--crt-glow-lg);
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--crt-primary);
      border: 2px solid var(--crt-bg-dark);
      border-radius: 0;
      cursor: var(--crt-cursor-pointer);
      box-shadow: var(--crt-glow);
    }

    input[type="range"]::-moz-range-track {
      background: var(--crt-bg-dark);
      border: 2px solid var(--crt-primary);
      height: 8px;
    }

    input[type="range"]:focus {
      outline: none;
    }

    input[type="range"]:focus::-webkit-slider-thumb {
      box-shadow: var(--crt-glow-lg);
    }

    .slider-marks {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      margin-top: var(--crt-spacing-xs);
    }

    .slider-mark {
      font-size: var(--crt-font-size-xs);
      color: var(--crt-text-muted);
    }

    /* Fill effect */
    .slider-fill {
      position: absolute;
      left: 2px;
      top: 50%;
      transform: translateY(-50%);
      height: 4px;
      background: var(--crt-primary);
      box-shadow: var(--crt-glow-sm);
      pointer-events: none;
    }

    /* Disabled state */
    :host([disabled]) input[type="range"] {
      opacity: 0.5;
      cursor: not-allowed;
      border-style: dashed;
    }

    :host([disabled]) input[type="range"]::-webkit-slider-thumb {
      cursor: not-allowed;
    }
  `;

  @property({ type: Number }) value = 50;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) showMarks = false;
  @property({ type: String }) unit = '';

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value }
    }));
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value }
    }));
  }

  private _getFillWidth(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  render() {
    return html`
      <div class="slider-wrapper">
        ${this.label ? html`
          <div class="slider-header">
            <span class="slider-label">${this.label}</span>
            <span class="slider-value">${this.value}${this.unit}</span>
          </div>
        ` : ''}
        
        <div class="slider-track">
          <div class="slider-fill" style="width: calc(${this._getFillWidth()}% - 10px)"></div>
          <input
            type="range"
            .value="${String(this.value)}"
            min="${this.min}"
            max="${this.max}"
            step="${this.step}"
            ?disabled="${this.disabled}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
          />
        </div>
        
        ${this.showMarks ? html`
          <div class="slider-marks">
            <span class="slider-mark">${this.min}${this.unit}</span>
            <span class="slider-mark">${this.max}${this.unit}</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-slider': Slider;
  }
}
