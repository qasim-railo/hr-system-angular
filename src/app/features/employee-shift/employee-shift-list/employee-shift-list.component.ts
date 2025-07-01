import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { EmployeeShiftService } from '../../../core/services/employee-shift.service';

@Component({
  selector: 'app-employee-shift-list',
  standalone: true,
  templateUrl: './employee-shift-list.component.html',
  imports: [
    CommonModule,
    RouterModule,
    ...MATERIAL_UI_MODULES
  ]
})
export class EmployeeShiftListComponent implements AfterViewInit {
  private employeeShiftService = inject(EmployeeShiftService);

  displayedColumns: string[] = ['id', 'employee', 'shift', 'date', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData() {
    this.employeeShiftService.getAll().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }
}
