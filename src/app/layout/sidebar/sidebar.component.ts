import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LocalizationService } from '../../core/services/localization.service';
import { TenantAdminService } from '../../core/services/tenant-admin.service';
import { TenantBranding } from '../../core/models/tenant-admin.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  brandName = 'PeopleOS';
  brandLogoUrl = '';
  brandColor = '#1f5c9c';

  constructor(private router: Router, public auth: AuthService, public localization: LocalizationService, private tenantAdmin: TenantAdminService) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) return;
    this.tenantAdmin.getBranding().subscribe({
      next: branding => this.applyBranding(branding),
      error: () => undefined
    });
  }

  private applyBranding(branding: TenantBranding): void {
    this.brandName = branding.displayName || 'PeopleOS';
    this.brandLogoUrl = branding.companyLogoUrl || '';
    this.brandColor = branding.primaryColor || '#1f5c9c';
    document.documentElement.style.setProperty('--tenant-primary-color', this.brandColor);
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}