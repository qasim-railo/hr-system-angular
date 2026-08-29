import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LocalizationService } from '../../core/services/localization.service';
import { TenantAdminService } from '../../core/services/tenant-admin.service';
import { TenantBranding } from '../../core/models/tenant-admin.model';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  tenantName = 'Workspace / Overview';

  constructor(private router: Router, public localization: LocalizationService, public auth: AuthService, private tenantAdmin: TenantAdminService) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) return;
    this.tenantAdmin.getBranding().subscribe({
      next: branding => this.tenantName = branding.displayName || 'Workspace / Overview',
      error: () => undefined
    });
  }

  toggleLanguage() {
    this.localization.setLanguage(this.localization.language() === 'en' ? 'ar' : 'en');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
