import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { ResponsesComponent } from './responses/responses.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'reports',    component: ReportsComponent },
  { path: 'responses',  component: ResponsesComponent },
  { path: 'help',       component: HelpComponent },
  { path: '',     redirectTo: '/dashboard', pathMatch:'full' },
  { path: '**',   redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }