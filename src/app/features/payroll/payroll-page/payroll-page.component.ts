import { Component, OnInit } from '@angular/core';  
import { PayrollDto } from '../../../core/models/payroll.model';
import { PayrollService } from '../../../core/services/payroll.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { PayrollListComponent } from '../payroll-list/payroll-list.component';

@Component({
  selector: 'app-payroll-page',
  standalone: true,
  imports: [...MATERIAL_UI_MODULES,PayrollListComponent],
  templateUrl: './payroll-page.component.html',
  styleUrl: './payroll-page.component.scss'
})


 
export class PayrollPageComponent implements OnInit {
  payrolls: PayrollDto[] = [];
  selectedMonth: string;
  selectedYear: number;

  constructor(private payrollService: PayrollService) {
    const now = new Date();
    this.selectedMonth = (now.getMonth() + 1).toString().padStart(2, '0');
    this.selectedYear = now.getFullYear();
  }

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.payrollService.getPayrolls(this.selectedYear, +this.selectedMonth).subscribe({
      next: data => this.payrolls = data,
      error: err => console.error('Failed to load payrolls', err)
    });
  }

  onMonthChange(): void {
    this.loadPayrolls();
  }

  exportPayroll(): void {
    this.payrollService.exportPayroll(this.selectedYear, +this.selectedMonth).subscribe(blob => {
      const fileName = `Payroll-${this.selectedYear}-${this.selectedMonth}.xlsx`;
      // saveAs(blob, fileName);
    });
  }
}
