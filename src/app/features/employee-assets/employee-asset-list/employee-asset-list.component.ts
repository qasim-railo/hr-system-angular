import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { EmployeeAssetService } from '../../../core/services/employee-asset.service';
import { EmployeeAsset } from '../../../core/models/employee-asset.model';

@Component({
  selector: 'app-employee-asset-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, ...MATERIAL_UI_MODULES],
  templateUrl: './employee-asset-list.component.html',
})
export class EmployeeAssetListComponent implements OnInit {
  
  private assetService = inject(EmployeeAssetService);

  // @Input() employeeId: number | null = null;
  @Output() edit = new EventEmitter<EmployeeAsset>();

  displayedColumns: string[] = ['assetId', 'assignedDate', 'returnedDate', 'status', 'actions'];
  dataSource: EmployeeAsset[] = [];

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['employeeId'] && this.employeeId) {
  //     this.loadData();
  //   }
  // }
ngOnInit(): void {

    this.loadData();
  }
  loadData(): void {
    this.assetService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  onEdit(asset: EmployeeAsset) {
    this.edit.emit(asset);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this asset assignment?')) {
      this.assetService.delete(id).subscribe(() => this.loadData());
    }
  }
}
