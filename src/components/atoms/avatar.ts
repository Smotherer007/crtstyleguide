import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Avatar Component
 */
@customElement('crt-avatar')
export class Avatar extends LitElement {
  static readonly styles = css`
    :host {
      display: inline-block;
      font-family: var(--crt-font-family);
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 2px solid var(--crt-primary);
      color: var(--crt-primary);
      overflow: hidden;
    }

    /* Sizes */
    :host([size="xs"]) .avatar {
      width: 24px;
      height: 24px;
      font-size: 10px;
    }

    :host([size="sm"]) .avatar {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }

    :host([size="md"]) .avatar,
    :host(:not([size])) .avatar {
      width: 48px;
      height: 48px;
      font-size: 16px;
    }

    :host([size="lg"]) .avatar {
      width: 64px;
      height: 64px;
      font-size: 20px;
    }

    :host([size="xl"]) .avatar {
      width: 96px;
      height: 96px;
      font-size: 28px;
    }

    /* Shape variants */
    :host([shape="circle"]) .avatar {
      border-radius: 50%;
    }

    :host([shape="square"]) .avatar,
    :host(:not([shape])) .avatar {
      border-radius: 0;
    }

    :host([shape="rounded"]) .avatar {
      border-radius: 4px;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(50%) brightness(1.1);
    }

    .initials {
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .fallback-icon {
      font-size: 1.5em;
    }

    /* Status indicator */
    :host([status]) .avatar-wrapper {
      position: relative;
    }

    .status-indicator {
      position: absolute;
      width: 12px;
      height: 12px;
      border: 2px solid var(--crt-bg-dark);
      bottom: 0;
      right: 0;
    }

    :host([status="online"]) .status-indicator {
      background: var(--crt-success);
      box-shadow: 0 0 4px var(--crt-success);
    }

    :host([status="offline"]) .status-indicator {
      background: var(--crt-text-muted);
    }

    :host([status="busy"]) .status-indicator {
      background: var(--crt-error);
      box-shadow: 0 0 4px var(--crt-error);
    }

    :host([status="away"]) .status-indicator {
      background: var(--crt-warning);
      box-shadow: 0 0 4px var(--crt-warning);
    }

    /* Group */
    :host(.avatar-group-item) {
      margin-left: -12px;
    }

    :host(.avatar-group-item:first-child) {
      margin-left: 0;
    }

    :host(.avatar-group-item) .avatar {
      border-width: 3px;
      border-color: var(--crt-bg-dark);
    }
  `;

  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) name = '';
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: String, reflect: true }) shape: 'square' | 'circle' | 'rounded' = 'square';
  @property({ type: String, reflect: true }) status: 'online' | 'offline' | 'busy' | 'away' | '' = '';

  private _getInitials(): string {
    if (!this.name) return '?';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2);
    }
    return parts[0][0] + (parts.at(-1)?.[0] || '');
  }

  private _handleError() {
    this.src = '';
  }

  render() {
    let content = html`<span class="fallback-icon">[?]</span>`;
    if (this.src) {
      content = html`
        <img 
          src="${this.src}" 
          alt="${this.alt || this.name}"
          @error="${this._handleError}"
        />
      `;
    } else if (this.name) {
      content = html`<span class="initials">${this._getInitials()}</span>`;
    }

    return html`
      <div class="avatar-wrapper">
        <div class="avatar">
          ${content}
        </div>
        ${this.status ? html`<div class="status-indicator"></div>` : ''}
      </div>
    `;
  }
}

/**
 * Avatar Group Component
 */
@customElement('crt-avatar-group')
export class AvatarGroup extends LitElement {
  static readonly styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }

    ::slotted(crt-avatar) {
      margin-left: -12px;
    }

    ::slotted(crt-avatar:first-child) {
      margin-left: 0;
    }

    .overflow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: transparent;
      border: 2px solid var(--crt-primary);
      color: var(--crt-primary);
      font-family: var(--crt-font-family);
      font-size: 12px;
      margin-left: -12px;
    }
  `;

  @property({ type: Number }) max = 5;

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-avatar': Avatar;
    'crt-avatar-group': AvatarGroup;
  }
}
