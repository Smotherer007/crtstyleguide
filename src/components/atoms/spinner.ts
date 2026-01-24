import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('crt-spinner')
export class Spinner extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) message = 'LOADING...';

  static styles = css`
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(2px);
    }

    .atom {
      width: 120px;
      height: 120px;
      position: relative;
      animation: spin 3s linear infinite;
    }

    /* Nucleus */
    .nucleus {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      background: var(--crt-primary);
      border-radius: 50%;
      box-shadow: 
        0 0 20px var(--crt-primary),
        0 0 40px var(--crt-primary),
        0 0 60px color-mix(in srgb, var(--crt-primary) 50%, transparent);
    }

    /* Electron orbits */
    .orbit {
      position: absolute;
      top: 50%;
      left: 50%;
      border: 2px solid var(--crt-primary);
      border-radius: 50%;
      box-shadow: 
        0 0 10px color-mix(in srgb, var(--crt-primary) 50%, transparent),
        inset 0 0 10px color-mix(in srgb, var(--crt-primary) 20%, transparent);
    }

    .orbit-1 {
      width: 100px;
      height: 40px;
      margin-left: -50px;
      margin-top: -20px;
      animation: orbit-tilt-1 2s linear infinite;
    }

    .orbit-2 {
      width: 100px;
      height: 40px;
      margin-left: -50px;
      margin-top: -20px;
      animation: orbit-tilt-2 2s linear infinite;
    }

    .orbit-3 {
      width: 100px;
      height: 40px;
      margin-left: -50px;
      margin-top: -20px;
      animation: orbit-tilt-3 2s linear infinite;
    }

    /* Electrons */
    .electron {
      position: absolute;
      width: 10px;
      height: 10px;
      background: var(--crt-primary);
      border-radius: 50%;
      box-shadow: 
        0 0 10px var(--crt-primary),
        0 0 20px var(--crt-primary);
    }

    .electron-1 {
      animation: electron-move-1 1.5s linear infinite;
    }

    .electron-2 {
      animation: electron-move-2 1.5s linear infinite;
    }

    .electron-3 {
      animation: electron-move-3 1.5s linear infinite;
    }

    .message {
      margin-top: 40px;
      color: var(--crt-primary);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-lg);
      letter-spacing: 4px;
      text-shadow: var(--crt-component-glow);
      animation: blink 1s ease-in-out infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes orbit-tilt-1 {
      from { transform: rotateX(60deg) rotateY(0deg); }
      to { transform: rotateX(60deg) rotateY(360deg); }
    }

    @keyframes orbit-tilt-2 {
      from { transform: rotateX(60deg) rotateY(120deg); }
      to { transform: rotateX(60deg) rotateY(480deg); }
    }

    @keyframes orbit-tilt-3 {
      from { transform: rotateX(60deg) rotateY(240deg); }
      to { transform: rotateX(60deg) rotateY(600deg); }
    }

    @keyframes electron-move-1 {
      0% { 
        top: -5px; 
        left: 45px;
        opacity: 1;
      }
      25% { 
        top: 15px; 
        left: 90px;
        opacity: 0.7;
      }
      50% { 
        top: 35px; 
        left: 45px;
        opacity: 1;
      }
      75% { 
        top: 15px; 
        left: 0px;
        opacity: 0.7;
      }
      100% { 
        top: -5px; 
        left: 45px;
        opacity: 1;
      }
    }

    @keyframes electron-move-2 {
      0% { 
        top: 35px; 
        left: 45px;
        opacity: 1;
      }
      25% { 
        top: 15px; 
        left: 0px;
        opacity: 0.7;
      }
      50% { 
        top: -5px; 
        left: 45px;
        opacity: 1;
      }
      75% { 
        top: 15px; 
        left: 90px;
        opacity: 0.7;
      }
      100% { 
        top: 35px; 
        left: 45px;
        opacity: 1;
      }
    }

    @keyframes electron-move-3 {
      0% { 
        top: 15px; 
        left: 0px;
        opacity: 0.7;
      }
      25% { 
        top: -5px; 
        left: 45px;
        opacity: 1;
      }
      50% { 
        top: 15px; 
        left: 90px;
        opacity: 0.7;
      }
      75% { 
        top: 35px; 
        left: 45px;
        opacity: 1;
      }
      100% { 
        top: 15px; 
        left: 0px;
        opacity: 0.7;
      }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  render() {
    if (!this.open) {
      return html``;
    }
    
    return html`
      <div class="overlay">
        <div class="atom">
          <div class="nucleus"></div>
          <div class="orbit orbit-1">
            <div class="electron electron-1"></div>
          </div>
          <div class="orbit orbit-2">
            <div class="electron electron-2"></div>
          </div>
          <div class="orbit orbit-3">
            <div class="electron electron-3"></div>
          </div>
        </div>
        <div class="message">${this.message}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-spinner': Spinner;
  }
}
