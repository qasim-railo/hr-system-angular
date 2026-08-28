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
