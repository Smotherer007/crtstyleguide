import { html, type TemplateResult } from 'lit';
import { ICON_NAMES } from '../../src/components/atoms/icon';

export type PropDoc = {
  name: string;
  type: string;
  default?: string;
  description?: string;
};

export type EventDoc = {
  name: string;
  detail?: string;
  description?: string;
};

export type SlotDoc = {
  name: string;
  description?: string;
};

export type ExampleDoc = {
  title: string;
  description?: string;
  preview: TemplateResult;
  code: string;
};

export type ComponentDoc = {
  id: string;
  name: string;
  tag: string;
  category: string;
  description?: string;
  hideHeader?: boolean;
  props?: PropDoc[];
  events?: EventDoc[];
  slots?: SlotDoc[];
  examples: ExampleDoc[];
};

export type CategoryDoc = {
  id: string;
  label: string;
  description?: string;
};

const code = (...lines: string[]) => lines.join('\n');

type ToastElement = HTMLElement & { show?: (options: { message: string; variant?: string }) => void };
type ModalElement = HTMLElement & { open?: boolean };

export const categories: CategoryDoc[] = [
  { id: 'basics', label: 'Basics', description: 'Typography, icons, and links.' },
  { id: 'forms', label: 'Forms', description: 'Inputs and form controls.' },
  { id: 'actions', label: 'Actions', description: 'Buttons and interactive actions.' },
  { id: 'feedback', label: 'Feedback', description: 'Status, progress, and alerts.' },
  { id: 'navigation', label: 'Navigation', description: 'Menus and page navigation.' },
  { id: 'layout', label: 'Layout', description: 'Grids, cards, and tables.' },
  { id: 'media', label: 'Media', description: 'Audio and visualization components.' },
  { id: 'crt', label: 'CRT', description: 'CRT screen effects and retro UX.' },
  { id: 'organisms', label: 'Organisms', description: 'Complex composed components.' },
];

