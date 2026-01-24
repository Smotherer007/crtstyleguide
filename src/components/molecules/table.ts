import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-table')
export class Table extends LitElement {
  @property({ type: Array }) headers: string[] = [];
  @property({ type: Array }) rows: (string | number)[][] = [];

  static styles = css`
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
      opacity: 0.2;
      transition: var(--crt-transition);
    }

    tbody tr:hover {
      background-color: transparent;
      box-shadow: none;
    }

    td {
      color: var(--crt-primary);
      padding: var(--crt-spacing-md);
    }

    tbody tr:last-child {
      border-bottom: none;
    }
  `;

  render() {
    return html`
      <table>
        <thead>
          <tr>
            ${this.headers.map((header) => html`<th>${header}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.rows.map((row) => html`<tr>${row.map((cell) => html`<td>${cell}</td>`)}</tr>`)}
        </tbody>
      </table>
    `;
  }
}
