import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('crt-visualizer')
export class Visualizer extends LitElement {
  @property({ type: Number }) bars = 20;
  @property({ type: Number }) mode = 1; // 1 = Spectrum, 2 = Mirror, 3 = Outside-In
  @state() private barHeights: number[] = [];
  @state() private isActive = false;

  private audioContext?: AudioContext;
  private analyser?: AnalyserNode;
  private dataArray?: Uint8Array<ArrayBuffer>;
  private animationId?: number;
  private sourceNode?: MediaElementAudioSourceNode;

  static styles = css`
    :host {
      display: block;
    }

    .visualizer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      /* allow configurable height and responsive fallback */
      height: var(--crt-visualizer-height, 160px);
      gap: 6px;
      border: 2px solid var(--crt-primary);
      padding: var(--crt-spacing-md);
      position: relative;
      background: transparent;
      box-shadow: var(--crt-component-glow-inset);
      box-sizing: border-box;
      overflow: hidden;
    }

    @media (max-width: 520px) {
      .visualizer { height: var(--crt-visualizer-height-sm, 110px); padding: calc(var(--crt-spacing-sm) + 2px); }
      .bar { min-width: 4px; }
    }

    .label {
      position: absolute;
      top: 10px;
      left: 15px;
      opacity: 0.7;
      font-size: var(--crt-font-size-sm);
      letter-spacing: 2px;
      color: var(--crt-primary);
      text-shadow: var(--crt-component-glow);
      z-index: 10;
    }

    .mode-toggle {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: 1px solid var(--crt-primary);
      color: var(--crt-primary);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-xs);
      padding: 4px 10px;
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
      box-shadow: 0 0 5px rgba(51, 255, 51, 0.3);
      z-index: 10;
      text-transform: uppercase;
    }

    .mode-toggle:hover {
      background: transparent;
      box-shadow: var(--crt-component-glow);
    }

    .bar {
      flex: 1 1 0;
      align-self: flex-end;
      min-width: 4px;
      background: linear-gradient(180deg, color-mix(in srgb, var(--crt-primary) 80%, white 20%), var(--crt-primary));
      box-shadow: 0 0 8px color-mix(in srgb, var(--crt-primary) 40%, transparent);
      transition: height 0.05s ease, background 0.2s ease;
      will-change: height;
      border-radius: 2px 2px 0 0;
    }

    .bar.active {
      animation: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.barHeights = new Array(this.bars).fill(20);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }

  connectAudio(audioElement: HTMLAudioElement) {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      
      this.sourceNode = this.audioContext.createMediaElementSource(audioElement);
      this.sourceNode.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
    }
    
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  start() {
    this.isActive = true;
    this.visualize();
  }

  stop() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
    this.resetBars();
  }

  private resetBars() {
    this.barHeights = new Array(this.bars).fill(20);
  }

  private visualize = () => {
    if (!this.isActive || !this.analyser || !this.dataArray) return;

    this.analyser.getByteFrequencyData(this.dataArray);
    const step = Math.floor(this.dataArray.length / this.bars);
    const newHeights: number[] = [];

    for (let i = 0; i < this.bars; i++) {
      let dataIndex: number;
      
      if (this.mode === 1) {
        // Mode 1: Frequency Spectrum (left to right)
        dataIndex = i * step;
      } else if (this.mode === 2) {
        // Mode 2: Mirrored waveform (from center)
        if (i < this.bars / 2) {
          dataIndex = Math.floor((this.bars / 2 - i - 1) * step);
        } else {
          dataIndex = Math.floor((i - this.bars / 2) * step);
        }
      } else {
        // Mode 3: Outside-In
        if (i < this.bars / 2) {
          dataIndex = Math.floor(i * step);
        } else {
          dataIndex = Math.floor((this.bars - i - 1) * step);
        }
      }

      const value = this.dataArray[dataIndex] || 0;
      const percent = (value / 255) * 100;
      newHeights.push(Math.max(20, percent));
    }

    this.barHeights = newHeights;
    this.animationId = requestAnimationFrame(this.visualize);
  };

  private toggleMode() {
    this.mode = this.mode === 3 ? 1 : this.mode + 1;
    this.dispatchEvent(new CustomEvent('mode-change', { detail: { mode: this.mode } }));
  }

  render() {
    return html`
      <div class="visualizer">
        <span class="label">[VISUALIZER]</span>
        <button class="mode-toggle" @click="${this.toggleMode}">MODE ${this.mode}</button>
        ${this.barHeights.map(height => html`
          <div class="bar" style="height: ${height}%"></div>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-visualizer': Visualizer;
  }
}
