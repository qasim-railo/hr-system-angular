import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../../core/services/attendance.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { Attendance } from '../../../core/models/attendance.model';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_UI_MODULES, MatTableModule],
  templateUrl: './attendance-list.component.html',
})
export class AttendanceListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private attendanceService = inject(AttendanceService);

  employees: Employee[] = [];
  selectedEmployeeId: number | null = null;
  attendances: Attendance[] = [];

  displayedColumns = ['date', 'checkIn', 'checkOut', 'ot1', 'ot2'];

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((res) => (this.employees = res));
  }

  onEmployeeChange() {
    if (this.selectedEmployeeId) {
      this.attendanceService
        .getByEmployee(this.selectedEmployeeId)
        .subscribe((res) => (this.attendances = res));
    } else {
      this.attendances = [];
    }
  }
}
