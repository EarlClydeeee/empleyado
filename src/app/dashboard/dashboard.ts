import { Component, OnDestroy } from '@angular/core';
import { ExpectedStaffMember } from '../shared/expected-staff/expected-staff';

export type ViewTab = 'my' | 'team';
export type Period = 'week' | 'month' | 'year';

export interface Employee {
  id: string;
  name: string;
}

export interface TimeLogEntry {
  id: string;
  employeeId: string;
  time: string;
  detail: string;
  detailType: 'location' | 'biometrics';
}

export interface TimeLogGroup {
  date: string;
  entries: TimeLogEntry[];
}

export interface TardinessPoint {
  label: string;
  day: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnDestroy {
  readonly userName = 'Buhorn';
  readonly totalEmployees = 120;
  readonly lateCount = 64;
  readonly lateDelta = '+12 vs last week';
  readonly leaveCount = 31;
  readonly leaveBreakdown = '18 vacation • 9 sick • 4 emergency';
  readonly attendanceRate = 92.5;
  readonly attendanceDelta = '-1.2% vs last week';
  readonly pendingRequests = 5;
  readonly chartYTicks = [0, 2, 4, 6, 8];

  readonly expectedStaff: ExpectedStaffMember[] = [
    {
      id: 'edzel-basilla',
      name: 'Edzel Basilla',
      schedule: '9:00 AM to 6:00 PM',
      status: 'IN',
      detail: 'Timed In',
    },
    {
      id: 'paul-bocdalan',
      name: 'Paul Gabriel Bocdalan',
      schedule: '9:00 AM to 6:00 PM',
      status: 'OUT',
    },
    {
      id: 'russel-fernandez',
      name: 'Russel John Fernandez',
      schedule: '9:00 AM to 6:00 PM',
      status: 'OUT',
    },
    {
      id: 'maria-santos',
      name: 'Maria Santos',
      schedule: '9:00 AM to 6:00 PM',
      status: 'IN',
      detail: 'Timed In',
    },
    {
      id: 'jose-reyes',
      name: 'Jose Reyes',
      schedule: '9:00 AM to 6:00 PM',
      status: 'LEAVE',
      detail: 'Sick Leave',
    },
    {
      id: 'ana-cruz',
      name: 'Ana Cruz',
      schedule: '9:00 AM to 6:00 PM',
      status: 'LEAVE',
      detail: 'Vacation Leave',
    },
    {
      id: 'carlos-menoz',
      name: 'Carlos Menoz',
      schedule: '1:00 PM to 10:00 PM',
      status: 'OUT',
    },
    {
      id: 'luz-mendoza',
      name: 'Luz Mendoza',
      schedule: '9:00 AM to 6:00 PM',
      status: 'OUT',
    },
  ];

  readonly employees: Employee[] = [
    { id: 'ana', name: 'Ana' },
    { id: 'carlos', name: 'Carlos' },
    { id: 'jose', name: 'Jose' },
    { id: 'luz', name: 'Luz' },
    { id: 'maria', name: 'Maria' },
    { id: 'pedro', name: 'Pedro' },
  ];

  tardinessPoints: TardinessPoint[] = [
    { label: 'May', day: '25', value: 4 },
    { label: 'May', day: '26', value: 6 },
    { label: 'May', day: '27', value: 5 },
    { label: 'May', day: '28', value: 8 },
    { label: 'May', day: '29', value: 7 },
    { label: 'May', day: '30', value: 5 },
    { label: 'May', day: '31', value: 3 },
  ];

  private displayedTardinessPoints: TardinessPoint[] = this.tardinessPoints.map((point) => ({
    ...point,
  }));
  private chartAnimationFrame?: number;

  private readonly allLogGroups: TimeLogGroup[] = [
    {
      date: 'Jun 25, 2026 (Thursday)',
      entries: [
        {
          id: '1',
          employeeId: 'ana',
          time: '05:14 PM',
          detail: 'Empleyado HQ, Makati Ave',
          detailType: 'location',
        },
        {
          id: '2',
          employeeId: 'ana',
          time: '08:02 AM',
          detail: 'via Biometrics',
          detailType: 'biometrics',
        },
      ],
    },
    {
      date: 'Jun 24, 2026 (Wednesday)',
      entries: [
        {
          id: '3',
          employeeId: 'ana',
          time: '06:45 PM',
          detail: 'via Biometrics',
          detailType: 'biometrics',
        },
        {
          id: '4',
          employeeId: 'ana',
          time: '08:11 AM',
          detail: 'Empleyado HQ, Makati Ave',
          detailType: 'location',
        },
      ],
    },
    {
      date: 'Jun 23, 2026 (Tuesday)',
      entries: [
        {
          id: '5',
          employeeId: 'ana',
          time: '06:30 PM',
          detail: 'via Biometrics',
          detailType: 'biometrics',
        },
        {
          id: '6',
          employeeId: 'carlos',
          time: '05:58 PM',
          detail: 'via Biometrics',
          detailType: 'biometrics',
        },
        {
          id: '7',
          employeeId: 'jose',
          time: '09:05 AM',
          detail: 'Empleyado HQ, Makati Ave',
          detailType: 'location',
        },
      ],
    },
  ];

  activeTab: ViewTab = 'team';
  period: Period = 'week';
  selectedEmployeeId = 'ana';
  searchQuery = '';
  activeNav = 2;

  readonly gaugeStroke = Math.PI * 82;

  get gaugeOffset(): number {
    const pct = this.attendanceRate / 100;
    return this.gaugeStroke * (1 - pct);
  }

  get chartPath(): { line: string; area: string; dots: { x: number; y: number }[] } {
    return this.buildChartPaths();
  }

  get filteredLogGroups(): TimeLogGroup[] {
    const selected = this.selectedEmployeeId;
    const q = this.searchQuery.trim().toLowerCase();

    return this.allLogGroups
      .map((group) => ({
        ...group,
        entries: group.entries.filter((e) => {
          if (e.employeeId !== selected) {
            return false;
          }
          if (!q) {
            return true;
          }
          return (
            e.time.toLowerCase().includes(q) ||
            e.detail.toLowerCase().includes(q) ||
            group.date.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((g) => g.entries.length > 0);
  }

  setTab(tab: ViewTab): void {
    this.activeTab = tab;
  }

  setPeriod(period: Period): void {
    this.period = period;
  }

  selectEmployee(id: string): void {
    this.selectedEmployeeId = id;
  }

  setNav(index: number): void {
    this.activeNav = index;
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  employeeName(id: string): string {
    const employee = this.employees.find((e) => e.id === id);
    return employee ? employee.name : id;
  }

  updateTardinessData(points: TardinessPoint[]): void {
    if (points.length < 2) {
      return;
    }

    const target = points.map((point) => ({
      ...point,
      value: Math.min(8, Math.max(0, Number(point.value) || 0)),
    }));
    const source = this.displayedTardinessPoints;
    this.tardinessPoints = target;

    if (typeof requestAnimationFrame === 'undefined') {
      this.displayedTardinessPoints = target;
      return;
    }

    if (this.chartAnimationFrame !== undefined) {
      cancelAnimationFrame(this.chartAnimationFrame);
    }

    const startedAt = performance.now();
    const duration = 550;

    const animate = (now: number): void => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const frame = target.map((point, index) => {
        const sourcePoint = source[index];
        const initialValue = sourcePoint != null ? sourcePoint.value : point.value;
        return {
          ...point,
          value: initialValue + (point.value - initialValue) * eased,
        };
      });

      this.displayedTardinessPoints = frame;
      if (progress < 1) {
        this.chartAnimationFrame = requestAnimationFrame(animate);
      } else {
        this.chartAnimationFrame = undefined;
      }
    };

    this.chartAnimationFrame = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    if (this.chartAnimationFrame !== undefined) {
      cancelAnimationFrame(this.chartAnimationFrame);
    }
  }

  trackByEmployeeId(_index: number, emp: Employee): string {
    return emp.id;
  }

  trackByGroupDate(_index: number, group: TimeLogGroup): string {
    return group.date;
  }

  trackByEntryId(_index: number, entry: TimeLogEntry): string {
    return entry.id;
  }

  trackByTick(_index: number, y: number): number {
    return y;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByDay(_index: number, p: TardinessPoint): string {
    return p.day;
  }

  private buildChartPaths(): { line: string; area: string; dots: { x: number; y: number }[] } {
    const points = this.displayedTardinessPoints;
    const w = 360;
    const h = 240;
    const padL = 34;
    const padR = 10;
    const padT = 18;
    const padB = 42;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;
    const maxY = 8;

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
