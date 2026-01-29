import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '../atoms/button';
import '../atoms/badge';

export interface LogEntry {
  timestamp?: Date;
  level: 'info' | 'warn' | 'error' | 'success' | 'debug';
  message: string;
  source?: string;
}

/**
 * CRT Log Component
 * 
 * Displays log entries in a retro CRT terminal style.
 * 
 * @element crt-log
 * 
 * @property {LogEntry[]} entries - Array of log entries to display
 * @property {boolean} autoscroll - Auto-scroll to bottom on new entries (default: true)
 * @property {boolean} showTimestamp - Show timestamps (default: true)
 * @property {boolean} showLevel - Show log level badges (default: true)
 * @property {string} title - Title shown in header (default: 'SYSTEM LOG')
 * @property {number} maxEntries - Maximum entries to keep (default: 500)
 * 
 * @fires log-clear - Fired when log is cleared
 */
@customElement('crt-log')
export class Log extends LitElement {
  @property({ type: Array }) entries: LogEntry[] = [];
  @property({ type: Boolean }) autoscroll = true;
  @property({ type: Boolean, attribute: 'show-timestamp' }) showTimestamp = true;
  @property({ type: Boolean, attribute: 'show-level' }) showLevel = true;
  @property({ type: String }) title = 'SYSTEM LOG';
  @property({ type: Number, attribute: 'max-entries' }) maxEntries = 500;
  
  @state() private _filter: 'all' | 'info' | 'warn' | 'error' | 'success' | 'debug' = 'all';
  @state() private _isPaused = false;
  
