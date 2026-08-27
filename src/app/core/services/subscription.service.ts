import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Subscription } from '../models/subscription.model';

export interface ActivateSubscriptionRequest {
  planId?: number;
  billingCycle?: string;
  renewalDate?: string;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private readonly platformUrl = `${environment.apiUrl}/platform/subscriptions`;
  private readonly tenantUrl = `${environment.apiUrl}/tenant/subscription`;

  constructor(private http: HttpClient) {}

  getCurrent(): Observable<Subscription> {
    return this.http.get<Subscription>(this.tenantUrl);
  }

  getAll(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.platformUrl);
  }

  activate(tenantId: number, request: ActivateSubscriptionRequest): Observable<Subscription> {
    return this.http.post<Subscription>(`${environment.apiUrl}/platform/tenants/${tenantId}/subscription/activate`, request);
  }

  changePlan(tenantId: number, planId: number): Observable<Subscription> {
    return this.http.put<Subscription>(`${environment.apiUrl}/platform/tenants/${tenantId}/subscription/plan`, { planId });
  }

  extend(tenantId: number, renewalDate: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${environment.apiUrl}/platform/tenants/${tenantId}/subscription/extend`, { renewalDate });
  }

  setStatus(tenantId: number, action: 'suspend' | 'cancel'): Observable<Subscription> {
    return this.http.post<Subscription>(`${environment.apiUrl}/platform/tenants/${tenantId}/subscription/${action}`, {});
  }
}
