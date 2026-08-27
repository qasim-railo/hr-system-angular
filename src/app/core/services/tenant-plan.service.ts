import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TenantPlan } from '../models/tenant-plan.model';

@Injectable({ providedIn: 'root' })
export class TenantPlanService {
  private readonly url = `${environment.apiUrl}/tenant/plan`;

  constructor(private http: HttpClient) {}

  getCurrentPlan(): Observable<TenantPlan> {
    return this.http.get<TenantPlan>(this.url);
  }
}
