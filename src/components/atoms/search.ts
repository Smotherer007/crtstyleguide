import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type Suggestion = { value: string; label?: string; id?: string; href?: string };

@customElement('crt-search')
export class Search extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Search...';
  @property({ type: Number }) debounceMs = 300;
  @property({ type: Number }) minLength = 1;
  @property({ type: Array }) suggestions: Suggestion[] = [];
  // Optional fetcher callback (set as property in JS)
  @property() fetcher?: (q: string) => Promise<Suggestion[]> | Suggestion[];

  @state() private _open = false;
  @state() private _activeIndex: number = -1;
  @state() private _filtered: Suggestion[] = [];
  @state() private _loading = false;

  private _debounceTimer?: number;
  private _id = `crt-search-${Math.random().toString(36).slice(2, 9)}`;

  static styles = css`
    :host { display: block; font-family: var(--crt-font-family); }

    .search {
      position: relative;
      width: 100%;
      min-width: 0;
    }

    .input {
      width: 100%;
      padding: var(--crt-spacing-md);
      font-family: var(--crt-font-family);
      background: transparent;
      color: var(--crt-text-primary);
      border: 2px solid var(--crt-primary);
      box-sizing: border-box;
      transition: var(--crt-transition);
      cursor: var(--crt-cursor-text);
    }

    .input::placeholder {
      color: var(--crt-text-primary);
    }

    .input:focus {
      outline: none;
      box-shadow: none;
    }

    .list {
      position: absolute;
      top: calc(100% + var(--crt-spacing-xs));
      left: 0;
      right: 0;
      background: transparent;
      border: 2px solid var(--crt-primary);
      box-shadow: none;
      max-height: 240px;
      overflow-y: auto;
      z-index: 1000;
      padding: 0;
      margin: 0;
    }

    .item {
      list-style: none;
      padding: var(--crt-spacing-md);
      cursor: var(--crt-cursor-pointer);
      color: var(--crt-text-primary);
      transition: var(--crt-transition);
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
    }

    .item:hover,
    .item[aria-selected="true"] {
      background: transparent;
      color: var(--crt-primary);
    }

    .empty {
      padding: var(--crt-spacing-md);
      color: var(--crt-text-muted);
      text-align: center;
    }

    .loading {
      padding: var(--crt-spacing-md);
      color: var(--crt-text-muted);
      text-align: center;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._filtered = [...this.suggestions];
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('suggestions')) {
      this._filtered = [...this.suggestions];
    }
  }

  private _onInput(e: InputEvent) {
    const v = (e.target as HTMLInputElement).value;
    this.value = v;
    this.dispatchEvent(new CustomEvent('input-change', { detail: { value: this.value } }));

    if (this._debounceTimer) window.clearTimeout(this._debounceTimer);

    if (this.value.length < this.minLength) {
      this._open = false;
      this._filtered = [];
      return;
    }

    this._debounceTimer = window.setTimeout(async () => {
      this._loading = true;
      if (this.fetcher) {
        try {
          const res = await this.fetcher(this.value);
          this._filtered = (res || []).slice(0, 50);
        } catch (err) {
          console.warn('crt-search: fetcher error', err);
          this._filtered = [];
        }
      } else {
        const q = this.value.toLowerCase();
        this._filtered = this.suggestions.filter(s => (s.label || s.value).toLowerCase().includes(q)).slice(0, 50);
      }
      this._activeIndex = this._filtered.length > 0 ? 0 : -1;
      this._open = this._filtered.length > 0;
      this._loading = false;
    }, this.debounceMs);
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (!this._open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      // open if possible
      if (this._filtered.length > 0) this._open = true;
    }

    if (!this._open) {
      if (e.key === 'Enter') {
        this.dispatchEvent(new CustomEvent('search', { detail: { value: this.value } }));
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._activeIndex = (this._activeIndex + 1) % this._filtered.length;
        this._scrollIntoView();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._activeIndex = (this._activeIndex - 1 + this._filtered.length) % this._filtered.length;
        this._scrollIntoView();
        break;
      case 'Home':
        e.preventDefault();
        this._activeIndex = 0;
        this._scrollIntoView();
        break;
      case 'End':
        e.preventDefault();
        this._activeIndex = this._filtered.length - 1;
        this._scrollIntoView();
        break;
      case 'Enter':
        e.preventDefault();
        if (this._activeIndex >= 0 && this._filtered[this._activeIndex]) {
          this._select(this._activeIndex);
        } else {
          this.dispatchEvent(new CustomEvent('search', { detail: { value: this.value } }));
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._open = false;
        break;
    }
  }

  private _scrollIntoView() {
    const list = this.shadowRoot?.querySelector('.list') as HTMLElement | null;
    const el = list?.querySelectorAll('.item')[this._activeIndex] as HTMLElement | undefined;
    if (el && list) {
      const rect = el.getBoundingClientRect();
      const lrect = list.getBoundingClientRect();
      if (rect.top < lrect.top) el.scrollIntoView({ block: 'nearest' });
      if (rect.bottom > lrect.bottom) el.scrollIntoView({ block: 'nearest' });
    }
  }

  private _select(index: number) {
    const s = this._filtered[index];
    if (!s) return;
    this.value = s.value;
    this._open = false;
    this._activeIndex = -1;
    // Include the full suggestion object and index in the event detail
    this.dispatchEvent(new CustomEvent('select', { detail: { item: s, value: s.value, label: s.label, index } }));
  }

  private _onBlur() {
    // Delay to allow click selection
    setTimeout(() => {
      const active = this.shadowRoot?.activeElement;
      if (!active || !(active as HTMLElement).classList?.contains('item')) {
        this._open = false;
        this._activeIndex = -1;
      }
    }, 150);
  }

  render() {
    const listId = `${this._id}-list`;

    return html`
      <div class="search">
        <input
          class="input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="${this._open ? 'true' : 'false'}"
          aria-controls="${listId}"
          aria-activedescendant="${this._activeIndex >= 0 ? `${this._id}-option-${this._activeIndex}` : ''}"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
          @blur=${this._onBlur}
        />

        ${this._open ? html`
          <ul class="list" id="${listId}" role="listbox">
            ${this._loading ? html`<li class="loading">Loading...</li>` : ''}
            ${this._filtered.length === 0 && !this._loading ? html`<li class="empty">No results</li>` : ''}
            ${this._filtered.map((s, i) => html`
              <li
                id="${this._id}-option-${i}"
                class="item"
                role="option"
                aria-selected="${this._activeIndex === i ? 'true' : 'false'}"
                @click="${() => this._select(i)}"
              >
                ${s.label ?? s.value}
              </li>
            `)}
          </ul>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-search': Search;
  }
}
