import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { AttendanceService } from '../../../core/services/attendance.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-attendance-import',
  standalone: true,
  imports: [CommonModule, ...MATERIAL_UI_MODULES],
  templateUrl: './attendance-import.component.html',
  styleUrl: './attendance-import.component.scss'
})
export class AttendanceImportComponent {
  selectedFile: File | null = null;
  isUploading = false;

  constructor(
    private attendanceService: AttendanceService,
    private alertService: AlertService
  ) {}

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      // Check if file is Excel format
      const validTypes = ['application/vnd.ms-excel', 
                         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                         'application/x-xlsx'];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        this.selectedFile = file;
        this.alertService.success(`File selected: ${file.name}`);
      } else {
        this.alertService.error('Please select a valid Excel file (.xlsx or .xls)');
        this.selectedFile = null;
      }
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.alertService.error('Please select a file first');
      return;
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.attendanceService.importExcel(formData).subscribe({
      next: () => {
        this.alertService.success('Attendance imported successfully');
        this.selectedFile = null;
        this.isUploading = false;
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: err => {
        console.error('Import failed', err);
        this.alertService.error('Failed to import attendance file');
        this.isUploading = false;
      }
    });
  }
}
