import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * CRT Tooltip Component
 */
@customElement('crt-tooltip')
export class Tooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-block;
    }

    .tooltip {
      position: absolute;
      background: var(--crt-bg-dark);
      border: 2px solid var(--crt-primary);
      color: var(--crt-primary);
      padding: var(--crt-spacing-sm) var(--crt-spacing-md);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      white-space: nowrap;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
      box-shadow: 
        var(--crt-glow-sm),
        0 5px 15px rgba(0, 0, 0, 0.5);
    }

    .tooltip.visible {
      opacity: 1;
    }

    /* Arrow */
    .tooltip::before {
      content: '';
      position: absolute;
      border: 6px solid transparent;
    }

    /* Position: top */
    :host([position="top"]) .tooltip,
    .tooltip.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 10px;
    }

    :host([position="top"]) .tooltip::before,
    .tooltip.top::before {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: var(--crt-primary);
    }

    /* Position: bottom */
    :host([position="bottom"]) .tooltip,
    .tooltip.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 10px;
    }

    :host([position="bottom"]) .tooltip::before,
    .tooltip.bottom::before {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: var(--crt-primary);
    }

    /* Position: left */
    :host([position="left"]) .tooltip,
    .tooltip.left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 10px;
    }

    :host([position="left"]) .tooltip::before,
    .tooltip.left::before {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: var(--crt-primary);
    }

    /* Position: right */
    :host([position="right"]) .tooltip,
    .tooltip.right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 10px;
    }

    :host([position="right"]) .tooltip::before,
    .tooltip.right::before {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: var(--crt-primary);
    }
  `;

  @property({ type: String }) text = '';
  @property({ type: String, reflect: true }) position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @property({ type: Number }) delay = 200;

  @state() private _visible = false;
  private _timeout?: number;

  private _show() {
    this._timeout = window.setTimeout(() => {
      this._visible = true;
    }, this.delay);
  }

  private _hide() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._visible = false;
  }

  render() {
    return html`
      <div 
        class="trigger"
        @mouseenter="${this._show}"
        @mouseleave="${this._hide}"
        @focus="${this._show}"
        @blur="${this._hide}"
      >
        <slot></slot>
      </div>
      <div class="tooltip ${this.position} ${this._visible ? 'visible' : ''}">
        ${this.text}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-tooltip': Tooltip;
  }
}
