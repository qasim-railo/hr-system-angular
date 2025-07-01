import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
 
import { Router } from '@angular/router';
 
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { FinalSettlementService } from '../../../core/services/final-settlement.service';

@Component({
  selector: 'app-final-settlement-generate',
  standalone: true,
  imports: [...MATERIAL_UI_MODULES],
  templateUrl: './final-settlement-generate.component.html'
})
export class FinalSettlementGenerateComponent implements OnInit {
  form: FormGroup;
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private settlementService: FinalSettlementService,
    private router: Router
  ) {
    this.form = this.fb.group({
      employeeId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: data => (this.employees = data),
      error: err => console.error('Error loading employees', err)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const employeeId = this.form.value.employeeId;
    this.settlementService.generate(employeeId).subscribe({
      next: () => this.router.navigate(['/final-settlement']),
      error: err => console.error('Failed to generate settlement', err)
    });
  }
}
