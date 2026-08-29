import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TenantPlan } from '../../core/models/tenant-plan.model';
import { TenantPlanService, FeatureAccessCheck } from '../../core/services/tenant-plan.service';
import { Subscription } from '../../core/models/subscription.model';
import { SubscriptionService } from '../../core/services/subscription.service';

@Component({
  standalone: true,
  selector: 'app-tenant-plan',
  imports: [CommonModule],
  templateUrl: './tenant-plan.component.html',
  styleUrl: './tenant-plan.component.scss'
})
export class TenantPlanComponent implements OnInit {
  plan?: TenantPlan;
  subscription?: Subscription;
  subscriptionError = '';
  loading = true;
  error = '';
  featureChecks: Record<string, FeatureAccessCheck> = {};
  readonly premiumFeatureCodes = ['ADVANCED_REPORTS', 'WORKFLOWS', 'EXPIRY_ALERTS', 'ADVANCED_AUDIT'];

  constructor(private tenantPlan: TenantPlanService, private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.tenantPlan.getCurrentPlan().subscribe({
      next: plan => {
        this.plan = plan;
        this.loading = false;
        this.premiumFeatureCodes.forEach(code => {
          this.tenantPlan.checkFeature(code).subscribe({
            next: result => this.featureChecks[code] = result,
            error: () => this.featureChecks[code] = {
              allowed: false,
              featureCode: code,
              currentPlanCode: plan.code,
              currentPlanName: plan.name,
              upgradeRequired: true,
              availableFeatures: plan.featureCodes,
              reason: 'Feature access not available in the current plan.'
            }
          });
        });
      },
      error: error => { this.error = error?.error?.message || 'Unable to load the current plan.'; this.loading = false; }
    });
    this.subscriptionService.getCurrent().subscribe({
      next: subscription => this.subscription = subscription,
      error: error => {
        this.subscriptionError = error?.error?.message || 'Unable to load subscription details.';
      }
    });
  }

  formatStorage(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    if (!bytes) return '0 B';
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
  }

  statusLabel(status: string | number): string {
    const labels = ['Trial', 'Active', 'PastDue', 'Suspended', 'Cancelled', 'Expired'];
    return typeof status === 'number' ? labels[status] ?? 'Unknown' : status;
  }

  get lockedPremiumFeatures(): FeatureAccessCheck[] {
    return this.premiumFeatureCodes
      .map(code => this.featureChecks[code])
      .filter((check): check is FeatureAccessCheck => Boolean(check) && !check.allowed);
  }
}
