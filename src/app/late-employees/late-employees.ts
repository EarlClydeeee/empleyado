import { Component } from '@angular/core';

export interface LateEmployeeRow {
  id: string;
  name: string;
  department: string;
  scheduledIn: string;
  actualIn: string;
  late: string;
}

type SortKey = 'name' | 'department' | 'scheduledIn' | 'actualIn' | 'late';

@Component({
  selector: 'app-late-employees',
  templateUrl: './late-employees.html',
  styleUrls: ['./late-employees.scss'],
})
export class LateEmployees {
  searchQuery = '';
  currentPage = 1;
  pageSize = 20;
  goToPage = 1;
  sortKey: SortKey = 'name';
  sortDir: 'asc' | 'desc' = 'asc';

  readonly trendYTicks = [0, 20, 40, 60, 80, 100];
  readonly pageNumberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  readonly trendPoints = [
    { label: 'Mon', value: 14 },
    { label: 'Tue', value: 15 },
    { label: 'Wed', value: 12 },
    { label: 'Thu', value: 36 },
    { label: 'Fri', value: 64 },
    { label: 'Sat', value: 0 },
    { label: 'Sun', value: 0 },
  ];

  readonly allEmployees: LateEmployeeRow[] = [
    { id: '1', name: 'Carl S. Lito', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '2', name: 'Jay Lawrence S. Cruz', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '3', name: 'Arnold B. De Guzman', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '4', name: 'Maria C. Santos', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:12 AM', late: '12 min' },
    { id: '5', name: 'Paolo R. Mendoza', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:08 AM', late: '8 min' },
    { id: '6', name: 'Angela F. Reyes', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '7', name: 'Mark A. Villanueva', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:15 AM', late: '15 min' },
    { id: '8', name: 'Sofia L. Garcia', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '9', name: 'Diego M. Torres', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:10 AM', late: '10 min' },
    { id: '10', name: 'Hannah P. Lim', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '11', name: 'Rico J. Bautista', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:07 AM', late: '7 min' },
    { id: '12', name: 'Elena S. Ramos', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '13', name: 'Kevin N. Dela Cruz', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:20 AM', late: '20 min' },
    { id: '14', name: 'Patricia O. Tan', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '15', name: 'Gabriel W. Sy', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:09 AM', late: '9 min' },
    { id: '16', name: 'Isabel Q. Chua', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '17', name: 'Francis E. Ong', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:11 AM', late: '11 min' },
    { id: '18', name: 'Camille D. Go', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '19', name: 'Nathan K. Yu', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:06 AM', late: '6 min' },
    { id: '20', name: 'Bea V. Castillo', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
    { id: '21', name: 'Luis H. Navarro', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:14 AM', late: '14 min' },
    { id: '22', name: 'Tricia M. Flores', department: 'Human Resources', scheduledIn: '8:00 AM', actualIn: '8:05 AM', late: '5 min' },
  ];

  readonly totalResults = 1250;

  get filteredEmployees(): LateEmployeeRow[] {
    const q = this.searchQuery.trim().toLowerCase();
    let rows = this.allEmployees;
    if (q) {
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.department.toLowerCase().includes(q) ||
          r.late.toLowerCase().includes(q),
      );
    }
    const key = this.sortKey;
    const dir = this.sortDir === 'asc' ? 1 : -1;
    const field = key === 'name' ? 'name' : key;
    return [...rows].sort((a, b) => String(a[field]).localeCompare(String(b[field])) * dir);
  }

  get totalPages(): number {
    return 12;
  }

  get pagedEmployees(): LateEmployeeRow[] {
    const size = Math.min(this.pageSize, this.filteredEmployees.length);
    return this.filteredEmployees.slice(0, size);
  }

  get rangeLabel(): string {
    const page = this.currentPage;
    const size = this.pageSize;
    const start = (page - 1) * size + 1;
    const end = Math.min(page * size, this.totalResults);
    return `${start}-${end} of ${this.totalResults.toLocaleString()}`;
  }

  get pageButtons(): (number | 'ellipsis')[] {
    return [1, 2, 3, 4, 5, 'ellipsis', 12];
  }

  get chartPath(): { line: string; area: string; dots: { x: number; y: number }[] } {
    return this.buildTrendPaths();
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
  }

  setSort(key: SortKey): void {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'asc';
    }
  }

  goPage(page: number): void {
    const clamped = Math.min(Math.max(1, page), this.totalPages);
    this.currentPage = clamped;
    this.goToPage = clamped;
  }

  onGoToPageChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.goToPage = value;
    this.currentPage = value;
  }

  onPageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSize = value;
    this.currentPage = 1;
    this.goToPage = 1;
  }

  isEllipsis(p: number | 'ellipsis'): p is 'ellipsis' {
    return p === 'ellipsis';
  }

  trackByEmployeeId(_index: number, row: LateEmployeeRow): string {
    return row.id;
  }

  trackByTick(_index: number, y: number): number {
    return y;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByLabel(_index: number, p: { label: string }): string {
    return p.label;
  }

  trackByPageNumber(_index: number, n: number): number {
    return n;
  }

  private buildTrendPaths(): { line: string; area: string; dots: { x: number; y: number }[] } {
    const points = this.trendPoints;
    const w = 720;
    const h = 220;
    const padL = 40;
    const padR = 16;
    const padT = 16;
    const padB = 32;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;
    const maxY = 100;

    const coords = points.map((p, i) => {
      const x = padL + (i / (points.length - 1)) * chartW;
      const y = padT + chartH - (p.value / maxY) * chartH;
      return { x, y };
    });

    const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
    const baseline = padT + chartH;
    const area = `${line} L ${coords[coords.length - 1].x} ${baseline} L ${coords[0].x} ${baseline} Z`;
    return { line, area, dots: coords };
  }
}
