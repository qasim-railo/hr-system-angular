import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { EmployeeAsset } from '../../../core/models/employee-asset.model';
import { EmployeeAssetListComponent } from '../employee-asset-list/employee-asset-list.component';
import { EmployeeAssetFormComponent } from '../employee-asset-form/employee-asset-form.component';

@Component({
  selector: 'app-employee-asset-page',
  standalone: true,
  imports: [CommonModule, EmployeeAssetFormComponent, EmployeeAssetListComponent],
  templateUrl: './employee-asset-page.component.html'
})
export class EmployeeAssetPageComponent {
  selectedAsset: EmployeeAsset | null = null;

  onEdit(asset: EmployeeAsset) {
    this.selectedAsset = asset;
  }

  onSaved() {
    this.selectedAsset = null;
  }
}


