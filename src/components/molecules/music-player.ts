import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import './visualizer';
import '../atoms/button';
import '../atoms/progress';
import '../atoms/slider';
import '../atoms/typography';
import type { Visualizer } from './visualizer';
import type { Track } from './playlist';

export type { Track };

@customElement('crt-music-player')
export class MusicPlayer extends LitElement {
  @property({ type: Array }) tracks: Track[] = [];
  @property({ type: Number }) currentIndex = 0;
  
  @state() private isPlaying = false;
  @state() private currentTime = 0;
  @state() private duration = 0;
  @state() private volume = 80;

  @query('audio') private audio!: HTMLAudioElement;
  @query('crt-visualizer') private visualizer!: Visualizer;

  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
    }

    .player {
      border: 3px double var(--crt-primary);
      background: var(--crt-bg-dark);
      box-shadow: var(--crt-glow-inset);
    }

    /* Header */
    .player-header {
      text-align: center;
      padding: var(--crt-spacing-md);
      border-bottom: 2px solid var(--crt-primary);
      background: var(--crt-bg-darker);
    }

    .player-title {
      font-size: 1.5rem;
      letter-spacing: 4px;
      color: var(--crt-primary);
      text-shadow: var(--crt-glow);
    }

    /* Visualizer */
    .visualizer-section {
      padding: var(--crt-spacing-md);
      border-bottom: 1px solid color-mix(in srgb, var(--crt-primary) 30%, transparent);
    }

    /* Now Playing */
    .now-playing {
      padding: var(--crt-spacing-md);
    }

    .now-playing-label {
      font-size: var(--crt-font-size-xs);
      color: var(--crt-text-muted);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: var(--crt-spacing-xs);
    }

    .track-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--crt-spacing-md);
    }

    .track-details {
      overflow: hidden;
    }

    .track-title {
      font-size: var(--crt-font-size-lg);
      color: var(--crt-primary);
      text-shadow: var(--crt-glow);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-artist {
      font-size: var(--crt-font-size-sm);
      color: var(--crt-text-muted);
    }

    .track-counter {
      font-size: var(--crt-font-size-sm);
      color: var(--crt-text-muted);
      flex-shrink: 0;
      margin-left: var(--crt-spacing-md);
    }

    /* Progress */
    .progress-section {
      margin-bottom: var(--crt-spacing-md);
    }

    .progress-clickable {
      cursor: var(--crt-cursor-pointer);
    }

    .time-display {
      display: flex;
      justify-content: space-between;
      font-size: var(--crt-font-size-xs);
      color: var(--crt-text-muted);
      margin-top: var(--crt-spacing-xs);
    }

    /* Controls */
    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--crt-spacing-md);
      flex-wrap: wrap;
    }

    .control-buttons {
      display: flex;
      gap: var(--crt-spacing-sm);
      align-items: center;
    }

    .volume-section {
      flex: 1;
      max-width: 200px;
      min-width: 150px;
    }

    /* Empty State */
    .empty-state {
      padding: var(--crt-spacing-xl);
      text-align: center;
      color: var(--crt-text-muted);
    }

    .empty-icon {
      font-size: 2rem;
      margin-bottom: var(--crt-spacing-md);
      opacity: 0.5;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    const savedVolume = localStorage.getItem('crtPlayerVolume');
    if (savedVolume) {
      this.volume = parseInt(savedVolume);
    }
  }

  firstUpdated() {
    if (this.audio) {
      this.audio.volume = this.volume / 100;
    }
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('tracks') && this.tracks.length > 0) {
      if (changedProps.get('tracks') === undefined || 
          (changedProps.get('tracks') as Track[])?.length === 0) {
        this.loadTrack(0);
      }
    }
  }

  private loadTrack(index: number) {
    if (index < 0 || index >= this.tracks.length) return;
    
    const wasPlaying = this.isPlaying;
    
    if (this.isPlaying) {
      this.audio?.pause();
      this.visualizer?.stop();
    }

    this.currentIndex = index;
    this.currentTime = 0;
    
    if (this.audio) {
      this.audio.src = this.tracks[index].url;
      this.audio.load();
    }

    if (wasPlaying) {
      this.audio?.addEventListener('canplay', () => this.play(), { once: true });
    }

    this.dispatchEvent(new CustomEvent('track-change', {
      detail: { index, track: this.tracks[index] }
    }));
  }

  private play() {
    if (!this.audio?.src || this.tracks.length === 0) return;
    this.visualizer?.connectAudio(this.audio);
    this.audio.play();
    this.isPlaying = true;
    this.visualizer?.start();
  }

  private pause() {
    this.audio?.pause();
    this.isPlaying = false;
    this.visualizer?.stop();
  }

  private togglePlay = () => {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  };

  previousTrack = () => {
    if (this.tracks.length === 0) return;
    this.loadTrack((this.currentIndex - 1 + this.tracks.length) % this.tracks.length);
  };

  nextTrack = () => {
    if (this.tracks.length === 0) return;
    this.loadTrack((this.currentIndex + 1) % this.tracks.length);
  };

  private handleTimeUpdate = () => {
    this.currentTime = this.audio?.currentTime || 0;
  };

  private handleLoadedMetadata = () => {
    this.duration = this.audio?.duration || 0;
  };

  private handleEnded = () => {
    this.nextTrack();
  };

  private handleProgressClick = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    if (this.audio) {
      this.audio.currentTime = this.duration * percentage;
    }
  };

  private handleVolumeChange = (e: CustomEvent) => {
    this.volume = e.detail.value;
    if (this.audio) {
      this.audio.volume = this.volume / 100;
    }
    localStorage.setItem('crtPlayerVolume', this.volume.toString());
  };

  private formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  private get currentTrack(): Track | null {
    return this.tracks[this.currentIndex] || null;
  }

  private get progressPercent(): number {
    if (!this.duration) return 0;
    return (this.currentTime / this.duration) * 100;
  }

  render() {
    const hasTrack = this.tracks.length > 0 && this.currentTrack;

    return html`
      <div class="player">
        <!-- Header -->
        <div class="player-header">
          <crt-heading level="4" style="margin: 0;">[♫] MUSIC PLAYER [♫]</crt-heading>
        </div>

        ${hasTrack ? html`
          <!-- Visualizer -->
          <div class="visualizer-section">
            <crt-visualizer .bars="${20}"></crt-visualizer>
          </div>

          <!-- Now Playing -->
          <div class="now-playing">
            <crt-text muted style="margin: 0 0 var(--crt-spacing-xs) 0; font-size: var(--crt-font-size-xs); text-transform: uppercase; letter-spacing: 2px;">[NOW PLAYING]</crt-text>
            
            <div class="track-info">
              <div class="track-details">
                <crt-heading level="4" style="margin: 0;">${this.currentTrack?.title || 'UNKNOWN'}</crt-heading>
                <crt-text muted style="margin: 0;">${this.currentTrack?.artist || 'UNKNOWN ARTIST'}</crt-text>
              </div>
              <crt-text muted style="margin: 0;">${this.currentIndex + 1}/${this.tracks.length}</crt-text>
            </div>

            <!-- Progress -->
            <div class="progress-section progress-clickable" @click="${this.handleProgressClick}">
              <crt-progress 
                .value="${this.progressPercent}" 
                ?animated="${this.isPlaying}"
                .showValue="${false}"
              ></crt-progress>
              <div class="time-display">
                <span>${this.formatTime(this.currentTime)}</span>
                <span>${this.formatTime(this.duration)}</span>
              </div>
            </div>

            <!-- Controls -->
            <div class="controls">
              <div class="control-buttons">
                <crt-button icon-only icon-left="prev" @click="${this.previousTrack}" title="Previous"></crt-button>
                <crt-button icon-only icon-left="${this.isPlaying ? 'pause' : 'play'}" @click="${this.togglePlay}" title="${this.isPlaying ? 'Pause' : 'Play'}"></crt-button>
                <crt-button icon-only icon-left="next" @click="${this.nextTrack}" title="Next"></crt-button>
              </div>
              
              <div class="volume-section">
                <crt-slider
                  label="VOL"
                  min="0" 
                  max="100" 
                  .value="${this.volume}"
                  unit="%"
                  @change="${this.handleVolumeChange}"
                ></crt-slider>
              </div>
            </div>
          </div>
        ` : html`
          <!-- Empty State -->
          <div class="empty-state">
            <crt-text muted style="font-size: 2rem; margin: 0 0 var(--crt-spacing-md) 0;">[---]</crt-text>
            <crt-heading level="4" style="margin: 0;">NO TRACKS LOADED</crt-heading>
            <crt-text muted style="margin: var(--crt-spacing-sm) 0 0 0; font-size: var(--crt-font-size-xs);">ADD AUDIO FILES TO START</crt-text>
          </div>
        `}

        <!-- Hidden Audio Element -->
        <audio 
          @timeupdate="${this.handleTimeUpdate}"
          @loadedmetadata="${this.handleLoadedMetadata}"
          @ended="${this.handleEnded}"
        ></audio>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-music-player': MusicPlayer;
  }
}
