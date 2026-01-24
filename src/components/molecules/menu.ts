import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface MenuItem {
  id?: string;
  label: string;
  href?: string;
  disabled?: boolean;
}

@customElement('crt-menu')
export class Menu extends LitElement {
  @property({ type: Array }) items: MenuItem[] = [];
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) label = 'Menu';
  @state() private _active = -1;

  static styles = css`
    :host { display: inline-block; position: relative; font-family: var(--crt-font-family); }
    button.trigger {
      background: transparent;
      border: 1px solid var(--crt-primary);
      color: var(--crt-primary);
      padding: 8px 10px;
      cursor: var(--crt-cursor-pointer);
      font-family: var(--crt-font-family);
    }

    .dropdown {
      position: absolute;
      right: 0;
      background: transparent;
      border: 2px solid var(--crt-primary);
      margin-top: 8px;
      min-width: 160px;
      display: none;
      flex-direction: column;
      z-index: 2000;
    }

    .dropdown.open { display: flex; }

    .item {
      padding: var(--crt-spacing-sm) var(--crt-spacing-md);
      cursor: var(--crt-cursor-pointer);
      color: var(--crt-primary);
      white-space: nowrap;
    }

    .item[aria-disabled='true'] { opacity: 0.5; cursor: not-allowed; }

    .item[aria-selected='true'] {
      background: transparent;
      color: var(--crt-bg-dark);
    }
  `;

  private _triggerId = `crt-menu-trigger-${Math.random().toString(36).slice(2,8)}`;
  private _listId = `crt-menu-list-${Math.random().toString(36).slice(2,8)}`;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('keydown', this._onDocKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('keydown', this._onDocKeydown);
  }

  private _onDocClick = (e: MouseEvent) => {
    if (!this.open) return;
    if (!this.contains(e.target as Node)) {
      this.open = false;
      this._active = -1;
      (this.shadowRoot?.querySelector(`button.trigger`) as HTMLElement | null)?.focus();
    }
  };

  private _onDocKeydown = (e: KeyboardEvent) => {
    if (!this.open) return;
    // Close on Escape
    if (e.key === 'Escape') {
      this.open = false;
      this._active = -1;
      (this.shadowRoot?.querySelector(`button.trigger`) as HTMLElement | null)?.focus();
    }
  };

  private _toggle = () => {
    this.open = !this.open;
    if (this.open) {
      // set initial focus to first non-disabled
      this._active = this.items.findIndex(i => !i.disabled);
      this.updateComplete.then(() => {
        this._focusActive();
      });
    } else {
      this._active = -1;
      (this.shadowRoot?.querySelector(`button.trigger`) as HTMLElement | null)?.focus();
    }
  };

  private _focusActive() {
    // update DOM tab indices and focus the active element
    const list = this.shadowRoot?.querySelectorAll('.item') as NodeListOf<HTMLElement> | null;
    if (!list) return;
    list.forEach((el, idx) => el.setAttribute('tabindex', this._active === idx ? '0' : '-1'));
    const el = list[this._active];
    el?.focus();
  }

  private _onKey(e: KeyboardEvent) {
    if (!this.open) return;

    // Allow Tab to close menu and move focus naturally
    if (e.key === 'Tab') {
      this.open = false;
      this._active = -1;
      return;
    }

    const enabled = this.items.map((it, idx) => ({ it, idx })).filter(x => !x.it.disabled);
    if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowDown': {
        const next = enabled.find(x => x.idx > this._active) || enabled[0];
        this._active = next?.idx ?? this._active;
        this._focusActive();
        break;
      }
      case 'ArrowUp': {
        const prevs = enabled.filter(x => x.idx < this._active);
        const prev = prevs[prevs.length - 1] || enabled[enabled.length - 1];
        this._active = prev?.idx ?? this._active;
        this._focusActive();
        break;
      }
      case 'Home':
        this._active = enabled[0]?.idx ?? this._active;
        this._focusActive();
        break;
      case 'End':
        this._active = enabled[enabled.length - 1]?.idx ?? this._active;
        this._focusActive();
        break;
      case 'Enter':
      case ' ':
        if (this._active >= 0) this._select(this._active);
        break;
    }
  }

  private _select(index: number) {
    const item = this.items[index];
    if (!item || item.disabled) return;
    this.open = false;
    this._active = -1;
    this.dispatchEvent(new CustomEvent('select', { detail: { item, index } }));
    // If href provided, follow it (same window)
    if (item.href) {
      window.location.href = item.href;
    }
    // return focus to trigger
    (this.shadowRoot?.querySelector(`button.trigger`) as HTMLElement | null)?.focus();
  }

  render() {
    return html`
      <div style="display:flex;align-items:center;gap:8px;">
        <button id="${this._triggerId}" class="trigger" @click=${this._toggle} aria-expanded="${this.open ? 'true' : 'false'}" aria-haspopup="true" aria-controls="${this._listId}" aria-label="${this.label}">${this.label} ▾</button>
        <div id="${this._listId}" class="dropdown ${this.open ? 'open' : ''}" role="menu" aria-labelledby="${this._triggerId}" @keydown=${(e: KeyboardEvent) => this._onKey(e)}>
          ${this.items.map((it, i) => html`
            <div
              class="item"
              role="menuitem"
              tabindex="${this._active === i ? '0' : '-1'}"
              aria-disabled="${it.disabled ? 'true' : 'false'}"
              aria-selected="${this._active === i ? 'true' : 'false'}"
              @click=${() => this._select(i)}
              @keydown=${(e: KeyboardEvent) => this._onKey(e)}
            >${it.label}</div>
          `)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-menu': Menu;
  }
}
