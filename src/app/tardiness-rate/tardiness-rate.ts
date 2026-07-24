import { Component } from '@angular/core';
import { MetricStat } from '../shared/metric-stats/metric-stats';
import { BarChartItem } from '../shared/horizontal-bar-chart/horizontal-bar-chart';
import { BreakdownColumn } from '../shared/department-breakdown/department-breakdown';

@Component({
  selector: 'app-tardiness-rate',
  templateUrl: './tardiness-rate.html',
  styleUrls: ['./tardiness-rate.scss'],
})
export class TardinessRatePage {
  readonly stats: MetricStat[] = [
    { label: 'Tardiness Rate', value: '6.7%' },
    { label: 'Late Employees', value: '8' },
    { label: 'Average Delay', value: '8 Mins' },
  ];

  readonly chartItems: BarChartItem[] = [
    { label: 'Fabrication', value: 20 },
    { label: 'Assembly', value: 16 },
    { label: 'Technical', value: 14 },
    { label: 'Finishing', value: 11 },
    { label: 'Maintenance', value: 10 },
    { label: 'CPPA', value: 8 },
    { label: 'NPI/CI', value: 6 },
  ];

  readonly columns: BreakdownColumn[] = [
    { key: 'department', label: 'Department' },
    { key: 'employees', label: 'Employees', align: 'center' },
    { key: 'late', label: 'Late Employees', align: 'center' },
    { key: 'rate', label: 'Rate', align: 'center' },
  ];

  readonly rows: Record<string, string | number>[] = [
    { department: 'Fabrication', employees: 20, late: 1, rate: '5.0%' },
    { department: 'Assembly', employees: 18, late: 2, rate: '11.1%' },
    { department: 'Technical', employees: 22, late: 2, rate: '9.1%' },
    { department: 'Finishing', employees: 15, late: 1, rate: '6.7%' },
    { department: 'Maint', employees: 16, late: 1, rate: '6.3%' },
    { department: 'CPPA', employees: 17, late: 1, rate: '5.9%' },
    { department: 'NOI/CI', employees: 12, late: 0, rate: '0.0%' },
  ];
}
