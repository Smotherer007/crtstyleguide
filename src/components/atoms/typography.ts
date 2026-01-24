import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-heading')
export class Heading extends LitElement {
  static styles = css`
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--crt-font-family);
      color: var(--crt-text-primary);
      letter-spacing: var(--crt-letter-spacing);
      text-shadow: none;
      margin: var(--crt-spacing-lg) 0 var(--crt-spacing-md) 0;
    }

    h1 {
      font-size: var(--crt-font-size-3xl);
    }

    h2 {
      font-size: var(--crt-font-size-2xl);
    }

    h3 {
      font-size: var(--crt-font-size-xl);
    }

    h4 {
      font-size: var(--crt-font-size-lg);
    }

    h5, h6 {
      font-size: var(--crt-font-size-base);
    }
  `;

  @property({ type: Number }) level: 1 | 2 | 3 | 4 | 5 | 6 = 1;

  render() {
    switch (this.level) {
      case 1:
        return html`<h1><slot></slot></h1>`;
      case 2:
        return html`<h2><slot></slot></h2>`;
      case 3:
        return html`<h3><slot></slot></h3>`;
      case 4:
        return html`<h4><slot></slot></h4>`;
      case 5:
        return html`<h5><slot></slot></h5>`;
      case 6:
        return html`<h6><slot></slot></h6>`;
      default:
        return html`<h1><slot></slot></h1>`;
    }
  }
}

@customElement('crt-text')
export class Text extends LitElement {
  static styles = css`
    p {
      font-family: var(--crt-font-family);
      color: var(--crt-text-secondary);
      line-height: var(--crt-line-height);
      margin: var(--crt-spacing-md) 0;
    }

    :host([muted]) p {
      color: var(--crt-text-muted);
    }
  `;

  @property() muted = false;

  render() {
    return html`<p><slot></slot></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-heading': Heading;
    'crt-text': Text;
  }
}
