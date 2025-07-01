import { Component, inject, OnInit } from '@angular/core';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Department } from '../../../core/models/department.model';
import { DepartmentService } from '../services/department.service';
import { AlertService } from '../../../core/services/alert.service';
import { CompanyService } from '../../../core/services/company.service';
import { Company } from '../../../core/models/company.model';


@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [MATERIAL_UI_MODULES],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.scss'
})
export class DepartmentFormComponent implements OnInit {
  form!: FormGroup;
  departmentId!: number | null;
  isEditMode = false;
  companies: Company[] = [];

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private departmentService = inject(DepartmentService);
  private companyService = inject(CompanyService);
  private swal = inject(AlertService);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      companyId: [null, Validators.required]
    });

    this.getCompanies();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.departmentId = +idParam;
      this.isEditMode = true;
      this.loadDepartment(this.departmentId);
    }
  }
  getCompanies(): void {
  this.companyService.getCompanies().subscribe({
    
    next: (res) => {
      this.companies = res;
    },
    error: (err) => {
      this.swal.error('Error fetching companies:', 'close');
    }
  });
}


  loadDepartment(id: number) {
    this.departmentService.getById(id).subscribe({
      next: (dept) => this.form.patchValue(dept),
      error: () => this.swal.error('Error loading department', 'Close')
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const department: Department = this.form.value;

    if (this.isEditMode && this.departmentId) {
      this.departmentService.update(this.departmentId, department).subscribe({
        next: () => {
          this.swal.success('Department updated', 'Close');
          this.router.navigate(['/departments']);
        },
        error: () => this.swal.error('Update failed', 'Close')
      });
    } else {
      this.departmentService.create(department).subscribe({
        next: () => {
          this.swal.success('Department added', 'Close');
          this.router.navigate(['/departments']);
        },
        error: () => this.swal.error('Creation failed', 'Close')
      });
    }
  }
}
