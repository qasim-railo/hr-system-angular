import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsYouType, CountryCode, getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import { AlertService } from '../../../core/services/alert.service';
import { CompanyService } from '../../../core/services/company.service';
import { CustomFieldDefinition, CustomFieldService } from '../../../core/services/custom-field.service';
import { EmployeeService, InitialEmployee } from '../../../core/services/employee.service';
import { TenantAdminService, Designation, EmployeeCategory } from '../../../core/services/tenant-admin.service';
import { Company } from '../../../core/models/company.model';
import { Department } from '../../../core/models/department.model';
import { DepartmentService } from '../../departments/services/department.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  private readonly companyService = inject(CompanyService);
  private readonly departmentService = inject(DepartmentService);
  private readonly employeeService = inject(EmployeeService);
  private readonly alertService = inject(AlertService);
  private readonly customFieldService = inject(CustomFieldService);
  private readonly tenantAdminService = inject(TenantAdminService);

  companies: Company[] = [];
  departments: Department[] = [];
  readonly nationalities = getCountries()
    .map(code => ({
      code,
      name: new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
  readonly phoneCountries = this.nationalities.map(country => ({
    ...country,
    dialCode: this.dialCode(country.code)
  }));
  categories: EmployeeCategory[] = [];
  designations: Designation[] = [];
  customFields: CustomFieldDefinition[] = [];
  customFieldValues: Record<string, string> = {};
  isEditMode = false;
  employeeId?: number;

  readonly form = inject(FormBuilder).group({
    companyId: [null as number | null, Validators.required],
    departmentId: [null as number | null, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneCountry: ['QA'],
    phone: ['', Validators.required],
    nationality: ['', Validators.required],
    employeeCategoryId: [null as number | null, Validators.required],
    designationId: [null as number | null, Validators.required]
  });

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data => this.companies = data);
    this.tenantAdminService.getEmployeeCategories().subscribe(data => this.categories = data.filter(item => item.isActive));
    this.tenantAdminService.getDesignations().subscribe(data => this.designations = data.filter(item => item.isActive));
    this.customFieldService.getDefinitions(false).subscribe(data => this.customFields = data);
    this.form.controls.companyId.valueChanges.subscribe(companyId => {
      this.departments = [];
      this.form.controls.departmentId.setValue(null);
      if (companyId) this.loadDepartments(companyId);
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.isEditMode = true;
    this.employeeId = id;
    this.employeeService.getProfile(id).subscribe({
      next: profile => {
        const employee = profile.employee;
        this.form.patchValue({
          companyId: employee.companyId,
          departmentId: employee.departmentId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.homeCountryPhone,
          nationality: employee.nationality,
          employeeCategoryId: profile.employment?.employeeCategoryId,
          designationId: profile.employment?.designationId
        });
        this.customFieldValues = Object.fromEntries(
          (profile.customFields ?? []).map((value: { key: string; value: string }) => [value.key, value.value])
        );
        this.loadDepartments(employee.companyId);
      },
      error: error => this.alertService.error(error.error?.message || 'Unable to load employee.')
    });
  }

  get filteredDesignations(): Designation[] {
    const departmentId = this.form.controls.departmentId.value;
    const categoryId = this.form.controls.employeeCategoryId.value;
    return this.designations.filter(item =>
      (!item.departmentId || item.departmentId === departmentId) &&
      (!item.employeeCategoryId || item.employeeCategoryId === categoryId));
  }

  get selectedDialCode(): string {
    return this.dialCode(this.form.controls.phoneCountry.value);
  }

  dialCode(countryCode: string | null): string {
    return countryCode ? `+${getCountryCallingCode(countryCode as CountryCode)}` : '';
  }

  setCustomFieldBoolean(key: string, event: Event): void {
    this.customFieldValues[key] = (event.target as HTMLInputElement).checked ? 'true' : 'false';
  }

  formatPhone(): void {
    const countryCode = this.form.controls.phoneCountry.value;
    const phone = this.form.controls.phone.value;
    if (!countryCode || !phone) return;
    this.form.controls.phone.setValue(new AsYouType(countryCode as CountryCode).input(phone), { emitEvent: false });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const phone = parsePhoneNumberFromString(value.phone ?? '', value.phoneCountry as CountryCode);
    if (!phone?.isValid()) {
      this.alertService.error('Enter a valid phone number for the selected country code.');
      return;
    }

    const employee: InitialEmployee = {
      companyId: value.companyId!,
      departmentId: value.departmentId!,
      firstName: value.firstName ?? '',
      lastName: value.lastName ?? '',
      email: value.email ?? '',
      phone: phone.number,
      nationality: value.nationality ?? '',
      employeeCategoryId: value.employeeCategoryId!,
      designationId: value.designationId!,
      customFields: this.customFieldValues
    };
    const request = this.isEditMode
      ? this.employeeService.updateInitial(this.employeeId!, employee)
      : this.employeeService.createInitial(employee);

    request.subscribe({
      next: () => {
        this.alertService.success(this.isEditMode ? 'Employee updated.' : 'Employee draft created.');
        this.router.navigate(['/employees']);
      },
      error: error => this.alertService.error('Error saving employee: ' + (error.error?.message || error.error || error.message))
    });
  }

  private loadDepartments(companyId: number): void {
    this.departmentService.getDepartmentsByCompanyId(companyId).subscribe(data => this.departments = data);
  }
}
