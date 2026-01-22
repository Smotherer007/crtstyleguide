import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-icon')
export class Icon extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.2em;
      height: 1.2em;
      font-size: inherit;
      color: currentColor;
    }

    .icon {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  @property() name: string = '';
  @property() size: 'sm' | 'md' | 'lg' = 'md';

  private icons: { [key: string]: string } = {
    'checkmark': '✓',
    'check': '✓',
    'close': '✕',
    'x': '✕',
    'plus': '+',
    'minus': '−',
    'search': '⌕',
    'arrow-right': '→',
    'arrow-left': '←',
    'arrow-up': '↑',
    'arrow-down': '↓',
    'download': '⬇',
    'upload': '⬆',
    'folder': '📁',
    'file': '📄',
    'trash': '🗑',
    'delete': '🗑',
    'edit': '✎',
    'pencil': '✎',
    'eye': '◉',
    'menu': '☰',
    'hamburger': '☰',
    'settings': '⚙',
    'gear': '⚙',
    'star': '★',
    'heart': '♥',
    'play': '►',
    'pause': '❚❚',
    'stop': '■',
    'prev': '◄◄',
    'next': '►►',
    'rewind': '◄◄',
    'forward': '►►',
    'volume': '🔊',
    'volume-mute': '🔇',
    'music': '♫',
  };

  render() {
    return html`<span class="icon">${this.icons[this.name] || '?'}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-icon': Icon;
  }
}
