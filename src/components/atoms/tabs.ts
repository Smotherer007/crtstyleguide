import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('crt-tabs')
export class Tabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tabs-header {
      display: flex;
      border-bottom: 2px solid var(--crt-primary);
      gap: 0;
      margin-bottom: var(--crt-spacing-lg);
    }

    .tab-button {
      background: transparent;
      border: none;
      color: var(--crt-text-secondary);
      padding: var(--crt-spacing-md) var(--crt-spacing-lg);
      cursor: pointer;
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-base);
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: var(--crt-transition);
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
    }

    .tab-button:hover:not(.active) {
      color: var(--crt-text-primary);
      box-shadow: var(--crt-glow-sm);
    }

    .tab-button.active {
      color: var(--crt-primary);
      border-bottom-color: var(--crt-primary);
      box-shadow: var(--crt-glow);
    }

    .tabs-content {
      background: transparent;
      border: 1px solid var(--crt-primary);
      padding: var(--crt-spacing-lg);
      box-shadow: var(--crt-glow-inset);
    }

    .tab-pane {
      display: none;
    }

    .tab-pane.active {
      display: block;
    }

    pre {
      background: transparent;
      border: 1px dashed var(--crt-primary);
      padding: var(--crt-spacing-lg);
      overflow-x: auto;
      margin: 0;
      font-size: 0.85rem;
    }

    code {
      color: var(--crt-text-primary);
      font-family: var(--crt-font-family);
    }
  `;

  @state() activeTab = 0;

  @property({ type: Array }) tabs: { label: string; content: string }[] = [];

  selectTab(index: number) {
    this.activeTab = index;
  }

  render() {
    return html`
      <div class="tabs-header">
        ${this.tabs.map(
          (tab, index) => html`
            <button
              class="tab-button ${index === this.activeTab ? 'active' : ''}"
              @click="${() => this.selectTab(index)}"
            >
              ${tab.label}
            </button>
          `
        )}
      </div>
      <div class="tabs-content">
        ${this.tabs.map(
          (tab, index) => html`
            <div class="tab-pane ${index === this.activeTab ? 'active' : ''}">
              ${tab.label.toLowerCase() === 'code'
                ? html`<pre><code>${tab.content}</code></pre>`
                : html`<div>${unsafeHTML(tab.content)}</div>`}
            </div>
          `
        )}
      </div>
    `;
  }
}

// Helper to allow HTML in preview
function unsafeHTML(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div;
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-tabs': Tabs;
  }
}
