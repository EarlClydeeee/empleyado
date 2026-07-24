import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { SharedModule } from './shared/shared.module';
import { Dashboard } from './dashboard/dashboard';
import { LateEmployees } from './late-employees/late-employees';
import { EmployeesOnLeave } from './employees-on-leave/employees-on-leave';
import { AttendanceRatePage } from './attendance-rate/attendance-rate';
import { TardinessRatePage } from './tardiness-rate/tardiness-rate';

@NgModule({
  declarations: [
    App,
    Dashboard,
    LateEmployees,
    EmployeesOnLeave,
    AttendanceRatePage,
    TardinessRatePage,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  bootstrap: [App],
})
export class AppModule {}
