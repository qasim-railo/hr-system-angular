import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IntegrationProvider } from '../../core/models/tenant-admin.model';
import { TenantAdminService } from '../../core/services/tenant-admin.service';

@Component({
  standalone: true,
  selector: 'app-integrations',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './integrations.component.html',
  styleUrl: './integrations.component.scss'
})
export class IntegrationsComponent implements OnInit {
  providers: IntegrationProvider[] = [];
  loading = true;
  error = '';
  savingKeys: Record<string, boolean> = {};

  constructor(private admin: TenantAdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.admin.getIntegrations().subscribe({
      next: value => {
        this.providers = value.providers;
        this.loading = false;
      },
      error: err => {
        this.error = err?.error?.message || err?.error || 'Unable to load integrations.';
        this.loading = false;
      }
    });
  }

  save(provider: IntegrationProvider): void {
    this.savingKeys[provider.key] = true;
    this.admin.saveIntegration(provider.key, {
      isEnabled: provider.isEnabled,
      secretReference: provider.secretReference,
      baseUrl: provider.baseUrl,
      configurationJson: provider.configurationJson
    }).subscribe({
      next: value => {
        provider.isEnabled = value.isEnabled;
        provider.secretReference = value.secretReference || '';
        provider.baseUrl = value.baseUrl || '';
        provider.configurationJson = value.configurationJson || '';
        provider.isConfigured = !!value.secretReference || value.isEnabled;
        provider.lastTestedAt = value.lastTestedAt || provider.lastTestedAt;
        this.savingKeys[provider.key] = false;
      },
      error: err => {
        this.error = err?.error?.message || err?.error || 'Unable to save integration.';
        this.savingKeys[provider.key] = false;
      }
    });
  }

  toggleStatus(provider: IntegrationProvider): void {
    provider.isEnabled = !provider.isEnabled;
    this.save(provider);
  }
}
