import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { AttendanceService } from '../../../core/services/attendance.service';
import { Employee } from '../../../core/models/employee.model';
import { Attendance } from '../../../core/models/attendance.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports'; 
import { AttendanceFormComponent } from '../attendance-form/attendance-form.component';
import { AttendanceImportComponent } from '../attendance-import/attendance-import.component';

@Component({
  selector: 'app-attendance-page',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_UI_MODULES, AttendanceFormComponent, AttendanceImportComponent],
  templateUrl: './attendance-page.component.html',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AttendancePageComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private attendanceService = inject(AttendanceService);

  employees: Employee[] = [];
  selectedEmployeeId: number | null = null;
  attendanceList: Attendance[] = [];

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((res) => {
      this.employees = res;
    });
  }

  onEmployeeChange(id: number) {
    this.selectedEmployeeId = id;
    this.loadAttendance(id);
  }

  loadAttendance(id: number) {
    this.attendanceService.getByEmployee(id).subscribe((res) => {
      this.attendanceList = res;
    });
  }

  refreshList() {
    if (this.selectedEmployeeId) {
      this.loadAttendance(this.selectedEmployeeId);
    }
  }
}
