import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../atoms/pagination';

@customElement('crt-table')
export class Table extends LitElement {
  @property({ type: Array }) headers: string[] = [];
  @property({ type: Array }) rows: (string | number)[][] = [];
  @property({ type: Number }) page = 1;
  @property({ type: Number, attribute: 'page-size' }) pageSize = 0;
  @property({ type: Boolean, attribute: 'show-pagination' }) showPagination = true;

  static readonly styles = css`
    :host {
      display: block;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      border: 2px solid var(--crt-primary);
    }

    thead {
      background-color: transparent;
      border-bottom: 2px solid var(--crt-primary);
    }

    th {
      color: var(--crt-primary);
      padding: var(--crt-spacing-md);
      text-align: left;
      text-transform: uppercase;
      letter-spacing: var(--crt-letter-spacing);
      font-weight: 600;
    }

    tbody tr {
      border-bottom: 1px solid var(--crt-border-color);
      transition: var(--crt-transition);
    }

    tbody tr:hover {
      background-color: transparent;
      box-shadow: none;
    }

    td {
      color: var(--crt-text-primary);
      padding: var(--crt-spacing-md);
    }

    tbody tr:last-child {
      border-bottom: none;
    }
  `;

  render() {
    const hasPagination = this.pageSize > 0;
    const totalPages = hasPagination ? Math.max(1, Math.ceil(this.rows.length / this.pageSize)) : 1;
    const safePage = Math.min(Math.max(this.page, 1), totalPages);
    if (safePage !== this.page) {
      this.page = safePage;
    }
    const start = hasPagination ? (safePage - 1) * this.pageSize : 0;
    const end = hasPagination ? start + this.pageSize : this.rows.length;
    const visibleRows = hasPagination ? this.rows.slice(start, end) : this.rows;

    const renderCell = (cell: string | number) => html`<td>${cell}</td>`;
    const renderRow = (row: (string | number)[]) => html`<tr>${row.map(renderCell)}</tr>`;

    return html`
      <table>
        <thead>
          <tr>
            ${this.headers.map((header) => html`<th>${header}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${visibleRows.map(renderRow)}
        </tbody>
      </table>
      ${hasPagination && this.showPagination && totalPages > 1 ? html`
        <div style="margin-top: var(--crt-spacing-md); display: flex; justify-content: flex-end;">
          <crt-pagination
            .current=${safePage}
            .total=${totalPages}
            @change=${(e: CustomEvent) => {
              const next = Number(e.detail?.page || 1);
              this.page = next;
              this.dispatchEvent(new CustomEvent('page-change', {
                detail: { page: this.page, pageSize: this.pageSize, totalPages },
                bubbles: true,
                composed: true,
              }));
            }}
          ></crt-pagination>
        </div>
      ` : ''}
    `;
  }
}
