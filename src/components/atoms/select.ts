import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * CRT Select/Dropdown Component
 * Custom styled select with options
 */
@customElement('crt-select')
export class Select extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      font-family: var(--crt-font-family);
      min-width: 200px;
    }

    .select-label {
      display: block;
      color: var(--crt-text-secondary);
      font-size: var(--crt-font-size-sm);
      margin-bottom: var(--crt-spacing-xs);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .select-wrapper {
      position: relative;
    }

    .select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: transparent;
      border: 2px solid var(--crt-primary);
      color: var(--crt-primary);
      padding: var(--crt-spacing-md);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-base);
      cursor: var(--crt-cursor-pointer);
      box-shadow: var(--crt-component-glow-inset);
      transition: var(--crt-transition);
      width: 100%;
    }

    .select-trigger:hover:not(.disabled) {
      box-shadow: var(--crt-component-glow-inset), var(--crt-component-glow-sm);
    }

    .select-trigger.open {
      border-bottom-color: transparent;
    }

    .select-trigger.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      border-style: dashed;
    }

    .select-value {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-value.placeholder {
      color: var(--crt-text-muted);
    }

    .select-arrow {
      margin-left: var(--crt-spacing-sm);
      transition: transform 0.2s;
    }

    .select-trigger.open .select-arrow {
      transform: rotate(180deg);
    }

    .select-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 2px solid var(--crt-primary);
      border-top: none;
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
      box-shadow: 
        0 10px 20px color-mix(in srgb, var(--crt-primary) 20%, transparent),
        var(--crt-component-glow-inset);
    }

    .select-dropdown.open {
      display: block;
      animation: dropdown-in 0.2s ease;
    }

    @keyframes dropdown-in {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .select-option {
      padding: var(--crt-spacing-md);
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
      border-bottom: 1px solid color-mix(in srgb, var(--crt-primary) 20%, transparent);
    }

    .select-option:last-child {
      border-bottom: none;
    }

    .select-option:hover {
      background: transparent;
    }

    .select-option.selected {
      background: transparent;
      color: var(--crt-primary);
    }

    .select-option.selected::before {
      content: '► ';
    }

    .select-option.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .select-group-label {
      padding: var(--crt-spacing-sm) var(--crt-spacing-md);
      font-size: var(--crt-font-size-sm);
      color: var(--crt-text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1px solid color-mix(in srgb, var(--crt-primary) 30%, transparent);
      background: transparent;
    }

    /* Scrollbar styling */
    .select-dropdown::-webkit-scrollbar {
      width: 8px;
    }

    .select-dropdown::-webkit-scrollbar-track {
      background: transparent;
    }

    .select-dropdown::-webkit-scrollbar-thumb {
      background: var(--crt-primary);
      box-shadow: var(--crt-component-glow-sm);
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select...';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Array }) options: Array<
    | { value: string; label: string; disabled?: boolean; group?: string }
    | { group: string; options: Array<{ value: string; label: string; disabled?: boolean }> }
  > = [];

  @state() private _isOpen = false;

  // Normalize options to flat array with group property
  private _getNormalizedOptions(): Array<{ value: string; label: string; disabled?: boolean; group?: string }> {
    const result: Array<{ value: string; label: string; disabled?: boolean; group?: string }> = [];
    
    for (const opt of this.options) {
      if ('options' in opt && Array.isArray(opt.options)) {
        // Grouped format: { group: 'Name', options: [...] }
        for (const subOpt of opt.options) {
          result.push({ ...subOpt, group: opt.group });
        }
      } else if ('value' in opt) {
        // Simple format: { value, label, group? }
        result.push(opt as { value: string; label: string; disabled?: boolean; group?: string });
      }
    }
    
    return result;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this._isOpen = false;
    }
  };

  private _toggle() {
    if (!this.disabled) {
      this._isOpen = !this._isOpen;
    }
  }

  private _selectOption(option: { value: string; label: string; disabled?: boolean }) {
    if (option.disabled) return;
    
    this.value = option.value;
    this._isOpen = false;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: option.value, label: option.label }
    }));
  }

  private _getSelectedLabel(): string {
    const normalizedOptions = this._getNormalizedOptions();
    const selected = normalizedOptions.find(o => o.value === this.value);
    return selected?.label || '';
  }

  private _renderOptions() {
    const normalizedOptions = this._getNormalizedOptions();
    
    // Group options if they have group property
    const groups = new Map<string, Array<{ value: string; label: string; disabled?: boolean; group?: string }>>();
    const ungrouped: Array<{ value: string; label: string; disabled?: boolean; group?: string }> = [];

    normalizedOptions.forEach(option => {
      if (option.group) {
        if (!groups.has(option.group)) {
          groups.set(option.group, []);
        }
        groups.get(option.group)!.push(option);
      } else {
        ungrouped.push(option);
      }
    });

    const result = [];

    // Render ungrouped first
    for (const option of ungrouped) {
      result.push(this._renderOption(option));
    }

    // Render grouped
    for (const [groupName, groupOptions] of groups) {
      result.push(html`<div class="select-group-label">${groupName}</div>`);
      for (const option of groupOptions) {
        result.push(this._renderOption(option));
      }
    }

    return result;
  }

  private _renderOption(option: { value: string; label: string; disabled?: boolean }) {
    const isSelected = option.value === this.value;
    return html`
      <div 
        class="select-option ${isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}"
        @click="${() => this._selectOption(option)}"
      >
        ${option.label}
      </div>
    `;
  }

  render() {
    const selectedLabel = this._getSelectedLabel();
    
    return html`
      ${this.label ? html`<label class="select-label">${this.label}</label>` : ''}
      <div class="select-wrapper">
        <div 
          class="select-trigger ${this._isOpen ? 'open' : ''} ${this.disabled ? 'disabled' : ''}"
          @click="${this._toggle}"
        >
          <span class="select-value ${!selectedLabel ? 'placeholder' : ''}">
            ${selectedLabel || this.placeholder}
          </span>
          <span class="select-arrow">▼</span>
        </div>
        
        <div class="select-dropdown ${this._isOpen ? 'open' : ''}">
          ${this._renderOptions()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-select': Select;
  }
}
