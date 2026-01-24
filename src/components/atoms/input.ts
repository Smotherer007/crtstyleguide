import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-input')
export class Input extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    input {
      display: block;
      width: 100%;
      padding: var(--crt-spacing-md);
      background-color: transparent;
      color: var(--crt-text-primary);
      border: 2px solid var(--crt-primary);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-base);
      letter-spacing: 1px;
      transition: var(--crt-transition);
      box-sizing: border-box;
      cursor: var(--crt-cursor-text);
    }

    input::placeholder {
      color: var(--crt-text-muted);
    }

    input:hover:not(:disabled) {
      box-shadow: none;
    }

    input:focus:not(:disabled) {
      outline: none;
      box-shadow: var(--crt-glow-inset);
    }

    input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      border-style: dashed;
    }

    :host([type='search']) input {
      border-radius: 20px;
      padding-left: var(--crt-spacing-lg);
      padding-right: var(--crt-spacing-lg);
    }
  `;

  @property() type: string = 'text';
  @property() placeholder: string = '';
  @property() value: string = '';
  @property() disabled: boolean = false;

  render() {
    return html`
      <input
        type="${this.type}"
        placeholder="${this.placeholder}"
        value="${this.value}"
        ?disabled="${this.disabled}"
        @input="${(e: Event) => {
          this.value = (e.target as HTMLInputElement).value;
        }}"
      />
    `;
  }
}

@customElement('crt-textarea')
export class Textarea extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    textarea {
      display: block;
      width: 100%;
      padding: var(--crt-spacing-md);
      background-color: transparent;
      color: var(--crt-text-primary);
      border: 2px solid var(--crt-primary);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-base);
      letter-spacing: 1px;
      transition: var(--crt-transition);
      resize: vertical;
      min-height: 120px;
      box-sizing: border-box;
      cursor: var(--crt-cursor-text);
    }

    textarea::placeholder {
      color: var(--crt-text-muted);
    }

    textarea:hover:not(:disabled) {
      box-shadow: none;
    }

    textarea:focus:not(:disabled) {
      outline: none;
      box-shadow: var(--crt-glow-inset);
    }

    textarea:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      border-style: dashed;
    }
  `;

  @property() placeholder: string = '';
  @property() value: string = '';
  @property() disabled: boolean = false;
  @property() rows: number = 4;

  render() {
    return html`
      <textarea
        .value=${this.value}
        placeholder="${this.placeholder}"
        rows="${this.rows}"
        ?disabled="${this.disabled}"
        @input="${(e: Event) => {
          this.value = (e.target as HTMLTextAreaElement).value;
        }}"
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-input': Input;
    'crt-textarea': Textarea;
  }
}
