import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeShiftService } from '../../../core/services/employee-shift.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ShiftService } from '../../../core/services/shift.service';
import { AlertService } from '../../../core/services/alert.service';
import { Employee } from '../../../core/models/employee.model';
import { Shift } from '../../../core/models/shift.model';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';

@Component({
  selector: 'app-employee-shift-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './employee-shift-form.component.html',
})
export class EmployeeShiftFormComponent implements OnInit {
  private employeeShiftService = inject(EmployeeShiftService);
  private employeeService = inject(EmployeeService);
  private shiftService = inject(ShiftService);
  private alertService = inject(AlertService);

  employees: Employee[] = [];
  shifts: Shift[] = [];

  isEditMode = false;
  employeeShiftId!: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  form: FormGroup = this.fb.group({
    employeeId: [null, Validators.required],
    shiftId: [null, Validators.required],
    date: ['', Validators.required],
  });

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(data => (this.employees = data));
    this.shiftService.getAll().subscribe(data => (this.shifts = data));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeShiftId = +id;
      this.employeeShiftService.getById(this.employeeShiftId).subscribe(data => {
        data.date = data.date.split('T')[0];
        this.form.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const model = this.form.value;

    if (this.isEditMode) {
      this.employeeShiftService.update(this.employeeShiftId, model).subscribe(() => {
        this.alertService.success('Shift updated successfully');
        this.router.navigate(['/employee-shift']);
      });
    } else {
      this.employeeShiftService.create(model).subscribe(() => {
        this.alertService.success('Shift assigned successfully');
        this.router.navigate(['/employee-shift']);
      });
    }
  }
}
