import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SelfServiceDashboard } from '../models/self-service.model';

@Injectable({ providedIn: 'root' })
export class SelfServiceService {
  constructor(private http: HttpClient) {}
  getDashboard(): Observable<SelfServiceDashboard> { return this.http.get<SelfServiceDashboard>(`${environment.apiUrl}/self-service/dashboard`); }
}
