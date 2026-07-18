import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [
    CommonModule,
    RouterModule,
    NgIf,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule, MatFormFieldModule,
    MatInputModule
  ]
})
export class EmployeeListComponent implements AfterViewInit {
  private employeeService = inject(EmployeeService);

  displayedColumns: string[] = ['employeeId', 'name', 'email', 'passportNumber', 'contactNumber', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.loadEmployees();

    // paginator change
    this.paginator.page.subscribe(() => {
      this.loadEmployees();
    });
  }

  loadEmployees(page: number = 1, size: number = 5, search: string | null = null): void {
    const filter: any = { pageNumber: page, pageSize: size };
    if (search) filter.search = search;

    this.employeeService.getList(filter).subscribe((res: any) => {
      this.dataSource.data = res.items;
      // set paginator length if available
      if (res.total !== undefined && this.paginator) {
        this.paginator.length = res.total;
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // call backend filter
    this.paginator.firstPage();
    this.loadEmployees(1, this.paginator.pageSize || 5, filterValue.trim());
  }

}
