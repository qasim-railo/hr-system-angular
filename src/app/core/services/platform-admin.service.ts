import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BillingHistory, BillingInvoice, CreateBillingInvoiceRequest, RecordPaymentRequest, UpdateBillingInvoiceStatusRequest } from '../models/billing.model';
import { CreatePlanRequest, Plan, PlanModule, PlatformAuditLog, PlatformStatistics, PlatformTenant } from '../models/platform-tenant.model';
import { CountryMaster, CurrencyMaster, TimeZoneMaster } from '../models/master-data.model';

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
  getCountries(): Observable<CountryMaster[]> { return this.http.get<CountryMaster[]>(`${this.apiUrl}/master-data/countries`); }
  saveCountry(country: CountryMaster): Observable<CountryMaster> {
    return country.countryId ? this.http.put<CountryMaster>(`${this.apiUrl}/master-data/countries/${country.countryId}`, country) : this.http.post<CountryMaster>(`${this.apiUrl}/master-data/countries`, country);
  }
  deleteCountry(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/master-data/countries/${id}`); }
  getCurrencies(): Observable<CurrencyMaster[]> { return this.http.get<CurrencyMaster[]>(`${this.apiUrl}/master-data/currencies`); }
  saveCurrency(currency: CurrencyMaster): Observable<CurrencyMaster> {
    return currency.currencyId ? this.http.put<CurrencyMaster>(`${this.apiUrl}/master-data/currencies/${currency.currencyId}`, currency) : this.http.post<CurrencyMaster>(`${this.apiUrl}/master-data/currencies`, currency);
  }
  deleteCurrency(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/master-data/currencies/${id}`); }
  getTimeZones(): Observable<TimeZoneMaster[]> { return this.http.get<TimeZoneMaster[]>(`${this.apiUrl}/master-data/time-zones`); }
  saveTimeZone(timeZone: TimeZoneMaster): Observable<TimeZoneMaster> {
    return this.http.post<TimeZoneMaster>(`${this.apiUrl}/master-data/time-zones`, timeZone);
  }
  updateTimeZone(timeZone: TimeZoneMaster): Observable<TimeZoneMaster> {
    return this.http.put<TimeZoneMaster>(`${this.apiUrl}/master-data/time-zones/${encodeURIComponent(timeZone.timeZoneId)}`, timeZone);
  }
  deleteTimeZone(id: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/master-data/time-zones/${encodeURIComponent(id)}`); }
}
