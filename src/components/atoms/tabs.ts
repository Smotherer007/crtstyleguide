import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('crt-tabs')
export class Tabs extends LitElement {
  private readonly _id = `crt-tabs-${Math.random().toString(36).slice(2, 9)}`;

  static readonly styles = css`
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
      color: var(--crt-text-primary);
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
    }

    .tab-button.active {
      color: var(--crt-primary);
      border-bottom-color: var(--crt-primary);
    }

    .tabs-content {
      background: transparent;
      border: 1px solid var(--crt-primary);
      padding: var(--crt-spacing-lg);
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
    const tab = this.tabs[index];
    this.dispatchEvent(new CustomEvent('change', {
      detail: { index, label: tab?.label },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const listId = `${this._id}-list`;
    return html`
      <div class="tabs-header" role="tablist" id="${listId}">
        ${this.tabs.map(
          (tab, index) => html`
            <button
              class="tab-button ${index === this.activeTab ? 'active' : ''}"
              id="${this._id}-tab-${index}"
              role="tab"
              aria-selected="${index === this.activeTab ? 'true' : 'false'}"
              aria-controls="${this._id}-panel-${index}"
              tabindex="${index === this.activeTab ? '0' : '-1'}"
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
            <div
              class="tab-pane ${index === this.activeTab ? 'active' : ''}"
              id="${this._id}-panel-${index}"
              role="tabpanel"
              aria-labelledby="${this._id}-tab-${index}"
            >
              ${tab.label.toLowerCase() === 'code'
                ? html`<pre><code>${tab.content}</code></pre>`
                : html`<div>${tab.content}</div>`}
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-tabs': Tabs;
  }
}
