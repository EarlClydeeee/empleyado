import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { LateEmployees } from './late-employees/late-employees';
import { EmployeesOnLeave } from './employees-on-leave/employees-on-leave';
import { AttendanceRatePage } from './attendance-rate/attendance-rate';
import { TardinessRatePage } from './tardiness-rate/tardiness-rate';

const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'late-employees', component: LateEmployees },
  { path: 'employees-on-leave', component: EmployeesOnLeave },
  { path: 'attendance-rate', component: AttendanceRatePage },
  { path: 'tardiness-rate', component: TardinessRatePage },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
