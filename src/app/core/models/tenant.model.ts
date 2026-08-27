export interface Tenant {
  tenantId: number;
  name: string;
  code: string;
  status: string;
  subscriptionReference?: string;
  country: string;
  currency: string;
  timeZone: string;
  createdAt: string;
  lifecycleStatus: string;
}
