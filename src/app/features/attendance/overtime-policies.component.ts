import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { OvertimePolicy } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({ standalone: true, selector: 'app-overtime-policies', imports: [CommonModule, FormsModule, ...MATERIAL_UI_MODULES], templateUrl: './overtime-policies.component.html', styleUrl: './overtime-policies.component.scss' })
export class OvertimePoliciesComponent implements OnInit {
  private readonly admin = inject(TenantAdminService);
  policies: OvertimePolicy[] = []; editing?: OvertimePolicy; form = this.empty(); message = ''; error = '';
  ngOnInit(): void { this.load(); }
  load(): void { this.admin.getOvertimePolicies().subscribe({ next: x => this.policies = x, error: e => this.error = e?.error || 'Unable to load overtime policies.' }); }
  edit(x: OvertimePolicy): void { this.editing = x; this.form = { ...x }; }
  save(): void { this.message = ''; this.error = ''; if (!this.form.name.trim()) { this.error = 'Name is required.'; return; } this.admin.saveOvertimePolicy(this.form).subscribe({ next: x => { this.message = 'Overtime policy saved.'; this.editing = x; this.form = { ...x }; this.load(); }, error: e => this.error = e?.error || 'Unable to save overtime policy.' }); }
  reset(): void { this.editing = undefined; this.form = this.empty(); }
  private empty(): OvertimePolicy { return { name: '', employeeCategory: '*', dayType: 'Normal Day', classification: 'OT1', rateMultiplier: 1.25, dailyThresholdMinutes: 0, maximumApprovedMinutes: 120, approvalRequired: false, effectiveFrom: new Date().toISOString().slice(0, 10), isActive: true }; }
}
