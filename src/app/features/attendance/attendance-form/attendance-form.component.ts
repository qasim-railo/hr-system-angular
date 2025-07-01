import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../../core/services/attendance.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { Attendance } from '../../../core/models/attendance.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';

@Component({
  selector: 'app-attendance-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './attendance-form.component.html',
})
export class AttendanceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private attendanceService = inject(AttendanceService);
  private employeeService = inject(EmployeeService);

  @Input() employeeId!: number;   // <-- This is required for the binding to work
  @Output() saved = new EventEmitter<void>();
  employees: Employee[] = [];
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      date: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      ot1: [0, Validators.required],
      ot2: [0, Validators.required],
    });

    this.employeeService.getAll().subscribe((res) => (this.employees = res));
  }

  onSubmit() {
    if (this.form.invalid) return;
    const attendance: Attendance = this.form.value;
    this.attendanceService.create(attendance).subscribe(() => {
      this.form.reset();
    });
  }
}
