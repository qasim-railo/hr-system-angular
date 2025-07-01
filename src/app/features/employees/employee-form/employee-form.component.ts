import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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


  onSubmit() {
    console.log(this.form.value)
    if (this.form.invalid) return;

    var employee: Employee = this.form.value;

    if (this.isEditMode) {
      this.employeeService.update(this.employeeId, employee).subscribe(() => {
        this.alertService.success('Updated successful'),

          this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.create(employee).subscribe(() => {
        // console.log(employee)
        this.alertService.success('Added successful'),

          this.router.navigate(['/employees']);
      });
    }
  }
}
