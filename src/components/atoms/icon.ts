import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const ICONS_MAP: { [key: string]: string } = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5"/></svg>',
  checkmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
  'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>',
  'arrow-left': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5"/><path d="M11 19l-7-7 7-7"/></svg>',
  'arrow-up': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>',
  'arrow-down': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M21 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4"/><path d="M7 14l5-5 5 5"/><path d="M12 9v12"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
  delete: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
  hamburger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18M3 6h18M3 18h18"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M19.43 12.98c.04-.32.07-.66.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.03 7.03 0 0 0-1.7-.98l-.38-2.65A.5.5 0 0 0 13.5 2h-4a.5.5 0 0 0-.5.42l-.38 2.65c-.61.24-1.18.56-1.7.98l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64L4.57 11c-.04.32-.07.66-.07.98s.03.66.07.98L2.46 14.6a.5.5 0 0 0-.12.64l2 3.46c.14.24.44.34.7.22l2.49-1c.52.42 1.09.74 1.7.98l.38 2.65c.05.28.29.42.5.42h4c.21 0 .45-.14.5-.42l.38-2.65c.61-.24 1.18-.56 1.7-.98l2.49 1c.26.12.56.02.7-.22l2-3.46a.5.5 0 0 0-.12-.64L19.43 12.98z"/><circle cx="12" cy="12" r="3"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M19.43 12.98c.04-.32.07-.66.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.03 7.03 0 0 0-1.7-.98l-.38-2.65A.5.5 0 0 0 13.5 2h-4a.5.5 0 0 0-.5.42l-.38 2.65c-.61.24-1.18.56-1.7.98l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64L4.57 11c-.04.32-.07.66-.07.98s.03.66.07.98L2.46 14.6a.5.5 0 0 0-.12.64l2 3.46c.14.24.44.34.7.22l2.49-1c.52.42 1.09.74 1.7.98l.38 2.65c.05.28.29.42.5.42h4c.21 0 .45-.14.5-.42l.38-2.65c.61-.24 1.18-.56 1.7-.98l2.49 1c.26.12.56.02.7-.22l2-3.46a.5.5 0 0 0-.12-.64L19.43 12.98z"/><circle cx="12" cy="12" r="3"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L23.4 9.75l-5.6 5.455L18.335 24 12 19.897 5.665 24l.535-8.795L.6 9.75l7.732-1.732L12 .587z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7-4.35-9.2-7.1C.8 11.9 2 7.9 5 6.4 7 5.3 9.6 6 12 8.2 14.4 6 17 5.3 19 6.4c3 1.5 4.2 5.5 2.2 7.5C19 16.65 12 21 12 21z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 3v18l15-9L5 3z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  stop: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="12" height="12"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M11 19l-7-7 7-7"/><path d="M18 19l-7-7 7-7"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M13 5l7 7-7 7"/><path d="M6 5l7 7-7 7"/></svg>',
  rewind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M11 19l-7-7 7-7"/><path d="M18 19l-7-7 7-7"/></svg>',
  forward: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M13 5l7 7-7 7"/><path d="M6 5l7 7-7 7"/></svg>',
  volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19 5a4 4 0 0 1 0 14"/></svg>',
  'volume-mute': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
};

export const ICON_NAMES = Object.keys(ICONS_MAP);

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

  render() {
    const svg = (ICONS_MAP as any)[this.name] || '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="0" y="14">?</text></svg>';
    return html`<span class="icon" aria-hidden="true">${unsafeHTML(svg)}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-icon': Icon;
  }
}
