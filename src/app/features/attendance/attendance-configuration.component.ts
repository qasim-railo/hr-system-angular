import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { AttendanceConfiguration, AttendanceImportLog, TenantWorkingDay } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({ standalone: true, selector: 'app-attendance-configuration', imports: [CommonModule, FormsModule, ...MATERIAL_UI_MODULES], templateUrl: './attendance-configuration.component.html', styleUrl: './attendance-configuration.component.scss' })
export class AttendanceConfigurationComponent implements OnInit {
  private readonly admin = inject(TenantAdminService);
  readonly dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  config: AttendanceConfiguration = { allowedSources: 'Manual,Excel', graceInMinutes: 15, graceOutMinutes: 15, missingPunchPolicy: 'Flag', lateEarlyRule: 'Track', approvalRequired: false, defaultWorkingHours: 8, expectedWorkMinutes: 480, workingDays: this.defaultWorkingDays() };
  imports: AttendanceImportLog[] = []; message = ''; error = '';
  ngOnInit(): void { this.admin.getAttendanceConfiguration().subscribe({ next: x => this.config = x, error: e => this.error = e?.error || 'Unable to load attendance configuration.' }); this.admin.getAttendanceImports().subscribe({ next: x => this.imports = x }); }
  save(): void { this.message = ''; this.error = ''; this.admin.saveAttendanceConfiguration(this.config).subscribe({ next: x => { this.config = x; this.message = 'Attendance configuration saved.'; }, error: e => this.error = e?.error || 'Unable to save attendance configuration.' }); }
  dayName(day: TenantWorkingDay): string { return this.dayNames[day.dayOfWeek]; }
  private defaultWorkingDays(): TenantWorkingDay[] {
    return this.dayNames.map((_, dayOfWeek) => ({ dayOfWeek, isWorkingDay: true, defaultStartTime: '08:00:00', defaultEndTime: '17:00:00', breakMinutes: 60 }));
  }
}
