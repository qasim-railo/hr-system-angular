export interface Subscription {
  subscriptionId: number;
  tenantId: number;
  tenantName: string;
  planId: number;
  planCode: string;
  planName: string;
  status: string | number;
  startDate: string;
  renewalDate?: string;
  trialStartDate?: string;
  trialEndDate?: string;
  billingCycle: string;
  notes?: string;
}
