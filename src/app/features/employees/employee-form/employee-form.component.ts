import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DuplicateOverrideDialogComponent } from '../duplicate-override-dialog.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../../../core/models/employee.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { CompanyService } from '../../../core/services/company.service';
import { Department } from '../../../core/models/department.model';
import { Company } from '../../../core/models/company.model';
import { DepartmentService } from '../../departments/services/department.service';
import { AlertService } from '../../../core/services/alert.service';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
    , ...MATERIAL_UI_MODULES
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  private companyService = inject(CompanyService);
  private departmentService = inject(DepartmentService);
  private employeeService = inject(EmployeeService);
  private alertService = inject(AlertService);
  private dialog = inject(MatDialog);

  companies: Company[] = [];
  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  form: FormGroup = this.fb.group({
    companyId: [null, Validators.required],
    departmentId: [null, Validators.required],
    employeeCode: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: [''],
    nationality: [''],
    motherName: [''],
    homeCountryAddress: [''],
    homeCountryPhone: [''],
    emergencyContactName: ['', Validators.required],
    emergencyPhone: [''],
    email: ['', [Validators.required, Validators.email]],
    passportNumber: ['', Validators.required],
    passportExpiry: [''],
    passportCountry: [''],
    photoPath: ['']
  });

  isEditMode = false;
  employeeId!: number;

  ngOnInit() {

    // Load all companies
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    });

    // Load departments when companyId changes
    this.form.get('companyId')?.valueChanges.subscribe(companyId => {
      this.loadDepartments(companyId);
    });

    // Edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.employeeService.getById(this.employeeId).subscribe((emp: Employee) => {
        emp.dateOfBirth = this.formatDate(emp.dateOfBirth);
        emp.passportExpiry = this.formatDate(emp.passportExpiry!);
        this.form.patchValue(emp);
        // Load departments of the employee's company
        this.loadDepartments(emp.companyId);
      });
    }
  }
  loadDepartments(companyId: number) {
    this.departmentService.getDepartmentsByCompanyId(companyId).subscribe((data: any) => {
      this.departments = data;
    });
  } formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // returns yyyy-MM-dd
  }


  private getTokenPayload(): any {
    try {
      const raw = localStorage.getItem('jwt');
      if (!raw) return null;
      const parts = raw.split('.');
      if (parts.length < 2) return null;
      const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  canCurrentUserOverride(): boolean {
    const p = this.getTokenPayload();
    if (!p) return false;
    // look for role claim
    if (p && (p.role === 'Admin' || (p.roles && p.roles.indexOf('Admin') !== -1))) return true;
    if (p && (p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin')) return true;
    return false;
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.form.invalid) return;

    var employee: Employee = this.form.value;

    if (this.isEditMode) {
      this.employeeService.update(this.employeeId, employee).subscribe(() => {
        this.alertService.success('Updated successful');
        this.router.navigate(['/employees']);
      });
    } else {
      // Before creating, run duplicate check
      const payload = {
        passportNumber: employee.passportNumber,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
        dateOfBirth: employee.dateOfBirth
      };

      this.employeeService.duplicateCheck(payload).subscribe((dup: any) => {
        if (dup && dup.hasPotentialDuplicates) {
          // Open override dialog
          const canOverride = this.canCurrentUserOverride();
          const dialogRef = this.dialog.open(DuplicateOverrideDialogComponent, { data: { matches: dup.candidates || dup.candidates, canOverride } });
          dialogRef.afterClosed().subscribe((res: any) => {
            if (!res) return;
            if (res.action === 'open') {
              // Open existing employee
              this.router.navigate(['/employees', res.id]);
              return;
            }
            if (res.action === 'override') {
              // Call create with override header
              this.employeeService.createWithOverride(employee, res.reason).subscribe(() => {
                this.alertService.success('Added successful (override)');
                this.router.navigate(['/employees']);
              }, err => {
                this.alertService.error('Error creating employee: ' + (err.error?.message || err.message));
              });
            }
            // otherwise canceled
          });

          return;
        }

        this.employeeService.create(employee).subscribe(() => {
          this.alertService.success('Added successful');
          this.router.navigate(['/employees']);
        });
      });
    }
  }
}
