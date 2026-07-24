import { Component } from '@angular/core';
import { HorizontalBarChart, BarChartItem } from '../shared/horizontal-bar-chart/horizontal-bar-chart';
import { DepartmentBreakdown, BreakdownColumn } from '../shared/department-breakdown/department-breakdown';

@Component({
  selector: 'app-employees-on-leave',
  templateUrl: './employees-on-leave.html',
  styleUrls: ['./employees-on-leave.scss'],
})
export class EmployeesOnLeave {
  readonly chartItems: BarChartItem[] = [
    { label: 'Fabrication', value: 20 },
    { label: 'Assembly', value: 15 },
    { label: 'Technical', value: 14 },
    { label: 'Finishing', value: 10 },
    { label: 'Maintenance', value: 11 },
    { label: 'CPPA', value: 8 },
    { label: 'NPI/CI', value: 7 },
  ];

  readonly columns: BreakdownColumn[] = [
    { key: 'department', label: 'Department' },
    { key: 'onLeave', label: 'Employees on Leave', align: 'center' },
  ];

  readonly rows: Record<string, string | number>[] = [
    { department: 'Fabrication', onLeave: 5 },
    { department: 'Assembly', onLeave: 5 },
    { department: 'Technical', onLeave: 5 },
    { department: 'Finishing', onLeave: 5 },
    { department: 'Maint', onLeave: 5 },
    { department: 'CPPA', onLeave: 5 },
    { department: 'NOI/CI', onLeave: 5 },
  ];
}
