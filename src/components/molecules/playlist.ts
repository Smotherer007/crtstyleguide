import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './card';
import '../atoms/typography';
import '../atoms/button';

export interface Track {
  title: string;
  artist: string;
  url: string;
  lyrics?: string;
}

@customElement('crt-playlist')
export class Playlist extends LitElement {
  @property({ type: Array }) tracks: Track[] = [];
  @property({ type: Number }) currentIndex = 0;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    /* Table Styles */
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      border: 2px solid var(--crt-primary);
      box-shadow: var(--crt-component-glow-sm);
      box-sizing: border-box;
      table-layout: fixed;
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
      text-shadow: var(--crt-component-glow);
    }

    th.actions {
      width: 48px;
      text-align: center;
    }

    /* Fix column widths in fixed table layout so title column can shrink
       without forcing the whole table to overflow */
    thead th:first-child { width: 48px; }
    thead th:nth-child(2) { width: auto; }

    tbody tr {
      border-bottom: 1px solid rgba(51, 255, 51, 0.2);
      transition: var(--crt-transition);
      cursor: var(--crt-cursor-pointer);
    }

    tbody tr:hover {
      background-color: transparent;
      box-shadow: inset 0 0 20px rgba(51, 255, 51, 0.1);
    }

    tbody tr.active {
      background-color: transparent;
      box-shadow: inset 0 0 30px rgba(51, 255, 51, 0.2);
    }

    tbody tr.active td {
      color: var(--crt-success);
      text-shadow: var(--crt-component-glow);
    }

    td {
      color: var(--crt-primary);
      padding: var(--crt-spacing-md);
      border-right: 1px solid rgba(51, 255, 51, 0.1);
    }

    td:last-child {
      border-right: none;
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    td.track-number {
      min-width: 48px;
      width: 48px;
      text-align: center;
      opacity: 0.7;
    }

    td.track-title {
      /* Allow titles to wrap on narrow screens to avoid forcing huge action column widths */
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
      word-break: break-word;
    }

    td.track-artist {
      opacity: 0.8;
    }

    td.actions {
      text-align: center;
    }

    .remove-btn {
      /* Visible by default at low opacity so touch devices can see it */
      opacity: 0.65;
      transition: var(--crt-transition);
    }

    tbody tr:hover .remove-btn {
      opacity: 1;
    }

    /* Empty state */
    .empty-state {
      cursor: var(--crt-cursor-pointer);
      text-align: center;
      padding: var(--crt-spacing-xl);
      transition: var(--crt-transition);
      /* Ensure the empty preview stretches to the container width */
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .empty-state:hover {
      background: transparent;
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: var(--crt-spacing-md);
      color: var(--crt-primary);
      text-shadow: var(--crt-component-glow);
    }

    /* Scrollbar wrapper */
    .table-wrapper {
      max-height: 400px;
      overflow-y: auto;
      min-width: 0;
      scrollbar-width: thin;
      scrollbar-color: var(--crt-primary) var(--crt-bg-dark);
    }

    /* Responsive: hide artist on narrow screens and allow horizontal scroll fallback */
    @media (max-width: 520px) {
      /* Keep artist visible on narrow screens but allow wrapping */
      td.track-artist { display: table-cell; max-width: 120px; white-space: normal; word-break: break-word; }
      td.track-title { max-width: 140px; min-width: 0; white-space: normal; }
      .table-wrapper { overflow-x: auto; min-width: 0; }
    }

    .table-wrapper::-webkit-scrollbar {
      width: 10px;
    }

    .table-wrapper::-webkit-scrollbar-track {
      background: transparent;
      border: 1px solid var(--crt-primary);
    }

    .table-wrapper::-webkit-scrollbar-thumb {
      background: rgba(0, 255, 0, 0.5);
      box-shadow: var(--crt-component-glow-sm);
    }
  `;

  private handleTrackClick(index: number) {
    this.dispatchEvent(new CustomEvent('track-select', {
      detail: { index, track: this.tracks[index] }
    }));
  }

  private handleRemoveTrack(e: Event, index: number) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('track-remove', {
      detail: { index }
    }));
  }

  private handleEmptyClick() {
    this.dispatchEvent(new CustomEvent('add-tracks'));
  }

  render() {
    return html`
      <crt-card>
        <crt-heading level="4" slot="header" style="margin: 0;">[PLAYLIST]</crt-heading>
        
        ${this.tracks.length === 0 ? html`
          <div class="empty-state" @click="${this.handleEmptyClick}">
            <div class="empty-icon">[+]</div>
            <crt-heading level="4" style="margin: 0 0 var(--crt-spacing-sm) 0;">NO TRACKS LOADED</crt-heading>
            <crt-text muted style="margin: 0;">CLICK TO ADD AUDIO FILES</crt-text>
          </div>
        ` : html`
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>TITLE</th>
                  <th>ARTIST</th>
                  <th class="actions"></th>
                </tr>
              </thead>
              <tbody>
                ${this.tracks.map((track, index) => html`
                  <tr 
                    class="${index === this.currentIndex ? 'active' : ''}"
                    @click="${() => this.handleTrackClick(index)}"
                  >
                    <td class="track-number">${index + 1}</td>
                    <td class="track-title">${track.title}</td>
                    <td class="track-artist">${track.artist}</td>
                    <td class="actions">
                      <crt-button 
                        class="remove-btn"
                        icon-only 
                        icon-left="trash" 
                        variant="error" 
                        size="small"
                        @click="${(e: Event) => this.handleRemoveTrack(e, index)}"
                        title="Remove"
                      ></crt-button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        `}
      </crt-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-playlist': Playlist;
  }
}
