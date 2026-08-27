export interface TenantPlan {
  planId: number;
  code: string;
  name: string;
  maxEmployees: number;
  maxUsers: number;
  maxBranches: number;
  maxStorageBytes: number;
  featureCodes: string[];
}
