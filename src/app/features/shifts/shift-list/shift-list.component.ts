

import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { ShiftService } from '../../../core/services/shift.service';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from '../../../core/models/shift.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-shift-list',
  standalone: true,
  imports: [MATERIAL_UI_MODULES],
  templateUrl: './shift-list.component.html',
  styleUrl: './shift-list.component.scss'
})


export class ShiftListComponent implements AfterViewInit {
  private shiftService = inject(ShiftService);

  displayedColumns: string[] = ['id', 'name', 'startTime', 'endTime', 'type', 'actions'];
  dataSource = new MatTableDataSource<Shift>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.loadShifts();
  }

  loadShifts(): void {
    this.shiftService.getAll().subscribe((shifts: Shift[]) => {
      this.dataSource.data = shifts;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

