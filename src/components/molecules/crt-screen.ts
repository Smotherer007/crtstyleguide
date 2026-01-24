import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * CRT Screen Component
 * 
 * Ein Container mit authentischem CRT-Monitor-Effekt.
 * Unterstützt Power-On-Animation, Scanlines und Clip-Path für gerundete Bildschirmkanten.
 * 
 * @element crt-screen
 * 
 * @slot - Standard-Slot für beliebige Inhalte
 * 
 * @property {boolean} active - Steuert den Power-On/Off-Effekt (Standard: true)
 * 
 * @example
 * ```html
 * <crt-screen>
 *   <h1>Dein Content hier</h1>
 * </crt-screen>
 * ```
 */
@customElement('crt-screen')
export class CRTScreen extends LitElement {
  @property({ type: Boolean }) active = true;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .screen {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: transparent;
      clip-path: url(#crtPath);
      overflow: hidden;
    }

    .screen.scanlines {
      position: relative;
    }

    /* Scanline-Effekt: bewegliche Linie */
    .screen.scanlines::before {
      display: block;
      pointer-events: none;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.2rem;
      z-index: 2147483649;
      opacity: 0.75;
      background: transparent;
    }

    /* Scanline-Effekt: statische Linien */
    .screen.scanlines::after {
      display: block;
      pointer-events: none;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2147483648;
      background: linear-gradient(
        to bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.25) 51%
      );
      background-size: 100% 0.4rem;
    }

    /* Inaktiver Zustand: keine Animationen */
    .screen:not(.active) {
      background: transparent;
    }

    .screen:not(.active).scanlines::before,
    .screen:not(.active).scanlines::after {
      animation: none;
    }

    .screen:not(.active) > .contents {
      animation: crt-power-off 0.55s forwards ease-in-out;
    }

    /* Aktiver Zustand: Animationen laufen */
    .screen.active.scanlines::before {
      animation: scan-moving 6s linear infinite;
    }

    .screen.active.scanlines::after {
      animation: scan-crt 1s steps(60) infinite;
    }

    .screen.active > .contents {
      animation: crt-power-on 4s forwards linear;
    }

    .contents {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 2rem;
      padding-right: 2.5rem;
      box-sizing: border-box;
      background-color: transparent;
      overflow-y: auto;
      overflow-x: hidden;
    }

    /* Custom Scrollbar - unauffällig und mit Abstand vom Rand */
    .contents::-webkit-scrollbar {
      width: 6px;
    }

    .contents::-webkit-scrollbar-track {
      background: transparent;
    }

    .contents::-webkit-scrollbar-thumb {
      background: rgba(0, 255, 0, 0.15);
      border-radius: 3px;
    }

    .contents::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 255, 0, 0.3);
    }

    /* Firefox Scrollbar */
    .contents {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 255, 0, 0.15) transparent;
    }

    /* Animationen */
    @keyframes scan-moving {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(0, 100vh, 0);
      }
    }

    @keyframes scan-crt {
      0% {
        background-position: 0 50%;
      }
    }

    @keyframes crt-power-on {
      0% {
        transform: scale(1, 0.8) translate3d(0, 0, 0);
        filter: brightness(30);
        opacity: 1;
      }
      3.5% {
        transform: scale(1, 0.8) translate3d(0, 100%, 0);
      }
      3.6% {
        transform: scale(1, 0.8) translate3d(0, -100%, 0);
      }
      9% {
        transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
      }
      11% {
        transform: scale(1, 1) translate3d(0, 0, 0);
        filter: contrast(0) brightness(0);
        opacity: 0;
      }
      100% {
        transform: scale(1, 1) translate3d(0, 0, 0);
        filter: contrast(1) brightness(1.2) saturate(1.3);
        opacity: 1;
      }
    }

    @keyframes crt-power-off {
      0% {
        transform: scale(1, 1.3) translate3d(0, 0, 0);
        filter: brightness(1);
        opacity: 1;
      }
      60% {
        transform: scale(1.3, 0.001) translate3d(0, 0, 0);
        filter: brightness(10);
      }
      100% {
        transform: scale(0.000, 0.0001) translate3d(0, 0, 0);
        filter: brightness(50);
        opacity: 0;
      }
    }
  `;

  render() {
    return html`
      <!-- SVG Clip Path für gerundete CRT-Bildschirmkanten -->
      <svg height="0" width="0" viewBox="0 0 93.88 76.19" style="position: absolute;">
        <clipPath id="crtPath" clipPathUnits="objectBoundingBox" transform="scale(0.01065 0.01312)">
          <path d="M47.78.5c11.65,0,38,.92,41.81,4,3.59,3,3.79,22.28,3.79,34.19,0,11.67-.08,27.79-3.53,31.24S60.3,75.69,47.78,75.69c-11.2,0-39.89-1.16-44-5.27S.57,52.42.57,38.73.31,8.56,4,4.88,34.77.5,47.78.5Z" />
        </clipPath>
      </svg>

      <div class="screen scanlines ${this.active ? 'active' : ''}">
        <div class="contents">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-screen': CRTScreen;
  }
}
