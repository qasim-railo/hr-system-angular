import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const platformAdminScopeGuard: CanActivateChildFn = (_, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.hasPermission('Platform.Tenants')) {
    return state.url.startsWith('/platform-admin') || state.url.startsWith('/support')
      ? true
      : router.parseUrl('/platform-admin');
  }

  const permission = getRequiredPermission(state.url);
  if (!permission || auth.hasPermission(permission)) {
    return true;
  }

  if (state.url.startsWith('/manager-portal') && auth.hasRole('Manager')) {
    return true;
  }

  return router.parseUrl('/my-workspace');
};

function getRequiredPermission(url: string): string | undefined {
  if (url.startsWith('/employees/add')) {
    return 'Employees.Create';
  }

  if (
    url.startsWith('/employees/edit') ||
    url.startsWith('/employees/employment-details') ||
    url.startsWith('/employees/employment-detail-view')
  ) {
    return 'Employees.Edit';
  }

  if (url.startsWith('/documents/upload')) {
    return 'Files.Upload';
  }

  if (url.startsWith('/dashboard') || url.startsWith('/employees') || url.startsWith('/profile')) {
    return 'Employees.View';
  }

  if (url.startsWith('/documents')) {
    return 'Files.View';
  }

  if (url.startsWith('/imports')) {
    return 'Employees.Create';
  }

  if (url.startsWith('/exports')) {
    return 'Employees.Export';
  }

  if (
    url.startsWith('/notifications') ||
    url.startsWith('/audit') ||
    url.startsWith('/recycle-bin') ||
    url.startsWith('/companies') ||
    url.startsWith('/departments') ||
    url.startsWith('/assets') ||
    url.startsWith('/employee-assets') ||
    url.startsWith('/shifts') ||
    url.startsWith('/employee-shift') ||
    url.startsWith('/attendance') ||
    url.startsWith('/payroll') ||
    url.startsWith('/leaves') ||
    url.startsWith('/final-settlement') ||
    url.startsWith('/gratuity-report') ||
    url.startsWith('/reports') ||
    url.startsWith('/increment-history') ||
    url.startsWith('/access-management') ||
    url.startsWith('/tenant-admin') ||
    url.startsWith('/organization') ||
    url.startsWith('/settings') ||
    url.startsWith('/integrations') ||
    url.startsWith('/numbering') ||
    url.startsWith('/payroll-components') ||
    url.startsWith('/overtime-policies') ||
    url.startsWith('/leave-policies') ||
    url.startsWith('/attendance-configuration')
  ) {
    return 'Users.Manage';
  }

  if (url.startsWith('/workflows')) {
    return 'Workflows.Manage';
  }

  if (url.startsWith('/manager-portal')) {
    return 'Manager';
  }

  return undefined;
}
