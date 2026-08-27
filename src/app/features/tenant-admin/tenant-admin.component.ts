import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TenantAdminDashboard, TenantProfile, TenantSetting } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';
import { CustomFieldDefinition, CustomFieldService } from '../../core/services/custom-field.service';

@Component({
  standalone: true,
  selector: 'app-tenant-admin',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tenant-admin.component.html',
  styleUrl: './tenant-admin.component.scss'
})
export class TenantAdminComponent implements OnInit {
  dashboard?: TenantAdminDashboard;
  profile?: TenantProfile;
  settings: TenantSetting[] = [];
  loading = true;
  message = '';
  error = '';
  newSettingKey = '';
  newSettingValue = '';
  customFields: CustomFieldDefinition[] = [];
  fieldTypes = ['Text', 'Number', 'Date', 'Dropdown', 'MultiSelect', 'Checkbox', 'Boolean', 'Currency', 'File'];
  newField: CustomFieldDefinition = this.emptyField();
  optionsText = '';

  constructor(private admin: TenantAdminService, private customFieldService: CustomFieldService) {}
  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading = true;
    this.admin.getDashboard().subscribe({ next: value => { this.dashboard = value; this.loading = false; }, error: err => this.showError(err) });
    this.admin.getProfile().subscribe({ next: value => this.profile = value, error: err => this.showError(err) });
    this.admin.getSettings().subscribe({ next: value => this.settings = value, error: err => this.showError(err) });
    this.customFieldService.getDefinitions().subscribe({ next: value => this.customFields = value, error: err => this.showError(err) });
  }
  saveProfile(): void {
    if (!this.profile) return;
    this.admin.updateProfile(this.profile).subscribe({ next: value => { this.profile = { ...this.profile!, ...value }; this.message = 'Company profile updated.'; }, error: err => this.showError(err) });
  }
  saveSetting(setting: TenantSetting): void {
    this.admin.updateSetting(setting.key, setting.value).subscribe({ next: value => { setting.value = value.value; this.message = `${setting.key} setting updated.`; }, error: err => this.showError(err) });
  }
  addSetting(): void {
    if (!this.newSettingKey.trim()) { this.error = 'Enter a setting key.'; return; }
    this.admin.updateSetting(this.newSettingKey.trim(), this.newSettingValue).subscribe({
      next: setting => { this.settings = [...this.settings.filter(item => item.key !== setting.key), setting]; this.newSettingKey = ''; this.newSettingValue = ''; this.message = `${setting.key} setting added.`; },
      error: err => this.showError(err)
    });
  }
  formatStorage(bytes: number): string { return bytes ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : '0 MB'; }
  emptyField(): CustomFieldDefinition { return { key: '', label: '', entityType: 'Employee', fieldType: 0, isRequired: false, options: [], displayOrder: 0, isActive: true }; }
  fieldTypeName(type: number): string { return this.fieldTypes[type] || 'Text'; }
  updateOptions(value: string): void { this.optionsText = value; this.newField.options = value.split(',').map(item => item.trim()).filter(Boolean); }
  saveCustomField(): void {
    const request = this.newField.customFieldDefinitionId
      ? this.customFieldService.update(this.newField.customFieldDefinitionId, this.newField)
      : this.customFieldService.create(this.newField);
    request.subscribe({ next: value => { this.customFields = [...this.customFields.filter(item => item.customFieldDefinitionId !== value.customFieldDefinitionId), value].sort((a, b) => a.displayOrder - b.displayOrder); this.newField = this.emptyField(); this.message = 'Custom field saved.'; }, error: err => this.showError(err) });
  }
  editCustomField(field: CustomFieldDefinition): void { this.newField = { ...field, options: [...field.options] }; this.optionsText = field.options.join(', '); }
  archiveCustomField(field: CustomFieldDefinition): void {
    if (!field.customFieldDefinitionId) return;
    this.customFieldService.archive(field.customFieldDefinitionId).subscribe({ next: () => { field.isActive = false; this.message = 'Custom field archived.'; }, error: err => this.showError(err) });
  }
  private showError(error: any): void { this.error = error?.error?.message || error?.error || 'Unable to complete the administration request.'; }
}
