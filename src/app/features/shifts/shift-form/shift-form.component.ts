import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShiftService } from '../../../core/services/shift.service'; 
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { AlertService } from '../../../core/services/alert.service';
import { Shift } from '../../../core/models/shift.model';

@Component({
  selector: 'app-shift-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './shift-form.component.html',
  styleUrl: './shift-form.component.scss'
})
export class ShiftFormComponent implements OnInit {
  private shiftService = inject(ShiftService);
  private alertService = inject(AlertService);

  form: FormGroup;
  isEditMode = false;
  shiftId!: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.shiftId = +id;
      this.shiftService.getById(this.shiftId).subscribe((shift: Shift) => {
        this.form.patchValue(shift);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const shift: Shift = this.form.value;

    if (this.isEditMode) {
      this.shiftService.update(this.shiftId, shift).subscribe(() => {
        this.alertService.success('Shift updated successfully');
        this.router.navigate(['/shifts']);
      });
    } else {
      this.shiftService.create(shift).subscribe(() => {
        this.alertService.success('Shift created successfully');
        this.router.navigate(['/shifts']);
      });
    }
  }
}
