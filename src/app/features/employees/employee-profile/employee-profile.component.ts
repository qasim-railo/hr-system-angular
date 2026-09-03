import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';

@Component({
  standalone: true,
  selector: 'app-employee-profile',
  imports: [CommonModule, FormsModule, RouterModule, ...MATERIAL_UI_MODULES],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent implements OnInit {
  employee?: Employee;
  profile: any;
  employeeId = 0;
  error = '';
  approvalWorkflows: { id: number; name: string; requestType: string }[] = [];
  workflowId?: number;
  tabs = [
    { label: 'Overview', route: 'overview' }, { label: 'Personal', route: 'personal' },
    { label: 'Employment', route: 'employment' }, { label: 'Salary', route: 'salary' },
    { label: 'Documents', route: 'documents' }, { label: 'Attendance', route: 'attendance' },
    { label: 'Leave', route: 'leave' }, { label: 'Payroll', route: 'payroll' },
    { label: 'Loans', route: 'loans' }, { label: 'Assets', route: 'assets' },
    { label: 'History', route: 'history' }, { label: 'Final Settlement', route: 'final-settlement' }
  ];
  constructor(private route: ActivatedRoute, private employees: EmployeeService) {}
  customFieldValue(key: string): string | null {
    return this.profile?.customFields?.find((value: { key: string }) => value.key === key)?.value || null;
  }
  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employees.getProfile(this.employeeId).subscribe({
      next: profile => {
        this.profile = profile;
        this.employee = profile.employee;
        if (this.employee?.recordStatus === 0) this.loadApprovalWorkflows();
      },
      error: err => this.error = err?.error?.message || 'Unable to load employee.'
    });
  }
  loadApprovalWorkflows(): void {
    this.employees.getApprovalWorkflows().subscribe({ next: workflows => this.approvalWorkflows = workflows, error: err => this.error = err?.error?.message || 'Unable to load approval workflows.' });
  }
  submitForApproval(): void {
    if (!this.workflowId || !this.employee) return;
    this.employees.submitForApproval(this.employee.employeeId!, this.workflowId).subscribe({
      next: () => { if (this.employee) this.employee.recordStatus = 1; this.approvalWorkflows = []; },
      error: err => this.error = err?.error?.message || 'Unable to submit employee for approval.'
    });
  }
}
