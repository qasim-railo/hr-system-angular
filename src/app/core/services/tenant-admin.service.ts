import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApprovalWorkflow, AttendanceConfiguration, AttendanceImportLog, IntegrationConnection, IntegrationSummary, LeavePolicy, NumberingPattern, OvertimePolicy, PayrollComponent, TenantAdminDashboard, TenantBranding, TenantProfile, TenantSetting, TenantSettingItem, TenantSettingsCenter, TenantSetupProgress } from '../models/tenant-admin.model';

@Injectable({ providedIn: 'root' })
export class TenantAdminService {
  private readonly url = `${environment.apiUrl}/tenant`;
  constructor(private http: HttpClient) {}
  getDashboard(): Observable<TenantAdminDashboard> { return this.http.get<TenantAdminDashboard>(`${this.url}/dashboard`); }
  getSetupProgress(): Observable<TenantSetupProgress> { return this.http.get<TenantSetupProgress>(`${this.url}/setup-wizard`); }
  updateSetupProgress(completedStep: number): Observable<TenantSetupProgress> { return this.http.put<TenantSetupProgress>(`${this.url}/setup-wizard`, { completedStep }); }
  getProfile(): Observable<TenantProfile> { return this.http.get<TenantProfile>(`${this.url}/profile`); }
  updateProfile(profile: Partial<TenantProfile>): Observable<TenantProfile> { return this.http.put<TenantProfile>(`${this.url}/profile`, profile); }
  getSettings(): Observable<TenantSetting[]> { return this.http.get<TenantSetting[]>(`${this.url}/settings`); }
  updateSetting(key: string, value: string): Observable<TenantSetting> { return this.http.put<TenantSetting>(`${this.url}/settings/${encodeURIComponent(key)}`, { value }); }
  getBranding(): Observable<TenantBranding> { return this.http.get<TenantBranding>(`${this.url}/branding`); }
  updateBranding(branding: TenantBranding): Observable<TenantBranding> { return this.http.put<TenantBranding>(`${this.url}/branding`, branding); }
  getSettingsCenter(): Observable<TenantSettingsCenter> { return this.http.get<TenantSettingsCenter>(`${this.url}/settings-center`); }
  updateTypedSetting(key: string, value: string): Observable<TenantSettingItem> { return this.http.put<TenantSettingItem>(`${this.url}/settings-center/${encodeURIComponent(key)}`, { value }); }
  getIntegrations(): Observable<IntegrationSummary> { return this.http.get<IntegrationSummary>(`${this.url}/integrations`); }
  saveIntegration(providerKey: string, payload: { isEnabled: boolean; secretReference?: string; baseUrl?: string; configurationJson?: string }): Observable<IntegrationConnection> {
    return this.http.put<IntegrationConnection>(`${this.url}/integrations/${encodeURIComponent(providerKey)}`, payload);
  }
  getNumberingPatterns(): Observable<NumberingPattern[]> { return this.http.get<NumberingPattern[]>(`${environment.apiUrl}/numbering`); }
  updateNumberingPattern(key: string, pattern: string): Observable<NumberingPattern> { return this.http.put<NumberingPattern>(`${environment.apiUrl}/numbering/${encodeURIComponent(key)}`, { pattern }); }
  getApprovalWorkflows(): Observable<ApprovalWorkflow[]> { return this.http.get<ApprovalWorkflow[]>(`${environment.apiUrl}/approval-workflows`); }
  saveApprovalWorkflow(workflow: ApprovalWorkflow): Observable<ApprovalWorkflow> {
    const request = { name: workflow.name, module: workflow.module, requestType: workflow.requestType, isActive: workflow.isActive, steps: workflow.steps };
    return workflow.id ? this.http.put<ApprovalWorkflow>(`${environment.apiUrl}/approval-workflows/${workflow.id}`, request) : this.http.post<ApprovalWorkflow>(`${environment.apiUrl}/approval-workflows`, request);
  }
  getPayrollComponents(): Observable<PayrollComponent[]> { return this.http.get<PayrollComponent[]>(`${environment.apiUrl}/payroll-components`); }
  savePayrollComponent(component: PayrollComponent): Observable<PayrollComponent> {
    return component.id ? this.http.put<PayrollComponent>(`${environment.apiUrl}/payroll-components/${component.id}`, component) : this.http.post<PayrollComponent>(`${environment.apiUrl}/payroll-components`, component);
  }
  getOvertimePolicies(): Observable<OvertimePolicy[]> { return this.http.get<OvertimePolicy[]>(`${environment.apiUrl}/overtime-policies`); }
  saveOvertimePolicy(policy: OvertimePolicy): Observable<OvertimePolicy> {
    return policy.id ? this.http.put<OvertimePolicy>(`${environment.apiUrl}/overtime-policies/${policy.id}`, policy) : this.http.post<OvertimePolicy>(`${environment.apiUrl}/overtime-policies`, policy);
  }
  getLeavePolicies(): Observable<LeavePolicy[]> { return this.http.get<LeavePolicy[]>(`${environment.apiUrl}/leave-policies`); }
  saveLeavePolicy(policy: LeavePolicy): Observable<LeavePolicy> { return policy.id ? this.http.put<LeavePolicy>(`${environment.apiUrl}/leave-policies/${policy.id}`, policy) : this.http.post<LeavePolicy>(`${environment.apiUrl}/leave-policies`, policy); }
  getAttendanceConfiguration(): Observable<AttendanceConfiguration> { return this.http.get<AttendanceConfiguration>(`${environment.apiUrl}/attendance-configuration`); }
  saveAttendanceConfiguration(config: AttendanceConfiguration): Observable<AttendanceConfiguration> { return this.http.put<AttendanceConfiguration>(`${environment.apiUrl}/attendance-configuration`, config); }
  getAttendanceImports(): Observable<AttendanceImportLog[]> { return this.http.get<AttendanceImportLog[]>(`${environment.apiUrl}/attendance-configuration/imports`); }
}
