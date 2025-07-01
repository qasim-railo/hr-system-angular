import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Employee } from '../../../core/models/employee.model';
import { GratuityReportDto } from '../../../core/models/gratuity-report.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { GratuityReportService } from '../../../core/services/gratuity-report.service';

@Component({
  selector: 'app-gratuity-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './gratuity-report.component.html'
})
export class GratuityReportComponent implements OnInit {
  employees: Employee[] = [];
  report: GratuityReportDto | null = null;
  loading = false;

  form: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private gratuityService: GratuityReportService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      employeeId: [null]
    });
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
    });

    this.form.get('employeeId')?.valueChanges.subscribe(empId => {
      if (empId) {
        this.fetchReport(empId);
      }
    });
  }

  fetchReport(employeeId: number): void {
    this.loading = true;
    this.report = null;
    this.gratuityService.getByEmployeeId(employeeId).subscribe({
      next: data => {
        this.report = data;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to fetch gratuity report', err);
        this.loading = false;
      }
    });
  }
}
