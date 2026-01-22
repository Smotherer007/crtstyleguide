import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Checkbox Component
 */
@customElement('crt-checkbox')
export class Checkbox extends LitElement {
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

    :host([disabled]) .checkbox-box {
      border-style: dashed;
    }

    .checkbox-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .checkbox-box {
      width: 20px;
      height: 20px;
      border: 2px solid var(--crt-primary);
      background: var(--crt-bg-dark);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--crt-transition);
      box-shadow: var(--crt-glow-inset);
    }

    :host(:hover:not([disabled])) .checkbox-box {
      box-shadow: var(--crt-glow-inset), var(--crt-glow-sm);
    }

    input:checked + .checkbox-box {
      background: var(--crt-primary);
      box-shadow: var(--crt-glow-sm);
    }

    .checkmark {
      color: var(--crt-bg-dark);
      font-size: 14px;
      font-weight: bold;
      opacity: 0;
      transform: scale(0);
      transition: all 0.15s ease;
    }

    input:checked + .checkbox-box .checkmark {
      opacity: 1;
      transform: scale(1);
    }

    .label {
      color: var(--crt-text-primary);
      user-select: none;
    }

    /* Indeterminate state */
    input:indeterminate + .checkbox-box {
      background: color-mix(in srgb, var(--crt-primary) 50%, var(--crt-bg-dark));
    }

    input:indeterminate + .checkbox-box .checkmark {
      opacity: 1;
      transform: scale(1);
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked, value: this.value }
    }));
  }

  render() {
    return html`
      <label class="checkbox-wrapper">
        <input 
          type="checkbox" 
          .checked="${this.checked}"
          .indeterminate="${this.indeterminate}"
          ?disabled="${this.disabled}"
          @change="${this._handleChange}"
        />
        <div class="checkbox-box">
          <span class="checkmark">${this.indeterminate ? '−' : '✓'}</span>
        </div>
      </label>
      ${this.label ? html`<span class="label">${this.label}</span>` : ''}
    `;
  }
}

/**
 * CRT Radio Component
 */
@customElement('crt-radio')
export class Radio extends LitElement {
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

    :host([disabled]) .radio-circle {
      border-style: dashed;
    }

    .radio-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .radio-circle {
      width: 20px;
      height: 20px;
      border: 2px solid var(--crt-primary);
      border-radius: 50%;
      background: var(--crt-bg-dark);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--crt-transition);
      box-shadow: var(--crt-glow-inset);
    }

    :host(:hover:not([disabled])) .radio-circle {
      box-shadow: var(--crt-glow-inset), var(--crt-glow-sm);
    }

    .radio-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--crt-primary);
      opacity: 0;
      transform: scale(0);
      transition: all 0.15s ease;
      box-shadow: var(--crt-glow-sm);
    }

    input:checked + .radio-circle .radio-dot {
      opacity: 1;
      transform: scale(1);
    }

    input:checked + .radio-circle {
      box-shadow: var(--crt-glow-sm);
    }

    .label {
      color: var(--crt-text-primary);
      user-select: none;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) name = '';

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.checked) {
      this.checked = true;
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true
      }));
    }
  }

  render() {
    return html`
      <label class="radio-wrapper">
        <input 
          type="radio" 
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          name="${this.name}"
          value="${this.value}"
          @change="${this._handleChange}"
        />
        <div class="radio-circle">
          <div class="radio-dot"></div>
        </div>
      </label>
      ${this.label ? html`<span class="label">${this.label}</span>` : ''}
    `;
  }
}

/**
 * CRT Radio Group Component
 */
@customElement('crt-radio-group')
export class RadioGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--crt-spacing-sm);
    }

    :host([horizontal]) {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--crt-spacing-lg);
    }
  `;

  @property({ type: String }) name = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) horizontal = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', this._handleChange as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('change', this._handleChange as EventListener);
  }

  private _handleChange = (e: CustomEvent) => {
    const target = e.target as Radio;
    if (target.tagName === 'CRT-RADIO') {
      this.value = target.value;
      
      // Uncheck other radios
      this.querySelectorAll('crt-radio').forEach(radio => {
        (radio as Radio).checked = radio === target;
      });
      
      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: this.value }
      }));
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-checkbox': Checkbox;
    'crt-radio': Radio;
    'crt-radio-group': RadioGroup;
  }
}
