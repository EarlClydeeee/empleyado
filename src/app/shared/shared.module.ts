import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ExpectedStaff } from './expected-staff/expected-staff';
import { DashboardMetricCard } from './dashboard-metric-card/dashboard-metric-card';
import { DepartmentBreakdown } from './department-breakdown/department-breakdown';
import { HorizontalBarChart } from './horizontal-bar-chart/horizontal-bar-chart';
import { PageHeader } from './page-header/page-header';
import { MetricStats } from './metric-stats/metric-stats';

@NgModule({
  declarations: [
    ExpectedStaff,
    DashboardMetricCard,
    DepartmentBreakdown,
    HorizontalBarChart,
    PageHeader,
    MetricStats,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ExpectedStaff,
    DashboardMetricCard,
    DepartmentBreakdown,
    HorizontalBarChart,
    PageHeader,
    MetricStats,
  ],
})
export class SharedModule {}
