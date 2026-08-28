import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExportOption } from '../../core/models/export.model';
import { ExportService } from '../../core/services/export.service';

@Component({
  selector: 'app-exports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exports.component.html'
})
export class ExportsComponent implements OnInit {
  exports: ExportOption[] = [];
  error = '';

  constructor(private exportService: ExportService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.exportService.list().subscribe({
      next: data => this.exports = data,
      error: () => this.error = 'Unable to load the export center.'
    });
  }

  download(option: ExportOption): void {
    if (!option.available) {
      this.error = `${option.name} is not available in the current tenant setup.`;
      return;
    }

    this.exportService.download(option.code).subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${option.code}-export.xlsx`;
        link.click();
        URL.revokeObjectURL(url);
      },
      error: () => this.error = `You are not authorized to download ${option.name}.`
    });
  }
}
