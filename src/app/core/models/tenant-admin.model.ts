export interface TenantAdminDashboard {
  tenant: { tenantId: number; name: string; code: string };
  users: number;
  activeUsers: number;
  roles: number;
  departments: number;
  branches: number;
  employees: number;
  usage: { storageUsedBytes: number; storageLimitBytes: number; remainingBytes: number };
  subscription?: { plan: string; status: string | number; renewalDate?: string };
}

export interface TenantProfile {
  tenantId: number;
  name: string;
  code: string;
  country: string;
  currency: string;
  timeZone: string;
  countryCode: string;
  currencyCode: string;
  timeZoneId: string;
  dateFormat: string;
  numberFormat: string;
  status?: string;
  lifecycleStatus?: string;
}

export interface TenantSetting {
  id: number;
  tenantId: number;
  key: string;
  value: string;
}

export interface TenantSettingItem {
  key: string;
  label: string;
  valueType: 'text' | 'number' | 'boolean' | 'select';
  value: string;
  defaultValue: string;
  isOverridden: boolean;
  options: string[];
}

export interface TenantSettingsSection {
  key: string;
  name: string;
  settings: TenantSettingItem[];
}

export interface TenantSettingsCenter {
  sections: TenantSettingsSection[];
}

export interface NumberingPattern {
  key: string;
  label: string;
  pattern: string;
  preview: string;
}

export interface ApprovalStep {
  id?: number;
  stepOrder: number;
  name: string;
  approverRole: string;
  approvalMode: string;
  escalationAfterHours?: number;
}

export interface ApprovalWorkflow {
  id?: number;
  name: string;
  module: string;
  requestType: string;
  isActive: boolean;
  steps: ApprovalStep[];
}

export interface PayrollComponent {
  id?: number;
  code: string;
  name: string;
  componentType: 'Earning' | 'Deduction';
  calculationType: 'Fixed' | 'Percentage';
  value: number;
  salaryField: string;
  baseComponentCode: string;
  isTaxable: boolean;
  isPensionable: boolean;
  isWpsIncluded: boolean;
  isActive: boolean;
}
export interface OvertimePolicy {
  id?: number; name: string; employeeCategory: string; dayType: string; classification: 'OT1' | 'OT2';
  rateMultiplier: number; dailyThresholdMinutes: number; maximumApprovedMinutes: number;
  approvalRequired: boolean; effectiveFrom: string; effectiveTo?: string; isActive: boolean;
}
export interface LeavePolicy {
  id?: number; name: string; entitlementDays: number; accrualMethod: 'Annual' | 'Monthly' | 'Daily' | 'OnJoining';
  carryForwardLimit: number; allowEncashment: boolean; minimumServiceDays: number; documentRequired: boolean; approvalRequired: boolean;
  employeeCategory: string; effectiveFrom: string; effectiveTo?: string; isActive: boolean;
}
export interface AttendanceConfiguration {
  allowedSources: string; graceInMinutes: number; graceOutMinutes: number; missingPunchPolicy: 'Flag' | 'Ignore' | 'AutoAbsent';
  lateEarlyRule: 'Track' | 'Ignore' | 'Flag'; approvalRequired: boolean; defaultWorkingHours: number;
}
export interface AttendanceImportLog {
  id: number; importedAt: string; source: string; fileName: string; totalRows: number; importedRows: number; errorRows: number; errors: string;
}
