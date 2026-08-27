import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatformAdminService } from '../../core/services/platform-admin.service';
import { Plan, PlatformStatistics, PlatformTenant } from '../../core/models/platform-tenant.model';
import { Subscription } from '../../core/models/subscription.model';
import { SubscriptionService } from '../../core/services/subscription.service';

@Component({
  standalone: true,
  selector: 'app-platform-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './platform-admin.component.html',
  styleUrl: './platform-admin.component.scss'
})
export class PlatformAdminComponent implements OnInit {
  tenants: PlatformTenant[] = [];
  statistics?: PlatformStatistics;
  plans: Plan[] = [];
  featureCodesText: Record<number, string> = {};
  subscriptions: Subscription[] = [];
  subscriptionRenewal: Record<number, string> = {};
  selectedPlan: Record<number, number> = {};
  search = '';
  loading = true;
  error = '';
  message = '';

  constructor(private platform: PlatformAdminService, private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.platform.getStatistics().subscribe({
      next: stats => this.statistics = stats,
      error: err => this.showError(err)
    });
    this.platform.getTenants(this.search).subscribe({
      next: tenants => { this.tenants = tenants; this.loading = false; },
      error: err => { this.loading = false; this.showError(err); }
    });
    this.platform.getPlans().subscribe({
      next: plans => {
        this.plans = plans;
        plans.forEach(plan => this.featureCodesText[plan.planId] = plan.featureCodes.join(', '));
      },
      error: err => this.showError(err)
    });
    this.subscriptionService.getAll().subscribe({
      next: subscriptions => {
        this.subscriptions = subscriptions;
        subscriptions.forEach(subscription => {
          this.subscriptionRenewal[subscription.tenantId] = subscription.renewalDate?.slice(0, 10) ?? '';
          this.selectedPlan[subscription.tenantId] = subscription.planId;
        });
      },
      error: err => this.showError(err)
    });
  }

  subscriptionStatus(status: string | number): string {
    const labels = ['Trial', 'Active', 'PastDue', 'Suspended', 'Cancelled', 'Expired'];
    return typeof status === 'number' ? labels[status] ?? 'Unknown' : status;
  }

  activateSubscription(subscription: Subscription): void {
    this.subscriptionService.activate(subscription.tenantId, {
      planId: this.selectedPlan[subscription.tenantId],
      billingCycle: subscription.billingCycle,
      renewalDate: this.subscriptionRenewal[subscription.tenantId] || undefined
    }).subscribe({ next: () => { this.message = `${subscription.tenantName} activated.`; this.load(); }, error: err => this.showError(err) });
  }

  changeSubscriptionPlan(subscription: Subscription): void {
    this.subscriptionService.changePlan(subscription.tenantId, this.selectedPlan[subscription.tenantId])
      .subscribe({ next: () => { this.message = `${subscription.tenantName} plan changed.`; this.load(); }, error: err => this.showError(err) });
  }

  extendSubscription(subscription: Subscription): void {
    const renewalDate = this.subscriptionRenewal[subscription.tenantId];
    if (!renewalDate) { this.error = 'Select a renewal date before extending a subscription.'; return; }
    this.subscriptionService.extend(subscription.tenantId, renewalDate)
      .subscribe({ next: () => { this.message = `${subscription.tenantName} extended.`; this.load(); }, error: err => this.showError(err) });
  }

  setSubscriptionStatus(subscription: Subscription, action: 'suspend' | 'cancel'): void {
    this.subscriptionService.setStatus(subscription.tenantId, action)
      .subscribe({ next: () => { this.message = `${subscription.tenantName} ${action}ed.`; this.load(); }, error: err => this.showError(err) });
  }

  savePlan(plan: Plan): void {
    plan.featureCodes = this.featureCodesText[plan.planId]
      .split(',')
      .map(code => code.trim().toUpperCase())
      .filter(Boolean);
    this.platform.updatePlan(plan).subscribe({
      next: saved => {
        const index = this.plans.findIndex(item => item.planId === saved.planId);
        if (index >= 0) this.plans[index] = saved;
        this.message = `${saved.name} updated successfully.`;
      },
      error: err => this.showError(err)
    });
  }

  setStatus(tenant: PlatformTenant, action: 'activate' | 'suspend' | 'resume' | 'archive'): void {
    this.platform.changeStatus(tenant.tenantId, action).subscribe({
      next: () => { this.message = `Tenant ${action}d successfully.`; this.load(); },
      error: err => this.showError(err)
    });
  }

  formatStorage(bytes: number): string {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
  }

  private showError(error: any): void {
    this.message = '';
    this.error = error?.error?.message || error?.error || 'Unable to complete the platform request.';
  }
}