export const componentDocs: ComponentDoc[] = [
  {
    id: 'heading',
    name: 'Heading',
    tag: 'crt-heading',
    category: 'basics',
    description: 'Typography scale for headings.',
    props: [
      { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'Heading level.' },
    ],
    examples: [
      {
        title: 'Heading Levels',
        description: 'Hierarchy from H1 to H4.',
        preview: html`
          <div style="display:flex;flex-direction:column;gap:8px;">
            <crt-heading level="1">Heading Level 1</crt-heading>
            <crt-heading level="2">Heading Level 2</crt-heading>
            <crt-heading level="3">Heading Level 3</crt-heading>
            <crt-heading level="4">Heading Level 4</crt-heading>
          </div>
        `,
        code: code(
          '<crt-heading level="1">Heading Level 1</crt-heading>',
          '<crt-heading level="2">Heading Level 2</crt-heading>',
          '<crt-heading level="3">Heading Level 3</crt-heading>',
          '<crt-heading level="4">Heading Level 4</crt-heading>'
        ),
      },
    ],
  },
  {
    id: 'text',
    name: 'Text',
    tag: 'crt-text',
    category: 'basics',
    description: 'Body text with optional muted style.',
    props: [
      { name: 'muted', type: 'boolean', default: 'false', description: 'Render muted text.' },
    ],
    examples: [
      {
        title: 'Body Text',
        description: 'Standard and muted variants.',
        preview: html`
          <div style="display:flex;flex-direction:column;gap:8px;">
            <crt-text>This is regular body text.</crt-text>
            <crt-text muted>This is muted helper text.</crt-text>
          </div>
        `,
        code: code(
          '<crt-text>This is regular body text.</crt-text>',
          '<crt-text muted>This is muted helper text.</crt-text>'
        ),
      },
    ],
  },
  {
    id: 'icon',
    name: 'Icon',
    tag: 'crt-icon',
    category: 'basics',
    description: 'Inline SVG icons by name.',
    props: [
      { name: 'name', type: 'string', default: '-', description: 'Icon name.' },
    ],
    examples: [
      {
        title: 'Common Icons',
        description: 'Full icon list with names.',
        preview: html`
          <div style="display:flex;flex-wrap:wrap;gap:12px;">
            ${ICON_NAMES.map((name) => html`
              <div style="width:120px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;border:1px dashed var(--crt-primary);">
                <crt-icon name="${name}" style="font-size:20px;"></crt-icon>
                <crt-text muted style="font-size:12px;word-break:break-word;text-align:center;width:100%;">${name}</crt-text>
              </div>
            `)}
          </div>
        `,
        code: '<!-- All icons preview (auto-generated) -->',
      },
    ],
  },
  {
    id: 'link',
    name: 'Link',
    tag: 'crt-link',
    category: 'basics',
    description: 'CRT-styled link with optional icons.',
    props: [
      { name: 'href', type: 'string', default: '#', description: 'Link target.' },
      { name: 'target', type: 'string', default: '-', description: 'Link target window.' },
      { name: 'icon', type: 'string', default: '-', description: 'Icon name.' },
      { name: 'icon-left', type: 'boolean', default: 'false', description: 'Show icon on left.' },
      { name: 'icon-right', type: 'boolean', default: 'false', description: 'Show icon on right.' },
    ],
    events: [
      { name: 'navigate', detail: '{ href }', description: 'Fired for hash navigation.' },
    ],
    slots: [
      { name: 'default', description: 'Link label.' },
    ],
    examples: [
      {
        title: 'Links',
        description: 'Default and with icon.',
        preview: html`
          <div style="display:flex;gap:16px;align-items:center;">
            <crt-link href="#">Standard link</crt-link>
            <crt-link href="#" icon-right icon="arrow-right">Read more</crt-link>
          </div>
        `,
        code: code(
          '<crt-link href="#">Standard link</crt-link>',
          '<crt-link href="#" icon-right icon="arrow-right">Read more</crt-link>'
        ),
      },
    ],
  },
  {
    id: 'input',
    name: 'Input',
    tag: 'crt-input',
    category: 'forms',
    description: 'Single-line text input.',
    props: [
      { name: 'type', type: 'string', default: 'text', description: 'Input type.' },
      { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text.' },
      { name: 'value', type: 'string', default: '-', description: 'Input value.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input.' },
    ],
    examples: [
      {
        title: 'Input Variants',
        description: 'Text and search styles.',
        preview: html`
          <div style="display:flex;flex-direction:column;gap:12px;max-width:360px;">
            <crt-input placeholder="Username"></crt-input>
            <crt-input type="search" placeholder="Search..."></crt-input>
          </div>
        `,
        code: code(
          '<crt-input placeholder="Username"></crt-input>',
          '<crt-input type="search" placeholder="Search..."></crt-input>'
        ),
      },
    ],
  },
  {
    id: 'textarea',
    name: 'Textarea',
    tag: 'crt-textarea',
    category: 'forms',
    description: 'Multiline text input.',
    props: [
      { name: 'rows', type: 'number', default: '4', description: 'Textarea rows.' },
      { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input.' },
    ],
    examples: [
      {
        title: 'Textarea',
        description: 'Multiline input.',
        preview: html`
          <crt-textarea placeholder="Write a message..."></crt-textarea>
        `,
        code: '<crt-textarea placeholder="Write a message..."></crt-textarea>',
      },
    ],
  },
  {
    id: 'search',
    name: 'Search',
    tag: 'crt-search',
    category: 'forms',
    description: 'Search input with suggestion list.',
    props: [
      { name: 'placeholder', type: 'string', default: 'Search...', description: 'Placeholder text.' },
      { name: 'debounce-ms', type: 'number', default: '300', description: 'Debounce time.' },
      { name: 'suggestions', type: 'array', default: '[]', description: 'Suggestion list.' },
    ],
    events: [
      { name: 'search', detail: '{ value }', description: 'Fired on enter.' },
      { name: 'select', detail: '{ item }', description: 'Fired on item select.' },
    ],
    examples: [
      {
        title: 'Search Input',
        description: 'Search with suggestions.',
        preview: html`<crt-search placeholder="Search styleguide..."></crt-search>`,
        code: '<crt-search placeholder="Search styleguide..."></crt-search>',
      },
    ],
  },
  {
    id: 'select',
    name: 'Select',
    tag: 'crt-select',
    category: 'forms',
    description: 'Custom select dropdown.',
    props: [
      { name: 'placeholder', type: 'string', default: 'Select...', description: 'Placeholder text.' },
      { name: 'options', type: 'array', default: '[]', description: 'Option list.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable select.' },
    ],
    events: [
      { name: 'change', detail: '{ value, label }', description: 'Option selected.' },
    ],
    examples: [
      {
        title: 'Select',
        description: 'Basic options.',
        preview: html`
          <crt-select
            .options=${[
              { value: 'green', label: 'Green' },
              { value: 'amber', label: 'Amber' },
              { value: 'blue', label: 'Blue' },
            ]}
          ></crt-select>
        `,
        code: code(
          '<crt-select .options=${[',
          "  { value: 'green', label: 'Green' },",
          "  { value: 'amber', label: 'Amber' },",
          "  { value: 'blue', label: 'Blue' }",
          ']}></crt-select>'
        ),
      },
    ],
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    tag: 'crt-checkbox',
    category: 'forms',
    description: 'Checkbox input.',
    examples: [
      {
        title: 'Checkboxes',
        description: 'Default and checked.',
        preview: html`
          <div style="display:flex;gap:16px;align-items:center;">
            <crt-checkbox label="Enable alerts"></crt-checkbox>
            <crt-checkbox label="Auto sync" checked></crt-checkbox>
          </div>
        `,
        code: code(
          '<crt-checkbox label="Enable alerts"></crt-checkbox>',
          '<crt-checkbox label="Auto sync" checked></crt-checkbox>'
        ),
      },
    ],
  },
  {
    id: 'radio',
    name: 'Radio',
    tag: 'crt-radio',
    category: 'forms',
    description: 'Radio input.',
    examples: [
      {
        title: 'Radio Group',
        description: 'Options as a group.',
        preview: html`
          <div style="display:flex;gap:16px;align-items:center;">
            <crt-radio name="mode" label="Auto" checked></crt-radio>
            <crt-radio name="mode" label="Manual"></crt-radio>
          </div>
        `,
        code: code(
          '<crt-radio name="mode" label="Auto" checked></crt-radio>',
          '<crt-radio name="mode" label="Manual"></crt-radio>'
        ),
      },
    ],
  },
  {
    id: 'toggle',
    name: 'Toggle',
    tag: 'crt-toggle',
    category: 'forms',
    description: 'On/off toggle switch.',
    examples: [
      {
        title: 'Toggle',
        description: 'Default and checked.',
        preview: html`
          <div style="display:flex;gap:16px;align-items:center;">
            <crt-toggle label="Night mode"></crt-toggle>
            <crt-toggle label="CRT glow" checked></crt-toggle>
          </div>
        `,
        code: code(
          '<crt-toggle label="Night mode"></crt-toggle>',
          '<crt-toggle label="CRT glow" checked></crt-toggle>'
        ),
      },
    ],
  },
  {
    id: 'slider',
    name: 'Slider',
    tag: 'crt-slider',
    category: 'forms',
    description: 'Range slider with filled track.',
    props: [
      { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
      { name: 'step', type: 'number', default: '1', description: 'Step value.' },
      { name: 'value', type: 'number', default: '50', description: 'Current value.' },
    ],
    events: [
      { name: 'input', detail: '{ value }', description: 'Fires while dragging.' },
      { name: 'change', detail: '{ value }', description: 'Fires on commit.' },
    ],
    examples: [
      {
        title: 'Slider',
        description: 'With label and unit.',
        preview: html`
          <crt-slider label="Volume" .value=${65} unit="%"></crt-slider>
        `,
        code: '<crt-slider label="Volume" .value=${65} unit="%"></crt-slider>',
      },
    ],
  },
  {
    id: 'calendar',
    name: 'Calendar',
    tag: 'crt-calendar',
    category: 'forms',
    description: 'Date picker with dropdown calendar.',
    examples: [
      {
        title: 'Calendar',
        description: 'Select a date.',
        preview: html`<crt-calendar placeholder="Select date..."></crt-calendar>`,
        code: '<crt-calendar placeholder="Select date..."></crt-calendar>',
      },
    ],
  },
  {
    id: 'file-upload',
    name: 'File Upload',
    tag: 'crt-file-upload',
    category: 'forms',
    description: 'File manager style upload component.',
    props: [
      { name: 'accept', type: 'string', default: '-', description: 'Accept filter.' },
      { name: 'multiple', type: 'boolean', default: 'true', description: 'Allow multiple files.' },
      { name: 'max-size', type: 'number', default: '10485760', description: 'Max file size (bytes).' },
      { name: 'max-files', type: 'number', default: '10', description: 'Max number of files.' },
    ],
    events: [
      { name: 'files-changed', detail: '{ files }', description: 'Fires on file list change.' },
    ],
    examples: [
      {
        title: 'File Upload',
        description: 'Default file manager.',
        preview: html`<crt-file-upload></crt-file-upload>`,
        code: '<crt-file-upload></crt-file-upload>',
      },
    ],
  },
  {
    id: 'file-input',
    name: 'File Input',
    tag: 'crt-file-input',
    category: 'forms',
    description: 'Simple file input styled like a regular input field.',
    props: [
      { name: 'accept', type: 'string', default: '-', description: 'Accepted file types (e.g., "image/*,.pdf").' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple file selection.' },
      { name: 'placeholder', type: 'string', default: 'No file selected...', description: 'Placeholder text.' },
      { name: 'label', type: 'string', default: '-', description: 'Label above the input.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input.' },
    ],
    events: [
      { name: 'change', detail: '{ files: File[] }', description: 'Fired when files are selected.' },
    ],
    examples: [
      {
        title: 'Simple File Input',
        description: 'Basic file input with label.',
        preview: html`
          <div style="display:flex;flex-direction:column;gap:16px;max-width:400px;">
            <crt-file-input label="SELECT FILE" placeholder="Choose a file..."></crt-file-input>
            <crt-file-input label="IMAGES ONLY" accept="image/*" placeholder="Select image..."></crt-file-input>
            <crt-file-input label="MULTIPLE FILES" multiple placeholder="Select files..."></crt-file-input>
          </div>
        `,
        code: code(
          '<crt-file-input label="SELECT FILE" placeholder="Choose a file..."></crt-file-input>',
          '<crt-file-input label="IMAGES ONLY" accept="image/*"></crt-file-input>',
          '<crt-file-input label="MULTIPLE FILES" multiple></crt-file-input>'
        ),
      },
    ],
  },
  {
    id: 'button',
    name: 'Button',
    tag: 'crt-button',
    category: 'actions',
    description: 'Primary action button with variants and icons.',
    props: [
      { name: 'variant', type: 'primary | success | warning | error | link', default: 'primary', description: 'Style variant.' },
      { name: 'size', type: 'small | medium | large', default: 'medium', description: 'Button size.' },
      { name: 'icon-left', type: 'string', default: '-', description: 'Left icon name.' },
      { name: 'icon-right', type: 'string', default: '-', description: 'Right icon name.' },
    ],
    examples: [
      {
        title: 'Buttons',
        description: 'Primary and variants.',
        preview: html`
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <crt-button>Primary</crt-button>
            <crt-button variant="success">Success</crt-button>
            <crt-button variant="warning">Warning</crt-button>
            <crt-button variant="error">Error</crt-button>
          </div>
        `,
        code: code(
          '<crt-button>Primary</crt-button>',
          '<crt-button variant="success">Success</crt-button>',
          '<crt-button variant="warning">Warning</crt-button>',
          '<crt-button variant="error">Error</crt-button>'
        ),
      },
      {
        title: 'Icon Buttons',
        description: 'Icons left/right and icon-only.',
        preview: html`
          <div style="display:flex;gap:12px;align-items:center;">
            <crt-button icon-left="arrow-left">Back</crt-button>
            <crt-button icon-right="arrow-right">Next</crt-button>
            <crt-button icon-only icon-left="settings" aria-label="Settings"></crt-button>
          </div>
        `,
        code: code(
          '<crt-button icon-left="arrow-left">Back</crt-button>',
          '<crt-button icon-right="arrow-right">Next</crt-button>',
          '<crt-button icon-only icon-left="settings" aria-label="Settings"></crt-button>'
        ),
      },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    tag: 'crt-badge',
    category: 'actions',
    description: 'Compact status label.',
    examples: [
      {
        title: 'Badges',
        description: 'Status colors.',
        preview: html`
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <crt-badge>Default</crt-badge>
            <crt-badge variant="success">Success</crt-badge>
            <crt-badge variant="warning">Warning</crt-badge>
            <crt-badge variant="error">Error</crt-badge>
          </div>
        `,
        code: code(
          '<crt-badge>Default</crt-badge>',
          '<crt-badge variant="success">Success</crt-badge>',
          '<crt-badge variant="warning">Warning</crt-badge>',
          '<crt-badge variant="error">Error</crt-badge>'
        ),
      },
    ],
  },
  {
    id: 'progress',
    name: 'Progress',
    tag: 'crt-progress',
    category: 'feedback',
    description: 'Progress bar with label.',
    examples: [
      {
        title: 'Progress',
        description: 'Progress values.',
        preview: html`
          <div style="display:flex;flex-direction:column;gap:12px;">
            <crt-progress value="25" label="Initializing"></crt-progress>
            <crt-progress value="70" label="Processing"></crt-progress>
          </div>
        `,
        code: code(
          '<crt-progress value="25" label="Initializing"></crt-progress>',
          '<crt-progress value="70" label="Processing"></crt-progress>'
        ),
      },
    ],
  },
  {
    id: 'spinner',
    name: 'Spinner',
    tag: 'crt-spinner',
    category: 'feedback',
    description: 'Inline loading indicator.',
    props: [
      { name: 'open', type: 'boolean', default: 'true', description: 'Show or hide spinner.' },
      { name: 'message', type: 'string', default: 'LOADING...', description: 'Optional label.' },
      { name: 'size', type: 'sm | md | lg', default: 'md', description: 'Block size.' },
      { name: 'fullscreen', type: 'boolean', default: 'false', description: 'Overlay over the full viewport.' },
    ],
    examples: [
      {
        title: 'Spinner',
        description: 'Inline spinner with toggle.',
        preview: html`
          <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">
          <crt-spinner id="demo-spinner" message="Processing..." .open=${false}></crt-spinner>
            <crt-spinner size="sm" message="Small"></crt-spinner>
            <crt-spinner size="lg" message="Large"></crt-spinner>
          </div>
          <div style="margin-top:12px;">
            <crt-button
              size="small"
              @click=${(event: Event) => {
                const host = (event.currentTarget as HTMLElement | null)?.closest('crt-code-example');
                const spinner = host?.querySelector('#demo-spinner') as (HTMLElement & { open?: boolean }) | null;
                if (spinner) {
                  spinner.open = true;
                  globalThis.setTimeout(() => {
                    spinner.open = false;
                  }, 3000);
                }
              }}
            >
              Show 3s
            </crt-button>
          </div>
        `,
        code: code(
          '<crt-spinner message="Processing..."></crt-spinner>',
          '<crt-spinner size="sm" message="Small"></crt-spinner>',
          '<crt-spinner size="lg" message="Large"></crt-spinner>',
          '<crt-button size="small" @click=${() => (spinner.open = !spinner.open)}>Toggle</crt-button>'
        ),
      },
      {
        title: 'Fullscreen Spinner',
        description: 'Overlay over the whole viewport.',
        preview: html`
          <crt-spinner id="demo-spinner-full" fullscreen message="Loading..." .open=${false}></crt-spinner>
          <div style="margin-top:12px;">
            <crt-button
              size="small"
              @click=${(event: Event) => {
                const host = (event.currentTarget as HTMLElement | null)?.closest('crt-code-example');
                const spinner = host?.querySelector('#demo-spinner-full') as (HTMLElement & { open?: boolean }) | null;
                if (spinner) {
                  spinner.open = true;
                  globalThis.setTimeout(() => {
                    spinner.open = false;
                  }, 3000);
                }
              }}
            >
              Show 3s fullscreen
            </crt-button>
          </div>
        `,
        code: code(
          '<crt-spinner fullscreen message="Loading..."></crt-spinner>',
          '<crt-button size="small" @click=${() => {',
          '  spinner.open = true;',
          '  setTimeout(() => spinner.open = false, 3000);',
          '}}>Show 3s fullscreen</crt-button>'
        ),
      },
    ],
  },
  {
    id: 'alert',
    name: 'Alert',
    tag: 'crt-alert',
    category: 'feedback',
    description: 'Alert banner with variants.',
    events: [
      { name: 'close', detail: '{ closed: true }', description: 'Fired on close.' },
    ],
    slots: [
      { name: 'default', description: 'Alert message.' },
      { name: 'actions', description: 'Action buttons.' },
    ],
    examples: [
      {
        title: 'Alerts',
        description: 'Info and error variants.',
        preview: html`
          <div style="display:flex;flex-direction:column;gap:12px;">
            <crt-alert title="System Status">All systems operational.</crt-alert>
            <crt-alert variant="error" title="Connection Lost">Reconnecting...</crt-alert>
          </div>
        `,
        code: code(
          '<crt-alert title="System Status">All systems operational.</crt-alert>',
          '<crt-alert variant="error" title="Connection Lost">Reconnecting...</crt-alert>'
        ),
      },
    ],
  },
  {
    id: 'toast',
    name: 'Toast',
    tag: 'crt-toast',
    category: 'feedback',
    description: 'Toast notification container.',
    examples: [
      {
        title: 'Toast',
        description: 'Use toast.show() in JS.',
        preview: html`
          <crt-toast></crt-toast>
          <crt-button
            size="small"
            @click=${() => {
              const toast = document.querySelector('crt-toast') as ToastElement | null;
              toast?.show?.({ message: 'Toast message', variant: 'success' });
            }}
          >
            Trigger Toast
          </crt-button>
        `,
        code: code(
          '<crt-toast></crt-toast>',
          '<crt-button size="small" @click=${...}>Trigger Toast</crt-button>'
        ),
      },
    ],
  },
  {
    id: 'log',
    name: 'Log',
    tag: 'crt-log',
    category: 'feedback',
    description: 'Log display component for system messages with filtering and autoscroll.',
    props: [
      { name: 'entries', type: 'LogEntry[]', default: '[]', description: 'Array of log entries.' },
      { name: 'autoscroll', type: 'boolean', default: 'true', description: 'Auto-scroll to bottom on new entries.' },
      { name: 'show-timestamp', type: 'boolean', default: 'true', description: 'Show timestamps.' },
      { name: 'show-level', type: 'boolean', default: 'true', description: 'Show log level badges.' },
      { name: 'title', type: 'string', default: 'SYSTEM LOG', description: 'Title in header.' },
      { name: 'max-entries', type: 'number', default: '500', description: 'Maximum entries to keep.' },
    ],
    events: [
      { name: 'log-clear', detail: '-', description: 'Fired when log is cleared.' },
    ],
    examples: [
      {
        title: 'Log Display',
        description: 'Interactive log with filtering. Click buttons to add entries.',
        preview: html`
          <crt-log 
            id="demo-log"
            title="APPLICATION LOG"
            .entries=${[
              { timestamp: new Date(), level: 'info', message: 'System initialized', source: 'CORE' },
              { timestamp: new Date(), level: 'success', message: 'Connection established', source: 'NET' },
              { timestamp: new Date(), level: 'debug', message: 'Loading configuration...', source: 'CFG' },
              { timestamp: new Date(), level: 'warn', message: 'Memory usage at 75%', source: 'MEM' },
              { timestamp: new Date(), level: 'error', message: 'Failed to load module XYZ', source: 'MOD' },
              { timestamp: new Date(), level: 'info', message: 'User session started', source: 'AUTH' },
            ]}
          ></crt-log>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
            <crt-button size="small" @click=${() => {
              const log = document.getElementById('demo-log') as any;
              log?.info?.('New info message ' + Date.now(), 'DEMO');
            }}>+ INFO</crt-button>
            <crt-button size="small" variant="success" @click=${() => {
              const log = document.getElementById('demo-log') as any;
              log?.success?.('Operation completed', 'DEMO');
            }}>+ SUCCESS</crt-button>
            <crt-button size="small" variant="warning" @click=${() => {
              const log = document.getElementById('demo-log') as any;
              log?.warn?.('Warning: check this', 'DEMO');
            }}>+ WARN</crt-button>
            <crt-button size="small" variant="error" @click=${() => {
              const log = document.getElementById('demo-log') as any;
              log?.error?.('Error occurred!', 'DEMO');
            }}>+ ERROR</crt-button>
          </div>
        `,
        code: code(
          '<crt-log',
          '  title="APPLICATION LOG"',
          '  .entries=${[',
          '    { timestamp: new Date(), level: "info", message: "System started", source: "CORE" },',
          '    { timestamp: new Date(), level: "error", message: "Connection failed", source: "NET" },',
          '  ]}',
          '></crt-log>',
          '',
          '// Add entries programmatically:',
          'const log = document.querySelector("crt-log");',
          'log.info("Info message", "SOURCE");',
          'log.warn("Warning message", "SOURCE");',
          'log.error("Error message", "SOURCE");',
          'log.success("Success message", "SOURCE");',
          'log.debug("Debug message", "SOURCE");'
        ),
      },
      {
        title: 'Minimal Log (No Timestamp)',
        description: 'Compact log display without timestamps.',
        preview: html`
          <crt-log 
            title="COMPACT LOG"
            show-timestamp=${false}
            .entries=${[
              { level: 'info', message: 'Application started' },
              { level: 'success', message: 'Connected to server' },
              { level: 'warn', message: 'Deprecated API usage detected' },
              { level: 'error', message: 'Failed to load resource: styles.css' },
              { level: 'debug', message: 'Cache cleared' },
            ]}
          ></crt-log>
        `,
        code: code(
          '<crt-log',
          '  title="COMPACT LOG"',
          '  show-timestamp=${false}',
          '  .entries=${[',
          '    { level: "info", message: "Application started" },',
          '    { level: "success", message: "Connected to server" },',
          '    { level: "warn", message: "Deprecated API usage" },',
          '    { level: "error", message: "Failed to load resource" },',
          '    { level: "debug", message: "Cache cleared" },',
          '  ]}',
          '></crt-log>'
        ),
      },
    ],
  },
  {
    id: 'tabs',
    name: 'Tabs',
    tag: 'crt-tabs',
    category: 'navigation',
    description: 'Tabbed navigation with content.',
    events: [
      { name: 'change', detail: '{ index, label }', description: 'Fires on tab change.' },
    ],
    examples: [
      {
        title: 'Tabs',
        description: 'Switch between views.',
        preview: html`
          <crt-tabs
            .tabs=${[
              { label: 'Overview', content: 'System overview and status.' },
              { label: 'Details', content: 'Detailed metrics and specs.' },
              { label: 'Logs', content: 'Recent system events.' },
            ]}
          ></crt-tabs>
        `,
        code: code(
          '<crt-tabs .tabs=${[',
          "  { label: 'Overview', content: 'System overview and status.' },",
          "  { label: 'Details', content: 'Detailed metrics and specs.' },",
          "  { label: 'Logs', content: 'Recent system events.' }",
          ']}></crt-tabs>'
        ),
      },
    ],
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    tag: 'crt-breadcrumb',
    category: 'navigation',
    description: 'Breadcrumb trail.',
    examples: [
      {
        title: 'Breadcrumb',
        description: 'Navigation trail.',
        preview: html`
          <crt-breadcrumb
            .items=${[
              { label: 'Root', href: '#' },
              { label: 'System', href: '#' },
              { label: 'Config' },
            ]}
          ></crt-breadcrumb>
        `,
        code: code(
          '<crt-breadcrumb .items=${[',
          "  { label: 'Root', href: '#' },",
          "  { label: 'System', href: '#' },",
          "  { label: 'Config' }",
          ']}></crt-breadcrumb>'
        ),
      },
    ],
  },
  {
    id: 'pagination',
    name: 'Pagination',
    tag: 'crt-pagination',
    category: 'navigation',
    description: 'Pagination with page controls.',
    examples: [
      {
        title: 'Pagination',
        description: 'Page navigation.',
        preview: html`<crt-pagination current="2" total="8"></crt-pagination>`,
        code: '<crt-pagination current="2" total="8"></crt-pagination>',
      },
    ],
  },
  {
    id: 'navbar',
    name: 'Navbar',
    tag: 'crt-navbar',
    category: 'navigation',
    description: 'Primary navigation bar.',
    examples: [
      {
        title: 'Navbar',
        description: 'Primary nav items.',
        preview: html`
          <crt-navbar .items=${[
            { href: '#', label: 'Overview' },
            { href: '#', label: 'Components' },
            { href: '#', label: 'Docs' },
          ]}></crt-navbar>
        `,
        code: code(
          '<crt-navbar .items=${[',
          "  { href: '#', label: 'Overview' },",
          "  { href: '#', label: 'Components' },",
          "  { href: '#', label: 'Docs' }",
          ']}></crt-navbar>'
        ),
      },
    ],
  },
  {
    id: 'card',
    name: 'Card',
    tag: 'crt-card',
    category: 'layout',
    description: 'Container for grouped content.',
    slots: [
      { name: 'header', description: 'Card header.' },
      { name: 'default', description: 'Card content.' },
      { name: 'footer', description: 'Card footer.' },
    ],
    examples: [
      {
        title: 'Card',
        description: 'Card with header and content.',
        preview: html`
          <crt-card>
            <div slot="header">System Status</div>
            <div>All systems operational.</div>
          </crt-card>
        `,
        code: code(
          '<crt-card>',
          '  <div slot="header">System Status</div>',
          '  <div>All systems operational.</div>',
          '</crt-card>'
        ),
      },
    ],
  },
  {
    id: 'table',
    name: 'Table',
    tag: 'crt-table',
    category: 'layout',
    description: 'Styled data table.',
    props: [
      { name: 'headers', type: 'string[]', default: '[]', description: 'Header labels.' },
      { name: 'rows', type: '(string | number)[][]', default: '[]', description: 'Row data.' },
      { name: 'page', type: 'number', default: '1', description: 'Current page.' },
      { name: 'page-size', type: 'number', default: '0', description: 'Rows per page (0 = no pagination).' },
      { name: 'show-pagination', type: 'boolean', default: 'true', description: 'Toggle pagination UI.' },
    ],
    events: [
      { name: 'page-change', detail: '{ page, pageSize, totalPages }', description: 'Fires on page change.' },
    ],
    examples: [
      {
        title: 'Table',
        description: 'Header + rows with pagination.',
        preview: html`
          <crt-table
            .headers=${['Name', 'Status', 'Latency']}
            .rows=${[
              ['Node A', 'Online', '12ms'],
              ['Node B', 'Online', '18ms'],
              ['Node C', 'Warning', '42ms'],
              ['Node D', 'Online', '16ms'],
              ['Node E', 'Offline', '—'],
            ]}
            page-size="2"
          ></crt-table>
        `,
        code: code(
          '<crt-table .headers=${["Name","Status","Latency"]}',
          '  .rows=${[[',
          "    ['Node A','Online','12ms'],",
          "    ['Node B','Online','18ms'],",
          "    ['Node C','Warning','42ms'],",
          "    ['Node D','Online','16ms'],",
          "    ['Node E','Offline','—']",
          '  ]} page-size="2"></crt-table>'
        ),
      },
      {
        title: 'Dashboard Table',
        description: 'Table inside a card with header.',
        preview: html`
          <crt-card>
            <div slot="header">System Nodes</div>
            <crt-table
              .headers=${['Node', 'Status', 'Latency']}
              .rows=${[
                ['Node A', 'Online', '12ms'],
                ['Node B', 'Online', '18ms'],
                ['Node C', 'Warning', '42ms'],
                ['Node D', 'Online', '16ms'],
                ['Node E', 'Offline', '—'],
                ['Node F', 'Online', '22ms'],
              ]}
              page-size="3"
            ></crt-table>
          </crt-card>
        `,
        code: code(
          '<crt-card>',
          '  <div slot="header">System Nodes</div>',
          '  <crt-table .headers=${["Node","Status","Latency"]}',
          '    .rows=${[',
          "      ['Node A','Online','12ms'],",
          "      ['Node B','Online','18ms'],",
          "      ['Node C','Warning','42ms'],",
          "      ['Node D','Online','16ms'],",
          "      ['Node E','Offline','—'],",
          "      ['Node F','Online','22ms']",
          '    ]} page-size="3"></crt-table>',
          '</crt-card>'
        ),
      },
    ],
  },
  {
    id: 'grid',
    name: 'Grid',
    tag: 'crt-grid',
    category: 'layout',
    description: 'Grid layout container.',
    examples: [
      {
        title: 'Grid',
        description: 'Responsive grid cells.',
        preview: html`
          <crt-grid columns="3">
            <div>Cell 1</div>
            <div>Cell 2</div>
            <div>Cell 3</div>
          </crt-grid>
        `,
        code: code(
          '<crt-grid columns="3">',
          '  <div>Cell 1</div>',
          '  <div>Cell 2</div>',
          '  <div>Cell 3</div>',
          '</crt-grid>'
        ),
      },
    ],
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    tag: 'crt-tooltip',
    category: 'feedback',
    description: 'Hover tooltip.',
    props: [
      { name: 'text', type: 'string', default: '-', description: 'Tooltip content text.' },
      { name: 'position', type: 'top | right | bottom | left', default: 'top', description: 'Tooltip placement.' },
    ],
    examples: [
      {
        title: 'Tooltip',
        description: 'Hover trigger.',
        preview: html`
          <crt-tooltip text="Copy to clipboard">
            <crt-button size="small">Hover me</crt-button>
          </crt-tooltip>
        `,
        code: code(
          '<crt-tooltip text="Copy to clipboard">',
          '  <crt-button size="small">Hover me</crt-button>',
          '</crt-tooltip>'
        ),
      },
    ],
  },
  {
    id: 'avatar',
    name: 'Avatar',
    tag: 'crt-avatar',
    category: 'feedback',
    description: 'User avatar with status.',
    examples: [
      {
        title: 'Avatars',
        description: 'Initials and status indicator.',
        preview: html`
          <div style="display:flex;gap:12px;align-items:center;">
            <crt-avatar name="Ada Lovelace" status="online"></crt-avatar>
            <crt-avatar name="Grace Hopper" status="away"></crt-avatar>
            <crt-avatar name="Alan Turing" status="busy"></crt-avatar>
          </div>
        `,
        code: code(
          '<crt-avatar name="Ada Lovelace" status="online"></crt-avatar>',
          '<crt-avatar name="Grace Hopper" status="away"></crt-avatar>',
          '<crt-avatar name="Alan Turing" status="busy"></crt-avatar>'
        ),
      },
    ],
  },
  {
    id: 'modal',
    name: 'Modal',
    tag: 'crt-modal',
    category: 'feedback',
    description: 'Overlay dialog with close actions.',
    events: [
      { name: 'close', detail: '{ open, reason }', description: 'Fired when modal closes.' },
    ],
    examples: [
      {
        title: 'Modal',
        description: 'Open and close via button.',
        preview: html`
          <crt-modal id="demo-modal" title="Diagnostics">
            <crt-text>Running system diagnostics...</crt-text>
          </crt-modal>
          <crt-button size="small" @click=${() => {
            const modal = document.getElementById('demo-modal') as ModalElement | null;
            if (modal) modal.open = true;
          }}>Open Modal</crt-button>
        `,
        code: code(
          '<crt-modal id="demo-modal" title="Diagnostics">',
          '  <crt-text>Running system diagnostics...</crt-text>',
          '</crt-modal>',
          '<crt-button size="small" @click=${...}>Open Modal</crt-button>'
        ),
      },
    ],
  },
  {
    id: 'accordion',
    name: 'Accordion',
    tag: 'crt-accordion',
    category: 'layout',
    description: 'Collapsible sections.',
    examples: [
      {
        title: 'Accordion',
        description: 'Expandable sections.',
        preview: html`
          <crt-accordion>
            <crt-accordion-item header="System Info">
              Current build: 1.0.25
            </crt-accordion-item>
            <crt-accordion-item header="Network">
              Status: Online
            </crt-accordion-item>
          </crt-accordion>
        `,
        code: code(
          '<crt-accordion>',
          '  <crt-accordion-item header="System Info">Current build: 1.0.25</crt-accordion-item>',
          '  <crt-accordion-item header="Network">Status: Online</crt-accordion-item>',
          '</crt-accordion>'
        ),
      },
    ],
  },
  {
    id: 'terminal',
    name: 'Terminal',
    tag: 'crt-terminal',
    category: 'media',
    description: 'Terminal output component.',
    examples: [
      {
        title: 'Terminal',
        description: 'Typing animation demo.',
        preview: html`
          <div style="display:flex;flex-direction:column;gap:12px;">
            <crt-terminal id="demo-terminal"></crt-terminal>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <crt-button
                size="small"
                @click=${() => {
                  const term = document.getElementById('demo-terminal') as (HTMLElement & { type: (t: string, s?: number) => void }) | null;
                  term?.type('$ npm run diagnostics', 30);
                  term?.type('> checking CRT phosphor levels...', 18);
                  term?.type('> signal locked [OK]', 22);
                }}
              >
                Run typing demo
              </crt-button>
              <crt-button
                size="small"
                variant="warning"
                @click=${() => {
                  const term = document.getElementById('demo-terminal') as (HTMLElement & { clear: () => void }) | null;
                  term?.clear();
                }}
              >
                Clear
              </crt-button>
            </div>
          </div>
        `,
        code: code(
          '<crt-terminal id="demo-terminal"></crt-terminal>',
          '',
          '<crt-button size="small" @click=${() => {',
          "  const term = document.getElementById('demo-terminal');",
          "  term?.type('$ npm run diagnostics', 30);",
          "  term?.type('> checking CRT phosphor levels...', 18);",
          "  term?.type('> signal locked [OK]', 22);",
          '}}>Run typing demo</crt-button>',
          '<crt-button size="small" variant="warning" @click=${() => term?.clear()}>Clear</crt-button>'
        ),
      },
    ],
  },
  {
    id: 'music-player',
    name: 'Music Player',
    tag: 'crt-music-player',
    category: 'media',
    description: 'Audio player UI.',
    examples: [
      {
        title: 'Music Player',
        description: 'Standalone player.',
        preview: html`<crt-music-player></crt-music-player>`,
        code: '<crt-music-player></crt-music-player>',
      },
    ],
  },
  {
    id: 'playlist',
    name: 'Playlist',
    tag: 'crt-playlist',
    category: 'media',
    description: 'Playlist list component.',
    examples: [
      {
        title: 'Playlist',
        description: 'List of tracks.',
        preview: html`<crt-playlist></crt-playlist>`,
        code: '<crt-playlist></crt-playlist>',
      },
    ],
  },
  {
    id: 'visualizer',
    name: 'Visualizer',
    tag: 'crt-visualizer',
    category: 'media',
    description: 'Audio visualizer.',
    examples: [
      {
        title: 'Visualizer',
        description: 'Audio bars.',
        preview: html`<crt-visualizer></crt-visualizer>`,
        code: '<crt-visualizer></crt-visualizer>',
      },
    ],
  },
  {
    id: 'crt-overlay',
    name: 'CRT Overlay',
    tag: 'crt-overlay',
    category: 'crt',
    description: 'Pure visual CRT overlay. Adds scanlines, vignette, and flicker effects over the entire viewport without wrapping content. All interactions pass through.',
    props: [
      { name: 'active', type: 'boolean', default: 'true', description: 'Enable/disable all effects.' },
      { name: 'scanlines', type: 'boolean', default: 'true', description: 'Show scanline effect.' },
      { name: 'vignette', type: 'boolean', default: 'true', description: 'Show vignette edge darkening.' },
      { name: 'flicker', type: 'boolean', default: 'true', description: 'Enable subtle flicker animation.' },
      { name: 'contained', type: 'boolean', default: 'false', description: 'Use absolute positioning for containers instead of fixed fullscreen.' },
    ],
    examples: [
      {
        title: 'CRT Overlay Demo',
        description: 'The overlay sits on top of everything but allows all interactions. Toggle effects below.',
        preview: html`
          <div style="position:relative;border:2px solid var(--crt-primary);min-height:200px;overflow:hidden;">
            <!-- Demo content underneath -->
            <div style="padding:16px;display:flex;flex-direction:column;gap:12px;">
              <crt-heading level="4">Content Under Overlay</crt-heading>
              <crt-text>All buttons and inputs remain clickable - the overlay is purely visual.</crt-text>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <crt-button size="small">Click Me</crt-button>
                <crt-input placeholder="Type here..." style="width:150px;"></crt-input>
              </div>
              <crt-modal id="overlay-demo-modal" title="Modal Test">
                <crt-text>This modal appears correctly over the overlay!</crt-text>
              </crt-modal>
              <crt-button size="small" variant="success" @click=${() => {
                const modal = document.getElementById('overlay-demo-modal') as ModalElement | null;
                if (modal) modal.open = true;
              }}>Open Modal</crt-button>
            </div>
            <!-- The CRT Overlay with contained attribute -->
            <crt-overlay id="demo-crt-overlay" contained></crt-overlay>
          </div>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
            <crt-button
              size="small"
              @click=${() => {
                const el = document.getElementById('demo-crt-overlay') as (HTMLElement & { active?: boolean }) | null;
                if (el) el.active = !el.active;
              }}
            >Toggle Active</crt-button>
            <crt-button
              size="small"
              @click=${() => {
                const el = document.getElementById('demo-crt-overlay') as (HTMLElement & { scanlines?: boolean }) | null;
                if (el) el.scanlines = !el.scanlines;
              }}
            >Toggle Scanlines</crt-button>
            <crt-button
              size="small"
              @click=${() => {
                const el = document.getElementById('demo-crt-overlay') as (HTMLElement & { vignette?: boolean }) | null;
                if (el) el.vignette = !el.vignette;
              }}
            >Toggle Vignette</crt-button>
          </div>
        `,
        code: code(
          '<!-- Place at the end of your body for full-page effect -->',
          '<crt-overlay></crt-overlay>',
          '',
          '<!-- Or use "contained" in a positioned container -->',
          '<div style="position:relative;">',
          '  <div>Your content here...</div>',
          '  <crt-overlay contained></crt-overlay>',
          '</div>',
          '',
          '<!-- Toggle individual effects -->',
          '<crt-overlay scanlines="false"></crt-overlay>',
          '<crt-overlay vignette="false"></crt-overlay>',
          '<crt-overlay flicker="false"></crt-overlay>'
        ),
      },
      {
        title: 'Theme Colors',
        description: 'Use data-crt-theme attribute on parent or body to change phosphor colors globally.',
        preview: html`
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            ${(['green', 'amber', 'blue'] as const).map((theme) => html`
              <div
                data-crt-theme="${theme}"
                style="flex:1 1 180px;min-width:180px;position:relative;border:2px solid var(--crt-primary);padding:16px;min-height:120px;overflow:hidden;"
              >
                <crt-heading level="5" style="margin-bottom:8px;">${theme.toUpperCase()}</crt-heading>
                <crt-text>Theme: ${theme}</crt-text>
                <crt-button size="small" style="margin-top:8px;">Button</crt-button>
                <crt-overlay contained></crt-overlay>
              </div>
            `)}
          </div>
        `,
        code: code(
          '<!-- Set theme on body or container -->',
          '<body data-crt-theme="amber">',
          '  <crt-overlay></crt-overlay>',
          '  ...',
          '</body>',
          '',
          '<!-- Or scope theme to a section -->',
          '<div data-crt-theme="blue" style="position:relative;">',
          '  <crt-overlay contained></crt-overlay>',
          '  ...',
          '</div>'
        ),
      },
    ],
  },
  {
    id: 'header',
    name: 'Header',
    tag: 'crt-header',
    category: 'navigation',
    description: 'Header with slots for title and actions.',
    slots: [
      { name: 'title', description: 'Title slot.' },
      { name: 'subtitle', description: 'Subtitle slot.' },
      { name: 'actions', description: 'Right-aligned actions.' },
    ],
    examples: [
      {
        title: 'Header',
        description: 'Header with search.',
        preview: html`
          <crt-header title="SYSTEM CONSOLE">
            <span slot="title">SYSTEM CONSOLE</span>
            <span slot="subtitle">Diagnostics and status</span>
            <crt-search slot="actions" placeholder="Search..."></crt-search>
          </crt-header>
        `,
        code: code(
          '<crt-header title="SYSTEM CONSOLE">',
          '  <span slot="title">SYSTEM CONSOLE</span>',
          '  <span slot="subtitle">Diagnostics and status</span>',
          '  <crt-search slot="actions" placeholder="Search..."></crt-search>',
          '</crt-header>'
        ),
      },
    ],
  },
  {
    id: 'footer',
    name: 'Footer',
    tag: 'crt-footer',
    category: 'layout',
    description: 'Footer component.',
    examples: [
      {
        title: 'Footer',
        description: 'Footer text and actions.',
        preview: html`
          <crt-footer>
            <span>© 2026 CRT Styleguide</span>
          </crt-footer>
        `,
        code: '<crt-footer><span>© 2026 CRT Styleguide</span></crt-footer>',
      },
    ],
  },
  {
    id: 'music-station',
    name: 'Music Station',
    tag: 'crt-music-station',
    category: 'organisms',
    description: 'Full music station with player, playlist, upload functionality, and lyrics display.',
    examples: [
      {
        title: 'Music Station',
        description: 'Music station with custom tracks passed via the tracks property.',
        preview: html`
          <crt-music-station
            ?preload-default=${false}
            .tracks=${[
              {
                title: 'VERROSTETE TERMINALS',
                artist: 'PATIMWEP',
                url: './patimwep - Verrostete Terminals.mp3',
                lyrics: `[INTRO]
STATIC IN THE WIRES
NEON HISS AND SOFT DESIRES

[HOOK]
VERROSTETE TERMINALS
SIGNAL LOST, RETURNING CALLS
GHOST DATA IN THE HALLS
VERROSTETE TERMINALS

[VERSE 1]
PHOSPHOR GLOW ON MIDNIGHT SCREENS
ECHOES OF FORGOTTEN DREAMS
CURSOR BLINKS IN EMPTY SPACE
TIME HAS LEFT WITHOUT A TRACE`
              }
            ]}
          ></crt-music-station>
        `,
        code: code(
          '<crt-music-station',
          '  preload-default="false"',
          '  .tracks="${[',
          '    {',
          '      title: \'VERROSTETE TERMINALS\',',
          '      artist: \'PATIMWEP\',',
          '      url: \'./patimwep - Verrostete Terminals.mp3\',',
          '      lyrics: `[INTRO]',
          'STATIC IN THE WIRES',
          'NEON HISS AND SOFT DESIRES',
          '',
          '[HOOK]',
          'VERROSTETE TERMINALS',
          'SIGNAL LOST, RETURNING CALLS`',
          '    }',
          '  ]}"',
          '></crt-music-station>',
          '',
          '// Track interface:',
          'interface Track {',
          '  title: string;    // Track title',
          '  artist: string;   // Artist name',
          '  url: string;      // Audio file path or URL',
          '  lyrics?: string;  // Optional lyrics text',
          '}'
        ),
      },
    ],
    props: [
      { name: 'tracks', type: 'Track[]', default: '[]', description: 'Array of track objects with title, artist, url, and optional lyrics.' },
      { name: 'autoplay', type: 'boolean', default: 'false', description: 'Auto-start playback when tracks are loaded.' },
      { name: 'autoplay-delay', type: 'number', default: '500', description: 'Delay in ms before autoplay starts.' },
      { name: 'preload-default', type: 'boolean', default: 'true', description: 'Load the default demo track if no tracks provided.' },
    ],
    events: [
      { name: 'track-change', detail: '{ index: number }', description: 'Fired when the current track changes.' },
    ],
  },
];
