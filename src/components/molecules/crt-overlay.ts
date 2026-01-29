import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * CRT Overlay Component
 * 
 * A pure visual overlay with authentic CRT monitor effects.
 * Unlike crt-screen, this component doesn't wrap content - it overlays the entire viewport.
 * All pointer events pass through, so content beneath remains fully interactive.
 * 
 * Use this when you want CRT effects over your entire page without z-index/stacking issues.
 * 
 * @element crt-overlay
 * 
 * @property {boolean} active - Controls the power-on/off effect (default: true)
 * @property {boolean} scanlines - Show scanline effect (default: true)
 * @property {boolean} vignette - Show vignette edge darkening (default: true)
 * @property {boolean} flicker - Enable subtle flicker animation (default: true)
 * @property {boolean} contained - If true, uses absolute positioning for use in containers (default: false)
 * 
 * @example
 * ```html
 * <!-- Full page overlay -->
 * <crt-overlay></crt-overlay>
 * 
 * <!-- In a container -->
 * <div style="position:relative;">
 *   <crt-overlay contained></crt-overlay>
 * </div>
 * ```
 */
@customElement('crt-overlay')
export class CRTOverlay extends LitElement {
  @property({ type: Boolean }) active = true;
  @property({ type: Boolean }) scanlines = true;
  @property({ type: Boolean }) vignette = true;
  @property({ type: Boolean }) flicker = true;
  @property({ type: Boolean, reflect: true }) contained = false;
  
  @state() private _powerState: 'idle' | 'power-on' | 'power-off' = 'idle';
  private _isFirstRender = true;
  private _hasBeenActivated = false; // Track if overlay was ever turned on

  static styles = css`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 2147483647;
      overflow: hidden;
    }

    /* Container mode - absolute positioning */
    :host([contained]) {
      position: absolute;
      inset: 0;
      z-index: 100;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }

    /* Vignette - Abgedunkelte Ecken (identisch zu crt-screen) */
    .vignette {
      background: radial-gradient(
        ellipse at center,
        transparent 0%,
        transparent 60%,
        rgba(0, 0, 0, 0.3) 90%,
        rgba(0, 0, 0, 0.6) 100%
      );
    }

    .vignette.fade-in {
      animation: effects-fade-in 4s forwards linear;
    }

    /* Static Scanlines - Horizontale Linien (identisch zu crt-screen) */
    .scanlines {
      background: linear-gradient(
        to bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.25) 51%
      );
      background-size: 100% 0.4rem;
    }

    .scanlines.active {
      animation: scan-crt 1s steps(60) infinite;
    }

    .scanlines.fade-in {
      animation: effects-fade-in 4s forwards linear, scan-crt 1s steps(60) infinite;
    }

    /* Moving Scanline - Bewegliche Linie (identisch zu crt-screen) */
    .scan-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      opacity: 0;
      background: rgba(255, 255, 255, 0.1);
    }

    .scan-line.active {
      opacity: 0.5;
      animation: scan-moving 6s linear infinite;
    }

    .scan-line.fade-in {
      animation: scanline-fade-in 4s forwards linear, scan-moving 6s linear infinite;
    }

    /* Flicker Layer (identisch zu crt-screen) */
    .flicker {
      background: transparent;
    }

    .flicker.active {
      animation: crt-flicker 0.1s infinite;
    }

    .flicker.fade-in {
      animation: effects-fade-in 4s forwards linear, crt-flicker 0.1s infinite;
    }

    /* Power Animation Container */
    .power-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      overflow: hidden;
    }

    /* Power-On: Einfaches schwarzes Layer das ausfaded */
    .power-layer {
      position: absolute;
      inset: 0;
      background: var(--crt-bg-darker, #000000);
      z-index: 10;
    }

    .power-on .power-layer {
      animation: overlay-power-on 4s forwards linear;
    }

    /* Power-Off: Zwei Balken die sich zur Mitte bewegen */
    .power-bar-top,
    .power-bar-bottom {
      position: absolute;
      left: 0;
      width: 100%;
      height: 50%;
      background: var(--crt-bg-darker, #000000);
    }

    .power-bar-top {
      top: 0;
      transform-origin: center top;
    }

    .power-bar-bottom {
      bottom: 0;
      transform-origin: center bottom;
    }

    .power-off .power-bar-top {
      animation: bar-top-close 1s forwards ease-in-out;
    }

    .power-off .power-bar-bottom {
      animation: bar-bottom-close 1s forwards ease-in-out;
    }

    /* Heller Streifen in der Mitte beim Power-Off */
    .power-line {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 4px;
      transform: translateY(-50%);
      background: var(--crt-primary, #8aff8a);
      box-shadow: 0 0 20px var(--crt-primary, #8aff8a),
                  0 0 40px var(--crt-primary, #8aff8a),
                  0 0 60px var(--crt-primary, #8aff8a);
    }

    .power-off .power-line {
      animation: power-line-shrink 1s forwards ease-in-out;
    }

    /* Animationen (identisch zu crt-screen) */
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

    @keyframes crt-flicker {
      0% {
        opacity: 0.95;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.97;
      }
    }

    /* 
     * Power-On Animation für Overlay
     * Timing exakt wie crt-screen:
     * - 0-11%: Schnelle Bewegungen, heller Blitz
     * - 11%: Bildschirm wird schwarz
     * - 11-100%: Inhalt faded langsam ein (= schwarzes Layer faded aus)
     */
    @keyframes overlay-power-on {
      0% {
        opacity: 1;
        filter: brightness(30);
      }
      3.5% {
        opacity: 1;
        filter: brightness(20);
      }
      9% {
        opacity: 1;
        filter: brightness(10);
      }
      11% {
        opacity: 1;
        filter: brightness(0);
      }
      100% {
        opacity: 0;
        filter: brightness(1);
      }
    }

    /* Effekte (Vignette, Scanlines, Flicker) faden synchron mit dem Inhalt ein */
    @keyframes effects-fade-in {
      0% {
        opacity: 0;
      }
      11% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    /* Scanline faded von 0 auf 0.5 */
    @keyframes scanline-fade-in {
      0% {
        opacity: 0;
      }
      11% {
        opacity: 0;
      }
      100% {
        opacity: 0.5;
      }
    }

    /* Power-Off: Oberer Balken kommt von oben, dann fade-out */
    @keyframes bar-top-close {
      0% {
        transform: scaleY(0);
        opacity: 1;
      }
      40% {
        transform: scaleY(1);
        opacity: 1;
      }
      70% {
        transform: scaleY(1);
        opacity: 1;
      }
      100% {
        transform: scaleY(1);
        opacity: 0;
      }
    }

    /* Power-Off: Unterer Balken kommt von unten, dann fade-out */
    @keyframes bar-bottom-close {
      0% {
        transform: scaleY(0);
        opacity: 1;
      }
      40% {
        transform: scaleY(1);
        opacity: 1;
      }
      70% {
        transform: scaleY(1);
        opacity: 1;
      }
      100% {
        transform: scaleY(1);
        opacity: 0;
      }
    }

    /* Power-Off: Heller Streifen schrumpft und verschwindet */
    @keyframes power-line-shrink {
      0% {
        opacity: 0;
        transform: translateY(-50%) scaleX(1);
      }
      10% {
        opacity: 1;
        transform: translateY(-50%) scaleX(1.3);
        filter: brightness(1);
      }
      40% {
        opacity: 1;
        transform: translateY(-50%) scaleX(0);
        filter: brightness(10);
      }
      50% {
        opacity: 0;
        transform: translateY(-50%) scaleX(0);
        filter: brightness(50);
      }
      100% {
        opacity: 0;
        transform: translateY(-50%) scaleX(0);
      }
    }
  `;

