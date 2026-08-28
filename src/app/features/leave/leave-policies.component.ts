import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { LeavePolicy } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({ standalone: true, selector: 'app-leave-policies', imports: [CommonModule, FormsModule, ...MATERIAL_UI_MODULES], templateUrl: './leave-policies.component.html', styleUrl: './leave-policies.component.scss' })
export class LeavePoliciesComponent implements OnInit {
  private readonly admin = inject(TenantAdminService);
  policies: LeavePolicy[] = []; editing?: LeavePolicy; form = this.empty(); message = ''; error = '';
  ngOnInit(): void { this.load(); }
  load(): void { this.admin.getLeavePolicies().subscribe({ next: x => this.policies = x, error: e => this.error = e?.error || 'Unable to load leave policies.' }); }
  edit(x: LeavePolicy): void { this.editing = x; this.form = { ...x }; }
  save(): void { this.message = ''; this.error = ''; if (!this.form.name.trim()) { this.error = 'Name is required.'; return; } this.admin.saveLeavePolicy(this.form).subscribe({ next: x => { this.message = 'Leave policy saved.'; this.editing = x; this.form = { ...x }; this.load(); }, error: e => this.error = e?.error || 'Unable to save leave policy.' }); }
  reset(): void { this.editing = undefined; this.form = this.empty(); }
  private empty(): LeavePolicy { return { name: '', entitlementDays: 21, accrualMethod: 'Annual', carryForwardLimit: 0, allowEncashment: false, minimumServiceDays: 0, documentRequired: false, approvalRequired: true, employeeCategory: '*', effectiveFrom: new Date().toISOString().slice(0, 10), isActive: true }; }
}
