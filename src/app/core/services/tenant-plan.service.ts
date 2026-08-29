import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TenantPlan } from '../models/tenant-plan.model';

export interface FeatureAccessCheck {
  allowed: boolean;
  featureCode: string;
  currentPlanCode: string;
  currentPlanName: string;
  status?: string | number;
  upgradeRequired: boolean;
  availableFeatures: string[];
  reason: string;
}

@Injectable({ providedIn: 'root' })
export class TenantPlanService {
  private readonly url = `${environment.apiUrl}/tenant/plan`;

  constructor(private http: HttpClient) {}

  getCurrentPlan(): Observable<TenantPlan> {
    return this.http.get<TenantPlan>(this.url);
  }

  checkFeature(featureCode: string): Observable<FeatureAccessCheck> {
    return this.http.get<FeatureAccessCheck>(`${this.url}/feature/${encodeURIComponent(featureCode)}`);
  }
}
