import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '../atoms/link';
import '../atoms/button';

export interface NavItem {
  href: string;
  label: string;
  id?: string;
  active?: boolean;
}

@customElement('crt-navbar')
export class Navbar extends LitElement {
  @property({ type: Array }) items: NavItem[] = [];
  @property({ type: String }) brand = '';
  @state() private _open = false;
  @property({ type: Number }) maxVisible?: number; // if undefined, show all items (no collapsing into MORE)

  static styles = css`
    :host { display: block; font-family: var(--crt-font-family); }
    .nav {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: var(--crt-spacing-md) var(--crt-spacing-lg);
      background: transparent;
      border-bottom: 2px solid var(--crt-primary);
      box-shadow: var(--crt-component-glow-inset);
    }

    .brand {
      display: flex;
      gap: 12px;
      align-items: center;
      color: var(--crt-primary);
      text-shadow: var(--crt-component-glow);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .menu {
      display: flex;
      gap: 12px;
      align-items: center;
      overflow: hidden;
      min-width: 0;
    }

    .link {
      color: var(--crt-primary);
      padding: 8px 12px;
      text-decoration: none;
      border: 1px solid transparent;
      transition: var(--crt-transition);
      font-family: var(--crt-font-family);
      text-transform: uppercase;
      letter-spacing: 1px;
      white-space: nowrap;
    }

    .link:hover {
      background: transparent;
      box-shadow: var(--crt-component-glow-sm);
    }

    .link[aria-current="true"] {
      background: transparent;
      box-shadow: var(--crt-component-glow);
      color: var(--crt-bg-dark);
    }

    /* .more-button replaced with crt-button - keep visual spacing rules */
    .more-button {
      background: transparent;
      border: 1px solid transparent;
      color: var(--crt-primary);
      padding: 0;
    }

    .more-dropdown-container {
      position: absolute;
      right: 0;
      margin-top: 8px;
    }

    .toggle {
      display: none;
      background: transparent;
      border: 1px solid var(--crt-primary);
      color: var(--crt-primary);
      padding: 8px;
      cursor: var(--crt-cursor-pointer);
      font-family: var(--crt-font-family);
    }

    @media (max-width: 720px) {
      .menu { display: none; }
      .menu.open { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
      .toggle { display: inline-flex; }
      .nav { flex-direction: column; align-items: stretch; }
      .brand { justify-content: space-between; width: 100%; }
    }
  `;

  private _toggle() {
    this._open = !this._open;
  }

  private _onLinkClick(e: Event, item: NavItem) {
    // If it's an in-page anchor (hash), handle smooth scroll and update hash
    try {
      const href = (item.href || '').trim();
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href) as HTMLElement | null;
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          try { history.replaceState(null, '', href); } catch (err) { location.hash = href; }
        } else {
          console.warn('crt-navbar: target not found for', href);
        }
      }
    } catch (err) {
      // fall back to default behavior
    }

    this.dispatchEvent(new CustomEvent('nav-select', { detail: item }));

    // update active state locally for preview
    this.items = this.items.map(i => ({ ...i, active: i.href === item.href }));

  }

  private _onMenuSelect(e: CustomEvent) {
    const item: NavItem = e.detail?.item;
    if (!item) return;
    // reuse link handling (smooth scroll) directly for menu items
    this._handleNavHref(item.href);
    this.items = this.items.map(i => ({ ...i, active: i.href === item.href }));
  }

  private _onLinkNavigate(e: CustomEvent, item: NavItem) {
    // Called when <crt-link> internal hash navigation is intercepted
    e.stopPropagation();
    this._handleNavHref(item.href);
    this.items = this.items.map(i => ({ ...i, active: i.href === item.href }));
  }

  private _handleNavHref(href?: string) {
    const link = (href || '').trim();
    if (link && link.startsWith('#')) {
      const target = document.querySelector(link) as HTMLElement | null;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        try { history.replaceState(null, '', link); } catch (err) { location.hash = link; }
      }
    }
  }

  render() {
    const visible = typeof this.maxVisible === 'number' ? this.items.slice(0, this.maxVisible) : this.items.slice(0);
    const more = typeof this.maxVisible === 'number' ? this.items.slice(this.maxVisible) : [];

    return html`
      <nav class="nav" role="navigation" aria-label="Main Navigation">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div class="brand">
            <slot name="brand">${this.brand || 'CRT'}</slot>
          </div>
          <button class="toggle" @click="${this._toggle}" aria-expanded="${this._open ? 'true' : 'false'}" aria-label="Toggle navigation">☰</button>
        </div>

        <div class="menu ${this._open ? 'open' : ''}" role="menubar">
          ${visible.map(item => html`
            <crt-link
              href="${item.href}"
              class="link"
              ?aria-current="${item.active ? true : undefined}"
              @click=${(e: Event) => this._onLinkClick(e, item)}
              @navigate=${(e: CustomEvent) => this._onLinkNavigate(e, item)}
              >${item.label}</crt-link>
          `)}

          ${more.length > 0 ? html`
            <div style="position:relative;">
              <crt-menu .items="${more}" label="MORE" class="more-dropdown-container" @select="${(e: CustomEvent) => this._onMenuSelect(e)}"></crt-menu>
            </div>
          ` : ''}

          <slot name="end"></slot>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-navbar': Navbar;
  }
}
