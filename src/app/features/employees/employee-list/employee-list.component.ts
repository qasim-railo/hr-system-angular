import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { NgIf, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Company } from '../../../core/models/company.model';
import { Department } from '../../../core/models/department.model';
import { CompanyService } from '../../../core/services/company.service';
import { DepartmentService } from '../../departments/services/department.service';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    NgFor,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'photo',
    'employeeId',
    'fullName',
    'companyName',
    'departmentName',
    'designation',
    'category',
    'joiningDate',
    'status',
    'actions'
  ];
  dataSource = new MatTableDataSource<any>([]);
  totalCount = 0;
  pageSize = 10;
  pageIndex = 0;
  sortBy = 'employeeId';
  sortDirection: 'asc' | 'desc' = 'asc';
  companies: Company[] = [];
  departments: Department[] = [];
  categories = [
    { value: 'Staff', label: 'Staff' },
    { value: 'Labor', label: 'Labor' }
  ];
  statusOptions = [
    { value: 0, label: 'Draft' },
    { value: 1, label: 'PreJoining' },
    { value: 2, label: 'Active' },
    { value: 3, label: 'Probation' },
    { value: 4, label: 'OnLeave' },
    { value: 5, label: 'Suspended' },
    { value: 6, label: 'NoticePeriod' },
    { value: 7, label: 'Resigned' },
    { value: 8, label: 'Terminated' },
    { value: 9, label: 'ContractCompleted' },
    { value: 10, label: 'Archived' }
  ];

  filterForm = this.fb.group({
    search: [''],
    statuses: [[] as number[]],
    companyIds: [[] as number[]],
    departmentIds: [[] as number[]],
    category: [''],
    joiningDateFrom: [null as Date | null],
    joiningDateTo: [null as Date | null]
  });

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private departmentService: DepartmentService,
    public localization: LocalizationService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.loadEmployees();

    this.filterForm.get('companyIds')?.valueChanges.subscribe((companyIds) => {
      this.loadDepartmentsForCompanies((companyIds as number[]) || []);
    });
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  loadDepartmentsForCompanies(companyIds: number[]): void {
    if (!companyIds || companyIds.length === 0) {
      this.departments = [];
      return;
    }

    const departmentRequests = companyIds.map((companyId) =>
      this.departmentService.getDepartmentsByCompanyId(companyId)
    );

    forkJoin(departmentRequests).subscribe({
      next: (results) => {
        const departments = results.flat();
        const unique = new Map<number, Department>();
        departments.forEach((d) => {
          if (d?.departmentId) {
            unique.set(d.departmentId, d);
          }
        });
        this.departments = Array.from(unique.values());
      },
      error: () => {
        this.departments = [];
      }
    });
  }

  loadEmployees(): void {
    const filter = this.buildFilter();
    this.employeeService.getList(filter).subscribe((res: any) => {
      this.dataSource.data = res.items || [];
      this.totalCount = res.total ?? 0;
    });
  }

  private buildFilter(): any {
    const values = this.filterForm.value as {
      search: string;
      statuses: number[];
      companyIds: number[];
      departmentIds: number[];
      category: string;
      joiningDateFrom: Date | null;
      joiningDateTo: Date | null;
    };
    const filter: any = {
      pageNumber: this.pageIndex + 1,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection
    };

    if (values.search?.trim()) {
      filter.search = values.search.trim();
    }
    if (values.statuses?.length) {
      filter.statuses = values.statuses;
    }
    if (values.companyIds?.length) {
      filter.companyIds = values.companyIds;
    }
    if (values.departmentIds?.length) {
      filter.departmentIds = values.departmentIds;
    }
    if (values.category) {
      filter.category = values.category;
    }
    if (values.joiningDateFrom) {
      filter.joiningDateFrom = this.toIsoDate(values.joiningDateFrom);
    }
    if (values.joiningDateTo) {
      filter.joiningDateTo = this.toIsoDate(values.joiningDateTo);
    }

    return filter;
  }

  private toIsoDate(value: any): string {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }

  applyFilter(): void {
    this.pageIndex = 0;
    this.loadEmployees();
  }

  clearFilters(): void {
    this.filterForm.reset({
      search: '',
      statuses: [] as number[],
      companyIds: [] as number[],
      departmentIds: [] as number[],
      category: '',
      joiningDateFrom: null,
      joiningDateTo: null
    });
    this.departments = [];
    this.pageIndex = 0;
    this.sortBy = 'employeeId';
    this.sortDirection = 'asc';
    this.loadEmployees();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEmployees();
  }

  onSortChange(sortState: Sort): void {
    if (!sortState.active || sortState.direction === '') {
      this.sortBy = 'employeeId';
      this.sortDirection = 'asc';
    } else {
      this.sortBy = sortState.active;
      this.sortDirection = sortState.direction as 'asc' | 'desc';
    }
    this.pageIndex = 0;
    this.loadEmployees();
  }

  getStatusLabel(value: number): string {
    const found = this.statusOptions.find((option) => option.value === value);
    return found ? found.label : 'Unknown';
  }
}