  protected firstUpdated() {
    // Show power-on animation on initial render if active
    if (this.active) {
      this._hasBeenActivated = true;
      this._powerState = 'power-on';
      this.requestUpdate();
      // Reset to idle after animation (4s)
      setTimeout(() => {
        this._powerState = 'idle';
        this.requestUpdate();
      }, 4000);
    }
    this._isFirstRender = false;
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    
    if (changedProperties.has('active') && !this._isFirstRender) {
      const wasActive = changedProperties.get('active') as boolean | undefined;
      
      // Detect state change
      if (wasActive !== undefined && wasActive !== this.active) {
        if (this.active) {
          // Turning ON
          this._hasBeenActivated = true;
          this._powerState = 'power-on';
          // Reset to idle after animation (4s)
          setTimeout(() => {
            this._powerState = 'idle';
            this.requestUpdate();
          }, 4000);
        } else {
          // Turning OFF
          this._powerState = 'power-off';
          // After power-off animation, hide overlay so UI is visible again
          setTimeout(() => {
            this._powerState = 'idle';
            this._hasBeenActivated = false;
            this.requestUpdate();
          }, 1100); // 1000ms animation + 100ms buffer
        }
        this.requestUpdate();
      }
    }
  }

  render() {
    const isPoweringOn = this._powerState === 'power-on';
    const showEffects = this.active || isPoweringOn;
    
    // Build classes with fade-in during power-on
    const vignetteClass = isPoweringOn ? 'overlay vignette fade-in' : 'overlay vignette';
    const scanlineClass = isPoweringOn 
      ? 'overlay scanlines fade-in' 
      : 'overlay scanlines' + (this.active ? ' active' : '');
    const scanLineClass = isPoweringOn 
      ? 'scan-line fade-in' 
      : 'scan-line' + (this.active ? ' active' : '');
    const flickerClass = isPoweringOn 
      ? 'overlay flicker fade-in' 
      : 'overlay flicker' + (this.active ? ' active' : '');
    
    // Show power animation during state transitions
    const showPowerAnimation = this._powerState !== 'idle';
    // Show black screen when off (after power-off animation) - only if it was ever activated
    const showBlackScreen = !this.active && this._powerState === 'idle' && this._hasBeenActivated;

    return html`
      ${this.vignette && showEffects ? html`<div class="${vignetteClass}"></div>` : ''}
      ${this.scanlines && showEffects ? html`<div class="${scanlineClass}"></div>` : ''}
      ${this.scanlines && showEffects ? html`<div class="${scanLineClass}"></div>` : ''}
      ${this.flicker && showEffects ? html`<div class="${flickerClass}"></div>` : ''}
      ${showPowerAnimation ? html`
        <div class="power-container ${this._powerState}">
          ${this._powerState === 'power-on' ? html`
            <div class="power-layer"></div>
          ` : html`
            <div class="power-bar-top"></div>
            <div class="power-bar-bottom"></div>
            <div class="power-line"></div>
          `}
        </div>
      ` : ''}
      ${showBlackScreen ? html`<div class="power-layer" style="opacity: 1;"></div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-overlay': CRTOverlay;
  }
}
