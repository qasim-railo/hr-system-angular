import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TenantAdminDashboard, TenantProfile, TenantSetting, TenantSettingItem, TenantSettingsCenter } from '../models/tenant-admin.model';

@Injectable({ providedIn: 'root' })
export class TenantAdminService {
  private readonly url = `${environment.apiUrl}/tenant`;
  constructor(private http: HttpClient) {}
  getDashboard(): Observable<TenantAdminDashboard> { return this.http.get<TenantAdminDashboard>(`${this.url}/dashboard`); }
  getProfile(): Observable<TenantProfile> { return this.http.get<TenantProfile>(`${this.url}/profile`); }
  updateProfile(profile: Partial<TenantProfile>): Observable<TenantProfile> { return this.http.put<TenantProfile>(`${this.url}/profile`, profile); }
  getSettings(): Observable<TenantSetting[]> { return this.http.get<TenantSetting[]>(`${this.url}/settings`); }
  updateSetting(key: string, value: string): Observable<TenantSetting> { return this.http.put<TenantSetting>(`${this.url}/settings/${encodeURIComponent(key)}`, { value }); }
  getSettingsCenter(): Observable<TenantSettingsCenter> { return this.http.get<TenantSettingsCenter>(`${this.url}/settings-center`); }
  updateTypedSetting(key: string, value: string): Observable<TenantSettingItem> { return this.http.put<TenantSettingItem>(`${this.url}/settings-center/${encodeURIComponent(key)}`, { value }); }
}