  @query('.log-content') private _logContent!: HTMLElement;

  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
      width: 100%;
    }

    .log-container {
      border: 3px double var(--crt-primary);
      background: var(--crt-bg-darker, #000);
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 200px;
    }

    /* Header */
    .log-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--crt-spacing-sm) var(--crt-spacing-md);
      border-bottom: 2px solid var(--crt-primary);
      background: transparent;
      flex-wrap: wrap;
      gap: var(--crt-spacing-sm);
    }

    .log-title {
      color: var(--crt-primary);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: var(--crt-font-size-sm);
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
    }

    .log-title-icon {
      animation: blink 1s steps(1) infinite;
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .log-stats {
      color: var(--crt-text-muted);
      font-size: var(--crt-font-size-xs);
    }

    /* Controls */
    .log-controls {
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-xs);
      flex-wrap: wrap;
    }

    .log-controls crt-button {
      --crt-button-padding: 2px 6px;
    }

    /* Log Content */
    .log-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--crt-spacing-sm);
      font-size: var(--crt-font-size-sm);
      line-height: 1.4;
      min-height: 150px;
      max-height: 400px;
    }

    .log-content::-webkit-scrollbar {
      width: 8px;
    }

    .log-content::-webkit-scrollbar-track {
      background: var(--crt-bg-darker);
    }

    .log-content::-webkit-scrollbar-thumb {
      background: var(--crt-primary);
    }

    /* Log Entry */
    .log-entry {
      display: flex;
      gap: var(--crt-spacing-sm);
      padding: 2px 0;
      border-bottom: 1px solid color-mix(in srgb, var(--crt-primary) 10%, transparent);
      align-items: flex-start;
    }

    .log-entry:last-child {
      border-bottom: none;
    }

    .log-timestamp {
      color: var(--crt-text-muted);
      font-size: var(--crt-font-size-xs);
      white-space: nowrap;
      min-width: 70px;
    }

    .log-level {
      min-width: 55px;
    }

    .log-level crt-badge {
      font-size: var(--crt-font-size-xs);
      --crt-spacing-xs: 1px;
      --crt-spacing-md: 4px;
    }

    .log-source {
      color: var(--crt-primary);
      font-size: var(--crt-font-size-xs);
      white-space: nowrap;
    }

    .log-source::before {
      content: '[';
    }

    .log-source::after {
      content: ']';
    }

    .log-message {
      color: var(--crt-text-primary);
      flex: 1;
      word-break: break-word;
    }

    .log-message.info {
      color: var(--crt-info, #00ffff);
    }

    .log-message.warn {
      color: var(--crt-warning, #ffff00);
    }

    .log-message.error {
      color: var(--crt-error, #ff0000);
    }

    .log-message.success {
      color: var(--crt-success, #00ff00);
    }

    .log-message.debug {
      color: var(--crt-text-muted);
    }

    /* Empty state */
    .log-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--crt-text-muted);
      font-size: var(--crt-font-size-sm);
    }

    /* Footer */
    .log-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--crt-spacing-xs) var(--crt-spacing-md);
      border-top: 1px solid color-mix(in srgb, var(--crt-primary) 30%, transparent);
      font-size: var(--crt-font-size-xs);
      color: var(--crt-text-muted);
    }

    .log-footer-status {
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      background: var(--crt-success);
      animation: pulse-dot 1s infinite;
    }

    .status-dot.paused {
      background: var(--crt-warning);
      animation: none;
    }

    @keyframes pulse-dot {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `;

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('entries') && this.autoscroll && !this._isPaused) {
      this._scrollToBottom();
    }
  }

  private _scrollToBottom() {
    requestAnimationFrame(() => {
      if (this._logContent) {
        this._logContent.scrollTop = this._logContent.scrollHeight;
      }
    });
  }

  private _formatTimestamp(date: Date): string {
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  private _getFilteredEntries(): LogEntry[] {
    if (this._filter === 'all') {
      return this.entries;
    }
    return this.entries.filter(entry => entry.level === this._filter);
  }

  private _setFilter(filter: typeof this._filter) {
    this._filter = filter;
  }

  private _togglePause() {
    this._isPaused = !this._isPaused;
  }

  private _clearLog() {
    this.entries = [];
    this.dispatchEvent(new CustomEvent('log-clear', { bubbles: true, composed: true }));
  }

  /** Public method to add a log entry */
  public log(level: LogEntry['level'], message: string, source?: string) {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      source
    };
    
    let newEntries = [...this.entries, entry];
    
    // Trim to max entries
    if (newEntries.length > this.maxEntries) {
      newEntries = newEntries.slice(-this.maxEntries);
    }
    
    this.entries = newEntries;
  }

  /** Convenience methods */
  public info(message: string, source?: string) { this.log('info', message, source); }
  public warn(message: string, source?: string) { this.log('warn', message, source); }
  public error(message: string, source?: string) { this.log('error', message, source); }
  public success(message: string, source?: string) { this.log('success', message, source); }
  public debug(message: string, source?: string) { this.log('debug', message, source); }

  /** Map log level to badge variant */
  private _getBadgeVariant(level: LogEntry['level']): 'info' | 'warning' | 'error' | 'success' | 'primary' {
    const variantMap: Record<LogEntry['level'], 'info' | 'warning' | 'error' | 'success' | 'primary'> = {
      info: 'info',
      warn: 'warning',
      error: 'error',
      success: 'success',
      debug: 'primary'
    };
    return variantMap[level];
  }

  render() {
    const filteredEntries = this._getFilteredEntries();
    const counts = {
      all: this.entries.length,
      info: this.entries.filter(e => e.level === 'info').length,
      warn: this.entries.filter(e => e.level === 'warn').length,
      error: this.entries.filter(e => e.level === 'error').length,
      success: this.entries.filter(e => e.level === 'success').length,
      debug: this.entries.filter(e => e.level === 'debug').length,
    };

    return html`
      <div class="log-container">
        <!-- Header -->
        <div class="log-header">
          <span class="log-title">
            <span class="log-title-icon">▶</span>
            ${this.title}
          </span>
          
          <div class="log-controls">
            <crt-button 
              size="small"
              variant="${this._filter === 'all' ? 'primary' : 'link'}"
              @click=${() => this._setFilter('all')}
            >ALL (${counts.all})</crt-button>
            <crt-button 
              size="small"
              variant="${this._filter === 'error' ? 'error' : 'link'}"
              @click=${() => this._setFilter('error')}
            >ERR (${counts.error})</crt-button>
            <crt-button 
              size="small"
              variant="${this._filter === 'warn' ? 'warning' : 'link'}"
              @click=${() => this._setFilter('warn')}
            >WRN (${counts.warn})</crt-button>
            <crt-button 
              size="small"
              variant="${this._filter === 'info' ? 'info' : 'link'}"
              @click=${() => this._setFilter('info')}
            >INF (${counts.info})</crt-button>
            
            <crt-button 
              size="small"
              variant="${this._isPaused ? 'warning' : 'link'}"
              @click=${this._togglePause}
            >${this._isPaused ? '▶ RESUME' : '⏸ PAUSE'}</crt-button>
            <crt-button 
              size="small"
              variant="error"
              @click=${this._clearLog}
            >✕ CLEAR</crt-button>
          </div>
        </div>

        <!-- Log Content -->
        <div class="log-content">
          ${filteredEntries.length === 0 
            ? html`<div class="log-empty">[NO LOG ENTRIES]</div>`
            : filteredEntries.map(entry => html`
              <div class="log-entry">
                ${this.showTimestamp && entry.timestamp ? html`
                  <span class="log-timestamp">${this._formatTimestamp(entry.timestamp)}</span>
                ` : ''}
                ${this.showLevel ? html`
                  <span class="log-level">
                    <crt-badge variant="${this._getBadgeVariant(entry.level)}">${entry.level}</crt-badge>
                  </span>
                ` : ''}
                ${entry.source ? html`
                  <span class="log-source">${entry.source}</span>
                ` : ''}
                <span class="log-message ${entry.level}">${entry.message}</span>
              </div>
            `)
          }
        </div>

        <!-- Footer -->
        <div class="log-footer">
          <div class="log-footer-status">
            <span class="status-dot ${this._isPaused ? 'paused' : ''}"></span>
            <span>${this._isPaused ? 'PAUSED' : 'RECORDING'}</span>
          </div>
          <span>${filteredEntries.length} / ${this.entries.length} ENTRIES</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-log': Log;
  }
}
