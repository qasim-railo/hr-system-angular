import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TenantSetupProgress } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({
  selector: 'app-setup-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './setup-wizard.component.html',
  styleUrl: './setup-wizard.component.scss'
})
export class SetupWizardComponent implements OnInit {
  setupProgress?: TenantSetupProgress;
  loading = true;
  error = '';

  constructor(private admin: TenantAdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.admin.getSetupProgress().subscribe({
      next: value => {
        this.setupProgress = value;
        this.loading = false;
      },
      error: err => {
        this.error = err?.error?.message || err?.error || 'Unable to load the tenant setup wizard.';
        this.loading = false;
      }
    });
  }

  completeStep(stepNumber: number): void {
    const target = Math.max(this.setupProgress?.completedStep ?? 0, stepNumber);
    this.admin.updateSetupProgress(target).subscribe({
      next: value => this.setupProgress = value,
      error: err => this.showError(err)
    });
  }

  skipStep(stepNumber: number): void {
    this.completeStep(stepNumber);
  }

  private showError(error: any): void {
    this.error = error?.error?.message || error?.error || 'Unable to update the setup wizard.';
  }
}
