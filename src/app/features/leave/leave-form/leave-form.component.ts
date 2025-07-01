import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { LeaveRequestService } from '../../../core/services/leave-request.service';
import { LeaveRequestDto } from '../../../core/models/leave-request.model';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss'],
  imports: [
    ...MATERIAL_UI_MODULES
  ]
})
export class LeaveFormComponent {
  form: FormGroup;
 employees: Employee[] = [];
  leaveTypes = ['Annual', 'Sick', 'Emergency', 'Unpaid'];

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveRequestService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],  // You can default this if employee is pre-known
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Failed to load employees', err)
    });
  }
  onSubmit(): void {
    if (this.form.invalid) return;

    const request: LeaveRequestDto = this.form.value;
    this.leaveService.create(request).subscribe({
      next: () => this.router.navigate(['/leaves']),
      error: err => console.error('Failed to apply leave', err)
    });
  }
}
