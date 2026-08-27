import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';

@Component({
  standalone: true,
  selector: 'app-employee-profile',
  imports: [CommonModule, RouterModule, ...MATERIAL_UI_MODULES],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent implements OnInit {
  employee?: Employee;
  profile: any;
  employeeId = 0;
  error = '';
  tabs = [
    { label: 'Overview', route: 'overview' }, { label: 'Personal', route: 'personal' },
    { label: 'Employment', route: 'employment' }, { label: 'Salary', route: 'salary' },
    { label: 'Documents', route: 'documents' }, { label: 'Attendance', route: 'attendance' },
    { label: 'Leave', route: 'leave' }, { label: 'Payroll', route: 'payroll' },
    { label: 'Loans', route: 'loans' }, { label: 'Assets', route: 'assets' },
    { label: 'History', route: 'history' }, { label: 'Final Settlement', route: 'final-settlement' }
  ];
  constructor(private route: ActivatedRoute, private employees: EmployeeService) {}
  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employees.getProfile(this.employeeId).subscribe({
      next: profile => { this.profile = profile; this.employee = profile.employee; },
      error: err => this.error = err?.error?.message || 'Unable to load employee.'
    });
  }
}
