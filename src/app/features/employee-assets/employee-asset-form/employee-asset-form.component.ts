import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeAsset } from '../../../core/models/employee-asset.model';
import { Employee } from '../../../core/models/employee.model';
import { Asset } from '../../../core/models/asset.model';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { EmployeeService } from '../../../core/services/employee.service';
import { AssetService } from '../../../core/services/asset.service';
import { EmployeeAssetService } from '../../../core/services/employee-asset.service';

@Component({
  selector: 'app-employee-asset-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_UI_MODULES
  ],
  templateUrl: './employee-asset-form.component.html'
})
export class EmployeeAssetFormComponent implements OnInit, OnChanges {
  @Input() asset: EmployeeAsset | null = null;

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private assetService = inject(AssetService);
  private employeeAssetService = inject(EmployeeAssetService);

  form!: FormGroup;
  employees: Employee[] = [];
  assets: Asset[] = [];

  ngOnInit(): void {
    this.initForm(); // Ensure form is always initialized

    this.employeeService.getAll().subscribe((data: Employee[]) => {
      this.employees = data;
    });

    this.assetService.getAll().subscribe((data: Asset[]) => {
      this.assets = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asset'] && !changes['asset'].firstChange) {
      this.initForm(); // Rebuild the form if the input asset changes after init
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: [this.asset?.id || 0],
      employeeId: [this.asset?.employeeId || null, Validators.required],
      assetId: [this.asset?.assetId || null, Validators.required],
      assignedDate: [
        this.asset?.assignedDate ?  this.formatDate(this.asset.assignedDate) : null,
        Validators.required
      ],
      returnedDate: [
        this.asset?.returnedDate ?  this.formatDate(this.asset.returnedDate) : null
      ],
      status: [this.asset?.status || '', Validators.required]
    });
  }
   formatDate(dateString: any): any {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const assetData: EmployeeAsset = this.form.value;

    if (assetData.id && assetData.id > 0) {
      // Update existing assignment
      this.employeeAssetService.update(assetData.id, assetData).subscribe();
    } else {
      // Create new assignment
      this.employeeAssetService.create(assetData).subscribe();
    }
  }
}
