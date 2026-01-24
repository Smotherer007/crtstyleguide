import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Skeleton Loader Component
 */
@customElement('crt-skeleton')
export class Skeleton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      background: linear-gradient(
        90deg,
        var(--crt-bg-dark) 25%,
        color-mix(in srgb, var(--crt-primary) 15%, transparent) 50%,
        var(--crt-bg-dark) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border: 1px solid color-mix(in srgb, var(--crt-primary) 30%, transparent);
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    /* Variants */
    :host([variant="text"]) .skeleton {
      height: 1em;
      width: 100%;
      margin-bottom: 0.5em;
    }

    :host([variant="circular"]) .skeleton {
      border-radius: 50%;
    }

    :host([variant="rectangular"]) .skeleton,
    :host(:not([variant])) .skeleton {
      border-radius: 0;
    }

    :host([variant="rounded"]) .skeleton {
      border-radius: 4px;
    }

    /* Animation variants */
    :host([animation="pulse"]) .skeleton {
      animation: pulse 1.5s ease-in-out infinite;
      background: transparent;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }

    :host([animation="wave"]) .skeleton {
      position: relative;
      overflow: hidden;
      background: transparent;
    }

    :host([animation="wave"]) .skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        color-mix(in srgb, var(--crt-primary) 20%, transparent),
        transparent
      );
      animation: wave 1.5s infinite;
    }

    @keyframes wave {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    :host([animation="none"]) .skeleton {
      animation: none;
      background: transparent;
    }

    /* CRT Scanline effect */
    :host([effect="scanline"]) .skeleton::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.1) 2px,
        rgba(0, 0, 0, 0.1) 4px
      );
      pointer-events: none;
    }
  `;

  @property({ type: String, reflect: true }) variant: 'text' | 'circular' | 'rectangular' | 'rounded' = 'rectangular';
  @property({ type: String, reflect: true }) animation: 'shimmer' | 'pulse' | 'wave' | 'none' = 'shimmer';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = '20px';
  @property({ type: Boolean, reflect: true }) effect = false;

  render() {
    return html`
      <div 
        class="skeleton"
        style="width: ${this.width}; height: ${this.height};"
      ></div>
    `;
  }
}

/**
 * Pre-made skeleton patterns for common use cases
 */
@customElement('crt-skeleton-text')
export class SkeletonText extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .line {
      background: linear-gradient(
        90deg,
        var(--crt-bg-dark) 25%,
        color-mix(in srgb, var(--crt-primary) 15%, transparent) 50%,
        var(--crt-bg-dark) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border: 1px solid color-mix(in srgb, var(--crt-primary) 30%, transparent);
      height: 1em;
      margin-bottom: 0.5em;
    }

    .line:last-child {
      width: 60%;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  @property({ type: Number }) lines = 3;

  render() {
    return html`
      ${Array.from({ length: this.lines }).map(() => html`
        <div class="line"></div>
      `)}
    `;
  }
}

@customElement('crt-skeleton-card')
export class SkeletonCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      border: 3px double var(--crt-primary);
      padding: var(--crt-spacing-md);
      background: transparent;
    }

    .image {
      height: 150px;
      margin-bottom: var(--crt-spacing-md);
    }

    .image, .title, .text {
      background: linear-gradient(
        90deg,
        color-mix(in srgb, var(--crt-primary) 5%, transparent) 25%,
        color-mix(in srgb, var(--crt-primary) 15%, transparent) 50%,
        color-mix(in srgb, var(--crt-primary) 5%, transparent) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    .title {
      height: 1.5em;
      width: 70%;
      margin-bottom: var(--crt-spacing-sm);
    }

    .text {
      height: 1em;
      margin-bottom: 0.5em;
    }

    .text:last-child {
      width: 50%;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  @property({ type: Boolean }) hideImage = false;

  render() {
    return html`
      <div class="card">
        ${!this.hideImage ? html`<div class="image"></div>` : ''}
        <div class="title"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-skeleton': Skeleton;
    'crt-skeleton-text': SkeletonText;
    'crt-skeleton-card': SkeletonCard;
  }
}
