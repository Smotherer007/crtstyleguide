import { html } from 'lit';
import '../src/components/atoms/spinner';

// Global spinner helper
(window as any).showSpinner = (message = 'LOADING...', duration = 3000) => {
  const spinner = document.createElement('crt-spinner') as any;
  spinner.message = message;
  spinner.open = true;
  document.body.appendChild(spinner);
  setTimeout(() => spinner.remove(), duration);
};

/**
 * CRT Living Style Guide Template
 * Components organized by category: Typography → Form Elements → Actions → Layout
 */
export const styleGuideTemplate = () => html`
  <!-- CRT Monitor Effects -->
  <div class="crt-frame"></div>
  <div class="crt-screen"></div>
  <div class="crt-noise"></div>
  
  <div class="sg-wrapper">
    <div class="sg-container">
      
      <!-- HEADER (responsive) -->
      <header class="sg-header" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px;">
        <crt-heading level="1" style="text-align:center;white-space:normal;word-break:break-word;">CRT LIVING STYLE GUIDE</crt-heading>
        <crt-text muted style="font-size:var(--crt-font-size-sm);text-align:center;">Component Library · Lit Web Components · Atomic Design</crt-text>
      </header>

      <!-- NAVIGATION -->
      <nav class="sg-nav" style="margin-bottom: 40px; background: rgba(0, 0, 0, 0.75); padding: 16px; border-bottom: 2px solid var(--crt-primary);">
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <a href="#typography" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">01_Typography</a>
          <a href="#spacing" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">02_Spacing</a>
          <a href="#forms" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">03_Forms</a>
          <a href="#actions" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">04_Actions</a>
          <a href="#feedback" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">05_Feedback</a>
          <a href="#layout" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">06_Layout</a>
          <a href="#navigation" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">07_Navigation</a>
          <a href="#overlays" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">08_Overlays</a>
          <a href="#media" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">09_Media</a>
          <a href="#organisms" style="color: var(--crt-primary); text-decoration: none; font-family: var(--crt-font-family); text-transform: uppercase; letter-spacing: 1px;">10_Organisms</a>
        </div>
      </nav>

      <main class="sg-main">

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 1: TYPOGRAPHY -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="typography" class="sg-section">
          <crt-heading level="2">01. TYPOGRAPHY</crt-heading>
          <crt-text muted class="mb-lg">Textdarstellung und Überschriften im Terminal-Stil.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Headings"
            description="Hierarchische Überschriften von Level 1 bis 4."
            code='<crt-heading level="1">Heading Level 1</crt-heading>
<crt-heading level="2">Heading Level 2</crt-heading>
<crt-heading level="3">Heading Level 3</crt-heading>
<crt-heading level="4">Heading Level 4</crt-heading>'
          >
            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
              <crt-heading level="1">Heading Level 1</crt-heading>
              <crt-heading level="2">Heading Level 2</crt-heading>
              <crt-heading level="3">Heading Level 3</crt-heading>
              <crt-heading level="4">Heading Level 4</crt-heading>
            </div>
          </crt-code-example>



          <crt-code-example
            class="mb-lg"
            title="Text"
            description="Standard Fließtext und abgeschwächte Variante."
            code='<crt-text>Dies ist ein normaler Textabschnitt mit primärer Farbe.</crt-text>
<crt-text muted>Dies ist ein muted Text für sekundäre Informationen.</crt-text>'
          >
            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
              <crt-text>Dies ist ein normaler Textabschnitt mit primärer Farbe.</crt-text>
              <crt-text muted>Dies ist ein muted Text für sekundäre Informationen.</crt-text>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Links"
            description="Verweise mit optionalen Icons."
            code='<crt-link href="#">Standard Link</crt-link>
<crt-link href="#" icon-right>Mehr erfahren →</crt-link>'
          >
            <crt-link href="#">Standard Link</crt-link>
            <crt-link href="#">Mehr erfahren →</crt-link>
          </crt-code-example>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 2: SPACING UTILITIES -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="spacing" class="sg-section">
          <crt-heading level="2">02. SPACING UTILITIES</crt-heading>
          <crt-text muted class="mb-lg">CSS-Klassen für Abstände. Größen: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px)</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Margin - Alle Seiten"
            description="Fügt Abstand um das gesamte Element hinzu."
            code='<div class="m-xs">m-xs (4px)</div>
<div class="m-sm">m-sm (8px)</div>
<div class="m-md">m-md (16px)</div>
<div class="m-lg">m-lg (24px)</div>
<div class="m-xl">m-xl (32px)</div>'
          >
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              <div class="m-xs" style="border: 1px dashed var(--crt-primary); padding: 8px;">.m-xs</div>
              <div class="m-sm" style="border: 1px dashed var(--crt-primary); padding: 8px;">.m-sm</div>
              <div class="m-md" style="border: 1px dashed var(--crt-primary); padding: 8px;">.m-md</div>
              <div class="m-lg" style="border: 1px dashed var(--crt-primary); padding: 8px;">.m-lg</div>
              <div class="m-xl" style="border: 1px dashed var(--crt-primary); padding: 8px;">.m-xl</div>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Margin - Richtungen"
            description="Margin nur für bestimmte Seiten: mt (top), mr (right), mb (bottom), ml (left)."
            code='<div class="mt-md">mt-md (margin-top)</div>
<div class="mr-md">mr-md (margin-right)</div>
<div class="mb-md">mb-md (margin-bottom)</div>
<div class="ml-md">ml-md (margin-left)</div>
<div class="mx-md">mx-md (horizontal)</div>
<div class="my-md">my-md (vertical)</div>'
          >
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
              <div style="background: rgba(51,255,51,0.1);">
                <div class="mt-lg" style="border: 1px solid var(--crt-primary); padding: 8px;">.mt-lg</div>
              </div>
              <div style="background: rgba(51,255,51,0.1);">
                <div class="ml-lg" style="border: 1px solid var(--crt-primary); padding: 8px;">.ml-lg</div>
              </div>
              <div style="background: rgba(51,255,51,0.1);">
                <div class="mx-lg" style="border: 1px solid var(--crt-primary); padding: 8px;">.mx-lg</div>
              </div>
              <div style="background: rgba(51,255,51,0.1);">
                <div class="my-lg" style="border: 1px solid var(--crt-primary); padding: 8px;">.my-lg</div>
              </div>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Padding - Alle Seiten"
            description="Fügt Innenabstand hinzu."
            code='<div class="p-xs">p-xs (4px)</div>
<div class="p-sm">p-sm (8px)</div>
<div class="p-md">p-md (16px)</div>
<div class="p-lg">p-lg (24px)</div>
<div class="p-xl">p-xl (32px)</div>'
          >
            <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-start;">
              <div class="p-xs" style="border: 1px solid var(--crt-primary);">.p-xs</div>
              <div class="p-sm" style="border: 1px solid var(--crt-primary);">.p-sm</div>
              <div class="p-md" style="border: 1px solid var(--crt-primary);">.p-md</div>
              <div class="p-lg" style="border: 1px solid var(--crt-primary);">.p-lg</div>
              <div class="p-xl" style="border: 1px solid var(--crt-primary);">.p-xl</div>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Padding - Richtungen"
            description="Padding nur für bestimmte Seiten: pt (top), pr (right), pb (bottom), pl (left)."
            code='<div class="pt-md">pt-md (padding-top)</div>
<div class="pr-md">pr-md (padding-right)</div>
<div class="pb-md">pb-md (padding-bottom)</div>
<div class="pl-md">pl-md (padding-left)</div>
<div class="px-md">px-md (horizontal)</div>
<div class="py-md">py-md (vertical)</div>'
          >
            <div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: flex-start;">
              <div class="pt-lg" style="border: 1px solid var(--crt-primary);">.pt-lg</div>
              <div class="pl-lg" style="border: 1px solid var(--crt-primary);">.pl-lg</div>
              <div class="px-lg" style="border: 1px solid var(--crt-primary);">.px-lg</div>
              <div class="py-lg" style="border: 1px solid var(--crt-primary);">.py-lg</div>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Kombinationen"
            description="Utility-Klassen lassen sich kombinieren."
            code='<div class="mt-lg mb-sm px-md">Kombiniert: mt-lg mb-sm px-md</div>
<crt-button class="mr-md">Button mit mr-md</crt-button>
<crt-badge class="ml-lg">Badge mit ml-lg</crt-badge>'
          >
            <div style="display: flex; align-items: center; background: rgba(51,255,51,0.05);">
              <crt-button class="mr-md">Button</crt-button>
              <crt-button class="mr-lg">+ mr-lg</crt-button>
              <crt-badge class="ml-xl">+ ml-xl Badge</crt-badge>
            </div>
          </crt-code-example>

          <crt-card style="margin-top: 20px;">
            <crt-heading level="4">[+] Spacing Reference</crt-heading>
            <crt-table>
              <table>
                <thead>
                  <tr>
                    <th>Suffix</th>
                    <th>CSS Variable</th>
                    <th>Wert</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>-xs</td><td>--crt-spacing-xs</td><td>4px</td></tr>
                  <tr><td>-sm</td><td>--crt-spacing-sm</td><td>8px</td></tr>
                  <tr><td>-md</td><td>--crt-spacing-md</td><td>16px</td></tr>
                  <tr><td>-lg</td><td>--crt-spacing-lg</td><td>24px</td></tr>
                  <tr><td>-xl</td><td>--crt-spacing-xl</td><td>32px</td></tr>
                  <tr><td>-2xl</td><td>--crt-spacing-2xl</td><td>48px</td></tr>
                </tbody>
              </table>
            </crt-table>
          </crt-card>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 3: FORM ELEMENTS -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="forms" class="sg-section">
          <crt-heading level="2">03. FORM ELEMENTS</crt-heading>
          <crt-text muted class="mb-lg">Eingabefelder und Formularkomponenten.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Text Input"
            description="Standard Texteingabefeld."
            code='<crt-input placeholder="Enter text..."></crt-input>
<crt-input type="email" placeholder="Email address"></crt-input>
<crt-input type="password" placeholder="Password"></crt-input>'
          >
            <crt-input placeholder="Enter text..." style="width: 250px;"></crt-input>
            <crt-input type="email" placeholder="Email address" style="width: 250px;"></crt-input>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Textarea"
            description="Mehrzeiliges Textfeld."
            code='<crt-textarea placeholder="Enter your message..."></crt-textarea>'
          >
            <crt-textarea placeholder="Enter your message..." style="width: 100%; max-width: 400px;"></crt-textarea>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Select / Dropdown"
            description="Auswahlfeld mit Dropdown-Menü und Gruppen."
            code='<!-- Einfaches Select -->
<crt-select
  label="Priority"
  placeholder="Select priority..."
  .options=\${[
    { value: "low", label: "LOW" },
    { value: "medium", label: "MEDIUM" },
    { value: "high", label: "HIGH" }
  ]}
></crt-select>

<!-- Mit Gruppen -->
<crt-select
  label="Category"
  .options=\${[
    { group: "System", options: [
      { value: "cpu", label: "CPU" },
      { value: "memory", label: "MEMORY" }
    ]},
    { group: "Network", options: [
      { value: "lan", label: "LAN" },
      { value: "wan", label: "WAN" }
    ]}
  ]}
></crt-select>'
          >
            <div style="display: flex; gap: 48px; flex-wrap: wrap;">
              <crt-select
                label="Priority"
                placeholder="Select priority..."
                .options=${[
                  { value: 'low', label: 'LOW' },
                  { value: 'medium', label: 'MEDIUM' },
                  { value: 'high', label: 'HIGH' },
                  { value: 'critical', label: 'CRITICAL' }
                ]}
              ></crt-select>
              <crt-select
                label="Category"
                .options=${[
                  { group: 'System', options: [
                    { value: 'cpu', label: 'CPU' },
                    { value: 'memory', label: 'MEMORY' }
                  ]},
                  { group: 'Network', options: [
                    { value: 'lan', label: 'LAN' },
                    { value: 'wan', label: 'WAN' }
                  ]}
                ]}
              ></crt-select>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Checkbox & Radio"
            description="Optionsfelder für Einzelauswahl und Mehrfachauswahl."
            code='<crt-checkbox label="Option aktivieren"></crt-checkbox>
<crt-radio-group name="choice">
  <crt-radio value="a" label="Option A"></crt-radio>
  <crt-radio value="b" label="Option B"></crt-radio>
</crt-radio-group>'
          >
            <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
              <div style="display: flex; gap: 24px;">
                <crt-checkbox label="Enable logging" checked></crt-checkbox>
                <crt-checkbox label="Debug mode"></crt-checkbox>
                <crt-checkbox label="Disabled" disabled></crt-checkbox>
              </div>
              <div>
                <crt-text muted style="margin-bottom: 8px;">Mode Selection:</crt-text>
                <crt-radio-group name="mode" value="auto" style="display: flex; gap: 24px;">
                  <crt-radio value="auto" label="AUTO"></crt-radio>
                  <crt-radio value="manual" label="MANUAL"></crt-radio>
                  <crt-radio value="off" label="OFF"></crt-radio>
                </crt-radio-group>
              </div>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Toggle / Switch"
            description="Ein/Aus-Schalter für binäre Optionen."
            code='<crt-toggle label="Power"></crt-toggle>
<crt-toggle checked label="Active"></crt-toggle>'
          >
            <div style="display: flex; gap: 32px; align-items: center;">
              <crt-toggle label="POWER" checked></crt-toggle>
              <crt-toggle label="STEALTH MODE" size="small"></crt-toggle>
              <crt-toggle label="OFFLINE" disabled></crt-toggle>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Slider / Range"
            description="Schieberegler für numerische Werte."
            code='<crt-slider
  label="Volume"
  min="0" max="100" value="50"
  unit="%"
></crt-slider>'
          >
            <div style="width: 100%; display: flex; flex-direction: column; gap: 24px;">
              <crt-slider label="VOLUME" min="0" max="100" value="75" unit="%"></crt-slider>
              <crt-slider label="BRIGHTNESS" min="0" max="255" value="128" showMarks></crt-slider>
              <crt-slider label="CONTRAST" min="0" max="100" value="50" disabled></crt-slider>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Calendar"
            description="Vollständiger Kalender für Datumsauswahl."
            code='<crt-calendar></crt-calendar>'
          >
            <crt-calendar></crt-calendar>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="File Upload"
            description="Fallout-Style Dateimanager mit Drag & Drop Support."
            code='<crt-file-upload 
  accept="image/*,.pdf,.txt,.doc,.docx"
  multiple
  max-size="5242880"
  max-files="5"
></crt-file-upload>'
          >
            <crt-file-upload accept="image/*,.pdf,.txt,.doc,.docx" multiple max-files="5"></crt-file-upload>
          </crt-code-example>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 4: ACTIONS -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="actions" class="sg-section">
          <crt-heading level="2">04. ACTIONS</crt-heading>
          <crt-text muted class="mb-lg">Buttons und interaktive Elemente.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Button Variants"
            description="Verschiedene Status-Varianten für unterschiedliche Aktionen."
            code='<crt-button>PRIMARY</crt-button>
<crt-button variant="success">SUCCESS</crt-button>
<crt-button variant="warning">WARNING</crt-button>
<crt-button variant="error">ERROR</crt-button>'
          >
            <crt-button>PRIMARY</crt-button>
            <crt-button variant="success">SUCCESS</crt-button>
            <crt-button variant="warning">WARNING</crt-button>
            <crt-button variant="error">ERROR</crt-button>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Button Sizes"
            description="Verschiedene Größen für unterschiedliche Kontexte."
            code='<crt-button size="small">SMALL</crt-button>
<crt-button size="medium">MEDIUM</crt-button>
<crt-button size="large">LARGE</crt-button>'
          >
            <crt-button size="small">SMALL</crt-button>
            <crt-button size="medium">MEDIUM</crt-button>
            <crt-button size="large">LARGE</crt-button>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Button States"
            description="Disabled und Link-Varianten."
            code='<crt-button disabled>DISABLED</crt-button>
<crt-button variant="link">LINK STYLE</crt-button>'
          >
            <crt-button disabled>DISABLED</crt-button>
            <crt-button variant="link">LINK STYLE</crt-button>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Buttons with Icons"
            description="Buttons mit Icons links, rechts oder nur als Icon."
            code='<!-- Icon links -->
<crt-button icon-left="download">DOWNLOAD</crt-button>
<crt-button icon-left="upload" variant="success">UPLOAD</crt-button>

<!-- Icon rechts -->
<crt-button icon-right="arrow-right">WEITER</crt-button>
<crt-button icon-right="check" variant="success">BESTÄTIGEN</crt-button>

<!-- Icon-Only Buttons -->
<crt-button icon-only icon-left="plus"></crt-button>
<crt-button icon-only icon-left="edit"></crt-button>
<crt-button icon-only icon-left="trash" variant="error"></crt-button>
<crt-button icon-only icon-left="settings"></crt-button>
<crt-button icon-only icon-left="search" size="small"></crt-button>
<crt-button icon-only icon-left="menu" size="large"></crt-button>'
          >
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-left="download">DOWNLOAD</crt-button>
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-left="upload" variant="success">UPLOAD</crt-button>
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-right="arrow-right">WEITER</crt-button>
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-right="check" variant="success">BESTÄTIGEN</crt-button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-only icon-left="plus"></crt-button>
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-only icon-left="edit"></crt-button>
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-only icon-left="trash" variant="error"></crt-button>
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-only icon-left="settings"></crt-button>
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-only icon-left="search" size="small"></crt-button>
              <crt-button style="height:40px;display:inline-flex;align-items:center;justify-content:center;" icon-only icon-left="menu" size="large"></crt-button>
            </div>
          </crt-code-example>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 5: FEEDBACK -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="feedback" class="sg-section">
          <crt-heading level="2">05. FEEDBACK</crt-heading>
          <crt-text muted class="mb-lg">Status-Anzeigen und Benachrichtigungen.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Badges"
            description="Status-Labels für verschiedene Zustände."
            code='<crt-badge>DEFAULT</crt-badge>
<crt-badge variant="success">SUCCESS</crt-badge>
<crt-badge variant="warning">WARNING</crt-badge>
<crt-badge variant="error">ERROR</crt-badge>
<crt-badge variant="info">INFO</crt-badge>'
          >
            <crt-badge>DEFAULT</crt-badge>
            <crt-badge variant="success">SUCCESS</crt-badge>
            <crt-badge variant="warning">WARNING</crt-badge>
            <crt-badge variant="error">ERROR</crt-badge>
            <crt-badge variant="info">INFO</crt-badge>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Progress Bar"
            description="Fortschrittsanzeige mit verschiedenen Varianten."
            code='<crt-progress value="25" label="Processing..."></crt-progress>
<crt-progress value="75" variant="success" showValue></crt-progress>
<crt-progress animated indeterminate label="Loading..."></crt-progress>
<crt-progress value="60" segmented segments="10"></crt-progress>'
          >
            <div style="width: 100%; display: flex; flex-direction: column; gap: 16px;">
              <crt-progress value="25" label="Processing..."></crt-progress>
              <crt-progress value="75" variant="success" showValue></crt-progress>
              <crt-progress animated indeterminate label="Loading..."></crt-progress>
              <crt-progress value="60" segmented segments="10" showValue></crt-progress>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Alert / Banner"
            description="Permanente Hinweise und Meldungen."
            code='<crt-alert variant="info" title="INFO">System update available.</crt-alert>
<crt-alert variant="success" title="SUCCESS" closable>Operation completed.</crt-alert>
<crt-alert variant="warning" title="WARNING">Low disk space.</crt-alert>
<crt-alert variant="error" title="ERROR">Connection failed.</crt-alert>'
          >
            <div style="width: 100%; display: flex; flex-direction: column; gap: 16px;">
              <crt-alert variant="info" title="INFO">System update available for download.</crt-alert>
              <crt-alert variant="success" title="SUCCESS" closable>Operation completed successfully.</crt-alert>
              <crt-alert variant="warning" title="WARNING">Low disk space detected.</crt-alert>
              <crt-alert variant="error" title="ERROR">Connection to server failed.</crt-alert>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Skeleton Loader"
            description="Ladeanzeigen während Daten geladen werden."
            code='<crt-skeleton width="100%" height="20px"></crt-skeleton>
<crt-skeleton-text lines="3"></crt-skeleton-text>
<crt-skeleton-card></crt-skeleton-card>'
          >
            <div style="width: 100%; display: flex; flex-direction: column; gap: 16px;">
              <crt-skeleton width="100%" height="24px"></crt-skeleton>
              <crt-skeleton width="80%" height="16px"></crt-skeleton>
              <crt-skeleton width="60%" height="16px"></crt-skeleton>
              <div style="margin-top: 16px;">
                <crt-skeleton-card hideImage></crt-skeleton-card>
              </div>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Tooltip"
            description="Kontextuelle Hinweise bei Hover."
            code='<crt-tooltip text="Info tooltip" position="top">
  <crt-button>Hover me</crt-button>
</crt-tooltip>'
          >
            <div style="display: flex; gap: 24px; padding: 40px 0;">
              <crt-tooltip text="Tooltip oben" position="top">
                <crt-button size="small">TOP</crt-button>
              </crt-tooltip>
              <crt-tooltip text="Tooltip rechts" position="right">
                <crt-button size="small">RIGHT</crt-button>
              </crt-tooltip>
              <crt-tooltip text="Tooltip unten" position="bottom">
                <crt-button size="small">BOTTOM</crt-button>
              </crt-tooltip>
              <crt-tooltip text="Tooltip links" position="left">
                <crt-button size="small">LEFT</crt-button>
              </crt-tooltip>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Icons"
            description="Icon-Set für verschiedene Anwendungsfälle."
            code='<crt-icon name="checkmark"></crt-icon>
<crt-icon name="close"></crt-icon>
<crt-icon name="plus"></crt-icon>
<crt-icon name="search"></crt-icon>
<crt-icon name="settings"></crt-icon>'
          >
            <crt-icon name="checkmark"></crt-icon>
            <crt-icon name="close"></crt-icon>
            <crt-icon name="plus"></crt-icon>
            <crt-icon name="minus"></crt-icon>
            <crt-icon name="search"></crt-icon>
            <crt-icon name="arrow-right"></crt-icon>
            <crt-icon name="arrow-left"></crt-icon>
            <crt-icon name="trash"></crt-icon>
            <crt-icon name="edit"></crt-icon>
            <crt-icon name="settings"></crt-icon>
          </crt-code-example>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 6: LAYOUT -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="layout" class="sg-section">
          <crt-heading level="2">06. LAYOUT</crt-heading>
          <crt-text muted class="mb-lg">Container und Strukturkomponenten.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Card"
            description="Container für gruppierte Inhalte."
            code='<crt-card>
  <div slot="header">Card Title</div>
  <crt-text>Card content goes here...</crt-text>
  <div slot="footer">Footer info</div>
</crt-card>'
          >
            <crt-card style="width: 100%; max-width: 400px;">
              <div slot="header">Card Title</div>
              <crt-text>Card content goes here. This is an example of how content looks inside a card component.</crt-text>
              <div slot="footer"><crt-text muted>Footer info</crt-text></div>
            </crt-card>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Grid"
            description="Responsive Grid-Layout."
            code='<crt-grid columns="3" gap="16px">
  <crt-card><div slot="header">Item 1</div></crt-card>
  <crt-card><div slot="header">Item 2</div></crt-card>
  <crt-card><div slot="header">Item 3</div></crt-card>
</crt-grid>'
          >
            <crt-grid columns="3" gap="16px" style="width: 100%;">
              <crt-card><div slot="header">Item 1</div><crt-text muted>Content</crt-text></crt-card>
              <crt-card><div slot="header">Item 2</div><crt-text muted>Content</crt-text></crt-card>
              <crt-card><div slot="header">Item 3</div><crt-text muted>Content</crt-text></crt-card>
            </crt-grid>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Table"
            description="Datenübersicht in Tabellenform."
            code='<crt-table
  .headers=\${["Name", "Status", "Progress"]}
  .rows=\${[
    ["Task 1", "Active", "75%"],
    ["Task 2", "Done", "100%"],
  ]}
></crt-table>'
          >
            <crt-table
              .headers=${['Name', 'Status', 'Progress']}
              .rows=${[
                ['Task Alpha', 'Active', '75%'],
                ['Task Beta', 'Completed', '100%'],
                ['Task Gamma', 'Pending', '25%'],
              ]}
              style="width: 100%;"
            ></crt-table>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Accordion"
            description="Einklappbare Abschnitte für strukturierte Inhalte."
            code='<crt-accordion>
  <crt-accordion-item header="Section 1">Content 1</crt-accordion-item>
  <crt-accordion-item header="Section 2">Content 2</crt-accordion-item>
</crt-accordion>'
          >
            <crt-accordion style="width: 100%;">
              <crt-accordion-item header="[+] SYSTEM CONFIGURATION" open>
                <crt-text>Configure system parameters and settings for optimal performance.</crt-text>
              </crt-accordion-item>
              <crt-accordion-item header="[+] NETWORK SETTINGS">
                <crt-text>Manage network connections, protocols, and security options.</crt-text>
              </crt-accordion-item>
              <crt-accordion-item header="[+] USER MANAGEMENT">
                <crt-text>Add, remove, and configure user accounts and permissions.</crt-text>
              </crt-accordion-item>
            </crt-accordion>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Avatar"
            description="Benutzerbilder mit Fallback und Status."
            code='<crt-avatar name="John Doe" size="md"></crt-avatar>
<crt-avatar name="Jane" status="online"></crt-avatar>
<crt-avatar shape="circle" name="User"></crt-avatar>'
          >
            <div style="display: flex; gap: 16px; align-items: center;">
              <crt-avatar name="Admin User" size="lg" status="online"></crt-avatar>
              <crt-avatar name="John Doe" size="md" status="busy"></crt-avatar>
              <crt-avatar name="Guest" size="sm" shape="circle"></crt-avatar>
              <crt-avatar size="md"></crt-avatar>
            </div>
          </crt-code-example>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 7: NAVIGATION -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="navigation" class="sg-section">
          <crt-heading level="2">07. NAVIGATION</crt-heading>
          <crt-text muted class="mb-lg">Navigationskomponenten für Seitenstruktur.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Tabs"
            description="Inhalte in Tabs organisieren."
            code='<crt-tabs .tabs=\${[
  { label: "Tab 1", content: "Content 1" },
  { label: "Tab 2", content: "Content 2" }
]}></crt-tabs>'
          >
            <crt-tabs 
              style="width: 100%;"
              .tabs=${[
                { label: 'OVERVIEW', content: 'System overview and status information.' },
                { label: 'DETAILS', content: 'Detailed system specifications and metrics.' },
                { label: 'LOGS', content: 'Recent system activity and event logs.' }
              ]}
            ></crt-tabs>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Breadcrumb"
            description="Navigationspfad anzeigen."
            code='<crt-breadcrumb
  .items=\${[
    { label: "Home", href: "#" },
    { label: "Section", href: "#" },
    { label: "Current" }
  ]}
></crt-breadcrumb>'
          >
            <crt-breadcrumb
              .items=${[
                { label: 'ROOT', href: '#' },
                { label: 'SYSTEM', href: '#' },
                { label: 'CONFIG', href: '#' },
                { label: 'NETWORK' }
              ]}
            ></crt-breadcrumb>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Pagination"
            description="Seitennavigation für Datenlisten."
            code='<crt-pagination
  totalPages="10"
  currentPage="1"
></crt-pagination>'
          >
            <crt-pagination
              totalPages="15"
              currentPage="5"
              showInfo
            ></crt-pagination>
          </crt-code-example>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 8: OVERLAYS -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="overlays" class="sg-section">
          <crt-heading level="2">08. OVERLAYS</crt-heading>
          <crt-text muted class="mb-lg">Modale Fenster und Benachrichtigungen.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Modal / Dialog"
            description="Modale Dialoge für wichtige Interaktionen."
            code='<crt-modal open title="Dialog Title">
  <crt-text>Dialog content here...</crt-text>
  <div slot="footer">
    <crt-button variant="link">Cancel</crt-button>
    <crt-button>Confirm</crt-button>
  </div>
</crt-modal>'
          >
            <div style="display: flex; gap: 16px;">
              <crt-button @click=${() => {
                const modal = document.createElement('crt-modal');
                modal.setAttribute('title', 'SYSTEM ALERT');
                modal.setAttribute('open', '');
                modal.innerHTML = `
                  <crt-text>Do you want to proceed with the system reset?</crt-text>
                  <crt-text muted>This action cannot be undone.</crt-text>
                  <div slot="footer" style="display: flex; gap: 16px; justify-content: flex-end;">
                    <crt-button variant="link" onclick="this.closest('crt-modal').remove()">CANCEL</crt-button>
                    <crt-button variant="error" onclick="this.closest('crt-modal').remove()">RESET</crt-button>
                  </div>
                `;
                document.body.appendChild(modal);
              }}>OPEN MODAL</crt-button>
              <crt-button variant="warning" @click=${() => {
                const modal = document.createElement('crt-modal');
                modal.setAttribute('title', 'CONFIRM');
                modal.setAttribute('open', '');
                modal.setAttribute('size', 'small');
                modal.innerHTML = `
                  <crt-text>Are you sure?</crt-text>
                  <div slot="footer" style="display: flex; gap: 16px; justify-content: flex-end;">
                    <crt-button variant="link" onclick="this.closest('crt-modal').remove()">NO</crt-button>
                    <crt-button variant="success" onclick="this.closest('crt-modal').remove()">YES</crt-button>
                  </div>
                `;
                document.body.appendChild(modal);
              }}>SMALL MODAL</crt-button>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Toast Notifications"
            description="Temporäre Benachrichtigungen."
            code='// Show via JavaScript:
const toast = document.createElement("crt-toast");
toast.message = "Success!";
toast.variant = "success";
document.body.appendChild(toast);'
          >
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <crt-button variant="success" @click=${() => {
                const toast = document.createElement('crt-toast') as any;
                toast.message = 'Operation completed successfully!';
                toast.variant = 'success';
                toast.duration = 3000;
                document.body.appendChild(toast);
              }}>SUCCESS TOAST</crt-button>
              <crt-button variant="warning" @click=${() => {
                const toast = document.createElement('crt-toast') as any;
                toast.message = 'Warning: Low disk space detected.';
                toast.variant = 'warning';
                toast.duration = 3000;
                document.body.appendChild(toast);
              }}>WARNING TOAST</crt-button>
              <crt-button variant="error" @click=${() => {
                const toast = document.createElement('crt-toast') as any;
                toast.message = 'Error: Connection failed!';
                toast.variant = 'error';
                toast.duration = 3000;
                document.body.appendChild(toast);
              }}>ERROR TOAST</crt-button>
              <crt-button @click=${() => {
                const toast = document.createElement('crt-toast') as any;
                toast.message = 'Info: New update available.';
                toast.variant = 'info';
                toast.duration = 3000;
                document.body.appendChild(toast);
              }}>INFO TOAST</crt-button>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Spinner (Loading Overlay)"
            description="Blockierendes Overlay mit drehendem Atom-Symbol für Ladezustände."
            code='<crt-spinner open message="LOADING..."></crt-spinner>

// Via JavaScript:
const spinner = document.createElement("crt-spinner");
spinner.message = "PROCESSING...";
spinner.open = true;
document.body.appendChild(spinner);
// Later: spinner.open = false;'
          >
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <crt-button @click=${() => (window as any).showSpinner('LOADING...', 3000)}>SHOW SPINNER (3s)</crt-button>
              <crt-button variant="warning" @click=${() => (window as any).showSpinner('PROCESSING DATA...', 3000)}>PROCESSING (3s)</crt-button>
              <crt-button variant="success" @click=${() => (window as any).showSpinner('INITIALIZING SYSTEM...', 3000)}>INIT SYSTEM (3s)</crt-button>
            </div>
          </crt-code-example>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 9: MEDIA -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="media" class="sg-section">
          <crt-heading level="2">09. MEDIA</crt-heading>
          <crt-text muted class="mb-lg">Audio-Visualisierung und Media-Player Komponenten.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Visualizer"
            description="Audio-Visualizer mit Frequenz-Balken. Verbindet sich mit einem Audio-Element über die audioElement Property."
            code='<crt-visualizer
  .audioElement="\${audioEl}"
  bars="32"
></crt-visualizer>'
          >
            <crt-visualizer style="height: 150px; width: 100%;"></crt-visualizer>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Terminal"
            description="Interaktives Terminal mit blinkendem Cursor. Emitiert 'command' Events bei Enter."
            code='<crt-terminal></crt-terminal>'
          >
            <div style="display: flex; gap: 12px; flex-direction: column; align-items: stretch;">
              <crt-terminal id="demo-term" style="width: 100%;"></crt-terminal>
              <div style="display:flex; gap:8px; margin-top:8px;">
                <crt-button @click=${() => {
                  const t = document.getElementById('demo-term') as any;
                  t?.type('> Hello from the style guide', 24);
                }}>Print Message</crt-button>
                <crt-button variant="success" @click=${() => {
                  const t = document.getElementById('demo-term') as any;
                  t?.println('> SYSTEM: OK');
                }}>Write OK</crt-button>
                <crt-button variant="warning" @click=${() => {
                  const t = document.getElementById('demo-term') as any;
                  t?.clear();
                }}>Clear</crt-button>
              </div>
            </div>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Music Player (Empty)"
            description="Audio-Player im leeren Zustand ohne geladene Tracks."
            code='<crt-music-player></crt-music-player>'
          >
            <crt-music-player></crt-music-player>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Music Player (Active)"
            description="Audio-Player mit geladenen Tracks, Fortschrittsanzeige, Lautstärkeregler und Steuerungstasten."
            code='<crt-music-player
  .tracks="\${tracks}"
  .currentIndex="\${0}"
  @track-change="\${handleChange}"
></crt-music-player>'
          >
            <crt-music-player .tracks="${[{title: 'NEON DREAMS', artist: 'SYNTHWAVE', url: ''}, {title: 'TERMINAL ECHO', artist: 'RETRO PULSE', url: ''}, {title: 'DIGITAL RAIN', artist: 'MATRIX AUDIO', url: ''}]}" .currentIndex="${0}"></crt-music-player>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Playlist (Empty)"
            description="Leere Playlist. Klick dispatcht 'add-tracks' Event zum Hinzufügen von Tracks."
            code='<crt-playlist
  @add-tracks="\${handleAddTracks}"
></crt-playlist>'
          >
            <crt-playlist></crt-playlist>
          </crt-code-example>

          <crt-code-example
            class="mb-lg"
            title="Playlist (Active)"
            description="Track-Liste als Tabelle mit aktiver Auswahl und Remove-Buttons."
            code='<crt-playlist
  .tracks="\${tracks}"
  .currentIndex="\${0}"
  @track-select="\${handleSelect}"
  @track-remove="\${handleRemove}"
></crt-playlist>'
          >
            <crt-playlist .tracks="${[{title: 'DEMO TRACK 01', artist: 'SYSTEM', url: ''}, {title: 'DEMO TRACK 02', artist: 'TERMINAL', url: ''}, {title: 'AMBIENT NOISE', artist: 'CRT AUDIO', url: ''}]}" .currentIndex="${1}"></crt-playlist>
          </crt-code-example>
        </section>

        <!-- ═══════════════════════════════════════════════════════════════ -->
        <!-- SECTION 10: ORGANISMS -->
        <!-- ═══════════════════════════════════════════════════════════════ -->
        <section id="organisms" class="sg-section">
          <crt-heading level="2">10. ORGANISMS</crt-heading>
          <crt-text muted class="mb-lg">Komplexe Komponenten aus Atomen und Molekülen.</crt-text>

          <crt-code-example
            class="mb-lg"
            title="Music Station"
            description="Kombiniert den Music Player (Molekül) mit Playlist und File Upload Modal. Klicke auf die leere Playlist um Audio-Dateien hinzuzufügen."
            code='<crt-music-station></crt-music-station>'
          >
            <crt-music-station></crt-music-station>
          </crt-code-example>
        </section>

      </main>

      <!-- FOOTER -->
      <footer class="sg-footer">
        <crt-text muted>CRT STYLE GUIDE v0.1.0 | © 2026</crt-text>
      </footer>
    </div>
  </div>
`;
