import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportService, ReportFilters } from '../../core/services/report.service';
import { EmployeeReport } from '../../core/models/report.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  private reports = inject(ReportService);
  filters: ReportFilters = {};
  rows: EmployeeReport[] = [];
  loading = false;
  error = '';

  run() {
    this.loading = true;
    this.error = '';
    this.reports.getEmployees(this.filters).subscribe({
      next: rows => { this.rows = rows; this.loading = false; },
      error: () => { this.error = 'Unable to load the employee report.'; this.loading = false; }
    });
  }

  export() {
    this.reports.exportEmployees(this.filters).subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'employee-report.xlsx';
        link.click();
        URL.revokeObjectURL(url);
      },
      error: () => this.error = 'You do not have permission to export this report.'
    });
  }
}
