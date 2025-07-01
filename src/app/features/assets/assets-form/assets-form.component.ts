import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../../../core/services/alert.service';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { AssetService } from '../../../core/services/asset.service';
import { Asset } from '../../../core/models/asset.model';

@Component({
  selector: 'app-assets-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_UI_MODULES
  ],
  templateUrl: './assets-form.component.html',
  styleUrl: './assets-form.component.scss'
})
export class AssetsFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private assetService = inject(AssetService);
  private alertService = inject(AlertService);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    assetCode: ['', Validators.required],
    purchaseDate: ['', Validators.required]
  });

  isEditMode = false;
  assetId!: number;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.assetId = +id;
      this.assetService.getById(this.assetId).subscribe((asset: Asset) => {
        asset.purchaseDate = this.formatDate(asset.purchaseDate);
        this.form.patchValue(asset);
      });
    }
  }

  formatDate(dateString: any): any {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  onSubmit() {
    if (this.form.invalid) return;

    const asset: Asset = this.form.value;

    if (this.isEditMode) {
      this.assetService.update(this.assetId, asset).subscribe(() => {
        this.alertService.success('Asset updated successfully');
        this.router.navigate(['/assets']);
      });
    } else {
      this.assetService.create(asset).subscribe(() => {
        this.alertService.success('Asset added successfully');
        this.router.navigate(['/assets']);
      });
    }
  }
}
