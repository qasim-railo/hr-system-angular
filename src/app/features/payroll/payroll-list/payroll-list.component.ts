import { Component, EventEmitter, Input, Output } from '@angular/core';
import { saveAs } from 'file-saver';
import { PayrollDto } from '../../../core/models/payroll.model';
import { PayrollService } from '../../../core/services/payroll.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-payroll-list',
  standalone: true,
  imports: [...MATERIAL_UI_MODULES,],
  templateUrl: './payroll-list.component.html',
  styleUrl: './payroll-list.component.scss'
})
export class PayrollListComponent {
  @Input() payrolls: PayrollDto[] = [];
  @Output() refresh = new EventEmitter<void>();
displayedColumns: string[] = [
  'employeeId',
  'basicSalary',
  'ot1Amount',
  'ot2Amount',
  'deductions',
  'netSalary',
  'isApproved',
  'actions'
];

  constructor(private payrollService: PayrollService, private alertService: AlertService) {}

  approve(payrollId: number): void {
    this.payrollService.approvePayroll(payrollId).subscribe({
      next: () => {
        this.alertService.success('Payroll approved successfully');
        this.refresh.emit();
      },
      error: err => {
        console.error('Approval failed', err);
        this.alertService.error('Failed to approve payroll');
      }
    });
  }

  downloadPayslip(payrollId: number): void {
    this.payrollService.getPayslip(payrollId).subscribe({
      next: blob => {
        saveAs(blob, `Payslip-${payrollId}.pdf`);
        this.alertService.success('Payslip downloaded successfully');
      },
      error: err => {
        console.error('Download failed', err);
        this.alertService.error('Failed to download payslip');
      }
    });
  }
}

