import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import './button';
import './input';

/**
 * CRT File Input Component
 * 
 * A simple file input styled like a regular input field.
 * Click the input or button to select files.
 * 
 * @element crt-file-input
 * 
 * @property {string} accept - Accepted file types (e.g., "image/*,.pdf")
 * @property {boolean} multiple - Allow multiple file selection
 * @property {string} placeholder - Placeholder text when no file selected
 * @property {string} label - Label text above the input
 * @property {boolean} disabled - Disable the input
 * 
 * @fires change - Fired when files are selected, detail: { files: File[] }
 */
@customElement('crt-file-input')
export class FileInput extends LitElement {
  @property({ type: String }) accept = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) placeholder = 'No file selected...';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;
  
  @state() private _files: File[] = [];
  
  @query('input[type="file"]') private _fileInput!: HTMLInputElement;

  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
      width: 100%;
    }

    .file-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--crt-spacing-xs);
    }

    .file-input-label {
      color: var(--crt-text-primary);
      font-size: var(--crt-font-size-sm);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .file-input-container {
      display: flex;
      gap: var(--crt-spacing-sm);
      align-items: stretch;
    }

    .file-input-display {
      flex: 1;
      min-width: 0;
    }

    .file-input-display crt-input {
      width: 100%;
      cursor: var(--crt-cursor-pointer);
    }

    .file-input-display crt-input::part(input) {
      cursor: var(--crt-cursor-pointer);
    }

    input[type="file"] {
      display: none;
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
      margin-top: var(--crt-spacing-xs);
      font-size: var(--crt-font-size-xs);
      color: var(--crt-text-muted);
    }

    .file-info-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .file-count {
      color: var(--crt-primary);
    }

    .clear-btn {
      margin-left: auto;
    }
  `;

  private _handleClick() {
    if (!this.disabled) {
      this._fileInput?.click();
    }
  }

  private _handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this._files = Array.from(input.files);
      this.dispatchEvent(new CustomEvent('change', {
        detail: { files: this._files },
        bubbles: true,
        composed: true
      }));
    }
  }

  private _clearFiles() {
    this._files = [];
    if (this._fileInput) {
      this._fileInput.value = '';
    }
    this.dispatchEvent(new CustomEvent('change', {
      detail: { files: [] },
      bubbles: true,
      composed: true
    }));
  }

  private _getDisplayValue(): string {
    if (this._files.length === 0) {
      return '';
    }
    if (this._files.length === 1) {
      return this._files[0].name;
    }
    return `${this._files.length} files selected`;
  }

  private _formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private _getTotalSize(): number {
    return this._files.reduce((total, file) => total + file.size, 0);
  }

  /** Public method to get selected files */
  public getFiles(): File[] {
    return this._files;
  }

  /** Public method to clear selection */
  public clear() {
    this._clearFiles();
  }

  render() {
    const displayValue = this._getDisplayValue();
    
    return html`
      <div class="file-input-wrapper">
        ${this.label ? html`
          <label class="file-input-label">${this.label}</label>
        ` : ''}
        
        <div class="file-input-container">
          <div class="file-input-display" @click=${this._handleClick}>
            <crt-input
              readonly
              .value=${displayValue}
              placeholder=${this.placeholder}
              ?disabled=${this.disabled}
            ></crt-input>
          </div>
          
          <crt-button 
            @click=${this._handleClick}
            ?disabled=${this.disabled}
          >BROWSE</crt-button>
        </div>

        <input
          type="file"
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this._handleFileChange}
        />

        ${this._files.length > 0 ? html`
          <div class="file-info">
            <span class="file-info-item">
              <span class="file-count">${this._files.length}</span> file${this._files.length > 1 ? 's' : ''}
            </span>
            <span class="file-info-item">
              ${this._formatSize(this._getTotalSize())}
            </span>
            <crt-button 
              class="clear-btn"
              size="small" 
              variant="link"
              @click=${this._clearFiles}
            >CLEAR</crt-button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-file-input': FileInput;
  }
}
