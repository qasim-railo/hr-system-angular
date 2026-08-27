import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TenantPlan } from '../../core/models/tenant-plan.model';
import { TenantPlanService } from '../../core/services/tenant-plan.service';

@Component({
  standalone: true,
  selector: 'app-tenant-plan',
  imports: [CommonModule],
  templateUrl: './tenant-plan.component.html',
  styleUrl: './tenant-plan.component.scss'
})
export class TenantPlanComponent implements OnInit {
  plan?: TenantPlan;
  loading = true;
  error = '';

  constructor(private tenantPlan: TenantPlanService) {}

  ngOnInit(): void {
    this.tenantPlan.getCurrentPlan().subscribe({
      next: plan => { this.plan = plan; this.loading = false; },
      error: error => { this.error = error?.error?.message || 'Unable to load the current plan.'; this.loading = false; }
    });
  }

  formatStorage(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    if (!bytes) return '0 B';
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
  }
}
