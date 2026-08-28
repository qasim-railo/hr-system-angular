import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ManagerPortalDashboard } from '../models/manager-portal.model';

@Injectable({ providedIn: 'root' })
export class ManagerPortalService {
  constructor(private http: HttpClient) {}
  getDashboard(): Observable<ManagerPortalDashboard> { return this.http.get<ManagerPortalDashboard>(`${environment.apiUrl}/manager-portal/dashboard`); }
}
