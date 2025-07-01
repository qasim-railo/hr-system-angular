import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { CompanyService } from '../../../core/services/company.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private companyService = inject(CompanyService);

  private alertService = inject(AlertService);


  form!: FormGroup;
  isEditMode = false;
  companyId: number | null = null;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.companyId = +id;
        this.loadCompany(this.companyId);
      }
    });
  }

  loadCompany(id: number) {
    this.companyService.getCompanyById(id).subscribe(company => {
      this.form.patchValue(company);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const companyData = this.form.value;

    if (this.isEditMode && this.companyId !== null) {
      this.companyService.updateCompany(this.companyId, companyData).subscribe(() => {
        this.alertService.success('Updated successful'),

          this.router.navigate(['/companies']);
      });
    } else {
      this.companyService.addCompany(companyData).subscribe(() => {
        this.alertService.success('Added successful'),

          this.router.navigate(['/companies']);
      });
    }
  }
}
