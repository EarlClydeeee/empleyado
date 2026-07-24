import { Component } from '@angular/core';
import { PageHeader } from '../shared/page-header/page-header';
import { MetricStats, MetricStat } from '../shared/metric-stats/metric-stats';
import { HorizontalBarChart, BarChartItem } from '../shared/horizontal-bar-chart/horizontal-bar-chart';
import { DepartmentBreakdown, BreakdownColumn } from '../shared/department-breakdown/department-breakdown';

@Component({
  selector: 'app-attendance-rate',
  templateUrl: './attendance-rate.html',
  styleUrls: ['./attendance-rate.scss'],
})
export class AttendanceRatePage {
  readonly stats: MetricStat[] = [
    { label: 'Attendance Rate', value: '92.5%' },
    { label: 'Present Employees', value: '111' },
    { label: 'Absent Employees', value: '9' },
  ];

  readonly chartItems: BarChartItem[] = [
    { label: 'Fabrication', value: 95 },
    { label: 'Assembly', value: 90 },
    { label: 'Technical', value: 85 },
    { label: 'Finishing', value: 78 },
    { label: 'Maintenance', value: 72 },
  ];

  readonly columns: BreakdownColumn[] = [
    { key: 'department', label: 'Department' },
    { key: 'employees', label: 'Employees', align: 'center' },
    { key: 'present', label: 'Present', align: 'center' },
    { key: 'absent', label: 'Absent', align: 'center' },
    { key: 'rate', label: 'Rate', align: 'center' },
  ];

  readonly rows: Record<string, string | number>[] = [
    { department: 'Fabrication', employees: 20, present: 19, absent: 1, rate: '95.0%' },
    { department: 'Assembly', employees: 18, present: 17, absent: 1, rate: '94.4%' },
    { department: 'Technical', employees: 22, present: 20, absent: 2, rate: '90.9%' },
    { department: 'Finishing', employees: 15, present: 14, absent: 1, rate: '93.3%' },
    { department: 'Maint', employees: 16, present: 14, absent: 2, rate: '87.5%' },
    { department: 'CPPA', employees: 17, present: 16, absent: 1, rate: '94.1%' },
    { department: 'NOI/CI', employees: 12, present: 11, absent: 1, rate: '91.7%' },
  ];
}
