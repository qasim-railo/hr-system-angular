import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { ApprovalStep, ApprovalWorkflow } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({
  standalone: true,
  selector: 'app-workflows',
  imports: [CommonModule, FormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './workflows.component.html',
  styleUrl: './workflows.component.scss'
})
export class WorkflowsComponent implements OnInit {
  private readonly admin = inject(TenantAdminService);
  workflows: ApprovalWorkflow[] = [];
  editing?: ApprovalWorkflow;
  form: ApprovalWorkflow = this.empty();
  message = '';
  error = '';

  ngOnInit(): void { this.load(); }
  load(): void {
    this.admin.getApprovalWorkflows().subscribe({
      next: data => this.workflows = data,
      error: err => this.showError(err)
    });
  }
  edit(workflow: ApprovalWorkflow): void {
    this.editing = workflow;
    this.form = { ...workflow, steps: workflow.steps.map(step => ({ ...step })) };
  }
  addStep(): void {
    this.form.steps.push({ stepOrder: this.form.steps.length + 1, name: `Approval step ${this.form.steps.length + 1}`, approverRole: 'Admin', approvalMode: 'Sequential' });
  }
  removeStep(index: number): void {
    this.form.steps.splice(index, 1);
    this.form.steps.forEach((step, i) => step.stepOrder = i + 1);
  }
  save(): void {
    this.message = '';
    this.error = '';
    if (!this.form.name.trim() || !this.form.module.trim() || !this.form.requestType.trim() || !this.form.steps.length)
      { this.error = 'Name, module, request type, and at least one step are required.'; return; }
    this.admin.saveApprovalWorkflow(this.form).subscribe({
      next: saved => { this.message = 'Approval workflow saved.'; this.edit(saved); this.load(); },
      error: err => this.showError(err)
    });
  }
  reset(): void { this.editing = undefined; this.form = this.empty(); }
  private empty(): ApprovalWorkflow { return { name: '', module: 'Leave', requestType: 'Leave Request', isActive: true, steps: [{ stepOrder: 1, name: 'Manager approval', approverRole: 'Manager', approvalMode: 'Sequential' }] }; }
  private showError(err: any): void { this.error = err?.error?.message || err?.error || 'Unable to load approval workflows.'; }
}
