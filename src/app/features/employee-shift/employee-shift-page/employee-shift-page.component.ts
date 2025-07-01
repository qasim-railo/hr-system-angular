import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { ShiftService } from '../../../core/services/shift.service';
import { EmployeeShiftService } from '../../../core/services/employee-shift.service';
import { Employee } from '../../../core/models/employee.model';
import { Shift } from '../../../core/models/shift.model';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employee-shift-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_UI_MODULES,
    MatTableModule
  ],
  templateUrl: './employee-shift-page.component.html'
})
export class EmployeeShiftPageComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private shiftService = inject(ShiftService);
  private shiftAssignService = inject(EmployeeShiftService);
  private fb = inject(FormBuilder);

  employees: Employee[] = [];
  shifts: Shift[] = [];
  assignedShifts: any[] = [];

  form!: FormGroup;

  displayedColumns = ['date', 'shift', 'actions'];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      shiftId: [null, Validators.required],
      date: ['', Validators.required]
    });

    this.employeeService.getAll().subscribe(data => this.employees = data);
    this.shiftService.getAll().subscribe(data => this.shifts = data);

    // 👇 This is key
    this.form.get('employeeId')?.valueChanges.subscribe(() => {
      this.onEmployeeChange();
    });
  }

  onEmployeeChange() {
    const empId = this.form.get('employeeId')?.value;
    if (empId) {
      this.shiftAssignService.getById(empId).subscribe((data: any) => {
        this.assignedShifts = data;
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.shiftAssignService.create(this.form.value).subscribe(() => {
      this.onEmployeeChange(); // reload shifts
      this.form.get('shiftId')?.reset();
      this.form.get('date')?.reset();
    });
  }

  deleteShift(id: number) {
    this.shiftAssignService.delete(id).subscribe(() => this.onEmployeeChange());
  }
}
