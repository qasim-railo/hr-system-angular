import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberingPattern } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({
  standalone: true,
  selector: 'app-numbering',
  imports: [CommonModule, FormsModule],
  templateUrl: './numbering.component.html',
  styleUrl: './numbering.component.scss'
})
export class NumberingComponent implements OnInit {
  private readonly admin = inject(TenantAdminService);
  patterns: NumberingPattern[] = [];
  loading = true;
  message = '';
  error = '';

  ngOnInit(): void {
    this.admin.getNumberingPatterns().subscribe({
      next: value => { this.patterns = value; this.loading = false; },
      error: error => { this.error = error?.error?.message || error?.error || 'Unable to load numbering.'; this.loading = false; }
    });
  }

  save(pattern: NumberingPattern): void {
    this.admin.updateNumberingPattern(pattern.key, pattern.pattern).subscribe({
      next: value => { Object.assign(pattern, value); this.message = `${pattern.label} format saved.`; },
      error: error => { this.error = error?.error?.message || error?.error || 'Unable to save numbering format.'; }
    });
  }
}
