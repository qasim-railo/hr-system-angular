import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../core/models/employee.model';
import { IncrementHistory } from '../../../core/models/increment-history.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { IncrementHistoryService } from '../../../core/services/increment-history.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
 

@Component({
  selector: 'app-increment-history-page',
  standalone: true,
  templateUrl: './increment-history-page.component.html',
  styleUrls: ['./increment-history-page.component.scss'],
  imports: [...MATERIAL_UI_MODULES],
})
export class IncrementHistoryPageComponent implements OnInit {
  allIncrements: IncrementHistory[] = [];
  filteredIncrements: IncrementHistory[] = [];
  employees: Employee[] = [];
  selectedEmployeeId: number | null = null;

  form!: FormGroup;

  constructor(
    private incrementService: IncrementHistoryService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
    });

    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      incrementDate: [null, Validators.required],
      oldSalary: [null, Validators.required],
      newSalary: [null, Validators.required],
      reason: [''],
      approvedBy: ['']
    });
  }

  loadAll(): void {
    this.incrementService.getAll().subscribe(data => {
      this.allIncrements = data;
      this.filteredIncrements = data;
    });
  }

  onEmployeeSelect(): void {
    
    const empId = this.selectedEmployeeId;
    if (!empId) {
      this.filteredIncrements = this.allIncrements;
       this.loadAll();
      return;
    }

    this.incrementService.getByEmployee(empId).subscribe(data => {
      this.filteredIncrements = data;
      this.form.patchValue({ employeeId: empId });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.incrementService.create(this.form.value).subscribe(() => {
      this.onEmployeeSelect(); // reload employee-specific history
      this.form.reset({ employeeId: this.selectedEmployeeId });
    });
  }
}
