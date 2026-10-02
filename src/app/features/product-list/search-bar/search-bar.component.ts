import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  template: `
    <label class="search">
      <span class="search__label">Buscar por marca o modelo</span>
      <input
        type="search"
        class="search__input"
        placeholder="Ej. Samsung, Galaxy…"
        [value]="value()"
        (input)="queryChange.emit($any($event.target).value)"
      />
    </label>
  `,
  styles: `
    .search { display: flex; flex-direction: column; gap: 0.25rem; width: min(100%, 320px); }
    .search__label { font-size: 0.85rem; color: var(--muted); }
    .search__input {
      padding: 0.6rem 0.8rem; font: inherit; border: 1px solid var(--line);
      border-radius: var(--radius); background: var(--surface);
    }
  `,
  standalone: true
})
export class SearchBarComponent {
  readonly value = input('');
  readonly queryChange = output<string>();
}
