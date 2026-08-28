import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuditLog } from '../models/audit.model';

@Injectable({ providedIn: 'root' })
export class AuditService {
  constructor(private http: HttpClient) {}
  get(limit = 100): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${environment.apiUrl}/audit?limit=${limit}`);
  }
}
