import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Pagination Component
 */
@customElement('crt-pagination')
export class Pagination extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-xs);
    }

    .page-btn {
      min-width: 36px;
      height: 36px;
      padding: var(--crt-spacing-xs) var(--crt-spacing-sm);
      background: transparent;
      border: 2px solid var(--crt-primary);
      color: var(--crt-primary);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .page-btn:hover:not(:disabled):not(.active) {
      background: transparent;
    }

    .page-btn.active {
      background: var(--crt-primary);
      color: var(--crt-bg-dark);
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-ellipsis {
      color: var(--crt-text-muted);
      padding: 0 var(--crt-spacing-xs);
    }

    .page-info {
      color: var(--crt-text-secondary);
      font-size: var(--crt-font-size-sm);
      margin-left: var(--crt-spacing-md);
    }
  `;

  @property({ type: Number }) current = 1;
  @property({ type: Number }) total = 1;
  @property({ type: Number }) siblings = 1;
  @property({ type: Boolean }) showInfo = true;

  private _goToPage(page: number) {
    if (page >= 1 && page <= this.total && page !== this.current) {
      this.current = page;
      this.dispatchEvent(new CustomEvent('change', {
        detail: { page: this.current }
      }));
    }
  }

  private _getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const showEllipsisStart = this.current > this.siblings + 2;
    const showEllipsisEnd = this.current < this.total - this.siblings - 1;

    // Always show first page
    pages.push(1);

    if (showEllipsisStart) {
      pages.push('...');
    }

    // Calculate range around current page
    const start = Math.max(2, this.current - this.siblings);
    const end = Math.min(this.total - 1, this.current + this.siblings);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (showEllipsisEnd) {
      pages.push('...');
    }

    // Always show last page (if more than 1 page)
    if (this.total > 1 && !pages.includes(this.total)) {
      pages.push(this.total);
    }

    return pages;
  }

  render() {
    const pages = this._getPageNumbers();
    
    return html`
      <nav class="pagination" aria-label="Pagination">
        <button 
          class="page-btn" 
          ?disabled="${this.current === 1}"
          @click="${() => this._goToPage(this.current - 1)}"
          aria-label="Previous page"
        >
          ◄
        </button>
        
        ${pages.map(page => 
          page === '...'
            ? html`<span class="page-ellipsis">...</span>`
            : html`
                <button 
                  class="page-btn ${page === this.current ? 'active' : ''}"
                  @click="${() => this._goToPage(page as number)}"
                  aria-label="Page ${page}"
                  aria-current="${page === this.current ? 'page' : 'false'}"
                >
                  ${page}
                </button>
              `
        )}
        
        <button 
          class="page-btn" 
          ?disabled="${this.current === this.total}"
          @click="${() => this._goToPage(this.current + 1)}"
          aria-label="Next page"
        >
          ►
        </button>
        
        ${this.showInfo ? html`
          <span class="page-info">Seite ${this.current} von ${this.total}</span>
        ` : ''}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-pagination': Pagination;
  }
}
