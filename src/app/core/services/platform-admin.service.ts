import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BillingHistory, BillingInvoice, CreateBillingInvoiceRequest, RecordPaymentRequest, UpdateBillingInvoiceStatusRequest } from '../models/billing.model';
import { CreatePlanRequest, Plan, PlanModule, PlatformAuditLog, PlatformStatistics, PlatformTenant } from '../models/platform-tenant.model';

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

  getAuditLogs(limit = 100): Observable<PlatformAuditLog[]> {
    return this.http.get<PlatformAuditLog[]>(`${this.apiUrl}/audit-logs`, { params: { limit } });
  }

  changeStatus(id: number, action: 'activate' | 'suspend' | 'resume' | 'archive'): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/tenants/${id}/${action}`, {});
  }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl + '/plans');
  }

  getAvailablePlanModules(): Observable<PlanModule[]> {
    return this.http.get<PlanModule[]>(`${this.apiUrl}/plans/modules`);
  }

  createPlan(request: CreatePlanRequest): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl + '/plans', request);
  }

  updatePlan(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.apiUrl}/plans/${plan.planId}`, plan);
  }

  getBillingHistory(tenantId: number): Observable<BillingHistory> {
    return this.http.get<BillingHistory>(`${this.apiUrl}/tenants/${tenantId}/billing`);
  }

  createInvoice(tenantId: number, request: CreateBillingInvoiceRequest): Observable<BillingInvoice> {
    return this.http.post<BillingInvoice>(`${this.apiUrl}/tenants/${tenantId}/billing/invoices`, request);
  }

  recordPayment(tenantId: number, invoiceId: number, request: RecordPaymentRequest): Observable<BillingInvoice> {
    return this.http.post<BillingInvoice>(`${this.apiUrl}/tenants/${tenantId}/billing/invoices/${invoiceId}/payments`, request);
  }

  updateInvoiceStatus(tenantId: number, invoiceId: number, request: UpdateBillingInvoiceStatusRequest): Observable<BillingInvoice> {
    return this.http.put<BillingInvoice>(`${this.apiUrl}/tenants/${tenantId}/billing/invoices/${invoiceId}/status`, request);
  }
}
