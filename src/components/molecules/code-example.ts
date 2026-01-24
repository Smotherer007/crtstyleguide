import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../atoms/tabs';
import '../atoms/typography';

/**
 * Code Example Component
 * Shows a preview of a component with toggleable code view and copy functionality
 * Uses crt-tabs internally for the Preview/Code tabs
 */
@customElement('crt-code-example')
export class CodeExample extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--crt-spacing-xl);
      width: 100%;
      max-width: none;
      box-sizing: border-box;
    }

    .example-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--crt-spacing-md);
    }

    .example-title {
      margin: 0;
    }

    .example-description {
      margin: var(--crt-spacing-xs) 0 var(--crt-spacing-md) 0;
    }

    .tabs-wrapper {
      border: 2px solid var(--crt-primary);
      background: transparent !important;
      background-image: none !important;
      width: 100%;
      box-sizing: border-box;
    }

    .tab-header {
      display: flex;
      gap: 0;
      border-bottom: 2px solid var(--crt-primary);
      background: transparent;
    }

    .tab-btn {
      background: transparent;
      border: none;
      color: var(--crt-text-secondary);
      padding: var(--crt-spacing-sm) var(--crt-spacing-lg);
      cursor: var(--crt-cursor-pointer);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: var(--crt-transition);
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
    }

    .tab-btn:hover {
      color: var(--crt-primary);
    }

    .tab-btn.active {
      color: var(--crt-primary);
      border-bottom-color: var(--crt-primary);
    }

    .tab-content {
      min-height: 80px;
    }

    .preview-pane {
      padding: var(--crt-spacing-lg);
      display: flex;
      flex-wrap: wrap;
      gap: var(--crt-spacing-md);
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      background: var(--crt-bg-light) !important;
      background-image: none;
    }

     /* preview-pane and tab-content visuals are handled by the global
       styleguide stylesheet to keep component CSS minimal. */

    /* Ensure embedded demo components stretch to the available width
       so examples don't get stuck at an intrinsic/narrow width. */
    .preview-pane > * {
      flex: 1 1 100%;
      min-width: 0; /* allow children to shrink below their content width */
      width: 100%;
      box-sizing: border-box;
    }

    .code-pane {
      position: relative;
      display: none;
    }

    .code-pane.visible {
      display: block;
    }

    .preview-pane.hidden {
      display: none;
    }

    pre {
      margin: 0;
      padding: var(--crt-spacing-lg);
      padding-right: 80px;
      overflow-x: auto;
      background: transparent;
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      color: var(--crt-text-primary);
      line-height: 1.6;
    }

    code {
      white-space: pre-wrap;
      word-break: break-word;
    }

    .copy-btn {
      position: absolute;
      top: var(--crt-spacing-sm);
      right: var(--crt-spacing-sm);
      background: transparent;
      border: 1px solid var(--crt-primary);
      color: var(--crt-primary);
      padding: var(--crt-spacing-xs) var(--crt-spacing-sm);
      cursor: var(--crt-cursor-pointer);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-xs);
      text-transform: uppercase;
      transition: var(--crt-transition);
    }

    .copy-btn:hover {
      background: var(--crt-primary);
      color: var(--crt-bg-dark);
    }

    .copy-btn.copied {
      background: var(--crt-success);
      border-color: var(--crt-success);
      color: var(--crt-bg-dark);
    }
  `;

  @property() title = '';
  @property() description = '';
  @property() code = '';

  @state() private activeTab: 'preview' | 'code' = 'preview';
  @state() private copied = false;

  private switchTab(tab: 'preview' | 'code') {
    this.activeTab = tab;
  }

  private async copyCode() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  render() {
    return html`
      <div class="example-header">
        <crt-heading level="4" class="example-title">${this.title}</crt-heading>
      </div>
      ${this.description ? html`<crt-text muted class="example-description">${this.description}</crt-text>` : ''}
      
      <div class="tabs-wrapper">
        <div class="tab-header">
          <button 
            class="tab-btn ${this.activeTab === 'preview' ? 'active' : ''}"
            @click="${() => this.switchTab('preview')}"
          >
            Preview
          </button>
          <button 
            class="tab-btn ${this.activeTab === 'code' ? 'active' : ''}"
            @click="${() => this.switchTab('code')}"
          >
            Code
          </button>
        </div>
        
        <div class="tab-content">
          <div class="preview-pane ${this.activeTab === 'code' ? 'hidden' : ''}">
            <slot></slot>
          </div>
          <div class="code-pane ${this.activeTab === 'code' ? 'visible' : ''}">
            <button 
              class="copy-btn ${this.copied ? 'copied' : ''}" 
              @click="${this.copyCode}"
            >
              ${this.copied ? '[OK] COPIED' : '[>] COPY'}
            </button>
            <pre><code>${this.code}</code></pre>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-code-example': CodeExample;
  }
}
