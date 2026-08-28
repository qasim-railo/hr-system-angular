import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TenantAdminService } from '../../core/services/tenant-admin.service';
import { TenantSettingItem, TenantSettingsSection } from '../../core/models/tenant-admin.model';

@Component({
  standalone: true,
  selector: 'app-settings-center',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-center.component.html',
  styleUrl: './settings-center.component.scss'
})
export class SettingsCenterComponent implements OnInit {
  private readonly admin = inject(TenantAdminService);
  sections: TenantSettingsSection[] = [];
  loading = true;
  message = '';
  error = '';

  ngOnInit(): void {
    this.admin.getSettingsCenter().subscribe({
      next: result => { this.sections = result.sections; this.loading = false; },
      error: error => { this.error = error?.error?.message || error?.error || 'Unable to load settings.'; this.loading = false; }
    });
  }

  save(setting: TenantSettingItem): void {
    this.message = '';
    this.error = '';
    this.admin.updateTypedSetting(setting.key, setting.value).subscribe({
      next: result => { Object.assign(setting, result); this.message = `${setting.label} updated.`; },
      error: error => { this.error = error?.error?.message || error?.error || 'Unable to save setting.'; }
    });
  }

  setBoolean(setting: TenantSettingItem, event: Event): void {
    setting.value = (event.target as HTMLInputElement).checked ? 'true' : 'false';
  }
}
