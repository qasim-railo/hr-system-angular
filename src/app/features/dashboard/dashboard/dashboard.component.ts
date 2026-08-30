import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { DashboardWidget } from '../../../core/models/dashboard-widget.model';
import { DashboardWidgetService } from '../../../core/services/dashboard-widget.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MATERIAL_UI_MODULES, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  widgets: DashboardWidget[] = [];
  readonly isAdministrator = this.auth.hasPermission('Users.Manage');
  readonly canViewEmployees = this.auth.hasPermission('Employees.View');
  readonly canCreateEmployees = this.auth.hasPermission('Employees.Create');
  readonly canViewDocuments = this.auth.hasPermission('Files.View');
  readonly canExportEmployees = this.auth.hasPermission('Employees.Export');

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly dashboardWidgetService: DashboardWidgetService
  ) { }

  ngOnInit(): void {
    const landingRoute = this.getRoleLandingRoute();
    if (landingRoute) {
      this.router.navigate([landingRoute]);
      return;
    }

    this.loadWidgets();
  }

  loadWidgets(): void {
    this.dashboardWidgetService.getWidgets().subscribe({
      next: result => this.widgets = result.widgets,
      error: () => this.widgets = []
    });
  }

  private getRoleLandingRoute(): string | undefined {
    if (this.auth.hasPermission('Platform.Tenants')) {
      return '/platform-admin';
    }

    if (this.auth.hasRole('Manager') && !this.isAdministrator) {
      return '/manager-portal';
    }

    if (this.auth.hasRole('Employee') && !this.canCreateEmployees) {
      return '/my-workspace';
    }

    return undefined;
  }
}