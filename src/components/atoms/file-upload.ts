import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './button';
import './icon';

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

@customElement('crt-file-upload')
export class FileUpload extends LitElement {
  @property({ type: String }) accept = '';
  @property({ type: Boolean }) multiple = true;
  @property({ type: String }) name = '';
  @property({ type: Number }) maxSize = 10485760; // 10MB default
  @property({ type: Number }) maxFiles = 10;
  
  @state() files: UploadedFile[] = [];

  static styles = css`
    :host {
      display: block;
      font-family: var(--crt-font-family);
      width: 100%;
      min-width: 500px;
    }

    .file-manager {
      border: 3px double var(--crt-primary);
      background: var(--crt-bg-dark);
      box-shadow: var(--crt-glow-inset);
    }

    /* Header */
    .fm-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--crt-spacing-sm) var(--crt-spacing-md);
      background: var(--crt-bg-darker);
      border-bottom: 2px solid var(--crt-primary);
    }

    .fm-title {
      color: var(--crt-primary);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: var(--crt-font-size-sm);
      text-shadow: var(--crt-glow);
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
    }

    .fm-stats {
      color: var(--crt-text-muted);
      font-size: var(--crt-font-size-xs);
    }

    /* Drop Zone */
    .drop-zone {
      padding: var(--crt-spacing-xl);
      text-align: center;
      border: 2px dashed var(--crt-primary);
      margin: var(--crt-spacing-md);
      transition: var(--crt-transition);
      cursor: var(--crt-cursor-pointer);
      position: relative;
      min-height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--crt-spacing-md);
    }

    .drop-zone:hover,
    .drop-zone.dragging {
      background: color-mix(in srgb, var(--crt-primary) 10%, transparent);
      border-color: var(--crt-primary);
      box-shadow: var(--crt-glow);
    }

    .drop-zone.dragging {
      border-style: solid;
    }

    .drop-zone-icon {
      font-size: 3rem;
      color: var(--crt-primary);
      text-shadow: var(--crt-glow);
      animation: float 2s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .drop-zone.dragging .drop-zone-icon {
      animation: pulse 0.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .drop-zone-text {
      color: var(--crt-text-secondary);
      font-size: var(--crt-font-size-base);
    }

    .drop-zone-hint {
      color: var(--crt-text-muted);
      font-size: var(--crt-font-size-xs);
    }

    .upload-input {
      display: none;
    }

    /* File List */
    .file-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .file-list-header {
      display: grid;
      grid-template-columns: 2fr 80px 80px 50px;
      gap: var(--crt-spacing-md);
      padding: var(--crt-spacing-sm) var(--crt-spacing-md);
      background: var(--crt-bg-darker);
      border-bottom: 1px solid var(--crt-primary);
      color: var(--crt-text-muted);
      font-size: var(--crt-font-size-xs);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .file-item {
      display: grid;
      grid-template-columns: 2fr 80px 80px 50px;
      gap: var(--crt-spacing-md);
      padding: var(--crt-spacing-md);
      border-bottom: 1px solid color-mix(in srgb, var(--crt-primary) 20%, transparent);
      align-items: center;
      transition: var(--crt-transition);
    }

    .file-item:hover {
      background: color-mix(in srgb, var(--crt-primary) 5%, transparent);
    }

    .file-item:last-child {
      border-bottom: none;
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
      overflow: hidden;
    }

    .file-icon {
      color: var(--crt-primary);
      flex-shrink: 0;
    }

    .file-name {
      color: var(--crt-text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    .file-size {
      color: var(--crt-text-muted);
      font-size: var(--crt-font-size-sm);
      text-align: right;
    }

    .file-status {
      font-size: var(--crt-font-size-xs);
      text-transform: uppercase;
      text-align: center;
    }

    .file-status.pending {
      color: var(--crt-text-muted);
    }

    .file-status.complete {
      color: var(--crt-success);
      text-shadow: 0 0 5px var(--crt-success);
    }

    .file-status.error {
      color: var(--crt-error);
      text-shadow: 0 0 5px var(--crt-error);
    }

    .file-actions {
      display: flex;
      justify-content: center;
    }

    .file-remove {
      background: transparent;
      border: 1px solid var(--crt-error);
      color: var(--crt-error);
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
      font-family: var(--crt-font-family);
    }

    .file-remove:hover {
      background: var(--crt-error);
      color: var(--crt-bg-dark);
      box-shadow: 0 0 10px var(--crt-error);
    }

    /* Footer */
    .fm-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--crt-spacing-md);
      background: var(--crt-bg-darker);
      border-top: 2px solid var(--crt-primary);
    }

    .fm-footer-info {
      color: var(--crt-text-muted);
      font-size: var(--crt-font-size-xs);
    }

    .fm-footer-actions {
      display: flex;
      gap: var(--crt-spacing-sm);
    }

    /* Empty state */
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

    /* Scrollbar */
    .file-list::-webkit-scrollbar {
      width: 8px;
    }

    .file-list::-webkit-scrollbar-track {
      background: var(--crt-bg-dark);
    }

    .file-list::-webkit-scrollbar-thumb {
      background: var(--crt-primary);
      box-shadow: var(--crt-glow-sm);
    }

    /* Progress bar for uploading */
    .progress-bar {
      width: 100%;
      height: 4px;
      background: var(--crt-bg-dark);
      border: 1px solid var(--crt-primary);
      margin-top: var(--crt-spacing-xs);
    }

    .progress-fill {
      height: 100%;
      background: var(--crt-primary);
      box-shadow: var(--crt-glow-sm);
      transition: width 0.3s ease;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  // Drag-and-drop removed: files are added via the file input only

  private _handleFileSelect = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this._addFiles(Array.from(input.files));
      input.value = ''; // Reset input
    }
  };

  private _addFiles(newFiles: File[]) {
    const validFiles = newFiles.filter(file => {
      // Check size
      if (file.size > this.maxSize) {
        console.warn(`File ${file.name} exceeds max size`);
        return false;
      }
      // Check accept types if specified
      if (this.accept) {
        const acceptTypes = this.accept.split(',').map(t => t.trim());
        const fileType = file.type;
        const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
        const isValid = acceptTypes.some(type => {
          if (type.startsWith('.')) {
            return fileExt === type.toLowerCase();
          }
          if (type.endsWith('/*')) {
            return fileType.startsWith(type.replace('/*', '/'));
          }
          return fileType === type;
        });
        if (!isValid) {
          console.warn(`File ${file.name} type not accepted`);
          return false;
        }
      }
      return true;
    });

    const filesToAdd = validFiles.slice(0, this.maxFiles - this.files.length);
    
    const uploadedFiles: UploadedFile[] = filesToAdd.map(file => ({
      file,
      id: this._generateId(),
      progress: 100,
      status: 'complete' as const
    }));

    this.files = [...this.files, ...uploadedFiles];
    
    this.dispatchEvent(new CustomEvent('files-changed', {
      detail: { files: this.files.map(f => f.file) }
    }));
  }

  private _handleUploadClick = () => {
    const input = this.shadowRoot?.querySelector('input[type="file"]') as HTMLInputElement;
    input?.click();
  };

  private _handleRemoveFile = (id: string) => {
    this.files = this.files.filter(f => f.id !== id);
    this.dispatchEvent(new CustomEvent('files-changed', {
      detail: { files: this.files.map(f => f.file) }
    }));
  };

  private _handleClearAll = () => {
    this.files = [];
    this.dispatchEvent(new CustomEvent('files-changed', {
      detail: { files: [] }
    }));
  };

  /** Public method to clear all files */
  public clearFiles() {
    this._handleClearAll();
  }

  private _formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private _getFileIcon(file: File): string {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const type = file.type;
    
    if (type.startsWith('image/')) return '[IMG]';
    if (type.startsWith('video/')) return '[VID]';
    if (type.startsWith('audio/')) return '[AUD]';
    if (type === 'application/pdf') return '[PDF]';
    if (['doc', 'docx'].includes(ext)) return '[DOC]';
    if (['xls', 'xlsx'].includes(ext)) return '[XLS]';
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return '[ZIP]';
    if (['js', 'ts', 'py', 'java', 'cpp', 'c', 'html', 'css'].includes(ext)) return '[COD]';
    if (['txt', 'md', 'json', 'xml'].includes(ext)) return '[TXT]';
    return '[FIL]';
  }

  private _getTotalSize(): number {
    return this.files.reduce((total, f) => total + f.file.size, 0);
  }

  render() {
    return html`
      <div class="file-manager">
        <!-- Header -->
        <div class="fm-header">
          <span class="fm-title">
            [DIR] FILE MANAGER
          </span>
          <span class="fm-stats">
            ${this.files.length}/${this.maxFiles} FILES | ${this._formatFileSize(this._getTotalSize())}
          </span>
        </div>

        <!-- File input (click only) -->
        <div>
          <input
            class="upload-input"
            type="file"
            accept="${this.accept}"
            ?multiple="${this.multiple}"
            name="${this.name}"
            @change="${this._handleFileSelect}"
          />
        </div>

        <!-- File List -->
        ${this.files.length > 0 ? html`
          <div class="file-list-header">
            <span>FILENAME</span>
            <span style="text-align: right;">SIZE</span>
            <span style="text-align: center;">STATUS</span>
            <span style="text-align: center;">ACT</span>
          </div>
          <div class="file-list">
            ${this.files.map(uploadedFile => html`
              <div class="file-item">
                <div class="file-info">
                  <span class="file-icon">${this._getFileIcon(uploadedFile.file)}</span>
                  <span class="file-name">${uploadedFile.file.name}</span>
                </div>
                <span class="file-size">${this._formatFileSize(uploadedFile.file.size)}</span>
                <span class="file-status ${uploadedFile.status}">${uploadedFile.status.toUpperCase()}</span>
                <div class="file-actions">
                  <button 
                    class="file-remove" 
                    @click="${() => this._handleRemoveFile(uploadedFile.id)}"
                    title="Remove file"
                  >X</button>
                </div>
              </div>
            `)}
          </div>
        ` : html`
          <div class="empty-state">
            <div class="empty-icon">[---]</div>
            <div>NO FILES LOADED</div>
          </div>
        `}

        <!-- Footer -->
        <div class="fm-footer">
          <span class="fm-footer-info">
            READY FOR TRANSFER
          </span>
          <div class="fm-footer-actions">
            ${this.files.length > 0 ? html`
              <crt-button size="small" variant="error" @click="${this._handleClearAll}">
                CLEAR ALL
              </crt-button>
            ` : ''}
            <crt-button size="small" @click="${this._handleUploadClick}">
              + ADD FILES
            </crt-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-file-upload': FileUpload;
  }
}
