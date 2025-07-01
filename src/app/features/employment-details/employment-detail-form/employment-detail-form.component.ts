import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmploymentDetailService } from '../../../core/services/employment-detail.service';
import { EmploymentDetail } from '../../../core/models/employment-detail.model';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  standalone: true,
  imports: [MATERIAL_UI_MODULES],
  selector: 'app-employment-detail-form',
  templateUrl: './employment-detail-form.component.html'
})
export class EmploymentDetailFormComponent implements OnInit {
  // @Input() employeeId!: number;

  form!: FormGroup;
  isEditMode = false;
  detailId: number | null = null;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private service: EmploymentDetailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.employeeId = +idParam;
      this.service.getByEmployeeId(this.employeeId).subscribe(detail => {
        if (detail) {
          this.isEditMode = true;
          this.detailId = detail.employmentDetailId;
          this.form.patchValue(detail);
        }
      });

      // Set the employeeId when creating
      // this.form.patchValue({ this.employeeId });
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      joiningDate: ['', Validators.required],
      category: [''],
      offerDesignation: [''],
      molDesignation: [''],
      basicSalary: [0],
      accommodationAllowance: [0],
      travelAllowance: [0],
      otherAllowance: [0],
      molBasicSalary: [0],
      molGrossSalary: [0],
      currentGrossSalary: [0],
      ot_Eligible: [true],
      salaryMode: [''],
      bankDetails: [''],
      bankAccountNo: [''],
      iban: [''],
      workLocation: [''],
      contractType: [''],
      otherSalaryDetails: [''],
      visaNo: [''],
      visaIssueDate: [''],
      visaExpiry: [''],
      emiratesId: [''],
      emiratesIssueDate: [''],
      emiratesExpiry: [''],
      laborCardNo: [''],
      laborCardIssueDate: [''],
      laborCardExpiry: [''],
      remarks: [''],
      isActive: [true]
    });
  }

  onSubmit(): void {
    const data: EmploymentDetail = {
      ...this.form.value,
      employeeId: this.employeeId,
      employmentDetailId: this.detailId ?? 0,
    };

    if (this.isEditMode && this.detailId) {
      this.service.update(this.detailId, data).subscribe(() => {
        this.alertService.success('Updated successful')
        this.router.navigate(['/employees/employment-detail-view', this.employeeId]);


      });
    } else {
      this.service.create(data).subscribe(() => this.alertService.success('Updated successful'));
    }
  }
}
