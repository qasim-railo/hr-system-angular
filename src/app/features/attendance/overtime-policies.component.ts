import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { OvertimePolicy, OvertimePolicyAssignment, OvertimeType, PayrollComponent } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({ standalone: true, selector: 'app-overtime-policies', imports: [CommonModule, FormsModule, ...MATERIAL_UI_MODULES], templateUrl: './overtime-policies.component.html', styleUrl: './overtime-policies.component.scss' })
export class OvertimePoliciesComponent implements OnInit {
  private readonly admin = inject(TenantAdminService);
  policies: OvertimePolicy[] = []; types: OvertimeType[] = []; components: PayrollComponent[] = []; assignments: OvertimePolicyAssignment[] = []; assignmentTargets: { id: number; name: string }[] = []; editing?: OvertimePolicy; editingType?: OvertimeType; editingAssignment?: OvertimePolicyAssignment; form = this.empty(); typeForm = this.emptyType(); assignmentForm = this.emptyAssignment(); message = ''; error = '';
  get activeTypes(): OvertimeType[] { return this.types.filter(type => type.isActive); }
  ngOnInit(): void { this.load(); }
  load(): void {
    this.admin.getOvertimePolicies().subscribe({ next: x => this.policies = x, error: e => this.error = e?.error || 'Unable to load overtime policies.' });
    this.admin.getOvertimeTypes().subscribe({ next: x => this.types = x, error: e => this.error = e?.error || 'Unable to load overtime types.' });
    this.admin.getPayrollComponents().subscribe({ next: x => this.components = x.filter(component => component.isActive), error: e => this.error = e?.error || 'Unable to load payroll components.' });
    this.admin.getOvertimePolicyAssignments().subscribe({ next: x => this.assignments = x, error: e => this.error = e?.error || 'Unable to load policy assignments.' });
  }
  edit(x: OvertimePolicy): void { this.editing = x; this.form = { ...x }; }
  save(): void { this.message = ''; this.error = ''; if (!this.form.name.trim()) { this.error = 'Name is required.'; return; } this.admin.saveOvertimePolicy(this.form).subscribe({ next: x => { this.message = 'Overtime policy saved.'; this.editing = x; this.form = { ...x }; this.load(); }, error: e => this.error = e?.error || 'Unable to save overtime policy.' }); }
  reset(): void { this.editing = undefined; this.form = this.empty(); }
  editType(item: OvertimeType): void { this.editingType = item; this.typeForm = { ...item }; }
  saveType(): void {
    this.admin.saveOvertimeType(this.typeForm).subscribe({ next: item => { this.message = 'Overtime type saved.'; this.editingType = item; this.typeForm = { ...item }; this.load(); }, error: e => this.error = e?.error || 'Unable to save overtime type.' });
  }
  resetType(): void { this.editingType = undefined; this.typeForm = this.emptyType(); }
  editAssignment(item: OvertimePolicyAssignment): void { this.editingAssignment = item; this.assignmentForm = { ...item }; this.loadAssignmentTargets(); }
  saveAssignment(): void {
    this.admin.saveOvertimePolicyAssignment(this.assignmentForm).subscribe({ next: item => { this.message = 'Policy assignment saved.'; this.editingAssignment = item; this.assignmentForm = { ...item }; this.load(); }, error: e => this.error = e?.error || 'Unable to save policy assignment.' });
  }
  resetAssignment(): void { this.editingAssignment = undefined; this.assignmentForm = this.emptyAssignment(); this.assignmentTargets = []; }
  loadAssignmentTargets(): void {
    if (this.assignmentForm.scope === 'All') { this.assignmentForm.targetId = undefined; this.assignmentTargets = []; return; }
    this.admin.getOvertimeAssignmentTargets(this.assignmentForm.scope).subscribe({ next: items => this.assignmentTargets = items, error: e => this.error = e?.error || 'Unable to load assignment targets.' });
  }
  policyName(id: number): string { return this.policies.find(policy => policy.id === id)?.name || 'Policy'; }
  selectType(): void {
    const type = this.types.find(item => item.id === this.form.overtimeTypeId);
    if (!type) return;
    this.form.classification = type.code;
    this.form.rateMultiplier = type.rateMultiplier;
    this.form.maximumApprovedMinutes = type.maximumMinutes;
    this.form.approvalRequired = type.approvalRequired;
  }
  private empty(): OvertimePolicy { return { name: '', employeeCategory: '*', dayType: 'Normal Day', classification: 'OT1', rateMultiplier: 1.25, dailyThresholdMinutes: 0, maximumApprovedMinutes: 120, approvalRequired: false, effectiveFrom: new Date().toISOString().slice(0, 10), isActive: true }; }
  private emptyType(): OvertimeType { return { code: '', name: '', eligibility: 'All', calculationMethod: 'Multiplier', rateMultiplier: 1, maximumMinutes: 0, approvalRequired: false, isActive: true }; }
  private emptyAssignment(): OvertimePolicyAssignment { return { overtimePolicyId: 0, scope: 'All', effectiveFrom: new Date().toISOString().slice(0, 10), isActive: true }; }
}
