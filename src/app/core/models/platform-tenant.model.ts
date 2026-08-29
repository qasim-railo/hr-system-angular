export interface PlatformTenant {
  tenantId: number;
  name: string;
  code: string;
  status: string;
  lifecycleStatus: string;
  planName: string;
  trialStartDate?: string;
  trialEndDate?: string;
  trialDaysRemaining?: number;
  billingStatus: string;
  storageUsedBytes: number;
  storageLimitBytes: number;
  userCount: number;
  employeeCount: number;
  companyCount: number;
}

export interface PlatformStatistics {
  totalTenants: number;
  activeTenants: number;
  trialTenants: number;
  suspendedTenants: number;
  totalUsers: number;
  totalEmployees: number;
  totalStorageUsedBytes: number;
}

export interface Plan {
  planId: number;
  code: string;
  name: string;
  maxEmployees: number;
  maxUsers: number;
  maxBranches: number;
  maxStorageBytes: number;
  featureCodes: string[];
}
