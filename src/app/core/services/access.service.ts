import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface AccessRole {
  id: number;
  name: string;
  permissions: { name: string; dataScope: string; scopeIds: number[] }[];
}

export interface AccessUser {
  id: number;
  username: string;
  roles: string[];
  permissions: string[];
  isActive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AccessService {
  private readonly apiUrl = `${environment.apiUrl}/access`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<AccessRole[]> { return this.http.get<AccessRole[]>(`${this.apiUrl}/roles`); }
  getPermissions(): Observable<{ id: number; name: string; description?: string }[]> { return this.http.get<any[]>(`${this.apiUrl}/permissions`); }
  getUsers(): Observable<AccessUser[]> { return this.http.get<AccessUser[]>(`${this.apiUrl}/users`); }

  createRole(name: string, permissions: string[], permissionScopes: { permission: string; dataScope?: string; scopeIds?: number[] }[]): Observable<AccessRole> {
    return this.http.post<AccessRole>(`${this.apiUrl}/roles`, { name, permissions, permissionScopes });
  }

  createUser(username: string, password: string, roles: string[], isActive: boolean): Observable<AccessUser> {
    return this.http.post<AccessUser>(`${this.apiUrl}/users`, { username, password, roles, isActive });
  }

  inviteUser(username: string, roles: string[], temporaryPassword?: string): Observable<AccessUser> {
    return this.http.post<AccessUser>(`${this.apiUrl}/users/invite`, { username, roles, temporaryPassword, isActive: true });
  }

  disableUser(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/${id}/disable`, {});
  }
}
