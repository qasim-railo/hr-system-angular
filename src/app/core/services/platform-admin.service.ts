import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PlatformStatistics, PlatformTenant } from '../models/platform-tenant.model';

@Injectable({ providedIn: 'root' })
export class PlatformAdminService {
  private readonly apiUrl = `${environment.apiUrl}/platform`;

  constructor(private http: HttpClient) {}

  getTenants(search = ''): Observable<PlatformTenant[]> {
    const params = search.trim() ? new HttpParams().set('search', search.trim()) : undefined;
    return this.http.get<PlatformTenant[]>(`${this.apiUrl}/tenants`, { params });
  }

  getStatistics(): Observable<PlatformStatistics> {
    return this.http.get<PlatformStatistics>(`${this.apiUrl}/statistics`);
  }

  changeStatus(id: number, action: 'activate' | 'suspend' | 'resume' | 'archive'): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tenants/${id}/${action}`, {});
  }
}
