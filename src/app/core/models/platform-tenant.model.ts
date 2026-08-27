export interface PlatformTenant {
  tenantId: number;
  name: string;
  code: string;
  status: string;
  lifecycleStatus: string;
  planName: string;
  trialStartDate?: string;
  trialEndDate?: string;
  billingStatus: string;
  storageUsedBytes: number;
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
