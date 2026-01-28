import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * CRT Calendar Date Picker Component
 * Full calendar view with month/year navigation
 */
@customElement('crt-calendar')
export class Calendar extends LitElement {
  private readonly _id = `crt-calendar-${Math.random().toString(36).slice(2, 9)}`;
  static readonly styles = css`
    :host {
      display: inline-block;
      font-family: var(--crt-font-family);
    }

    .calendar-wrapper {
      position: relative;
    }

    .calendar-input {
      display: flex;
      align-items: center;
      gap: var(--crt-spacing-sm);
    }

    .input-field {
      background: transparent;
      border: 2px solid var(--crt-primary);
      color: var(--crt-primary);
      padding: var(--crt-spacing-md);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-base);
      min-width: 180px;
      cursor: var(--crt-cursor-pointer);
      transition: var(--crt-transition);
    }

    .input-field::placeholder {
      color: var(--crt-text-primary);
    }

    .input-field:hover {
      box-shadow: none;
    }

    .input-field:focus {
      outline: none;
      box-shadow: none;
    }

    .calendar-toggle {
      background: transparent;
      border: 2px solid var(--crt-primary);
      color: var(--crt-primary);
      padding: var(--crt-spacing-md);
      cursor: var(--crt-cursor-pointer);
      font-family: var(--crt-font-family);
      transition: var(--crt-transition);
    }

    .calendar-toggle:hover {
      background: var(--crt-primary);
      color: var(--crt-bg-dark);
    }

    .calendar-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: var(--crt-spacing-sm);
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 3px double var(--crt-primary);
      box-shadow: 
        0 0 20px color-mix(in srgb, var(--crt-primary) 30%, transparent);
      z-index: 1000;
      display: none;
      min-width: 280px;
    }

    .calendar-dropdown.open {
      display: block;
      animation: dropdown-in 0.2s ease;
    }

    @keyframes dropdown-in {
      from {
        transform: translateY(-10px);
      }
      to {
        transform: translateY(0);
      }
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--crt-spacing-md);
      border-bottom: 1px solid var(--crt-primary);
      background: transparent;
    }

    .calendar-nav-btn {
      background: transparent;
      border: 1px solid var(--crt-primary);
      color: var(--crt-primary);
      width: 32px;
      height: 32px;
      cursor: var(--crt-cursor-pointer);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-lg);
      transition: var(--crt-transition);
    }

    .calendar-nav-btn:hover {
      background: var(--crt-primary);
      color: var(--crt-bg-dark);
    }

    .calendar-title {
      font-size: var(--crt-font-size-base);
      color: var(--crt-primary);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: var(--crt-spacing-sm);
      border-bottom: 1px solid color-mix(in srgb, var(--crt-primary) 30%, transparent);
    }

    .weekday {
      text-align: center;
      padding: var(--crt-spacing-xs);
      font-size: var(--crt-font-size-sm);
      color: var(--crt-text-muted);
      text-transform: uppercase;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      padding: var(--crt-spacing-sm);
      gap: 2px;
    }

    .day {
      text-align: center;
      padding: var(--crt-spacing-sm);
      cursor: var(--crt-cursor-pointer);
      border: 1px solid transparent;
      transition: var(--crt-transition);
      font-size: var(--crt-font-size-sm);
    }

    .day:hover:not(.empty):not(.disabled) {
      border-color: var(--crt-primary);
      background: transparent;
    }

    .day.today {
      border-color: var(--crt-primary);
      color: var(--crt-primary);
    }

    .day.selected {
      background: var(--crt-primary);
      color: var(--crt-bg-dark);
    }

    .day.other-month {
      color: var(--crt-text-muted);
    }

    .day.disabled {
      cursor: not-allowed;
    }

    .day.empty {
      cursor: default;
    }

    .calendar-footer {
      padding: var(--crt-spacing-sm) var(--crt-spacing-md);
      border-top: 1px solid var(--crt-primary);
      display: flex;
      justify-content: space-between;
      gap: var(--crt-spacing-sm);
    }

    .calendar-footer button {
      flex: 1;
      background: transparent;
      border: 1px solid var(--crt-primary);
      color: var(--crt-primary);
      padding: var(--crt-spacing-sm);
      cursor: var(--crt-cursor-pointer);
      font-family: var(--crt-font-family);
      font-size: var(--crt-font-size-sm);
      text-transform: uppercase;
      transition: var(--crt-transition);
    }

    .calendar-footer button:hover {
      background: var(--crt-primary);
      color: var(--crt-bg-dark);
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select date...';
  @property({ type: String }) format = 'DD.MM.YYYY';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: Boolean }) disabled = false;

  @state() private _isOpen = false;
  @state() private _viewDate = new Date();
  @state() private _selectedDate: Date | null = null;

  private readonly _weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  private readonly _months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
    
    if (this.value) {
      this._parseValue();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private readonly _handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this._isOpen = false;
    }
  };

  private _parseValue() {
    // Try to parse DD.MM.YYYY format
    const parts = this.value.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      this._selectedDate = new Date(year, month - 1, day);
      this._viewDate = new Date(this._selectedDate);
    }
  }

  private _formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  private _toggleCalendar() {
    if (!this.disabled) {
      this._isOpen = !this._isOpen;
    }
  }

  private _prevMonth() {
    this._viewDate = new Date(
      this._viewDate.getFullYear(),
      this._viewDate.getMonth() - 1,
      1
    );
  }

  private _nextMonth() {
    this._viewDate = new Date(
      this._viewDate.getFullYear(),
      this._viewDate.getMonth() + 1,
      1
    );
  }

  private _selectDate(date: Date) {
    this._selectedDate = date;
    this.value = this._formatDate(date);
    this._isOpen = false;
    this.dispatchEvent(new CustomEvent('change', { 
      detail: { value: this.value, date: date } 
    }));
  }

  private _selectToday() {
    this._selectDate(new Date());
  }

  private _clear() {
    this._selectedDate = null;
    this.value = '';
    this._isOpen = false;
    this.dispatchEvent(new CustomEvent('change', { 
      detail: { value: '', date: null } 
    }));
  }

  private _getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private _getFirstDayOfMonth(year: number, month: number): number {
    const day = new Date(year, month, 1).getDay();
    // Convert Sunday=0 to Monday=0 format
    return day === 0 ? 6 : day - 1;
  }

  private _isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  private _isSelected(date: Date): boolean {
    if (!this._selectedDate) return false;
    return date.getDate() === this._selectedDate.getDate() &&
           date.getMonth() === this._selectedDate.getMonth() &&
           date.getFullYear() === this._selectedDate.getFullYear();
  }

  private _renderDays() {
    const year = this._viewDate.getFullYear();
    const month = this._viewDate.getMonth();
    const daysInMonth = this._getDaysInMonth(year, month);
    const firstDay = this._getFirstDayOfMonth(year, month);
    const daysInPrevMonth = this._getDaysInMonth(year, month - 1);
    
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push(html`
        <div class="day other-month" @click="${() => this._selectDate(date)}">
          ${daysInPrevMonth - i}
        </div>
      `);
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = this._isToday(date);
      const isSelected = this._isSelected(date);
      
      days.push(html`
        <div 
          class="day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
          @click="${() => this._selectDate(date)}"
        >
          ${i}
        </div>
      `);
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push(html`
        <div class="day other-month" @click="${() => this._selectDate(date)}">
          ${i}
        </div>
      `);
    }
    
    return days;
  }

  render() {
    const monthYear = `${this._months[this._viewDate.getMonth()]} ${this._viewDate.getFullYear()}`;
    const dropdownId = `${this._id}-dropdown`;
    
    return html`
      <div class="calendar-wrapper">
        <div class="calendar-input">
          <input 
            class="input-field" 
            type="text" 
            readonly
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            aria-haspopup="dialog"
            aria-expanded="${this._isOpen ? 'true' : 'false'}"
            aria-controls="${dropdownId}"
            aria-label="${this.placeholder || 'Select date'}"
            @click="${this._toggleCalendar}"
          />
          <button 
            class="calendar-toggle" 
            @click="${this._toggleCalendar}"
            ?disabled="${this.disabled}"
            aria-haspopup="dialog"
            aria-expanded="${this._isOpen ? 'true' : 'false'}"
            aria-controls="${dropdownId}"
            aria-label="Toggle calendar"
          >
            ▼
          </button>
        </div>
        
        <div
          class="calendar-dropdown ${this._isOpen ? 'open' : ''}"
          id="${dropdownId}"
          role="dialog"
          aria-hidden="${this._isOpen ? 'false' : 'true'}"
        >
          <div class="calendar-header">
            <button class="calendar-nav-btn" @click="${this._prevMonth}" aria-label="Previous month">◄</button>
            <span class="calendar-title">${monthYear}</span>
            <button class="calendar-nav-btn" @click="${this._nextMonth}" aria-label="Next month">►</button>
          </div>
          
          <div class="calendar-weekdays">
            ${this._weekdays.map(day => html`<div class="weekday">${day}</div>`)}
          </div>
          
          <div class="calendar-days">
            ${this._renderDays()}
          </div>
          
          <div class="calendar-footer">
            <button @click="${this._selectToday}">Today</button>
            <button @click="${this._clear}">Clear</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'crt-calendar': Calendar;
  }
}
