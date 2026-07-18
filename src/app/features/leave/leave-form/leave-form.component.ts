import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { LeaveRequestService } from '../../../core/services/leave-request.service';
import { LeaveRequestDto } from '../../../core/models/leave-request.model';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss'],
  imports: [
    ...MATERIAL_UI_MODULES
  ]
})
export class LeaveFormComponent implements OnInit {
  form: FormGroup;
  employees: Employee[] = [];
  leaveTypes = ['Annual', 'Sick', 'Emergency', 'Unpaid'];

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveRequestService,
    private employeeService: EmployeeService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: (data) => this.employees = data,
      error: (err) => {
        console.error('Failed to load employees', err);
        this.alertService.error('Failed to load employees');
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.alertService.error('Please fill all required fields');
      return;
    }

    const request: LeaveRequestDto = this.form.value;
    this.leaveService.create(request).subscribe({
      next: () => {
        this.alertService.success('Leave request submitted successfully');
        this.router.navigate(['/leaves']);
      },
      error: err => {
        console.error('Failed to apply leave', err);
        this.alertService.error('Failed to apply leave');
      }
    });
  }
}
