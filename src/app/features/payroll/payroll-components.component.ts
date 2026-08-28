import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../shared/material-ui.imports';
import { PayrollComponent } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({
  standalone: true,
  selector: 'app-payroll-components',
  imports: [CommonModule, FormsModule, ...MATERIAL_UI_MODULES],
  templateUrl: './payroll-components.component.html',
  styleUrl: './payroll-components.component.scss'
})
export class PayrollComponentsComponent implements OnInit {
  private readonly admin = inject(TenantAdminService);
  components: PayrollComponent[] = [];
  editing?: PayrollComponent;
  form: PayrollComponent = this.empty();
  message = '';
  error = '';

  ngOnInit(): void { this.load(); }
  load(): void { this.admin.getPayrollComponents().subscribe({ next: data => this.components = data, error: err => this.showError(err) }); }
  edit(component: PayrollComponent): void { this.editing = component; this.form = { ...component }; }
  save(): void {
    this.message = ''; this.error = '';
    if (!this.form.code.trim() || !this.form.name.trim()) { this.error = 'Code and name are required.'; return; }
    this.admin.savePayrollComponent(this.form).subscribe({
      next: saved => { this.message = 'Payroll component saved.'; this.editing = saved; this.form = { ...saved }; this.load(); },
      error: err => this.showError(err)
    });
  }
  reset(): void { this.editing = undefined; this.form = this.empty(); }
  private empty(): PayrollComponent { return { code: '', name: '', componentType: 'Earning', calculationType: 'Fixed', value: 0, salaryField: '', baseComponentCode: '', isTaxable: false, isPensionable: false, isWpsIncluded: false, isActive: true }; }
  private showError(err: any): void { this.error = err?.error?.message || err?.error || 'Unable to load payroll components.'; }
}
