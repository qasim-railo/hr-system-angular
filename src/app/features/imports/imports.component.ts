import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ImportJob } from '../../core/models/import.model';
import { ImportService } from '../../core/services/import.service';
@Component({ standalone: true, selector: 'app-imports', imports: [CommonModule, FormsModule], templateUrl: './imports.component.html' })
export class ImportsComponent implements OnInit {
  jobs: ImportJob[] = []; entityType = 'Employee'; selected?: File; error = '';
  constructor(private imports: ImportService) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.imports.list().subscribe({ next: x => this.jobs = x, error: e => this.error = e?.error || 'Unable to load imports.' }); }
  choose(event: Event): void { this.selected = (event.target as HTMLInputElement).files?.[0]; }
  preview(): void { if (!this.selected) { this.error = 'Choose a CSV or Excel file.'; return; } this.imports.preview(this.entityType, this.selected).subscribe({ next: () => this.load(), error: e => this.error = e?.error || 'Unable to preview import.' }); }
  execute(job: ImportJob): void { this.imports.execute(job.importJobId).subscribe({ next: () => this.load(), error: e => this.error = e?.error || 'Unable to execute import.' }); }
}
