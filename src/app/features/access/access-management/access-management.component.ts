import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MATERIAL_UI_MODULES } from '../../../shared/material-ui.imports';
import { AccessRole, AccessService, AccessUser } from '../../../core/services/access.service';

@Component({
  standalone: true,
  selector: 'app-access-management',
  imports: MATERIAL_UI_MODULES,
  templateUrl: './access-management.component.html',
  styleUrl: './access-management.component.scss'
})
export class AccessManagementComponent implements OnInit {
  roles: AccessRole[] = [];
  users: AccessUser[] = [];
  permissions: { id: number; name: string; description?: string }[] = [];
  loading = true;
  message = '';
  error = '';

  scopeOptions = ['TenantWide', 'SelectedCompanies', 'SelectedBranches', 'SelectedDepartments', 'OwnTeam', 'Self'];
  permissionScopes: Record<string, { dataScope: string; scopeIds: number[] }> = {};
  roleForm = this.fb.group({ name: ['', [Validators.required, Validators.maxLength(100)]], permissions: [[] as string[]] });
  userForm = this.fb.group({ email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]], password: ['', [Validators.required, Validators.minLength(6)]], roles: [[] as string[]], isActive: [true] });

  constructor(private fb: FormBuilder, private access: AccessService) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading = true;
    this.access.getPermissions().subscribe({ next: data => this.permissions = data, error: err => this.showError(err) });
    this.access.getRoles().subscribe({ next: data => this.roles = data, error: err => this.showError(err) });
    this.access.getUsers().subscribe({ next: data => { this.users = data; this.loading = false; }, error: err => { this.loading = false; this.showError(err); } });
  }

  createRole(): void {
    if (this.roleForm.invalid) return;
    const value = this.roleForm.getRawValue();
    const permissionScopes = (value.permissions || []).map(permission => ({ permission, ...this.permissionScopes[permission] })).filter(item => item.dataScope);
    this.access.createRole(value.name!.trim(), value.permissions || [], permissionScopes).subscribe({
      next: () => { this.message = 'Role created successfully.'; this.error = ''; this.permissionScopes = {}; this.roleForm.reset({ name: '', permissions: [] }); this.loadData(); },
      error: err => this.showError(err)
    });
  }

  createUser(): void {
    if (this.userForm.invalid) return;
    const value = this.userForm.getRawValue();
    this.access.createUser(value.email!.trim(), value.password!, value.roles || [], value.isActive ?? true).subscribe({
      next: () => { this.message = 'User created successfully.'; this.error = ''; this.userForm.reset({ email: '', password: '', roles: [], isActive: true }); this.loadData(); },
      error: err => this.showError(err)
    });
  }

  disableUser(user: AccessUser): void {
    this.access.disableUser(user.id).subscribe({
      next: () => { this.message = `${user.email} has been disabled.`; this.loadData(); },
      error: err => this.showError(err)
    });
  }

  togglePermission(name: string, checked: boolean): void {
    const selected = this.roleForm.value.permissions || [];
    const permissions = checked ? [...selected, name] : selected.filter(permission => permission !== name);
    this.roleForm.patchValue({ permissions: [...new Set(permissions)] });
    if (checked && !this.permissionScopes[name]) this.permissionScopes[name] = { dataScope: 'TenantWide', scopeIds: [] };
  }

  scopeFor(permission: string): { dataScope: string; scopeIds: number[] } {
    return this.permissionScopes[permission] || { dataScope: 'TenantWide', scopeIds: [] };
  }

  updateScope(permission: string, dataScope: string): void {
    this.permissionScopes[permission] = { ...this.scopeFor(permission), dataScope };
  }

  updateScopeIds(permission: string, value: string): void {
    this.permissionScopes[permission] = {
      ...this.scopeFor(permission),
      scopeIds: value.split(',').map(id => Number(id.trim())).filter(id => Number.isInteger(id) && id > 0)
    };
  }

  private showError(error: any): void {
    this.message = '';
    this.error = error?.error?.message || error?.error || 'Unable to complete the access request.';
  }
}
