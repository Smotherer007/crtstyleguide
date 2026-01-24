import { LitElement, html, css } from 'lit';
import { customElement, state, query, property } from 'lit/decorators.js';
import '../molecules/music-player';
import '../molecules/playlist';
import '../molecules/modal';
import '../atoms/button';
import '../atoms/file-upload';
import '../atoms/typography';
import type { Track } from '../molecules/playlist';
import type { FileUpload } from '../atoms/file-upload';

@customElement('crt-music-station')
export class MusicStation extends LitElement {
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Number }) autoplayDelay = 500;
  @state() private tracks: Track[] = [];
  @state() private currentIndex = 0;
  @state() private showUploadModal = false;
  
  @query('crt-file-upload') private fileUpload!: FileUpload;

  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
      width: 100%;
    }

    .station {
      display: flex;
      flex-direction: column;
      gap: var(--crt-spacing-md);
    }

    .station-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--crt-spacing-md);
      background: var(--crt-bg-darker);
      border: 2px solid var(--crt-primary);
    }

    .station-title {
      font-size: 1.2rem;
      color: var(--crt-primary);
      text-shadow: var(--crt-glow);
      letter-spacing: 2px;
    }

    .station-stats {
      font-size: var(--crt-font-size-sm);
      color: var(--crt-text-muted);
    }

    .main-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--crt-spacing-md);
    }

    @media (min-width: 900px) {
      .main-content {
        grid-template-columns: 2fr 1fr;
      }
    }

    .player-section {
      min-width: 0;
    }

    .playlist-section {
      display: flex;
      flex-direction: column;
      gap: var(--crt-spacing-md);
    }

    .upload-actions {
      display: flex;
      gap: var(--crt-spacing-sm);
    }

    /* Modal Content */
    .modal-body {
      padding: var(--crt-spacing-md) 0;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--crt-spacing-sm);
      padding-top: var(--crt-spacing-md);
    }
  `;

  private handleFilesChanged = (e: CustomEvent) => {
    const files: File[] = e.detail.files;
    
    const newTracks: Track[] = files
      .filter(f => f.type.startsWith('audio/') || 
        f.name.endsWith('.mp3') || f.name.endsWith('.wav') || 
        f.name.endsWith('.ogg') || f.name.endsWith('.flac'))
      .map(file => {
        const name = file.name.replace(/\.[^/.]+$/, '');
        let artist = 'UNKNOWN ARTIST';
        let title = name.toUpperCase();

        if (name.includes(' - ')) {
          const parts = name.split(' - ');
          artist = parts[0].trim().toUpperCase();
          title = parts.slice(1).join(' - ').trim().toUpperCase();
        }

        return {
          title,
          artist,
          url: URL.createObjectURL(file)
        };
      });

    this.tracks = [...this.tracks, ...newTracks];
  };

  private handleTrackSelect = (e: CustomEvent) => {
    this.currentIndex = e.detail.index;
  };

  private handleTrackRemove = (e: CustomEvent) => {
    const index = e.detail.index;
    const track = this.tracks[index];
    
    URL.revokeObjectURL(track.url);
    
    this.tracks = this.tracks.filter((_, i) => i !== index);
    
    if (this.tracks.length === 0) {
      this.currentIndex = 0;
    } else if (index <= this.currentIndex) {
      this.currentIndex = Math.max(0, this.currentIndex - 1);
    }
  };

  private handleTrackChange = (e: CustomEvent) => {
    this.currentIndex = e.detail.index;
  };

  private openUploadModal = () => {
    this.showUploadModal = true;
  };

  private closeUploadModal = () => {
    this.showUploadModal = false;
  };

  private handleUploadDone = () => {
    this.fileUpload?.clearFiles();
    this.showUploadModal = false;
  };

  render() {
    return html`
      <div class="station">
        <!-- Header -->
        <div class="station-header">
          <crt-heading level="3" style="margin: 0;">[MUSIC STATION]</crt-heading>
          <crt-text muted style="margin: 0;">${this.tracks.length} TRACKS LOADED</crt-text>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <!-- Player -->
          <div class="player-section">
            <crt-music-player
              .tracks="${this.tracks}"
              .currentIndex="${this.currentIndex}"
              .autoplay="${this.autoplay}"
              .autoplayDelay="${this.autoplayDelay}"
              @track-change="${this.handleTrackChange}"
            ></crt-music-player>
          </div>

          <!-- Playlist -->
          <div class="playlist-section">
            <crt-playlist
              .tracks="${this.tracks}"
              .currentIndex="${this.currentIndex}"
              @track-select="${this.handleTrackSelect}"
              @track-remove="${this.handleTrackRemove}"
              @add-tracks="${this.openUploadModal}"
            ></crt-playlist>
          </div>
        </div>

        <!-- Upload Modal -->
        <crt-modal 
          title="ADD AUDIO FILES" 
          size="large"
          ?open="${this.showUploadModal}"
          @close="${this.closeUploadModal}"
        >
          <div class="modal-body">
            <crt-file-upload
              accept="audio/*,.mp3,.wav,.ogg,.flac"
              multiple
              max-files="20"
              @files-changed="${this.handleFilesChanged}"
            ></crt-file-upload>
          </div>
          <div class="modal-footer" slot="footer">
            <crt-button variant="link" @click="${this.closeUploadModal}">CANCEL</crt-button>
            <crt-button variant="success" @click="${this.handleUploadDone}">DONE</crt-button>
          </div>
        </crt-modal>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-music-station': MusicStation;
  }
}
