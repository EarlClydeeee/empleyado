import { Component, Input } from '@angular/core';

export interface BreakdownColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

@Component({
  selector: 'app-department-breakdown',
  template: `
    <section class="drill-card">
      <h2 class="drill-card__title">{{ title }}</h2>

      <div class="drill-toolbar">
        <div class="drill-search">
          <input
            type="search"
            [placeholder]="searchPlaceholder"
            [value]="searchQuery"
            (input)="onSearch($event)"
            [attr.aria-label]="searchPlaceholder"
          />
          <button type="button" class="drill-search__btn" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="white" stroke-width="1.75"/>
              <path d="M16 16l4 4" stroke="white" stroke-width="1.75" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="drill-toolbar__actions">
          <button type="button" class="drill-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
            </svg>
            Filter
          </button>
          <button type="button" class="drill-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 7l4-4 4 4M8 17l4 4 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Sort
          </button>
        </div>
      </div>

      <div class="drill-table-wrap">
        <table class="drill-table">
          <thead>
            <tr>
              <th
                *ngFor="let col of columns; trackBy: trackByColumnKey"
                [class]="'is-' + (col.align || 'left')"
              >
                <button type="button" class="drill-th-btn" (click)="setSort(col.key)">
                  {{ col.label }}
                  <span class="drill-sort" aria-hidden="true">⇅</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of pagedRows; trackBy: trackRow">
              <td
                *ngFor="let col of columns; trackBy: trackByColumnKey"
                [class]="'is-' + (col.align || 'left')"
              >
                {{ displayCell(row, col.key) }}
              </td>
            </tr>
            <tr *ngIf="pagedRows.length === 0">
              <td [attr.colspan]="columns.length" class="drill-table__empty">No results found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="drill-footer">
        <div class="drill-pager" role="navigation" aria-label="Pagination">
          <button
            type="button"
            class="drill-pager__btn"
            [disabled]="currentPage <= 1"
            (click)="goPage(currentPage - 1)"
            aria-label="Previous page"
          >‹</button>
          <button
            type="button"
            class="drill-pager__btn is-active"
            aria-current="page"
          >{{ currentPage }}</button>
          <button
            type="button"
            class="drill-pager__btn"
            [disabled]="currentPage >= totalPages"
            (click)="goPage(currentPage + 1)"
            aria-label="Next page"
          >›</button>
        </div>

        <div class="drill-footer__controls">
          <label class="drill-footer__label">
            Go to Page
            <select [value]="currentPage" (change)="onGoToPage($event)" aria-label="Go to page">
              <option *ngFor="let n of pageOptions; trackBy: trackByPage" [value]="n">{{ n }}</option>
            </select>
          </label>
          <label class="drill-footer__label">
            Show Rows
            <select [value]="pageSize" (change)="onPageSize($event)" aria-label="Show rows">
              <option [value]="10">10</option>
              <option [value]="20">20</option>
              <option [value]="50">50</option>
            </select>
          </label>
          <span class="drill-footer__range">{{ rangeLabel }}</span>
        </div>
      </footer>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class DepartmentBreakdown {
  @Input() title = 'Department Breakdown';
  @Input() columns!: BreakdownColumn[];
  @Input() rows!: Record<string, string | number>[];
  @Input() searchPlaceholder = 'Search';
  @Input() searchKeys: string[] = ['department'];

  searchQuery = '';
  currentPage = 1;
  pageSize = 20;
  sortKey = 'department';
  sortDir: 'asc' | 'desc' = 'asc';

  get filteredRows(): Record<string, string | number>[] {
    const q = this.searchQuery.trim().toLowerCase();
    const keys = this.searchKeys;
    let list = this.rows;
    if (q) {
      list = list.filter((row) =>
        keys.some((k) => String(row[k] != null ? row[k] : '').toLowerCase().includes(q)),
      );
    }
    const key = this.sortKey;
    const dir = this.sortDir === 'asc' ? 1 : -1;
    return [...list].sort(
      (a, b) =>
        String(a[key] != null ? a[key] : '').localeCompare(String(b[key] != null ? b[key] : ''), undefined, { numeric: true }) * dir,
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize) || 1);
  }

  get pagedRows(): Record<string, string | number>[] {
    const size = this.pageSize;
    const start = (this.currentPage - 1) * size;
    return this.filteredRows.slice(start, start + size);
  }

  get rangeLabel(): string {
    const total = this.filteredRows.length;
    if (total === 0) {
      return '0-0 of 0';
    }
    const size = this.pageSize;
    const start = (this.currentPage - 1) * size + 1;
    const end = Math.min(this.currentPage * size, total);
    return `${start}-${end} of ${total}`;
  }

  get pageOptions(): number[] {
    const total = this.totalPages;
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
  }

  setSort(key: string): void {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'asc';
    }
  }

  goPage(page: number): void {
    this.currentPage = Math.min(Math.max(1, page), this.totalPages);
  }

  onGoToPage(event: Event): void {
    this.goPage(Number((event.target as HTMLSelectElement).value));
  }

  onPageSize(event: Event): void {
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.currentPage = 1;
  }

  displayCell(row: Record<string, string | number>, key: string): string {
    const value = row[key];
    return value == null ? '' : String(value);
  }

  trackRow(index: number, row: Record<string, string | number>): string {
    const department = row['department'];
    const rowId = row['id'];
    return String(department != null ? department : (rowId != null ? rowId : index));
  }

  trackByColumnKey(_index: number, col: BreakdownColumn): string {
    return col.key;
  }

  trackByPage(_index: number, page: number): number {
    return page;
  }
}
