import { html } from 'lit';
import { categories, componentDocs, useCases, type ComponentDoc, type EventDoc, type PropDoc, type SlotDoc } from './data/components';

const renderPropsTable = (props: PropDoc[] = []) => {
  const rows = props.length
    ? props.map((prop) => html`
        <tr>
          <td><code>${prop.name}</code></td>
          <td>${prop.type}</td>
          <td>${prop.default ?? '-'}</td>
          <td>${prop.description ?? '-'}</td>
        </tr>
      `)
    : html`
        <tr>
          <td colspan="4">None</td>
        </tr>
      `;

  return html`
    <div class="sg-meta-block">
      <div class="sg-meta-title">Attributes</div>
      <table class="sg-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
};

const renderEventsTable = (events: EventDoc[] = []) => {
  const rows = events.length
    ? events.map((event) => html`
        <tr>
          <td><code>${event.name}</code></td>
          <td>${event.detail ?? '-'}</td>
          <td>${event.description ?? '-'}</td>
        </tr>
      `)
    : html`
        <tr>
          <td colspan="3">None</td>
        </tr>
      `;

  return html`
    <div class="sg-meta-block">
      <div class="sg-meta-title">Events</div>
      <table class="sg-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Detail</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
};

const renderSlotsTable = (slots: SlotDoc[] = []) => {
  if (!slots.length) return html``;
  return html`
    <div class="sg-meta-block">
      <div class="sg-meta-title">Slots</div>
      <table class="sg-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${slots.map((slot) => html`
            <tr>
              <td><code>${slot.name}</code></td>
              <td>${slot.description ?? '-'}</td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `;
};

const renderComponent = (component: ComponentDoc) => html`
  <article id="${component.id}" class="sg-component">
    ${component.hideHeader ? '' : html`
      <div class="sg-component-header">
        <crt-heading level="3">${component.name}</crt-heading>
        <crt-text muted class="sg-component-tag">${component.tag}</crt-text>
      </div>
      ${component.description ? html`<crt-text class="sg-component-desc">${component.description}</crt-text>` : ''}
    `}
    <div class="sg-examples">
      ${component.examples.map((example) => html`
        <crt-code-example
          class="mb-lg"
          .title=${example.title}
          .description=${example.description ?? ''}
          .code=${example.code}
        >
          ${example.preview}
        </crt-code-example>
      `)}
    </div>
    <div class="sg-meta">
      ${renderPropsTable(component.props)}
      ${renderEventsTable(component.events)}
      ${renderSlotsTable(component.slots)}
    </div>
  </article>
`;

export const styleGuideTemplate = () => html`
  <div class="sg-wrapper">
    <div class="sg-container">
      <div class="sg-layout">
        <aside class="sg-sidebar">
          <div class="sg-sidebar-inner">
            <div class="sg-sidebar-title">Sections</div>
            <nav class="sg-sidebar-nav">
              ${categories.map((category) => html`
                <a href="#${category.id}">${category.label}</a>
              `)}
            </nav>

            <div class="sg-sidebar-title">Components</div>
            ${categories
              .filter((category) => category.id !== 'use-cases')
              .map((category) => html`
                <div class="sg-sidebar-group">
                  <div class="sg-sidebar-group-title">${category.label}</div>
                  <div class="sg-sidebar-group-links">
                    ${componentDocs
                      .filter((component) => component.category === category.id)
                      .map((component) => html`
                        <a href="#${component.id}">${component.name}</a>
                      `)}
                  </div>
                </div>
              `)}
          </div>
        </aside>

        <div class="sg-content">
          <crt-header class="sg-header" title="CRT LIVING STYLE GUIDE">
            <span slot="title">CRT LIVING STYLE GUIDE</span>
            <span slot="subtitle">Component Library · Lit Web Components · Atomic Design</span>
            <div slot="actions">
              <crt-search placeholder="Search styleguide..." style="width:240px;"></crt-search>
            </div>
          </crt-header>

          ${categories
            .filter((category) => category.id !== 'use-cases')
            .map((category) => html`
              <section id="${category.id}" class="sg-section">
                <div class="sg-section-header">
                  <crt-heading level="2">${category.label}</crt-heading>
                  ${category.description ? html`<crt-text muted>${category.description}</crt-text>` : ''}
                </div>
                ${componentDocs
                  .filter((component) => component.category === category.id)
                  .map(renderComponent)}
              </section>
            `)}

          <section id="use-cases" class="sg-section">
            <div class="sg-section-header">
              <crt-heading level="2">Use Cases</crt-heading>
              <crt-text muted>Scenario-driven examples with real UI compositions.</crt-text>
            </div>
            ${useCases.map((useCase) => html`
              <div id="${useCase.id}">
                <crt-code-example
                  class="mb-lg"
                  .title=${useCase.title}
                  .description=${useCase.description ?? ''}
                  .code=${useCase.code}
                >
                  ${useCase.preview}
                </crt-code-example>
              </div>
            `)}
          </section>

          <crt-footer class="sg-footer">
            <span slot="left">Made with ♥</span>
            <span slot="right">
              <crt-link href="https://github.com/Smotherer007/crtstyleguide" target="_blank">GitHub</crt-link>
            </span>
          </crt-footer>
        </div>
      </div>
    </div>
  </div>
`;
