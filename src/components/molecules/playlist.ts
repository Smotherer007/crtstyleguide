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
    }

    /* Table Styles */
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      border: 2px solid var(--crt-primary);
      box-shadow: var(--crt-glow-sm);
    }

    thead {
      background-color: rgba(51, 255, 51, 0.1);
      border-bottom: 2px solid var(--crt-primary);
    }

    th {
      color: var(--crt-primary);
      padding: var(--crt-spacing-md);
      text-align: left;
      text-transform: uppercase;
      letter-spacing: var(--crt-letter-spacing);
      font-weight: 600;
      text-shadow: var(--crt-glow);
    }

    th.actions {
      width: 50px;
      text-align: center;
    }

    tbody tr {
      border-bottom: 1px solid rgba(51, 255, 51, 0.2);
      transition: var(--crt-transition);
      cursor: var(--crt-cursor-pointer);
    }

    tbody tr:hover {
      background-color: rgba(51, 255, 51, 0.05);
      box-shadow: inset 0 0 20px rgba(51, 255, 51, 0.1);
    }

    tbody tr.active {
      background-color: rgba(51, 255, 51, 0.15);
      box-shadow: inset 0 0 30px rgba(51, 255, 51, 0.2);
    }

    tbody tr.active td {
      color: var(--crt-success);
      text-shadow: var(--crt-glow);
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
      width: 60px;
      text-align: center;
      opacity: 0.7;
    }

    td.track-title {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    td.track-artist {
      opacity: 0.8;
    }

    td.actions {
      text-align: center;
    }

    .remove-btn {
      opacity: 0;
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
    }

    .empty-state:hover {
      background: color-mix(in srgb, var(--crt-primary) 5%, transparent);
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: var(--crt-spacing-md);
      color: var(--crt-primary);
      text-shadow: var(--crt-glow);
    }

    /* Scrollbar wrapper */
    .table-wrapper {
      max-height: 400px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--crt-primary) var(--crt-bg-dark);
    }

    .table-wrapper::-webkit-scrollbar {
      width: 10px;
    }

    .table-wrapper::-webkit-scrollbar-track {
      background: var(--crt-bg-dark);
      border: 1px solid var(--crt-primary);
    }

    .table-wrapper::-webkit-scrollbar-thumb {
      background: var(--crt-primary);
      box-shadow: var(--crt-glow-sm);
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
