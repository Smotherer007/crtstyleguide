import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('crt-terminal')
export class Terminal extends LitElement {
  @property({ type: Number }) rows = 10;
  @property({ type: String }) prompt = '$';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @state() private outputs: string[] = [];
  @state() private input = '';
  @state() private focused = false;

  static styles = css`
    :host { display: block; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace; }
    .term {
      background: #0b0f0b;
      color: #8aff8a;
      padding: 12px;
      border: 2px solid var(--crt-primary);
      min-height: calc(var(--crt-font-size-md, 16px) * 1.2 * 6);
      max-height: min(380px, 50vh);
      overflow: auto;
      box-sizing: border-box;
      border-radius: 6px;
    }
    @media (max-width: 480px) {
      .term { min-height: calc(var(--crt-font-size-md, 16px) * 1.2 * 4); max-height: 40vh; padding: 8px; }
    }
    .term[aria-disabled="true"] {
      opacity: 0.65;
      filter: grayscale(20%);
      pointer-events: none;
    }
    .line { white-space: pre-wrap; word-break: break-word; margin: 2px 0; }
    .input-line { display:flex; gap:4px; align-items:center; justify-content:flex-start; }
    .prompt { opacity: 0.9; color: var(--crt-primary); }
    .term[aria-disabled="true"] .prompt { opacity: 0.6; }
    .caret {
      display:inline-block;
      width:10px;
      margin-left:2px;
      animation: blink 1s steps(2,start) infinite;
      color: var(--crt-primary);
    }
    .term[aria-disabled="true"] .caret { visibility: hidden; }
    @keyframes blink { to { visibility: hidden; } }
    .fake-input { outline: none; flex: 0 1 auto; min-width: 4px; display:inline-flex; align-items:center; gap:0; }
    .fake-input .input-text { display:inline-block; white-space:pre; }
    .muted { opacity: 0.7; font-size: 0.9em; }
  `;

  constructor() {
    super();
    this.outputs = ['$ SYSTEM READY _'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleFocus);
    this.addEventListener('keydown', this.handleKeydown as EventListener);
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleFocus);
    this.removeEventListener('keydown', this.handleKeydown as EventListener);
    super.disconnectedCallback();
  }

  private handleFocus = () => {
    if (this.disabled) return;
    this.focused = true;
    this.focus();
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      this.input = this.input.slice(0, -1);
      this.requestUpdate();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const value = this.input.trim();
      this.println(`${this.prompt} ${value}`);
      this.dispatchEvent(new CustomEvent('command', { detail: value }));
      this.input = '';
      this.requestUpdate();
      return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      this.input += e.key;
      this.requestUpdate();
    }
  };

  // Public API
  write(text: string) {
    if (this.outputs.length === 0) this.outputs = [];
    const last = this.outputs[this.outputs.length - 1] || '';
    this.outputs[this.outputs.length - 1] = last + text;
    this.requestUpdate();
    this.scrollToBottom();
  }

  println(text: string) {
    this.outputs = [...this.outputs, text];
    this.requestUpdate();
    this.scrollToBottom();
  }

  clear() {
    this.outputs = [];
    this.requestUpdate();
  }

  focus() {
    super.focus();
    this.focused = true;
  }

  private scrollToBottom() {
    requestAnimationFrame(() => {
      const el = this.shadowRoot?.querySelector('.term') as HTMLElement | null;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  // Typing animation queue
  private typing = false;
  private typeQueue: Array<{ text: string; speed: number }> = [];

  type(text: string, speed = 30) {
    this.typeQueue.push({ text, speed });
    if (!this.typing) this.processTypeQueue();
  }

  private async processTypeQueue() {
    if (this.typing) return;
    this.typing = true;
    while (this.typeQueue.length > 0) {
      const { text, speed } = this.typeQueue.shift()!;
      // wait for the line to finish typing
      await new Promise<void>((resolve) => {
        // append a new empty line
        this.outputs = [...this.outputs, ''];
        let i = 0;
        const step = () => {
          if (i >= text.length) {
            resolve();
            return;
          }
          const last = this.outputs.length - 1;
          this.outputs[last] = (this.outputs[last] || '') + text[i++];
          this.requestUpdate();
          this.scrollToBottom();
          setTimeout(step, speed);
        };
        step();
      });
    }
    this.typing = false;
  }

  render() {
    const visible = this.outputs.slice(-this.rows);
    return html`
      <div class="term" role="textbox" aria-label="Terminal" tabindex="0" aria-disabled="${this.disabled}">
        ${visible.map(line => html`<div class="line">${line}</div>`)}
        <div class="line input-line">
          <span class="prompt">${this.prompt}</span>
          <div class="fake-input"><span class="input-text">${this.input}</span></div>
          <span class="caret">_</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-terminal': Terminal;
  }
}
