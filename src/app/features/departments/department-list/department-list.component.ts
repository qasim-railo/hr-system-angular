import { Component, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { Department } from '../../../core/models/department.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [MATERIAL_UI_MODULES],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export class DepartmentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'companyName','description', 'actions'];
  dataSource = new MatTableDataSource<Department>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getAll().subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}