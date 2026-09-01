import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  setToken(token: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('jwt', token);
    }
  }

  getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('jwt') : null;
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('jwt');
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getTokenPayload(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(payload + '='.repeat((4 - payload.length % 4) % 4)));
    } catch {
      return null;
    }
  }

  getTenantId(): number | null {
    const tenantId = this.getTokenPayload()?.tenant_id;
    return typeof tenantId === 'string' && Number.isInteger(Number(tenantId))
      ? Number(tenantId)
      : typeof tenantId === 'number' && Number.isInteger(tenantId)
        ? tenantId
        : null;
  }

  hasPermission(permission: string): boolean {
    const permissions = this.getTokenPayload()?.permission;
    return Array.isArray(permissions) ? permissions.includes(permission) : permissions === permission;
  }

  hasRole(role: string): boolean {
    const payload = this.getTokenPayload();
    const roles = payload?.role ?? payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return Array.isArray(roles) ? roles.includes(role) : roles === role;
  }

  getRoles(): string[] {
    const payload = this.getTokenPayload();
    const roles = payload?.role ?? payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return Array.isArray(roles) ? roles : roles ? [roles] : [];
  }

  getEmail(): string | null {
    const payload = this.getTokenPayload();
    return payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? payload?.unique_name ?? payload?.name ?? null;
  }
}