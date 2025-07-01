import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { AssetsListComponent } from './features/assets/assets-list/assets-list.component';
import { AssetsFormComponent } from './features/assets/assets-form/assets-form.component';

export const routes: Routes = [
  // Unprotected Auth Route
  { path: 'login', component: LoginComponent },

  // Protected Main Layout
  {
    path: '',
    component: MainLayoutComponent,
    // canActivateChild: [authGuard],
    children: [
      // Default Dashboard
      { path: 'dashboard', component: DashboardComponent },

      // Employees (Standalone Components)
      {
        path: 'employees',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/employees/employee-list/employee-list.component').then(
                m => m.EmployeeListComponent
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/employees/employee-form/employee-form.component').then(
                m => m.EmployeeFormComponent
              ),
          }, {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/employees/employee-form/employee-form.component').then(
                m => m.EmployeeFormComponent
              ),
          },
          {
            path: 'employment-details/:id',
            loadComponent: () =>
              import('./features/employment-details/employment-detail-form/employment-detail-form.component').then(
                m => m.EmploymentDetailFormComponent
              ),
          },
          {
            path: 'employment-detail-view/:id',
            loadComponent: () =>
              import('./features/employment-details/employment-detail-view/employment-detail-view.component').then(
                m => m.EmploymentDetailViewComponent
              ),
          },


        ]
      },




      // Companies
      {
        path: 'companies',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/companies/company-list/company-list.component').then(
                m => m.CompanyListComponent
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/companies/company-form/company-form.component').then(
                m => m.CompanyFormComponent
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/companies/company-form/company-form.component').then(
                m => m.CompanyFormComponent
              ),
          },
        ],
      },
      //Assets
      {
        path: 'assets',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/assets/assets-list/assets-list.component').then(
                m => m.AssetsListComponent
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/assets/assets-form/assets-form.component').then(
                m => m.AssetsFormComponent
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/assets/assets-form/assets-form.component').then(
                m => m.AssetsFormComponent
              ),
          }
        ]
      },
      // Departments
      {
        path: 'departments',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/departments/department-list/department-list.component').then(
                m => m.DepartmentListComponent
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/departments/department-form/department-form.component').then(
                m => m.DepartmentFormComponent
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/departments/department-form/department-form.component').then(
                m => m.DepartmentFormComponent
              ),
          },
        ],
      },
      //Docs
      {
        path: 'documents',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/employee-documents/document-upload-page/document-upload-page.component').then(
                m => m.DocumentUploadPageComponent
              ),
          },
          {
            path: 'upload',
            loadComponent: () =>
              import('./features/employee-documents/document-upload/document-upload.component').then(
                m => m.DocumentUploadComponent
              ),
          },
          {
            path: 'list/:employeeId',
            loadComponent: () =>
              import('./features/employee-documents/document-list/document-list.component').then(
                m => m.DocumentListComponent
              ),
          },
        ],
      },

      {
        path: 'shifts',
        children: [
          { path: '', loadComponent: () => import('./features/shifts/shift-list/shift-list.component').then(m => m.ShiftListComponent) },
          { path: 'add', loadComponent: () => import('./features/shifts/shift-form/shift-form.component').then(m => m.ShiftFormComponent) },
          { path: 'edit/:id', loadComponent: () => import('./features/shifts/shift-form/shift-form.component').then(m => m.ShiftFormComponent) }
        ]
      },
      {
        path: 'employee-shift',

        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/employee-shift/employee-shift-page/employee-shift-page.component').then(
                m => m.EmployeeShiftPageComponent
              ),
          },
          //   {
          //   path: '',
          //   loadComponent: () =>
          //     import('./features/employee-shift/employee-shift-list/employee-shift-list.component').then(
          //       m => m.EmployeeShiftListComponent
          //     ),
          // },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/employee-shift/employee-shift-form/employee-shift-form.component').then(
                m => m.EmployeeShiftFormComponent
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/employee-shift/employee-shift-form/employee-shift-form.component').then(
                m => m.EmployeeShiftFormComponent
              ),
          },
        ],
      },
      {
        path: 'attendance',
        loadComponent: () => import('./features/attendance/attendance-page/attendance-page.component').then(c => c.AttendancePageComponent)
      },

      {
        path: 'employee-assets',
        loadComponent: () =>
          import('./features/employee-assets/employee-asset-page/employee-asset-page.component').then(
            m => m.EmployeeAssetPageComponent
          ),
      },
      {
        path: 'payroll',
        loadComponent: () => import('./features/payroll/payroll-page/payroll-page.component')
          .then(m => m.PayrollPageComponent)
      },
      {
        path: 'leaves',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/leave/leave-page/leave-page.component').then(m => m.LeavePageComponent)
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/leave/leave-form/leave-form.component').then(m => m.LeaveFormComponent)
          }
        ]
      },
      {
        path: 'final-settlement',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/final-settlement/final-settlement-page/final-settlement-page.component').then(m => m.FinalSettlementPageComponent)
          },
          {
            path: 'generate',
            loadComponent: () =>
              import('./features/final-settlement/final-settlement-generate/final-settlement-generate.component').then(m => m.FinalSettlementGenerateComponent)
          }
        ]
      }

      , {
        path: 'gratuity-report',
        loadComponent: () =>
          import('./features/gratuity-report/gratuity-report/gratuity-report.component').then(m => m.GratuityReportComponent)
      },
      {
        path: 'increment-history',
        loadComponent: () =>
          import('./features/increment-history/increment-history-page/increment-history-page.component').then(
            m => m.IncrementHistoryPageComponent
          )
      }




      // 🔜 Add more modules here (Assets, Attendance, Payroll, etc.)
    ],
  },

  // Wildcard route - must be last
  { path: '**', redirectTo: 'login' },
];
